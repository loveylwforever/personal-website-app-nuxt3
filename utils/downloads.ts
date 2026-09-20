import type { Platform } from '~/utils/platformDetect'

export interface DownloadOption {
  id: Platform
  name: string
  description: string
}

export const downloadOptions: DownloadOption[] = [
  { id: 'windows', name: 'Windows', description: 'Windows 10/11 x64/ARM64 安装包' },
  { id: 'macos', name: 'macOS', description: 'Intel 与 Apple Silicon 通用版本' },
  { id: 'linux', name: 'Linux', description: 'AppImage 格式，适用于大多数发行版' },
  { id: 'android', name: 'Android', description: 'APK 安装包，支持 Android 8.0+' },
  { id: 'ios', name: 'iOS', description: 'TestFlight 测试版，支持 iOS 14+' },
]
