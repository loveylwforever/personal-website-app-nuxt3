<script setup lang="ts">
const root = ref<HTMLElement | null>(null)

useScreenshotTilt(root)
</script>

<template>
  <div ref="root" class="home-screenshot">
    <div class="home-screenshot__fallback">
      <AppIcon name="image" :size="48" />
      <p>示例截图</p>
    </div>
  </div>
</template>

<style scoped>
.home-screenshot {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-lift);
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
}

.home-screenshot__fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  color: var(--text-secondary);
  gap: 12px;
}
</style>
