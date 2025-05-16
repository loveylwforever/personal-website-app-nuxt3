import { useFontStore } from '~/stores/font'

export default defineNuxtPlugin({
  name: 'font-plugin',
  enforce: 'default',
  async setup() {
    // 只在客户端执行字体初始化
    if (process.client) {
      try {
        // 使用setTimeout确保Vue应用和Pinia都已经初始化
        await new Promise(resolve => setTimeout(resolve, 0))
        
        const fontStore = useFontStore()
        
        // 等待DOM加载完成后应用字体
        await new Promise<void>(resolve => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => resolve())
          } else {
            resolve()
          }
        })
        
        // 初始化字体设置
        fontStore.initFont()
      } catch (error) {
        console.error('初始化字体设置时出错:', error)
      }
    }
  }
}) 