import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  css: [
    '@/assets/scss/theme.scss',
    '@/assets/scss/global.scss',
    '@/assets/scss/fonts.scss',
    'element-plus/dist/index.css',
    '@/assets/scss/element-theme.scss',
    '@/assets/scss/element-overrides.scss'
  ],
  app: {
    head: {
      title: '极物聊天 - 一个轻量的聊天软件',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: '一款基于 TruthAI 和 NextJS 构建的轻量级全平台即时通讯应用' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', href: '/fonts/main-font.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
      ]
    },
    pageTransition: {
      name: 'page'
    }
  },
  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
    components: ['ElButton', 'ElIcon', 'ElDropdown', 'ElDropdownMenu', 'ElDropdownItem', 'ElInput', 'ElMessage']
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-mode',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 将element-plus相关组件打包到一起
            if (id.includes('node_modules/element-plus') || id.includes('@element-plus')) {
              return 'element-plus';
            }
            // 将三方库单独分包
            if (id.includes('node_modules')) {
              const name = id.toString().split('node_modules/')[1].split('/')[0].toString();
              // 有些包可能很小，不需要单独拆分
              if (['vue', 'vue-router', 'pinia', '@vueuse'].includes(name)) {
                return name;
              }
              return 'vendor';
            }
            // 将components目录下的文件按目录分包
            if (id.includes('/components/home/')) {
              return 'home-components';
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'element-plus',
        '@element-plus/icons-vue',
        'pinia',
        'lodash-unified',
        '@popperjs/core',
        'dayjs',
        'async-validator',
        '@vue/shared',
        '@vueuse/shared',
        '@floating-ui/dom',
        'escape-html',
        'normalize-wheel-es'
      ]
    }
  },
  runtimeConfig: {
    public: {
      homeLayout: '',
      siteName: '',
    }
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    minify: true,
    routeRules: {
      // 缓存静态资源
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    }
  },
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    componentIslands: true, // 开启组件懒加载
    asyncContext: true // 改进的异步加载
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: true
  },
  build: {
    transpile: ['element-plus/es', 'pinia']
  },
  compatibilityDate: '2025-04-19'
})