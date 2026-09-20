export default defineNuxtConfig({
  compatibilityDate: "2025-04-19",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
  components: [
    { path: "~/components/ui", pathPrefix: false },
    { path: "~/components/home", pathPrefix: false },
    { path: "~/components/header", pathPrefix: false },
    "~/components",
  ],
  css: [
    "@/assets/scss/fonts.scss",
    "@/assets/scss/themes.scss",
    "@/assets/scss/global.scss",
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
  vite: {
    ssr: {
      resolve: {
        conditions: ["import", "module", "default"],
      },
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
