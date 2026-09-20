<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 体验'
})

const router = useRouter()

function handleDownload() {
  router.push('/start')
}

function handleLearnMore() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">在线体验</h1>
      <p class="page-subtitle">无需下载，立即体验某某软件的强大功能</p>

      <div class="demo-section">
        <div class="demo-container page-card">
          <div class="demo-header">
            <div class="demo-controls">
              <div class="control red"></div>
              <div class="control yellow"></div>
              <div class="control green"></div>
            </div>
            <div class="demo-title">某某软件 Web 版</div>
          </div>
          <div class="demo-content">
            <div class="demo-fallback">
              <AppIcon name="monitor" :size="40" />
              <p>Web 体验即将开放</p>
            </div>
          </div>
        </div>

        <div class="features-list">
          <div class="feature-item page-card">
            <AppIcon name="chat" class="feature-icon" :size="24" />
            <div>
              <h3>即时通讯</h3>
              <p>体验流畅的一对一某某和群聊功能，支持文字、图片、文件等多种消息类型</p>
            </div>
          </div>
          <div class="feature-item page-card">
            <AppIcon name="robot" class="feature-icon" :size="24" />
            <div>
              <h3>AI 助手</h3>
              <p>尝试与智能 AI 助手对话，体验 DeepSeek、讯飞星火等大模型的强大能力</p>
            </div>
          </div>
          <div class="feature-item page-card">
            <AppIcon name="video" class="feature-icon" :size="24" />
            <div>
              <h3>音视频通话</h3>
              <p>测试高清视频通话和语音通话功能，体验流畅的实时通讯体验</p>
            </div>
          </div>
          <div class="feature-item page-card">
            <AppIcon name="monitor" class="feature-icon" :size="24" />
            <div>
              <h3>屏幕共享</h3>
              <p>一键开启屏幕共享，支持全屏或应用窗口共享，适合远程协作</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section page-card">
        <h2 class="page-section-title">准备好了吗？</h2>
        <p>下载桌面客户端，享受更完整的功能体验</p>
        <div class="cta-buttons">
          <AppButton @click="handleDownload">
            <AppIcon name="download" :size="16" />
            下载客户端
          </AppButton>
          <AppButton variant="ghost" @click="handleLearnMore">
            <AppIcon name="info" :size="16" />
            了解更多
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 64px;
}

.demo-container {
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--header-bg);
}

.demo-controls {
  display: flex;
  gap: 8px;
  margin-right: 16px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red { background: #ff5f57; }
.control.yellow { background: #febc2e; }
.control.green { background: #28c840; }

.demo-title {
  color: var(--text-color);
  font-size: 14px;
}

.demo-content {
  position: relative;
  height: 600px;
}

.demo-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: var(--text-secondary);
}

.demo-fallback p {
  margin: 0;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  gap: 16px;
  padding: 24px;
}

.feature-icon {
  color: var(--primary-color);
}

.feature-item h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.feature-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.cta-section {
  padding: 48px var(--page-gutter);
  text-align: center;
}

.cta-section .page-section-title {
  margin-bottom: 16px;
}

.cta-section p {
  margin: 0 0 32px;
  color: var(--text-secondary);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}


@media (max-width: 992px) {
  .demo-section {
    grid-template-columns: 1fr;
  }

  .demo-content {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .demo-content {
    height: 300px;
  }

  .cta-buttons :deep(.app-btn) {
    width: 100%;
  }
}
</style>
