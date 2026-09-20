<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 更新日志'
})

const releases = [
  {
    version: 'v0.0.0',
    date: '2024年3月15日',
    latest: true,
    groups: [
      { title: '新功能', items: ['支持 WebRTC 音视频通话功能', '新增屏幕共享功能', '集成 AI 助手支持（DeepSeek、讯飞星火）'] },
      { title: '问题修复', items: ['修复移动端显示异常问题', '修复消息发送失败时的错误提示', '修复在线状态同步延迟问题'] },
      { title: '性能优化', items: ['优化图片加载速度', '减少首次加载时间', '优化移动端网络性能'] },
    ],
  },
  {
    version: 'v0.0.0-beta.2',
    date: '2024年3月1日',
    groups: [
      { title: '新功能', items: ['新增文件传输功能', '支持消息撤回', '新增用户个人资料设置'] },
      { title: '界面优化', items: ['优化深色模式配色', '改进移动端适配', '新增过渡动画效果'] },
    ],
  },
  {
    version: 'v0.0.0-beta.1',
    date: '2024年2月15日',
    groups: [
      { title: '首次发布', items: ['基础某某功能', '用户认证系统', '多平台支持', '基础 UI 界面'] },
    ],
  },
]
</script>

<template>
  <div class="page">
    <div class="container container--narrow">
      <h1 class="page-title">更新日志</h1>
      <p class="page-subtitle">记录每一次进步与改变</p>

      <div class="timeline">
        <article
          v-for="release in releases"
          :key="release.version"
          class="timeline-row"
        >
          <div class="timeline-dot" :class="{ latest: release.latest }" />
          <div class="changelog-card page-card" :class="{ latest: release.latest }">
            <header class="card-header">
              <span v-if="release.latest" class="version-tag">最新版本</span>
              <h2>{{ release.version }}</h2>
              <time>{{ release.date }}</time>
            </header>
            <div v-for="group in release.groups" :key="group.title" class="change-category">
              <h3>{{ group.title }}</h3>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px;
  width: 2px;
  border-radius: 2px;
  background: var(--border-color);
}

.timeline-row {
  position: relative;
  margin-bottom: 32px;
}

.timeline-row:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  top: 28px;
  left: 2px;
  z-index: 1;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  background: var(--card-bg);
}

.timeline-dot.latest {
  background: var(--primary-color);
}

.changelog-card {
  margin-left: 36px;
  padding: 24px 28px;
}

.changelog-card.latest {
  border-color: color-mix(in srgb, var(--primary-color) 40%, var(--border-color));
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.version-tag {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 22%, var(--border-color));
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 500;
}

.card-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.card-header time {
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 14px;
}

.change-category + .change-category {
  margin-top: 16px;
}

.change-category h3 {
  margin: 0 0 8px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
}

.change-category ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.change-category li {
  position: relative;
  margin-bottom: 6px;
  padding-left: 16px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.change-category li::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.55;
}

@media (max-width: 768px) {
  .changelog-card {
    margin-left: 28px;
    padding: 16px;
  }

  .card-header h2 {
    font-size: 18px;
  }

  .card-header time {
    width: 100%;
    margin-left: 0;
  }
}
</style>
