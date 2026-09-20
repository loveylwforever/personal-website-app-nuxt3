<template>
  <div class="default-layout">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100dvh;
  background: var(--bg-color);
  color: var(--text-color);
}
</style>
