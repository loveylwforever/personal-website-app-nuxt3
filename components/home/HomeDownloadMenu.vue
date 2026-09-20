<script setup lang="ts">
import Download from '~/assets/icons/download.vue'

defineProps<{
  label: string
  items: { label: string; value: string }[]
}>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>

<template>
  <AppDropdown class="home-download-menu">
    <template #trigger>
      <AppButton class="download-trigger">
        <Download />
        {{ label }}
        <AppIcon name="arrow-down" :size="14" />
      </AppButton>
    </template>
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      @click="emit('select', item.value)"
    >
      <AppIcon name="monitor" :size="16" />
      {{ item.label }}
    </button>
  </AppDropdown>
</template>

<style scoped>
.download-trigger {
  background: var(--text-color);
  color: var(--bg-color);
  box-shadow: var(--shadow-whisper);
}

.download-trigger :deep(.download-icon) {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .home-download-menu,
  .download-trigger {
    width: 100%;
  }
}
</style>
