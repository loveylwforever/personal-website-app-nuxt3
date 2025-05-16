declare module '~/stores/app' {
  import { Ref } from 'vue'
  
  export function useAppStore(): {
    darkMode: Ref<boolean>
    language: Ref<'zh-CN' | 'en-US'>
    isInitialized: Ref<boolean>
    initialize: () => void
    toggleDarkMode: () => void
    setLanguage: (lang: 'zh-CN' | 'en-US') => void
  }
} 