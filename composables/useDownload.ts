import {
  downloadOptions,
  getPlatformLabel,
  getPreferredDownloadPlatform,
  type Platform,
} from '~/utils/downloads'

export function useDownload() {
  const { success } = useToast()
  const preferred = useState<Platform>('preferred-download', () => 'windows')

  onMounted(() => {
    preferred.value = getPreferredDownloadPlatform()
  })

  const platformDisplay = computed(() => getPlatformLabel(preferred.value))

  function download(platform: string) {
    success(`开始下载 ${getPlatformLabel(platform)} 版本`)
  }

  return {
    preferred,
    platformDisplay,
    downloadOptions,
    download,
  }
}
