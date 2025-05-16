<template>
  <div
    v-if="show"
    class="theme-ripple-mask"
    :class="themeClass"
    :style="maskStyle"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  x: number
  y: number
  themeClass: string // 'dark' or 'light'
}>()
const emits = defineEmits(['animationEnd'])

const radius = ref(0)
const maskStyle = computed(() => ({
  '--ripple-x': props.x + 'px',
  '--ripple-y': props.y + 'px',
  '--ripple-radius': radius.value + 'px',
  transition: 'clip-path 0.6s cubic-bezier(.4,0,.2,1)'
}))

watch(() => props.show, (val) => {
  if (val) {
    // 计算最大半径
    const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
    radius.value = 0
    setTimeout(() => {
      radius.value = maxRadius
    }, 10)
  }
})

function onTransitionEnd(e: TransitionEvent) {
  if (e.propertyName === 'clip-path') {
    emits('animationEnd')
  }
}
</script>

<style scoped>
.theme-ripple-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  clip-path: circle(var(--ripple-radius, 0px) at var(--ripple-x, 50vw) var(--ripple-y, 50vh));
  will-change: clip-path;
  background: var(--bg-color);
}
</style> 