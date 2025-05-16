<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-title">{{ error?.statusCode === 404 ? '页面未找到' : '出错了' }}</h1>
      <p class="error-message">{{ error?.message || '抱歉，发生了一些错误' }}</p>
      <el-button type="primary" @click="handleError">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError()
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: var(--background-color);
}

.error-content {
  max-width: 600px;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.error-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error-message {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}
</style> 