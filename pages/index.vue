<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 首页'
})

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
const { chars, visible } = useTypewriter('某某软件')
const { platformDisplay, download } = useDownload()
const showOtherDownloads = ref(false)
const isAlternative = computed(() => layoutStore.layout === 'alternative')

function openWeb() {
  navigateTo('/experience')
}
</script>

<template>
  <div class="home-page" :class="{ 'is-centered': isAlternative }">
    <AnnouncementBanner />
    <HomeHeroCentered
      v-if="isAlternative"
      :chars="chars"
      :visible="visible"
      :platform-label="platformDisplay"
      @download="download"
      @web="openWeb"
      @more="showOtherDownloads = true"
    />
    <template v-else>
      <HomeHeroDefault
        :chars="chars"
        :visible="visible"
        :platform-label="platformDisplay"
        @download="download"
        @web="openWeb"
        @more="showOtherDownloads = true"
      />
      <HomeFeatures />
    </template>
    <HomeDownloadDialog v-model="showOtherDownloads" />
    <ClientOnly>
      <Three3DParticles :theme="themeStore.currentTheme" class="particles-background" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  isolation: isolate;
  min-height: 100dvh;
}

.particles-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100vw;
  height: 100dvh;
  pointer-events: none;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .particles-background {
    opacity: 0.6;
  }
}
</style>
