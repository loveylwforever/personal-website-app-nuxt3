export type Platform = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown'

export interface DownloadOption {
  id: Exclude<Platform, 'unknown'>
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

const labels: Record<Platform, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  ios: 'iOS',
  android: 'Android',
  unknown: '下载',
}

export function getPlatformLabel(platform: string) {
  return labels[platform as Platform] ?? platform
}

function detectOS(): Platform {
  if (!import.meta.client) return 'unknown'

  const ua = navigator.userAgent
  const platform = navigator.platform
  const touchPoints = navigator.maxTouchPoints || 0

  if (/iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && touchPoints > 1)) return 'ios'
  if (/Android/.test(ua)) return 'android'
  if (/Mac/.test(platform) || /Mac OS X/.test(ua)) return 'macos'
  if (/Win/.test(platform) || /Windows/.test(ua)) return 'windows'
  if (/Linux/.test(platform) || /Linux/.test(ua)) return 'linux'
  return 'unknown'
}

export function getPreferredDownloadPlatform(): Platform {
  const os = detectOS()
  if (os === 'ios') return 'macos'
  if (os === 'android' || os === 'unknown') return 'windows'
  return os
}
