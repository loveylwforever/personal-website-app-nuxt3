// @ts-ignore
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const darkMode = ref(true)
  const language = ref<'zh-CN' | 'en-US'>('zh-CN')
  const isInitialized = ref(false)

  function initialize() {
    // 确保在客户端环境
    if (typeof window === 'undefined') return

    try {
      // 检查本地存储中的主题设置
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode !== null) {
        darkMode.value = savedDarkMode === 'true'
      } else {
        // 默认跟随系统
        darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      // 检查本地存储中的语言设置
      const savedLanguage = localStorage.getItem('language') as 'zh-CN' | 'en-US' | null
      if (savedLanguage && ['zh-CN', 'en-US'].includes(savedLanguage)) {
        language.value = savedLanguage
      } else {
        // 默认使用浏览器语言
        const browserLang = navigator.language
        language.value = browserLang.startsWith('zh') ? 'zh-CN' : 'en-US'
      }
      
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to initialize app store:', error)
    }
  }
  
  function toggleDarkMode() {
    if (typeof window === 'undefined') return
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', String(darkMode.value))
  }
  
  function setLanguage(lang: 'zh-CN' | 'en-US') {
    if (typeof window === 'undefined') return
    language.value = lang
    localStorage.setItem('language', lang)
  }

  return {
    darkMode,
    language,
    isInitialized,
    initialize,
    toggleDarkMode,
    setLanguage
  }
})