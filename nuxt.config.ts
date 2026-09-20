export default defineNuxtConfig({
  compatibilityDate: "2025-04-19",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  css: [
    "@/assets/scss/fonts.scss",
    "@/assets/scss/themes.scss",
    "@/assets/scss/global.scss",
    "@/assets/scss/element-theme.scss",
    "@/assets/scss/element-overrides.scss",
  ],
  app: {
    head: {
      title: "某某软件 - 一个轻量的某某软件",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "一款基于 Tauri2 和 Nuxt3 构建的轻量级全平台应用",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storageKey: "theme",
  },
  elementPlus: {
    importStyle: "scss",
    themes: ["dark"],
  },
  runtimeConfig: {
    public: {
      siteName: "某某软件",
      logoText: "XX",
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  build: {
    transpile: ["element-plus"],
  },
  vite: {
    ssr: {
      resolve: {
        conditions: ["import", "module", "default"],
      },
      noExternal: ["element-plus", "@element-plus/icons-vue"],
    },
  },
  nitro: {
    exportConditions: ["import", "module", "default"],
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    routeRules: {
      "/images/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/fonts/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },
  },
});
