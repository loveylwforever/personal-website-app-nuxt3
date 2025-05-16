declare module '@vueuse/core' {
  export function useBreakpoints(breakpoints: Record<string, number>): {
    smaller: (key: string) => { value: boolean }
    greater: (key: string) => { value: boolean }
    between: (min: string, max: string) => { value: boolean }
    isSmaller: (key: string) => boolean
    isGreater: (key: string) => boolean
    isBetween: (min: string, max: string) => boolean
  };

  export function useMouseInElement(
    target: HTMLElement | null | undefined
  ): {
    x: number
    y: number
    sourceType: string
    elementX: { value: number }
    elementY: { value: number }
    elementHeight: { value: number }
    elementWidth: { value: number }
    isOutside: { value: boolean }
  };

  export function useColorMode(options?: {
    attribute?: string;
    modes?: Record<string, string>;
    emitAuto?: boolean;
    selector?: string;
    storageKey?: string;
    storage?: 'localStorage' | 'sessionStorage';
    initialValue?: string;
  }): {
    mode: import('vue').Ref<string>;
    get: () => string;
    set: (mode: string) => void;
    preference: import('vue').Ref<string>;
  };
} 