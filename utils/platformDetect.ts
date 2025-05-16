export type Platform = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown';

/**
 * 检测用户当前操作系统
 * 
 * @returns 返回用户当前的操作系统类型
 */
export const detectOS = (): Platform => {
  // 确保只在客户端执行
  if (typeof window === 'undefined' || !window.navigator) return 'unknown';
  
  try {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    
    // 检测 iOS
    if (/iPad|iPhone|iPod/.test(platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'ios';
    }
    
    // 检测 Android
    if (/Android/.test(userAgent)) {
      return 'android';
    }
    
    // 检测 macOS
    if (/Mac/.test(platform)) {
      return 'macos';
    }
    
    // 检测 Windows
    if (/Win/.test(platform)) {
      return 'windows';
    }
    
    // 检测 Linux
    if (/Linux/.test(platform)) {
      return 'linux';
    }
    
    return 'unknown';
  } catch (error) {
    console.error('操作系统检测失败:', error);
    return 'unknown';
  }
};

/**
 * 获取平台名称的友好显示
 */
export const getPlatformDisplay = (platform: Platform): string => {
  const displayNames: Record<Platform, string> = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    ios: 'iOS',
    android: 'Android',
    unknown: '下载'
  };
  
  return displayNames[platform] || '下载';
};

/**
 * 获取基于操作系统的默认下载平台
 * 对于桌面系统，返回实际操作系统
 * 对于移动系统，返回其相应的桌面系统
 */
export const getPreferredDownloadPlatform = (): Platform => {
  const os = detectOS();
  
  // 如果是移动设备，映射到相应的桌面系统
  if (os === 'ios') return 'macos';
  if (os === 'android') return 'windows';
  
  // 如果检测失败，默认返回Windows
  if (os === 'unknown') return 'windows';
  
  // 对于桌面系统，直接返回检测到的系统
  return os;
};

/**
 * 获取平台按钮样式类名
 */
export const getPlatformButtonClass = (platform: Platform): string => {
  const classNames: Record<Platform, string> = {
    windows: 'windows-button',
    macos: 'macos-button',
    linux: 'linux-button',
    ios: 'macos-button', // iOS使用macOS样式
    android: 'windows-button', // Android使用Windows样式
    unknown: 'unknown-button'
  };
  
  return classNames[platform] || 'unknown-button';
}; 