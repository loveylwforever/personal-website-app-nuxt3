export function useScreenshotTilt(target: Ref<HTMLElement | null>) {
  const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let animating = false
  let frame: number | null = null

  function apply() {
    const el = target.value
    if (!el) return

    currentX += (targetX - currentX) * 0.15
    currentY += (targetY - currentY) * 0.15

    const rotateX = currentY * 8
    const rotateY = currentX * 8
    const shadowX = currentX * 12
    const shadowY = currentY * 12
    const shadowBlur = 32 + Math.abs(shadowX) + Math.abs(shadowY)

    el.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.01) translateZ(10px)`
    el.style.boxShadow = `${-shadowX}px ${-shadowY}px ${shadowBlur}px rgb(0 0 0 / 12%)`

    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      frame = requestAnimationFrame(apply)
    } else {
      animating = false
      frame = null
    }
  }

  watch([elementX, elementY, isOutside], () => {
    if (!target.value) return
    if (isOutside.value) {
      targetX = 0
      targetY = 0
    } else {
      targetX = ((elementX.value || 0) / (elementWidth.value || 1)) * 2 - 1
      targetY = ((elementY.value || 0) / (elementHeight.value || 1)) * 2 - 1
    }
    if (!animating) {
      animating = true
      frame = requestAnimationFrame(apply)
    }
  })

  onUnmounted(() => {
    if (frame) cancelAnimationFrame(frame)
  })
}
