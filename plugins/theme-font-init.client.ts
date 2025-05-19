import { useFontStore } from '~/stores/font'

// 主题和字体初始化插件
export default defineNuxtPlugin({
  name: 'theme-font-init',
  enforce: 'pre',
  setup() {
    // 在页面渲染前注入初始化脚本
    useHead({
      script: [
        {
          innerHTML: `
            (function() {
              // 初始化主题
              const savedTheme = localStorage.getItem('theme') || localStorage.getItem('vueuse-color-scheme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
              
              // 立即应用主题类
              document.documentElement.classList.toggle('dark', isDark);
              document.documentElement.classList.toggle('light', !isDark);
              
              // 设置主题颜色
              const metaTheme = document.createElement('meta');
              metaTheme.name = 'theme-color';
              metaTheme.content = isDark ? '#1e1438' : '#f3e7ff';
              document.head.appendChild(metaTheme);
            })();
          `,
          type: 'text/javascript',
        },
      ],
    });

    // 只在客户端执行字体初始化
    if (process.client) {
      try {
        const fontStore = useFontStore()
        // 初始化字体设置
        fontStore.initFont()
      } catch (error) {
        // console.error('初始化字体设置时出错:', error)
      }
    }
  },
})