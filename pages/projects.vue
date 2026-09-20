<script setup lang="ts">
import type { IconName } from '~/types/icons'

definePageMeta({
  layout: 'default',
  title: '某某软件 - 项目'
})

const projects = [
  {
    id: 'circle',
    title: '某某圈',
    badge: '社区',
    description: '一个面向开发者和用户的社区平台，分享使用心得，交流技术经验，共同成长。',
    action: '访问社区',
    features: [
      { icon: 'user' as IconName, text: '活跃用户 10K+' },
      { icon: 'document' as IconName, text: '技术文章 1K+' },
      { icon: 'chat' as IconName, text: '每日互动 5K+' },
    ],
  },
  {
    id: 'tauri',
    title: '某某软件（Tauri）',
    badge: '桌面端',
    description: '基于 Tauri2 构建的轻量级桌面客户端，为 Windows、macOS 和 Linux 用户提供原生体验。',
    action: '了解更多',
    features: [
      { icon: 'download' as IconName, text: '安装包 ~8MB' },
      { icon: 'monitor' as IconName, text: '跨平台支持' },
      { icon: 'lightning' as IconName, text: '极速启动' },
    ],
  },
  {
    id: 'electron',
    title: '某某软件（Electron）',
    badge: '桌面端',
    description: '基于 Electron 构建的功能完整版桌面客户端，提供更丰富的系统集成能力。',
    action: '了解更多',
    features: [
      { icon: 'connection' as IconName, text: '系统集成' },
      { icon: 'bell' as IconName, text: '通知中心' },
      { icon: 'cpu' as IconName, text: '硬件加速' },
    ],
  },
  {
    id: 'admin',
    title: '某某后台系统',
    badge: '管理端',
    description: '强大的后台管理系统，提供用户管理、数据分析、系统配置等完整的管理功能。',
    action: '了解更多',
    features: [
      { icon: 'settings' as IconName, text: '系统配置' },
      { icon: 'chart' as IconName, text: '数据分析' },
      { icon: 'lock' as IconName, text: '权限管理' },
    ],
  },
]

function visitProject(id: string) {
  const routes: Record<string, string> = {
    circle: '/forum',
    tauri: '/start',
    electron: '/start',
    admin: '/projects',
  }
  if (routes[id]) navigateTo(routes[id])
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">项目</h1>
      <p class="page-subtitle">探索某某生态的其他优秀项目</p>
      
      <div class="projects-grid">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          class="project-card lift-card reveal"
          :style="{ '--reveal-delay': `${i * 50}ms` }"
        >
          <div class="project-header">
            <h3>{{ project.title }}</h3>
            <div class="project-badge">{{ project.badge }}</div>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-features">
            <div v-for="feature in project.features" :key="feature.text" class="feature">
              <AppIcon :name="feature.icon" :size="16" />
              {{ feature.text }}
            </div>
          </div>
          <AppButton class="project-btn" @click="visitProject(project.id)">
            {{ project.action }}
          </AppButton>
        </article>
      </div>
      
      <div class="ecosystem-section lift-card reveal" style="--reveal-delay: 80ms">
        <h2 class="page-section-title">生态系统</h2>
        <p>我们正在构建一个完整的即时通讯生态系统，欢迎加入我们</p>
        <div class="ecosystem-stats">
          <div class="stat-item">
            <div class="stat-value">4+</div>
            <div class="stat-label">核心项目</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10K+</div>
            <div class="stat-label">活跃用户</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100+</div>
            <div class="stat-label">开源贡献者</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">1K+</div>
            <div class="stat-label">GitHub Stars</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.project-header h3 {
  margin: 0;
  font-size: 20px;
}

.project-badge {
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  background: var(--primary-color);
  color: var(--on-primary);
  font-size: 12px;
}

.project-description {
  margin-bottom: 16px;
  color: var(--text-secondary);
}

.project-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
}

.feature :deep(.app-icon) {
  color: var(--primary-color);
}

.project-btn {
  width: 100%;
  margin-top: auto;
}

.ecosystem-section {
  padding: 48px var(--page-gutter);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
  text-align: center;
}

.ecosystem-section .page-section-title {
  margin-bottom: 16px;
}

.ecosystem-section > p {
  margin: 0 0 48px;
  color: var(--text-secondary);
}

.ecosystem-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.stat-value {
  margin-bottom: 8px;
  color: var(--primary-color);
  font-size: 36px;
  font-weight: 700;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 14px;
}

</style>
