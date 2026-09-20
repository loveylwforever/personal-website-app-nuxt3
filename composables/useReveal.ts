export function useReveal(root: Ref<HTMLElement | null>) {
  const route = useRoute()
  let io: IntersectionObserver | null = null

  function scan() {
    io?.disconnect()
    const scope = root.value
    if (!scope) return

    const items = [...scope.querySelectorAll<HTMLElement>('.reveal')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-in'))
      return
    }

    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        io?.unobserve(entry.target)
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    })

    for (const item of items) {
      const rect = item.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 32) {
        requestAnimationFrame(() => item.classList.add('is-in'))
      } else {
        io.observe(item)
      }
    }
  }

  onMounted(scan)
  watch(() => route.fullPath, () => {
    nextTick(() => {
      requestAnimationFrame(scan)
    })
  })
  onUnmounted(() => io?.disconnect())
}
