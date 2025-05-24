<template>
  <div>
    <header class="app-header">
      <div class="container">
        <div class="logo-container" @click="goHome" style="cursor:pointer;">
          <Logo style="width:32px;height:32px;" />
          <span class="logo-text">某某软件</span>
        </div>

        <nav class="nav-menu" v-if="!isMobile">
          <NuxtLink to="/" class="nav-item" :class="{ active: route && route.path === '/' }">首页</NuxtLink>
          <NuxtLink to="/start" class="nav-item">开始</NuxtLink>
          <NuxtLink to="/pricing" class="nav-item">定价</NuxtLink>
          <NuxtLink to="/experience" class="nav-item">体验</NuxtLink>
          <NuxtLink to="/projects" class="nav-item">项目</NuxtLink>
          <NuxtLink to="/message" class="nav-item">留言墙</NuxtLink>
          <NuxtLink to="/changelog" class="nav-item">更新日志</NuxtLink>
          <el-dropdown trigger="hover" class="nav-dropdown">
            <span class="nav-item dropdown-trigger" @click="onEcosystemTriggerClick">
              生态
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <NuxtLink to="/forum" class="dropdown-link full-link">某某圈</NuxtLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <NuxtLink to="/jiwu-admin" class="dropdown-link">某某后台系统</NuxtLink>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </nav>

        <div class="header-actions">
          <div class="search-container">
            <el-input
              ref="searchInputRef"
              v-model="searchQuery"
              placeholder="搜索..."
              class="search-input"
              :prefix-icon="Search"
            >
              <template #suffix>
                <span class="keyboard-shortcut" :class="{ 'is-mac': isMac }">
                  {{ isMac ? '⌘' : 'Ctrl' }}K
                </span>
              </template>
            </el-input>
          </div>
          
          <div class="action-buttons">
            <el-button 
              class="icon-button theme-toggle-button" 
              circle 
              @click="onThemeToggle"
            >
              <ThemeToggle :is-dark="isDark" />
            </el-button>
            <el-button 
              class="icon-button" 
              :icon="Setting" 
              circle 
              @click="toggleSettingsPanel" 
            />
            <!-- <el-button class="icon-button" :icon="Github" circle @click="openGithub" /> -->
            <el-button class="icon-button" :icon="User" circle @click="openUserMenu" />
            <el-button v-if="isMobile" class="icon-button mobile-menu-button" @click="toggleMobileMenu">
              <el-icon><Menu /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu (moved outside of header) -->
    <teleport to="body">
      <div v-if="isMobile && mobileMenuOpen" class="mobile-menu-overlay" @click.self="closeMobileMenu">
        <div class="mobile-menu">
          <div class="mobile-menu-header">
            <div class="logo-container">
              <Logo style="width:32px;height:32px;" />
              <span class="logo-text">某某软件</span>
            </div>
            <el-button class="close-button" @click="closeMobileMenu">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
          <div class="mobile-menu-container">
            <NuxtLink to="/" class="mobile-nav-item" @click="closeMobileMenu">首页</NuxtLink>
            <NuxtLink to="/start" class="mobile-nav-item" @click="closeMobileMenu">开始</NuxtLink>
            <NuxtLink to="/pricing" class="mobile-nav-item" @click="closeMobileMenu">定价</NuxtLink>
            <NuxtLink to="/experience" class="mobile-nav-item" @click="closeMobileMenu">体验</NuxtLink>
            <NuxtLink to="/projects" class="mobile-nav-item" @click="closeMobileMenu">项目</NuxtLink>
            <NuxtLink to="/message" class="mobile-nav-item" @click="closeMobileMenu">留言</NuxtLink>
            <NuxtLink to="/changelog" class="mobile-nav-item" @click="closeMobileMenu">更新日志</NuxtLink>
            
            <div class="mobile-nav-item dropdown" @click="toggleEcosystemMenu">
              生态
              <el-icon><ArrowDown /></el-icon>
            </div>
            
            <transition name="slide-down">
              <div v-if="ecosystemMenuOpen" class="ecosystem-submenu">
                <div class="submenu-container">
                  <NuxtLink to="/forum" class="mobile-nav-item submenu-item" @click="closeMobileMenu">某某圈</NuxtLink>
                  <NuxtLink to="/jiwu-admin" class="mobile-nav-item submenu-item" @click="closeMobileMenu">某某后台系统</NuxtLink>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </teleport>

    <!-- 网站设置面板 -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="settingsPanelOpen" class="settings-panel-overlay" @click.self="closeSettingsPanel">
          <div class="settings-panel">
            <div class="settings-panel-header">
              <h2><el-icon><Setting /></el-icon> 网站设置</h2>
              <el-button class="close-button" @click="closeSettingsPanel">
                <el-icon><Close /></el-icon>
              </el-button>
            </div>
            
            <div class="settings-panel-content">
              <!-- 布局设置 -->
              <div class="settings-section">
                <h3 class="settings-section-title">布局设置</h3>
                <div class="settings-section-content">
                  <el-radio-group v-model="currentLayout" @change="setLayout">
                    <div class="layout-options">
                      <div class="layout-option">
                        <el-radio :label="'default'" value="default">
                          <div class="layout-preview">
                            <div class="layout-preview-image layout-default">
                              <div class="preview-header"></div>
                              <div class="preview-hero">
                                <div class="preview-hero-content"></div>
                              </div>
                              <div class="preview-features"></div>
                            </div>
                          </div>
                          默认布局
                        </el-radio>
                      </div>
                      
                      <div class="layout-option">
                        <el-radio :label="'alternative'" value="alternative">
                          <div class="layout-preview">
                            <div class="layout-preview-image layout-alternative">
                              <div class="preview-header"></div>
                              <div class="preview-center-content">
                                <div class="preview-center-box"></div>
                              </div>
                            </div>
                          </div>
                          居中布局
                        </el-radio>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
              
              <!-- 字体设置 -->
              <div class="settings-section">
                <h3 class="settings-section-title">字体设置</h3>
                <div class="settings-section-content">
                  <el-select 
                    v-model="currentFont"
                    class="font-select"
                    placeholder="选择字体"
                  >
                    <el-option
                      v-for="font in availableFonts"
                      :key="font.id"
                      :label="font.name"
                      :value="font.id"
                    >
                      <div class="font-option" :style="{'font-family': getFontFamily(font.id as string)}">
                        {{ font.name }}
                      </div>
                    </el-option>
                  </el-select>
                  
                  <div class="font-preview" :style="{'font-family': getFontFamily(currentFont as string)}">
                    <div class="font-preview-text">
                      <p>字体预览：某某软件</p>
                      <p>The quick brown fox jumps over the lazy dog.</p>
                      <p>123456790</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="settings-panel-footer">
              <el-button type="primary" @click="closeSettingsPanel">确认</el-button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBreakpoints } from '@vueuse/core'
import { Search, Moon, Sunny, User, Menu, ArrowDown, ArrowRight, Close, Setting } from '@element-plus/icons-vue'
import { Github, ThemeToggle } from '~/assets/icons'
import { useLayoutStore } from '~/stores/layout'
import { useThemeStore } from '~/stores/theme'
import { useFontStore } from '~/stores/font'
import Logo from '~/components/Logo.vue'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const themeStore = useThemeStore()
const fontStore = useFontStore()

const searchQuery = ref('')
const searchInputRef = ref<{ $el: HTMLElement } | null>(null)
const mobileMenuOpen = ref(false)
const ecosystemMenuOpen = ref(false)
const isHovered = ref(false)
const settingsPanelOpen = ref(false)
const rippleLock = ref(false)

// 使用Pinia的theme store
const isDark = computed(() => themeStore.isDark)

// 初始化布局和字体设置
const currentLayout = ref(layoutStore.layout)
const currentFont = ref(String(fontStore.currentFont || 'default'))
const availableFonts = computed(() => fontStore.availableFonts)

watch(currentFont, (val) => {
  fontStore.setFont(val)
  fontStore.savePreference()
})

const breakpoints = useBreakpoints({
  mobile: 768,
  tablet: 992,
  desktop: 1200,
})

// 恢复移动端断点逻辑
const isMobileState = ref(false)
const isMobile = computed(() => isMobileState.value)

// 使用 ref 存储 Mac 状态，默认为 false
const isMacState = ref(false)

// 计算属性现在直接返回状态值
const isMac = computed(() => isMacState.value)

onMounted(() => {
  isMobileState.value = breakpoints.smaller('tablet').value
  watch(breakpoints.smaller('tablet'), (isSmaller) => {
    isMobileState.value = isSmaller
  })
  
  // 检测是否为 Mac 平台
  if (typeof navigator !== 'undefined') {
    isMacState.value = navigator.platform ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false
  }

  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)

  // 保证currentFont的值在可选字体中，否则回退到第一个
  if (!availableFonts.value.some((f: { id: string }) => f.id === currentFont.value)) {
    currentFont.value = availableFonts.value[0]?.id || 'default'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (event: KeyboardEvent) => {
  // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  if ((isMac.value ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    focusSearch()
  }
  
  // Close search on Escape
  if (event.key === 'Escape') {
    if (searchInputRef.value?.$el?.querySelector('input') === document.activeElement) {
      event.preventDefault()
      searchInputRef.value.$el.querySelector('input')?.blur()
      searchQuery.value = ''
    } else if (settingsPanelOpen.value) {
      closeSettingsPanel()
    }
  }
}

const focusSearch = () => {
  if (searchInputRef.value?.$el) {
    searchInputRef.value.$el.querySelector('input')?.focus()
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    ecosystemMenuOpen.value = false
  }
}

const toggleEcosystemMenu = () => {
  ecosystemMenuOpen.value = !ecosystemMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  ecosystemMenuOpen.value = false
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const openUserMenu = () => {
  router.push('/login')
}

const openChangelog = () => {
  router.push('/changelog')
}

function goHome() {
  router.push('/')
}

// 网站设置面板
const toggleSettingsPanel = () => {
  settingsPanelOpen.value = !settingsPanelOpen.value
}

const closeSettingsPanel = () => {
  settingsPanelOpen.value = false
}

// 布局设置
const setLayout = (value: string) => {
  layoutStore.setLayout(value)
}

// 获取字体的CSS字体族
const getFontFamily = (fontId: string): string => {
  return fontStore.getFontFamilyValue(fontId);
}

function onThemeToggle(e: MouseEvent) {
  if (rippleLock.value) return
  rippleLock.value = true
  // 直接切换主题
  themeStore.toggleTheme()
  rippleLock.value = false
}

function onEcosystemTriggerClick(event: MouseEvent) {
  // If the click is on the dropdown arrow, do nothing (let dropdown open)
  const arrow = (event.target as HTMLElement).closest('.el-icon');
  if (arrow) return;
  router.push('/forum');
}
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  z-index: 20;
  border-bottom: 1px solid var(--border-color);
  padding: 12px 0;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .logo {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      color: white;
    }
    
    .logo-text {
      font-weight: bold;
      font-size: 16px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 24px;
    
    .nav-item {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      position: relative;
      
      &:hover, &.active {
        color: var(--text-color);
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          border-radius: 2px;
        }
      }
      
      &.dropdown-trigger {
        cursor: pointer;
        
        .el-icon {
          margin-left: 4px;
          font-size: 12px;
        }
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .search-container {
      position: relative;
      
      .search-input {
        width: 240px;
        transition: all 0.3s ease;
        
        &:focus-within {
          width: 300px;
          
          .keyboard-shortcut {
            opacity: 0;
            transform: translateY(-50%) translateX(10px);
          }
        }
        
        :deep(.el-input__wrapper) {
          background-color: var(--hover-bg);
          border: 1px solid var(--border-color);
          box-shadow: none;
          border-radius: 8px;
          padding: 0 12px;
          height: 36px;
          transition: all 0.2s ease;
          
          &:hover {
            background-color: var(--hover-bg);
            border-color: var(--border-color);
          }
          
          &.is-focus {
            background-color: var(--hover-bg);
            border-color: var(--border-color);
          }
          
          .el-input__inner {
            color: var(--text-color);
            height: 36px;
            font-size: 14px;
            padding-right: 56px; // Make room for the keyboard shortcut
            
            &::placeholder {
              color: var(--text-tertiary);
            }
          }
          
          .el-input__prefix-icon {
            color: var(--text-secondary);
            font-size: 16px;
          }
        }
        
        .keyboard-shortcut {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          color: var(--text-tertiary);
          background: var(--hover-bg);
          padding: 2px 5px;
          height: 20px;
          line-height: 16px;
          border-radius: 4px;
          pointer-events: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 1px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          
          &.is-mac {
            font-size: 12px;
            padding: 2px 6px;
          }
        }
      }
    }
    
    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .icon-button {
        width: 36px;
        height: 36px;
        background: var(--hover-bg);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        border-radius: 8px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        
        .el-icon {
          font-size: 18px;
          position: relative;
          z-index: 2;
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-start);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        &:hover {
          color: var(--text-color);
          transform: translateY(-2px);
          border-color: var(--gradient-start);
          
          &::before {
            opacity: 0.1;
          }
        }
        
        &.theme-toggle-button {
          display: flex;
          align-items: center;
          justify-content: center;
          
          svg {
            position: relative;
            z-index: 2;
          }
        }
        
        &.mobile-menu-button {
          margin-left: 4px;
          
          .el-icon {
            font-size: 20px;
          }
        }
      }
    }
  }
}

.announcement-banner {
  position: relative;
  padding: 66px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(10px);

  .update-tag {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 6px 16px;
    border-radius: 6px;
    border: 1px solid rgba(234, 179, 8, 0.3);
    background: rgba(234, 179, 8, 0.05);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 200px;
    max-width: 800px;
    margin: 0 auto;

    &:hover {
      background: rgba(234, 179, 8, 0.1);
      border-color: rgba(234, 179, 8, 0.5);
      transform: translateY(-1px);

      .arrow-icon {
        transform: translateX(4px);
      }
    }

    .version {
      color: #EAB308;
      font-weight: 500;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .divider {
      color: rgba(234, 179, 8, 0.4);
      margin: 0 4px;
      flex-shrink: 0;
    }

    .message {
      color: var(--text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
      text-align: left;
    }

    .action {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: 12px;
      flex-shrink: 0;

      .view-changelog {
        color: rgba(234, 179, 8, 0.8);
        font-size: 12px;
        white-space: nowrap;
      }

      .arrow-icon {
        font-size: 12px;
        color: rgba(234, 179, 8, 0.8);
        transition: transform 0.2s ease;
      }
    }
  }
}

// Mobile Menu Styles - updated to ensure it works as a drawer
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9998;
  overflow: hidden;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: var(--bg-color);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  overflow-y: auto;
  animation: slideIn 0.3s ease forwards;
  
  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .logo {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        color: white;
      }
      
      .logo-text {
        font-weight: bold;
        font-size: 16px;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    
    .close-button {
      width: 36px;
      height: 36px;
      padding: 0;
      border: 1px solid var(--border-color);
      background: var(--hover-bg);
      color: var(--text-secondary);
      border-radius: 8px;
      
      &:hover {
        color: var(--text-color);
      }
    }
  }
  
  .mobile-menu-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .mobile-nav-item {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover, &.active {
      color: var(--text-color);
      background-color: var(--hover-bg);
    }
    
    &.dropdown {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
  }
  
  .ecosystem-submenu {
    margin-top: 4px;
    margin-bottom: 8px;
    background-color: var(--hover-bg);
    border-radius: 8px;
    overflow: hidden;
    
    .submenu-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    
    .submenu-item {
      font-size: 14px;
      color: var(--text-tertiary);
      padding: 12px 16px 12px 32px;
      margin: 0;
      border-radius: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        color: var(--text-color);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

// 添加滑动效果
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .app-header {
    .container {
      padding: 0 12px;
    }
    
    .logo-container {
      .logo {
        width: 32px;
        height: 32px;
        font-size: 14px;
      }
      
      .logo-text {
        font-size: 16px;
      }
    }
    
    .header-actions {
      gap: 8px;
      
      .search-container {
        display: none;
      }
      
      .action-buttons {
        .icon-button {
          width: 32px;
          height: 32px;
          
          .el-icon {
            font-size: 16px;
          }
        }
      }
    }
  }
  
  .announcement-banner {
    padding: 6px 12px;
    
    .update-tag {
      width: 100%;
      min-width: 0;
      font-size: 12px;
      padding: 5px 12px;
      gap: 8px;
      
      .version {
        font-size: 11px;
      }
      
      .message {
        font-size: 11px;
      }

      .action {
        margin-left: 8px;
        
        .view-changelog {
          font-size: 11px;
        }
        
        .arrow-icon {
          font-size: 11px;
        }
      }
    }
  }
}

.el-dropdown-menu__item {
  transition: background 0.2s;
}
.app-header .el-dropdown-menu__item:hover,
.app-header .el-dropdown-menu__item.is-active {
  background: linear-gradient(135deg, var(--gradient-start, #805AD5) 0%, var(--gradient-end, #FFD200) 100%) !important;
  color: #fff !important;
}
.app-header.dark .el-dropdown-menu__item:hover,
.app-header.dark .el-dropdown-menu__item.is-active {
  background: linear-gradient(135deg, #232526 0%, #805AD5 100%) !important;
  color: #fff !important;
}
.app-header.light .el-dropdown-menu__item:hover,
.app-header.light .el-dropdown-menu__item.is-active {
  background: linear-gradient(135deg, #ffd200 0%, #805AD5 100%) !important;
  color: #222 !important;
}

/* 网站设置面板样式 */
.settings-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-panel {
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 560px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
}

.settings-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 8px;
    
    .el-icon {
      font-size: 18px;
      color: var(--primary-color);
    }
  }
  
  .close-button {
    padding: 8px;
    border: none;
    background: transparent;
    font-size: 18px;
    color: var(--text-secondary);
    cursor: pointer;
    
    &:hover {
      color: var(--text-color);
    }
  }
}

.settings-panel-content {
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.settings-section {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
}

.settings-section-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}

.settings-section-content {
  margin-top: 16px;
}

/* 布局选择样式 */
.layout-options {
  display: flex;
  gap: 24px;
  margin-top: 16px;
}

.layout-option {
  flex: 1;
  
  .el-radio {
    width: 100%;
    margin-right: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    
    .el-radio__label {
      padding-left: 0;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: var(--text-color);
      margin-top: 8px;
    }
  }
}

.layout-preview {
  width: 100%;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  aspect-ratio: 16/9;
  margin-bottom: 0;
}

:deep(.el-radio__input.is-checked) .el-radio__inner {
  border-color: var(--gradient-start) !important;
  background: var(--gradient-start) !important;
}

:deep(.el-radio__input.is-checked) + .el-radio__label {
  color: var(--gradient-start) !important;
}

:deep(.el-radio__input.is-checked) + .layout-preview {
  border-color: var(--gradient-start) !important;
  box-shadow: 0 0 0 2px rgba(var(--gradient-start-rgb), 0.3) !important;
}

.layout-preview-image {
  width: 100%;
  height: 100%;
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  
  .preview-header {
    height: 20%;
    background: var(--border-color);
    opacity: 0.3;
  }
  
  &.layout-default {
    .preview-hero {
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .preview-hero-content {
        width: 80%;
        height: 70%;
        background: var(--gradient-start);
        opacity: 0.2;
        border-radius: 8px;
      }
    }
    
    .preview-features {
      height: 40%;
      display: flex;
      justify-content: center;
      padding: 10px;
      
      &::before, &::after {
        content: '';
        flex: 1;
        background: var(--border-color);
        opacity: 0.2;
        border-radius: 4px;
        margin: 4px;
      }
    }
  }
  
  &.layout-alternative {
    .preview-center-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .preview-center-box {
        width: 60%;
        height: 60%;
        background: var(--gradient-start);
        opacity: 0.2;
        border-radius: 8px;
      }
    }
  }
}

/* 字体设置样式 */
.font-select {
  width: 100%;
  
  :deep(.el-input__wrapper) {
    background: var(--bg-color);
    border-color: var(--border-color);
    box-shadow: none !important;
    
    &:hover, &.is-focus {
      border-color: var(--gradient-start);
    }
    
    .el-input__inner {
      color: var(--text-color);
    }
    
    .el-select__caret {
      color: var(--text-secondary);
    }
  }
}

.font-preview {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  
  .font-preview-text {
    p {
      margin: 8px 0;
      &:first-child {
        font-size: 18px;
        font-weight: 500;
      }
      &:nth-child(2) {
        font-size: 14px;
      }
      &:last-child {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.settings-panel-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .settings-panel {
    width: 95%;
    max-width: none;
    max-height: 90vh;
  }
  
  .layout-options {
    flex-direction: column;
    gap: 16px;
  }
  
  .settings-section {
    padding: 16px;
  }
}

.dropdown-link.full-link {
  display: block;
  width: 100%;
  box-sizing: border-box;
}
</style>