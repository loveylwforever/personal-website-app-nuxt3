<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
  options: { label: string; value: string }[]
}>()
</script>

<template>
  <select v-model="model" class="app-select">
    <option v-if="placeholder && !model" disabled value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.app-select {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font: inherit;
}

.app-select:focus {
  outline: none;
  box-shadow: 0 0 0 1px var(--primary-color);
  border-color: var(--primary-color);
}
</style>
