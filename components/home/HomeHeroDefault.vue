<script setup lang="ts">
import Brower from '~/assets/icons/brower.vue'

defineProps<{
  chars: string[]
  visible: boolean[]
  platformLabel: string
}>()

const emit = defineEmits<{
  download: [value: string]
  web: []
  more: []
}>()

const desktopItems = [
  { label: 'Apple Silicon 版本', value: 'macos' },
  { label: 'Intel 版本', value: 'macos-intel' },
]
</script>

<template>
  <main class="hero-default">
    <div class="container hero-default__grid">
      <div class="hero-default__copy">
        <h1>
          <HomeTypewriter :chars="chars" :visible="visible" />
        </h1>
        <h2>一个轻量的某某软件</h2>
        <p>
          一款基于 <strong>Tauri2</strong> 和 <strong>Nuxt3</strong>
          构建的轻量级 (约 8 MB) 多平台应用，配备 AI（如 <strong>DeepSeek</strong>、讯飞星火）、
          <strong>WebRTC</strong> 音视频通话，屏幕共享等。
        </p>
        <div class="hero-default__actions">
          <HomeDownloadMenu
            :label="platformLabel"
            :items="desktopItems"
            @select="emit('download', $event)"
          />
          <AppButton variant="ghost" class="web-btn" @click="emit('web')">
            <Brower />
            Web 端体验
          </AppButton>
        </div>
        <button type="button" class="more-link" @click="emit('more')">其他版本下载</button>
      </div>
      <div class="hero-default__media">
        <HomeScreenshot />
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-default {
  padding: var(--page-y) 0;
}

.hero-default__grid {
  display: flex;
  align-items: center;
  gap: 48px;
}

.hero-default__copy {
  flex: 1;
  min-width: 0;
}

.hero-default h1 {
  margin: 0 0 24px;
  min-height: 80px;
  font-size: 56px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1.1;
}

.hero-default h2 {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 500;
}

.hero-default p {
  max-width: 600px;
  margin: 0 0 32px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.hero-default strong {
  color: var(--primary-color);
  font-weight: 500;
}

.hero-default__actions {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}


.more-link {
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-secondary);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.more-link:hover {
  color: var(--text-color);
}

.hero-default__media {
  flex: 1;
  min-width: 0;
}

.hero-default__media :deep(.home-screenshot) {
  width: 80%;
  max-width: 480px;
  margin-left: auto;
}

@media (max-width: 768px) {
  .hero-default__grid {
    flex-direction: column;
    gap: 24px;
  }

  .hero-default h1 {
    font-size: 42px;
    text-align: center;
  }

  .hero-default h2,
  .hero-default p,
  .more-link {
    width: 100%;
    text-align: center;
  }

  .hero-default__actions {
    flex-direction: column;
    width: 100%;
  }

  .web-btn {
    width: 100%;
  }

  .hero-default__media :deep(.home-screenshot) {
    width: 100%;
    max-width: none;
    margin: 0;
  }
}
</style>
