import * as dayjs from 'dayjs'
import { defineNuxtPlugin } from '#app'

// Extend with any plugins if needed
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.extend(relativeTime)

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.provide('dayjs', dayjs)
})

// For TypeScript support
// These declarations are now in separate files
// declare module '#app' {
//   interface NuxtApp {
//     $dayjs: typeof dayjs
//   }
// }
// 
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $dayjs: typeof dayjs
//   }
// }

