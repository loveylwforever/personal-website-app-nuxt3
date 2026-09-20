<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-title">{{ error?.statusCode === 404 ? '页面未找到' : '出错了' }}</h1>
      <p class="error-message">{{ error?.message || '抱歉，发生了一些错误' }}</p>
      <AppButton class="warm-cta" @click="handleError">返回首页</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error?: { statusCode?: number; message?: string }
}>()

function handleError() {
  clearError()
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-color);
  color: var(--text-color);
  text-align: center;
}

.error-content {
  max-width: var(--page-narrow);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
}

.error-title {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.error-message {
  margin-bottom: 2rem;
  color: var(--text-secondary);
}
</style>
