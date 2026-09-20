export type ToastType = 'success' | 'warning' | 'error'

export interface ToastItem {
  id: number
  message: string
  type: ToastType
}

export function useToast() {
  const toasts = useState<ToastItem[]>('app-toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((item) => item.id !== id)
  }

  function toast(message: string, type: ToastType = 'success') {
    const item: ToastItem = { id: Date.now() + Math.random(), message, type }
    toasts.value = [...toasts.value, item]
    if (import.meta.client) {
      window.setTimeout(() => dismiss(item.id), 2400)
    }
  }

  return {
    toasts,
    toast,
    dismiss,
    success: (message: string) => toast(message, 'success'),
    warning: (message: string) => toast(message, 'warning'),
    error: (message: string) => toast(message, 'error'),
  }
}
