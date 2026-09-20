<template>
  <div ref="root" class="default-layout">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<style scoped>
.default-layout {
  min-height: 100dvh;
  background: var(--bg-color);
  color: var(--text-color);
}
</style>
