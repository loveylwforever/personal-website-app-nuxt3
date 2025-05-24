<template>
  <div v-if="visible" class="global-loading">
    <el-icon class="loading-icon"><Loading /></el-icon>
    <span class="loading-text">正在加载，请稍候...</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '@element-plus/icons-vue'

const visible = ref(true)

defineExpose({ visible })
</script>

<style scoped>
.global-loading {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(255,255,255,0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}
.dark .global-loading {
  background: rgba(18,18,18,0.92);
}
.loading-icon {
  font-size: 48px;
  color: var(--gradient-start);
  animation: spin 1s linear infinite;
}
.loading-text {
  margin-top: 18px;
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style> 