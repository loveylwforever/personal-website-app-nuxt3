<template>
  <div class="message-wall">
    <div class="barrage-stage" aria-hidden="true">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :ref="(el) => bindEl(msg.id, el)"
        class="barrage-item"
        :class="[`is-${msg.layer}`, { 'is-mine': msg.mine }]"
        :style="{
          top: `${msg.top}px`,
          zIndex: msg.z,
          color: msg.color,
          '--glow': msg.glow,
        }"
      >
        <span class="line">
          <b class="nickname">{{ msg.nickname }}</b>
          <span class="content">{{ msg.content }}</span>
        </span>
      </div>
    </div>

    <div class="input-bar">
      <input
        v-model="input"
        maxlength="48"
        placeholder="说点什么..."
        @keyup.enter="sendMessage"
      >
      <button type="button" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 留言墙',
})

type Layer = 'far' | 'mid' | 'near'

interface Barrage {
  id: number
  nickname: string
  content: string
  top: number
  x: number
  speed: number
  width: number
  z: number
  color: string
  glow: string
  layer: Layer
  mine?: boolean
}

const NICKNAMES = ['小明', '小红', '阿柯', '林深', '南风', '访客', '路人甲', '匿名', '星子', '老王', '七七', '北岛']
const RANDOM_MESSAGES = [
  '这个某某软件真好用！',
  '期待正式版发布！',
  '界面设计很漂亮',
  '使用体验非常流畅',
  '功能越来越丰富了',
  '支持国产软件！',
  '已经推荐给朋友了',
  '终于有好用的某某工具了',
  '界面很清爽，喜欢',
  '这个弹幕效果太酷了',
  '希望能一直更新下去',
  '好期待后续更新',
  '已经成为我的主力某某软件',
  '深色模式也很好看',
  '多端同步很稳',
  'Web 体验什么时候开',
  '安装包真的好小',
  'AI 助手挺聪明',
]

const HUES = [12, 28, 42, 152, 178, 198, 268, 328, 348, 210]
const TRACK_HEIGHT = 36
const TRACK_MARGIN = 80

const messages = ref<Barrage[]>([])
const input = ref('')
const els = new Map<number, HTMLElement>()
const colorMode = useColorMode()

let nextId = 1
let raf = 0
let measureCtx: CanvasRenderingContext2D | null = null
let reduce = false

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(list: T[]) {
  return list[randomInt(0, list.length - 1)]
}

function isDark() {
  return colorMode.value === 'dark'
}

function palette(hue: number) {
  const color = isDark()
    ? `hsl(${hue} 78% 74%)`
    : `hsl(${hue} 64% 40%)`
  return {
    color,
    glow: isDark()
      ? `hsl(${hue} 80% 62% / 0.45)`
      : `hsl(${hue} 70% 46% / 0.28)`,
  }
}

function cap() {
  const wide = window.innerWidth >= 768
  return reduce ? (wide ? 10 : 6) : (wide ? 40 : 20)
}

function trackCount() {
  return Math.max(4, Math.floor((window.innerHeight - TRACK_MARGIN * 2) / TRACK_HEIGHT))
}

function measure(text: string, layer: Layer) {
  if (!measureCtx) {
    measureCtx = document.createElement('canvas').getContext('2d')
  }
  const size = layer === 'near' ? 18 : layer === 'mid' ? 15 : 13
  if (!measureCtx) return text.length * size * 0.9
  measureCtx.font = `600 ${size}px ui-sans-serif, system-ui, sans-serif`
  return Math.ceil(measureCtx.measureText(text).width) + 24
}

function bindEl(id: number, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) {
    els.set(id, el)
    el.style.transform = `translate3d(${messages.value.find((m) => m.id === id)?.x ?? 0}px, 0, 0)`
  } else {
    els.delete(id)
  }
}

function createBarrage(partial: Partial<Barrage> = {}): Barrage {
  const roll = Math.random()
  const layer: Layer = partial.layer ?? (roll < 0.28 ? 'far' : roll < 0.72 ? 'mid' : 'near')
  const hue = HUES[randomInt(0, HUES.length - 1)]
  const ink = palette(hue)
  const nickname = partial.nickname ?? pick(NICKNAMES)
  const content = partial.content ?? pick(RANDOM_MESSAGES)
  const speedScale = reduce ? 0.18 : 1
  const speed = ((layer === 'far' ? randomInt(40, 70) : layer === 'mid' ? randomInt(80, 130) : randomInt(140, 210)) / 60) * speedScale
  return {
    id: partial.id ?? nextId++,
    nickname,
    content,
    top: TRACK_MARGIN + randomInt(0, trackCount() - 1) * TRACK_HEIGHT,
    x: partial.x ?? window.innerWidth + randomInt(8, 280),
    speed,
    width: measure(`${nickname}  ${content}`, layer),
    z: layer === 'near' ? randomInt(8, 16) : layer === 'mid' ? randomInt(4, 8) : randomInt(1, 4),
    color: partial.color ?? ink.color,
    glow: partial.glow ?? ink.glow,
    layer,
    mine: partial.mine,
  }
}

function seed() {
  const count = cap()
  const next: Barrage[] = []
  for (let i = 0; i < count; i++) {
    next.push(createBarrage({
      x: randomInt(-120, Math.max(80, window.innerWidth - 40)),
    }))
  }
  messages.value = next
}

function recycle(msg: Barrage) {
  Object.assign(msg, createBarrage({
    id: msg.id,
    x: window.innerWidth + randomInt(16, 240),
    mine: false,
  }))
  els.get(msg.id)?.style.setProperty('transform', `translate3d(${msg.x}px, 0, 0)`)
}

function sendMessage() {
  const text = input.value.trim()
  if (!text) return
  const hue = 18
  const { color, glow } = palette(hue)
  const msg = createBarrage({
    nickname: '我',
    content: text,
    layer: 'near',
    mine: true,
    color,
    glow,
    x: window.innerWidth + 12,
    z: 20,
  })
  if (messages.value.length >= cap()) {
    const drop = messages.value.shift()
    if (drop) els.delete(drop.id)
  }
  messages.value.push(msg)
  input.value = ''
}

function tick(last: number) {
  raf = requestAnimationFrame((now) => {
    const dt = Math.min(32, now - last) / 16.67
    for (const msg of messages.value) {
      msg.x -= msg.speed * dt
      const el = els.get(msg.id)
      if (el) el.style.transform = `translate3d(${msg.x}px, 0, 0)`
      if (msg.x < -msg.width - 32) recycle(msg)
    }
    tick(now)
  })
}

onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  seed()
  nextTick(() => tick(performance.now()))
  document.addEventListener('visibilitychange', onVisibility)
})

function onVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(raf)
    raf = 0
    return
  }
  if (!raf) tick(performance.now())
}

onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.removeEventListener('visibilitychange', onVisibility)
  els.clear()
})
</script>

<style scoped>
.message-wall {
  position: relative;
  min-height: calc(100dvh - var(--header-height));
  overflow: hidden;
  background:
    radial-gradient(1200px 520px at 12% 18%, color-mix(in srgb, var(--primary-color) 14%, transparent), transparent 60%),
    radial-gradient(900px 480px at 88% 70%, color-mix(in srgb, var(--gradient-end) 12%, transparent), transparent 62%),
    var(--bg-color);
}

.barrage-stage {
  position: absolute;
  inset: 0 0 88px;
  overflow: hidden;
  pointer-events: none;
}

.barrage-item {
  position: absolute;
  left: 0;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform;
  contain: layout style;
}

.line {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  text-shadow: 0 0 16px var(--glow);
}

.nickname {
  font-weight: 700;
}

.content {
  font-weight: 500;
  opacity: 0.92;
}

.is-far {
  font-size: 13px;
  opacity: 0.42;
}

.is-far .line {
  text-shadow: none;
}

.is-mid {
  font-size: 15px;
  opacity: 0.82;
}

.is-near {
  font-size: 18px;
  opacity: 1;
  letter-spacing: 0.01em;
}

.is-mine .line {
  animation: mine-pop var(--duration-ui) var(--ease-out);
}

.input-bar {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px var(--page-gutter) 28px;
  background: linear-gradient(0deg, var(--bg-color) 55%, transparent);
}

.input-bar input {
  width: min(320px, 62vw);
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  outline: none;
  background: var(--card-bg);
  color: var(--text-color);
  font: inherit;
  font-size: 15px;
}

.input-bar button {
  height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: var(--radius-md);
  background: var(--primary-color);
  color: var(--on-primary);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

@keyframes mine-pop {
  from {
    opacity: 0.35;
    transform: scale(0.94);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-mine .line {
    animation: none;
  }
}

@media (max-width: 600px) {
  .is-near {
    font-size: 16px;
  }

  .input-bar input {
    width: 58vw;
  }
}
</style>
