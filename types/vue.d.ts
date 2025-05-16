declare module 'vue' {
  import { Ref, ComputedRef, WatchSource, WatchStopHandle } from '@vue/runtime-core'
  
  export { Ref, ComputedRef, WatchSource, WatchStopHandle }
  
  export function ref<T>(value: T): Ref<T>
  export function computed<T>(getter: () => T): ComputedRef<T>
  export function watch<T>(
    source: WatchSource<T>,
    callback: (value: T, oldValue: T) => void,
    options?: { immediate?: boolean; deep?: boolean }
  ): WatchStopHandle
  export function onMounted(callback: () => void): void
  export function onUnmounted(callback: () => void): void
} 