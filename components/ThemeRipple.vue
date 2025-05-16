<template>
  <div
    v-if="show"
    class="theme-ripple"
    :style="rippleStyle"
    @transitionend="onTransitionEnd"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  x: number
  y: number
  color: string
  show: boolean
}>()

const emits = defineEmits(['animationEnd'])

const rippleStyle = ref<Record<string, string>>({})

watch(
  () => props.show,
  (val) => {
    if (val) {
      // 计算最大半径，确保能覆盖全屏
      const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      rippleStyle.value = {
        position: 'fixed',
        left: `${props.x - maxRadius}px`,
        top: `${props.y - maxRadius}px`,
        width: `${maxRadius * 2}px`,
        height: `${maxRadius * 2}px`,
        background: props.color,
        opacity: '0.7',
        transform: 'scale(0)',
        transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.3s',
        'z-index': '9999',
        'pointer-events': 'none',
        'border-radius': '50%'
      }
      // 用 setTimeout 代替 nextTick，确保动画触发
      setTimeout(() => {
        rippleStyle.value = {
          ...rippleStyle.value,
          transform: 'scale(1)'
        }
      }, 0)
    }
  }
)

function onTransitionEnd() {
  emits('animationEnd')
}
</script>

<style scoped>
.theme-ripple {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.7;
}
</style> 