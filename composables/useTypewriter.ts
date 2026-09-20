export function useTypewriter(text: string) {
  const chars = ref<string[]>(Array.from({ length: text.length }, () => ''))
  const visible = ref<boolean[]>(Array.from({ length: text.length }, () => false))
  const index = ref(0)
  const phase = ref<'typing' | 'done'>('typing')

  let frame: number | null = null
  let lastTime = 0

  const TYPING = 140

  function reset() {
    chars.value = Array.from({ length: text.length }, () => '')
    visible.value = Array.from({ length: text.length }, () => false)
    index.value = 0
    phase.value = 'typing'
    lastTime = performance.now()
  }

  function tick(now: number) {
    if (phase.value === 'typing' && now - lastTime >= TYPING) {
      if (index.value < text.length) {
        chars.value[index.value] = text[index.value]
        visible.value[index.value] = true
        index.value += 1
        lastTime = now
      } else {
        phase.value = 'done'
        frame = null
        return
      }
    }

    frame = requestAnimationFrame(tick)
  }

  function start() {
    stop()
    reset()
    frame = requestAnimationFrame(tick)
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame)
    frame = null
  }

  onMounted(start)
  onUnmounted(stop)

  return { chars, visible, restart: start }
}
