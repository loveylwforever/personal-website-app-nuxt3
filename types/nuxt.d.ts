declare module '#app' {
  import { RuntimeConfig } from 'nuxt/schema'
  
  export function useRuntimeConfig(): RuntimeConfig
  export function defineNuxtPlugin(plugin: any): any
  
  interface NuxtApp {
    $dayjs: any
    provide(key: string, value: any): void
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs: any
  }
} 