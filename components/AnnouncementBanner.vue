<template>
  <div class="announcement-banner">
    <div class="update-tag" @click="openChangelog">
      <span class="version">✨ 0.0.0</span>
      <span class="divider">|</span>
      <span class="message">修复问题，优化用户体验，体验更流畅！🚀</span>
      <div class="action">
        <span class="view-changelog">查看更新日志</span>
        <el-icon class="arrow-icon"><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function openChangelog() {
  router.push('/changelog')
}
</script>

<style scoped>
.announcement-banner {
  position: relative;
  padding: 66px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(10px);
}
.update-tag {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid rgba(234, 179, 8, 0.3);
  background: rgba(234, 179, 8, 0.05);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  max-width: 800px;
  margin: 0 auto;
}
.update-tag:hover {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.5);
  transform: translateY(-1px);
}
.version {
  color: #EAB308;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}
.divider {
  color: rgba(234, 179, 8, 0.4);
  margin: 0 4px;
  flex-shrink: 0;
}
.message {
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
  text-align: left;
}
.action {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
  flex-shrink: 0;
}
.view-changelog {
  color: rgba(234, 179, 8, 0.8);
  font-size: 12px;
  white-space: nowrap;
}
.arrow-icon {
  font-size: 12px;
  color: rgba(234, 179, 8, 0.8);
  transition: transform 0.2s ease;
}
</style> 