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

const items = [
  { label: 'Windows', value: 'windows' },
  { label: 'macOS', value: 'macos' },
  { label: 'Linux', value: 'linux' },
]
</script>

<template>
  <div class="hero-centered">
    <div class="container">
      <div class="hero-centered__copy hero-rise">
        <h1>
          <HomeTypewriter :chars="chars" :visible="visible" />
        </h1>
        <p class="lead">一个轻量的某某软件</p>
        <p class="desc">
          一款基于 Tauri2 和 Nuxt3 构建的轻量级（约 8 MB）客户端即时通讯应用，配合 AI 群聊机器人（如 DeepSeek、讯飞星火）、WebRTC 音视频通话，屏幕共享和 AI 视频物服。
        </p>
        <div class="hero-centered__actions">
          <HomeDownloadMenu
            :label="platformLabel"
            :items="items"
            @select="emit('download', $event)"
          />
          <AppButton variant="ghost" class="web-btn" @click="emit('web')">
            <Brower />
            Web 端体验
          </AppButton>
        </div>
        <button type="button" class="more-link" @click="emit('more')">其他版本下载</button>
      </div>
      <div class="hero-centered__media hero-rise-late">
        <HomeScreenshot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-centered {
  padding: var(--page-y) 0 0;
}

.hero-centered__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.hero-centered h1 {
  margin: 0 0 16px;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.lead {
  margin: 0 0 24px;
  font-size: 24px;
}

.desc {
  max-width: 600px;
  margin: 0 0 32px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.hero-centered__actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}


.more-link {
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-tertiary);
  font: inherit;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}

.hero-centered__media {
  width: 100%;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .hero-centered h1 {
    font-size: 36px;
  }

  .lead {
    font-size: 20px;
  }

  .desc {
    font-size: 14px;
  }

  .hero-centered__actions {
    flex-direction: column;
    width: 100%;
  }

  .web-btn {
    width: 100%;
  }
}
</style>
