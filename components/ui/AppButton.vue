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
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.app-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-btn:not(:disabled):active {
  transform: translateY(1px) scale(0.98);
}

.app-btn--primary,
.app-btn--secondary,
.app-btn--ghost {
  min-height: 44px;
  padding: 0 16px;
}

.app-btn--primary {
  background: var(--primary-color);
  color: var(--on-primary);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.app-btn--primary:hover:not(:disabled) {
  box-shadow: 0 0 0 1px var(--ring);
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
</style>
