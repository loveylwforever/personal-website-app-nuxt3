<script setup lang="ts">
const props = withDefaults(defineProps<{
  trigger?: 'click' | 'hover'
}>(), {
  trigger: 'click',
})

const open = ref(false)
const root = ref<HTMLElement | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

onClickOutside(root, () => {
  open.value = false
})

function clearHover() {
  if (hoverTimer) clearTimeout(hoverTimer)
  hoverTimer = null
}

function onEnter() {
  if (props.trigger !== 'hover') return
  clearHover()
  open.value = true
}

function onLeave() {
  if (props.trigger !== 'hover') return
  clearHover()
  hoverTimer = setTimeout(() => {
    open.value = false
  }, 120)
}

function toggle() {
  if (props.trigger === 'click') open.value = !open.value
}

function close() {
  open.value = false
}

onUnmounted(clearHover)

defineExpose({ close })
</script>

<template>
  <div
    ref="root"
    class="app-dropdown"
    :class="{ 'is-open': open }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="app-dropdown__trigger" @click="toggle">
      <slot name="trigger" :open="open" />
    </div>
    <div v-if="open" class="app-dropdown__menu" role="menu" @click="close">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-dropdown {
  position: relative;
  display: inline-flex;
}

.app-dropdown__trigger {
  display: inline-flex;
}

.app-dropdown__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: max-content;
  min-width: max(100%, 13rem);
  padding: 6px;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lift);
}

.app-dropdown__menu :deep(a),
.app-dropdown__menu :deep(button) {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  min-height: 38px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}

.app-dropdown__menu :deep(a::after),
.app-dropdown__menu :deep(button::after) {
  content: none !important;
  display: none !important;
}

.app-dropdown__menu :deep(a:hover),
.app-dropdown__menu :deep(button:hover),
.app-dropdown__menu :deep(a.router-link-active) {
  background: var(--hover-bg);
  color: var(--text-color);
  box-shadow: none;
}
</style>
