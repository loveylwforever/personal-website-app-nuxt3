import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

  function toggleTheme() {
    isDark.value = !isDark.value
    updateDOM()
  }

  function updateDOM() {
    // 更新 HTML 的 class
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark.value)
      document.documentElement.classList.toggle('light', !isDark.value)
      
      // 设置 meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark.value ? '#1e1438' : '#f3e7ff')
      }
    }
    
    // 保存到 localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      
      // 与 @vueuse/core useColorMode 兼容
      localStorage.setItem('vueuse-color-scheme', isDark.value ? 'dark' : 'light')
    }
  }

  function initTheme() {
    if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
      // 从 localStorage 获取主题设置
      const savedTheme = localStorage.getItem('theme')
      
      // 如果存在 vueuse 主题设置，也读取它以便兼容
      const vueuseTheme = localStorage.getItem('vueuse-color-scheme')
      
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else if (vueuseTheme) {
        // 兼容 @vueuse/core useColorMode
        isDark.value = vueuseTheme === 'dark'
      } else {
        // 如果没有保存的主题，则使用系统主题
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      // 初始化 DOM
      updateDOM()
      
      // 监听系统主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        // 只有在用户没有手动设置主题时才跟随系统
        if (!localStorage.getItem('theme') && !localStorage.getItem('vueuse-color-scheme')) {
          isDark.value = e.matches
          updateDOM()
        }
      })
    }
  }

  return {
    isDark,
    currentTheme,
    toggleTheme,
    initTheme,
    updateDOM
  }
}) 