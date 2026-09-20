export default defineNuxtPlugin(() => {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  document.documentElement.classList.toggle('touch', isTouch)
  document.documentElement.classList.toggle('no-touch', !isTouch)
})
