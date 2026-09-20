<script setup lang="ts">
const open = defineModel<boolean>({ default: false })

defineProps<{
  title?: string
  width?: string
}>()

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close()
}

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="app-dialog-mask" @click.self="close">
      <div class="app-dialog" :style="width ? { width } : undefined" role="dialog" aria-modal="true">
        <header class="app-dialog__header">
          <h2>{{ title }}</h2>
          <button class="app-dialog__close" type="button" aria-label="关闭" @click="close">
            <AppIcon name="close" :size="16" />
          </button>
        </header>
        <div class="app-dialog__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.app-dialog-mask {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 16px 16px;
  background: rgb(0 0 0 / 45%);
  backdrop-filter: blur(6px);
}

.app-dialog {
  width: min(600px, 100%);
  border-radius: var(--radius-lg);
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lift);
}

.app-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.app-dialog__header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.app-dialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}

.app-dialog__close:hover {
  color: var(--primary-color);
}

.app-dialog__body {
  padding: 24px;
}

@media (max-width: 768px) {
  .app-dialog-mask {
    padding-top: 8vh;
  }

  .app-dialog__header,
  .app-dialog__body {
    padding: 16px;
  }
}
</style>
