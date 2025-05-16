<template>
  <div class="message-wall" :class="colorMode">
    <div class="barrage-container">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="barrage-item"
        :class="colorMode"
        :style="{
          top: (msg.track * TRACK_HEIGHT + TRACK_MARGIN) + 'px',
          left: msg.left + 'px',
          zIndex: msg.z,
          width: msg.width + 'px',
        }"
        ref="barrageRefs"
      >
        <img class="avatar" :src="msg.avatar" />
        <span class="nickname">{{ msg.nickname }}</span>
        <span class="content">{{ msg.content }}</span>
      </div>
    </div>
    <div class="input-bar" :class="colorMode">
      <input v-model="input" @keyup.enter="sendMessage" placeholder="说点什么..." />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const AVATARS = [
  'https://api.multiavatar.com/1.png',
  'https://api.multiavatar.com/2.png',
  'https://api.multiavatar.com/3.png',
  'https://api.multiavatar.com/4.png',
  'https://api.multiavatar.com/5.png',
  'https://api.multiavatar.com/6.png',
  'https://api.multiavatar.com/7.png',
  'https://api.multiavatar.com/8.png',
]
const NICKNAMES = ['小明','小红','小蓝','小绿','小黄','小白','小黑','访客','路人甲','匿名']
const RANDOM_MESSAGES = [
  '这个聊天软件真好用！',
  '期待正式版发布！',
  '界面设计很漂亮',
  '使用体验非常流畅',
  '功能越来越丰富了',
  '支持国产软件！',
  '希望多加一些实用功能',
  '已经推荐给朋友了',
  '终于有好用的聊天工具了',
  '界面很清爽，喜欢',
  '这个弹幕效果太酷了',
  '希望能一直更新下去',
  '好期待后续更新',
  '比某信好用多了👍',
  '希望增加更多表情包',
  '已经成为我的主力聊天软件'
]

const TRACK_HEIGHT = 52
const TRACK_MARGIN = 60
const BARRAGE_WIDTH = 280
const BARRAGE_HEIGHT = 44
const BARRAGE_SPEED = [1.2, 1.6] // px/frame

const messages = ref<any[]>([])
const input = ref('')
let id = 1
const colorMode = useColorMode()
const barrageRefs = ref([])

const nextTick = (fn: () => void) => setTimeout(fn, 0)

function randomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getTrackCount() {
  return Math.floor((window.innerHeight - 2 * TRACK_MARGIN) / TRACK_HEIGHT)
}

function getCenterOutTracks(trackCount: number): number[] {
  const center = Math.floor((trackCount - 1) / 2)
  const order: number[] = []
  for (let i = 0; i < trackCount; i++) {
    const offset = Math.floor((i + 1) / 2)
    if (i % 2 === 0) {
      order.push(center - offset)
    } else {
      order.push(center + offset)
    }
  }
  return order.filter(t => t >= 0 && t < trackCount)
}

function getAvailableTrack() {
  const trackCount = getTrackCount()
  const order = getCenterOutTracks(trackCount)
  const usedTracks = messages.value.map((m: any) => m.track)
  let track = order.find(t => !usedTracks.includes(t))
  if (track === undefined) {
    track = order[messages.value.length % trackCount]
  }
  return track
}

function addBarrage(msg: any) {
  // 先渲染到页面，获取宽度
  messages.value.push(msg)
  nextTick(() => {
    const idx = messages.value.findIndex((m: any) => m.id === msg.id)
    const el = document.querySelectorAll('.barrage-item')[idx] as HTMLElement
    msg.width = el ? el.offsetWidth : BARRAGE_WIDTH
  })
}

function sendMessage() {
  if (!input.value.trim()) return
  const track = getAvailableTrack()
  const left = window.innerWidth
  const speed = Math.random() * (BARRAGE_SPEED[1] - BARRAGE_SPEED[0]) + BARRAGE_SPEED[0]
  const msg = {
    id: id++,
    avatar: AVATARS[randomInt(0, AVATARS.length-1)],
    nickname: NICKNAMES[randomInt(0, NICKNAMES.length-1)],
    content: input.value,
    track,
    left,
    speed,
    z: randomInt(1, 10),
    width: BARRAGE_WIDTH
  }
  addBarrage(msg)
  input.value = ''
}

// 初始弹幕
onMounted(() => {
  for (let i = 0; i < 3; i++) {
    const track = getAvailableTrack()
    const left = window.innerWidth + i * 120
    const speed = Math.random() * (BARRAGE_SPEED[1] - BARRAGE_SPEED[0]) + BARRAGE_SPEED[0]
    const msg = {
      id: id++,
      avatar: AVATARS[randomInt(0, AVATARS.length-1)],
      nickname: NICKNAMES[randomInt(0, NICKNAMES.length-1)],
      content: ['你好，欢迎留言！','这个网站真好看！','加油！'][i],
      track,
      left,
      speed,
      z: randomInt(1, 10),
      width: BARRAGE_WIDTH
    }
    addBarrage(msg)
  }
  animateBarrages()
})

function animateBarrages() {
  for (const msg of messages.value) {
    msg.left -= msg.speed
    if (msg.left < -msg.width) {
      // 当弹幕完全消失在左侧屏幕外时
      // 不直接将弹幕重置到右侧，而是创建一个新弹幕
      // 删除当前弹幕并创建一个新弹幕，保持消息总数不变
      const track = getAvailableTrack()
      const speed = Math.random() * (BARRAGE_SPEED[1] - BARRAGE_SPEED[0]) + BARRAGE_SPEED[0]
      
      // 保存原始ID以便找到并替换对应元素
      const originalId = msg.id
      
      // 创建新弹幕对象
      const newMsg = {
        id: id++,
        avatar: AVATARS[randomInt(0, AVATARS.length-1)],
        nickname: NICKNAMES[randomInt(0, NICKNAMES.length-1)],
        content: RANDOM_MESSAGES[randomInt(0, RANDOM_MESSAGES.length-1)],
        track,
        left: window.innerWidth, // 放在屏幕右侧
        speed,
        z: randomInt(1, 10),
        width: BARRAGE_WIDTH
      }
      
      // 找到并替换旧弹幕
      const index = messages.value.findIndex((m: any) => m.id === originalId)
      if (index !== -1) {
        messages.value.splice(index, 1, newMsg)
      }
      
      // 获取元素宽度
      nextTick(() => {
        const idx = messages.value.findIndex((m: any) => m.id === newMsg.id)
        const el = document.querySelectorAll('.barrage-item')[idx] as HTMLElement
        if (el) {
          newMsg.width = el.offsetWidth
        }
      })
    }
  }
  requestAnimationFrame(animateBarrages)
}
</script>

<style lang="scss" scoped>
.message-wall {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &.dark {
    background: linear-gradient(120deg, #232526 0%, #414345 100%);
  }
  &.light {
    background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%);
  }
}
.barrage-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.barrage-item {
  position: absolute;
  left: 0;
  width: 280px;
  height: 44px;
  padding: 0 16px;
  border-radius: 22px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.18);
  pointer-events: auto;
  user-select: none;
  background: rgba(0,0,0,0.7);
  will-change: transform, left;
  &.light {
    background: rgba(255,255,255,0.85);
    color: #222;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  }
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
}
.nickname {
  font-weight: bold;
  margin-right: 4px;
  font-size: 15px;
}
.content {
  word-break: break-all;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.input-bar {
  width: 100vw;
  padding: 24px 0 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  gap: 8px;
  background: linear-gradient(0deg, rgba(30,30,30,0.7) 0%, rgba(30,30,30,0.0) 100%);
  &.light {
    background: linear-gradient(0deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 100%);
  }
}
.input-bar input {
  width: 220px;
  height: 40px;
  border-radius: 20px;
  border: none;
  outline: none;
  padding: 0 20px;
  font-size: 16px;
  background: #fff;
  color: #222;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  margin-right: 8px;
}
.input-bar button {
  height: 40px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(135deg, var(--gradient-start, #805AD5) 0%, var(--gradient-end, #FFD200) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 0 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.input-bar button:hover {
  background: linear-gradient(-135deg, var(--gradient-end, #FFD200) 0%, var(--gradient-start, #805AD5) 100%);
}
@media (max-width: 600px) {
  .barrage-item {
    font-size: 13px;
    width: 90vw;
    height: 36px;
    padding: 0 8px;
  }
  .input-bar input {
    width: 60vw;
    font-size: 14px;
  }
  .input-bar button {
    font-size: 14px;
    padding: 0 16px;
  }
}
</style> 