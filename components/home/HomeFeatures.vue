<script setup lang="ts">
const features = [
  { title: '多平台轻量架构', body: '基于 Tauri2 + Nuxt3 构建，安装包仅约 8MB，支持 Android、Windows、macOS、Linux 和 Web。' },
  { title: '智能消息中枢', body: '基于 WebSocket，支持图片、视频、文件、语音、@用户等消息推拉，覆盖完整交互。' },
  { title: 'AI 增强通信', body: '集成 DeepSeek、讯飞星火、Kimi 等大模型，支持群聊助手和智能客服。' },
  { title: '实时互动系统', body: '基于 WebRTC 的语音视频通话、屏幕共享，支持设备监测和切换。' },
  { title: '个性化体验', body: '全局深色模式、自定义通知音效、下载路径和界面主题都可以自己调。' },
  { title: '可扩展', body: '预留插件机制，后续支持开发、安装、更新和卸载。' },
]
</script>

<template>
  <section class="home-features">
    <div class="container">
      <h2 class="page-section-title">功能特点</h2>
      <div class="home-features__grid">
        <article
          v-for="item in features"
          :key="item.title"
          class="feature-card lift-card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-features {
  padding: var(--page-y) 0;
}

.home-features .page-section-title {
  margin-bottom: 40px;
}

.home-features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 32px 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
}

.feature-card h3 {
  margin: 0 0 12px;
  font-size: 20px;
}

.feature-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .home-features h2 {
    font-size: 28px;
    margin-bottom: 32px;
  }

  .home-features__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
