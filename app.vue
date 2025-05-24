<template>
  <ClientOnly>
    <GlobalLoading v-if="!isAppReady" />
  </ClientOnly>
  <template v-if="isAppReady">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly v-if="isDev">
      <StagewiseToolbar :config="stagewiseConfig" />
    </ClientOnly>
    <div v-if="!route.path.startsWith('/forum')">
      <div class="announcement-banner">
        <!-- ...原有内容... -->
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { useFontStore } from '~/stores/font'
import { StagewiseToolbar } from '@stagewise/toolbar-vue'
import GlobalLoading from '~/components/GlobalLoading.vue'
import { useRoute } from 'vue-router'

const stagewiseConfig = { plugins: [] }
const isDev = process.env.NODE_ENV === 'development'
const isAppReady = ref(false)
const route = useRoute()

onMounted(async () => {
  const themeStore = useThemeStore()
  const fontStore = useFontStore()
  await Promise.all([
    themeStore.initTheme(),
    fontStore.initFont(),
  ])
  isAppReady.value = true
})

// 字体测试面板
const showFontTest = ref(false)
const toggleFontTest = () => {
  showFontTest.value = !showFontTest.value
  const testPanel = document.getElementById('font-test')
  if (testPanel) {
    testPanel.style.display = showFontTest.value ? 'block' : 'none'
  }
}
</script>

<style lang="scss">
@use '~/assets/scss/theme';

.app {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}

// 全局过渡效果
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>