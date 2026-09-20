import {
  getPlatformDisplay,
  getPlatformButtonClass,
  getPreferredDownloadPlatform,
  type Platform,
} from '~/utils/platformDetect'
import { downloadOptions } from '~/utils/downloads'

export function useDownload() {
  const { success } = useToast()
  const preferred = ref<Platform>('windows')

  onMounted(() => {
    preferred.value = getPreferredDownloadPlatform()
  })

  const platformDisplay = computed(() => getPlatformDisplay(preferred.value))
  const platformButtonClass = computed(() => getPlatformButtonClass(preferred.value))

  function download(platform: string) {
    const label = getPlatformDisplay(platform as Platform)
    success(`开始下载 ${label === '下载' ? platform : label} 版本`)
  }

  return {
    preferred,
    platformDisplay,
    platformButtonClass,
    downloadOptions,
    download,
  }
}
