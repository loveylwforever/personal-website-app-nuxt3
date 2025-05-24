<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly v-if="isDev">
    <StagewiseToolbar :config="stagewiseConfig" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { useFontStore } from '~/stores/font'
import { StagewiseToolbar } from '@stagewise/toolbar-vue'

const stagewiseConfig = { plugins: [] }
const isDev = process.env.NODE_ENV === 'development'

// 在应用启动时初始化主题和字体
onMounted(() => {
  const themeStore = useThemeStore()
  themeStore.initTheme()
  
  const fontStore = useFontStore()
  fontStore.initFont()
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