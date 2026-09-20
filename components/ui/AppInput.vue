<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  invalid?: boolean
}>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <label class="app-input" :class="{ 'is-invalid': props.invalid }">
    <span v-if="$slots.prefix" class="app-input__affix">
      <slot name="prefix" />
    </span>
    <input
      ref="inputRef"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <span v-if="$slots.suffix" class="app-input__affix app-input__suffix">
      <slot name="suffix" />
    </span>
  </label>
</template>

<style scoped>
.app-input {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 36px;
  padding: 0 12px;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.app-input:focus-within {
  box-shadow: 0 0 0 1px var(--primary-color);
  border-color: var(--primary-color);
}

.app-input.is-invalid {
  box-shadow: 0 0 0 1px var(--danger);
  border-color: var(--danger);
}

.app-input input {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 8px 0;
}

.app-input input::placeholder {
  color: var(--text-tertiary);
}

.app-input__affix {
  display: inline-flex;
  color: var(--text-secondary);
}

.app-input:focus-within .app-input__affix {
  color: var(--primary-color);
}
</style>
