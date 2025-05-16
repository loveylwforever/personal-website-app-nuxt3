<template>
  <div class="default-layout">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  background: var(--bg-color);
  position: relative;
}
</style>
