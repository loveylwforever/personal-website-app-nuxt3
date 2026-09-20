<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
})
</script>

<template>
  <button
    :type="type"
    class="app-btn"
    :class="[`app-btn--${variant}`, { 'is-loading': loading }]"
    :disabled="disabled || loading"
  >
    <AppIcon v-if="loading" name="loading" :size="16" />
    <slot />
  </button>
</template>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  border: 1px solid transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  border-radius: var(--radius-md);
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) ease,
    background-color var(--duration-fast) ease,
    color var(--duration-fast) ease;
}

.app-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-btn--primary,
.app-btn--secondary,
.app-btn--ghost {
  min-height: 44px;
  padding: 0 16px;
}

.app-btn--primary :deep(svg),
.app-btn--secondary :deep(svg),
.app-btn--ghost :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.app-btn--primary {
  background: var(--primary-color);
  color: var(--on-primary);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.app-btn--primary:hover:not(:disabled) {
  box-shadow: 0 0 0 1px var(--ring);
}

@media (hover: hover) and (pointer: fine) {
  .app-btn--primary:hover:not(:disabled),
  .app-btn--ghost:hover:not(:disabled) {
    transform: translateY(-1px);
  }
}

.app-btn--secondary {
  background: var(--bg-darker);
  color: var(--text-color);
  box-shadow: 0 0 0 1px var(--border-color);
}

.app-btn--ghost {
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
  color: var(--text-color);
  border-color: var(--border-color);
}

.app-btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.app-btn--icon:hover:not(:disabled) {
  color: var(--text-color);
  box-shadow: 0 0 0 1px var(--ring);
  border-color: var(--ring);
}

.app-btn:not(:disabled):active {
  transform: translateY(1px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .app-btn--primary:hover:not(:disabled),
  .app-btn--ghost:hover:not(:disabled) {
    transform: none;
  }
}
</style>
