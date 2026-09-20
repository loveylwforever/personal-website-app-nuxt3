<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

defineProps<{
  label: string
}>()
</script>

<template>
  <label class="app-checkbox">
    <input v-model="model" type="checkbox">
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.app-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
}

.app-checkbox input {
  accent-color: var(--primary-color);
  width: 16px;
  height: 16px;
}
</style>
