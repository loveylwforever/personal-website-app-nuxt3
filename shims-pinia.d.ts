declare module 'pinia' {
  import { Ref, ComputedRef } from 'vue'
  
  export function defineStore(
    id: string,
    setup: () => {
      [key: string]: any
    }
  ): () => {
    [key: string]: any
  }
  
  export function defineStore(
    id: string,
    options: {
      state: () => {
        [key: string]: any
      }
      getters?: {
        [key: string]: (state: any) => any
      }
      actions?: {
        [key: string]: (...args: any[]) => any
      }
    }
  ): () => {
    [key: string]: any
  }
} 