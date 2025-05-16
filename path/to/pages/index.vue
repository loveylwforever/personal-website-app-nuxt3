const downloadOptions = [
  { id: 'windows', name: 'Windows', description: 'Windows 10/11 x64/ARM64 安装包', emoji: '🪟', icon: 'windows-icon' },
  { id: 'macos', name: 'macOS', description: 'Intel & Apple Silicon 通用版本', emoji: '🍎', icon: 'macos-icon' },
  // ... existing code ...
]

const downloadMacIntel = () => {
  ElMessage.success('开始下载 macOS Intel 版本')
  // 实际下载逻辑，针对Intel芯片的下载URL
}

const downloadMacSilicon = () => {
  ElMessage.success('开始下载 macOS Apple Silicon 版本')
  // 实际下载逻辑，针对M系列芯片的下载URL
}

const downloadMacUniversal = () => {
  ElMessage.success('开始下载 macOS 通用版本')
  // 实际下载逻辑，通用版本的下载URL
}

const downloadMac = () => {
  // 检测是否为macOS
  if (typeof window !== 'undefined' && window.navigator) {
    // 如果是在macOS上，则自动判断芯片类型
    const isMac = /Mac/.test(window.navigator.platform)
    if (isMac) {
      // 这里可以尝试检测芯片类型，但通常难以完全准确
      // 所以推荐默认提供通用版本
      downloadMacUniversal()
    } else {
      // 如果不是在macOS上，展示下拉菜单让用户选择
      ElMessage({
        message: '请选择您的Mac芯片类型',
        type: 'info',
        duration: 2000
      })
    }
  } else {
    // 默认提供通用版本
    downloadMacUniversal()
  }
}

<template #dropdown>
  <el-dropdown-menu>
    <el-dropdown-item>
      <a href="#" class="dropdown-link" @click="downloadWindows">
        <el-icon><Monitor /></el-icon>
        Windows
      </a>
    </el-dropdown-item>
    <el-dropdown-item>
      <el-dropdown placement="right-start" :hide-on-click="false" trigger="hover">
        <a href="#" class="dropdown-link mac-dropdown-trigger">
          <el-icon><Monitor /></el-icon>
          macOS
          <el-icon class="mac-arrow"><ArrowDown /></el-icon>
        </a>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a href="#" class="dropdown-link" @click="downloadMacUniversal">
                🍎 通用版本
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="#" class="dropdown-link" @click="downloadMacSilicon">
                🍏 Apple Silicon (M1/M2/M3)
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="#" class="dropdown-link" @click="downloadMacIntel">
                💻 Intel
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-dropdown-item>
    <el-dropdown-item>
      <a href="#" class="dropdown-link" @click="downloadLinux">
        <el-icon><Monitor /></el-icon>
        Linux
      </a>
    </el-dropdown-item>
  </el-dropdown-menu>
</template>

<template #dropdown>
  <el-dropdown-menu>
    <el-dropdown-item command="windows-x64" :disabled="preferredDownloadPlatform === 'windows'">Windows x64</el-dropdown-item>
    <el-dropdown-item command="windows-arm64" :disabled="preferredDownloadPlatform === 'windows'">Windows ARM64</el-dropdown-item>
    <el-dropdown-item disabled>
      <span class="mac-dropdown-label">macOS</span>
      <el-dropdown placement="right-start" trigger="hover">
        <span class="mac-dropdown-button">
          <el-icon class="mac-arrow"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="macos-universal">通用版本</el-dropdown-item>
            <el-dropdown-item command="macos-apple-silicon">Apple Silicon</el-dropdown-item>
            <el-dropdown-item command="macos-intel">Intel</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-dropdown-item>
    <el-dropdown-item command="linux" :disabled="preferredDownloadPlatform === 'linux'">Linux</el-dropdown-item>
  </el-dropdown-menu>
</template>

const handleDownload = (command: string) => {
  switch (command) {
    case 'macos-universal':
      downloadMacUniversal()
      break
    case 'macos-apple-silicon':
      downloadMacSilicon()
      break
    case 'macos-intel':
      downloadMacIntel()
      break
    default:
      ElMessage.success(`开始下载 ${command} 版本`)
      // 其他下载逻辑
      break
  }
}

<style lang="scss" scoped>
.mac-dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mac-dropdown-label {
  margin-right: 10px;
}

.mac-dropdown-button {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  &:hover {
    color: var(--gradient-start);
  }
}

.mac-arrow {
  margin-left: 6px;
  font-size: 12px;
}

:deep(.el-dropdown-menu__item) {
  padding: 5px 12px;
  
  &.is-disabled {
    &:not(.el-dropdown-menu__item--divided) {
      background-color: transparent;
      cursor: default;
    }
  }
}
</style> 