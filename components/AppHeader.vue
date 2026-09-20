<template>
  <header class="app-header">
    <div class="container">
      <button type="button" class="logo-btn" @click="navigateTo('/')">
        <Logo style="width:28px;height:28px;" />
        <span>某某软件</span>
      </button>

      <nav v-if="!isMobile" class="nav-menu">
        <NuxtLink to="/" active-class="" exact-active-class="router-link-active">首页</NuxtLink>
        <NuxtLink to="/start">开始</NuxtLink>
        <NuxtLink to="/pricing">定价</NuxtLink>
        <NuxtLink to="/experience">体验</NuxtLink>
        <NuxtLink to="/projects">项目</NuxtLink>
        <NuxtLink to="/message">留言墙</NuxtLink>
        <NuxtLink to="/changelog">更新日志</NuxtLink>
        <AppDropdown trigger="hover">
          <template #trigger>
            <button type="button" class="nav-item">
              生态
              <AppIcon name="arrow-down" :size="12" />
            </button>
          </template>
          <NuxtLink to="/forum">某某圈</NuxtLink>
        </AppDropdown>
      </nav>

      <div class="header-actions">
        <AppInput
          v-if="!isMobile"
          ref="searchInputRef"
          v-model="searchQuery"
          class="search-input"
          placeholder="搜索..."
        >
          <template #prefix>
            <AppIcon name="search" :size="16" />
          </template>
          <template #suffix>
            <span v-if="!searchQuery" class="shortcut">{{ isMac ? '⌘' : 'Ctrl' }}K</span>
          </template>
        </AppInput>

        <AppButton variant="icon" aria-label="切换主题" @click="themeStore.toggleTheme">
          <ThemeToggle :is-dark="themeStore.isDark" />
        </AppButton>
        <AppButton variant="icon" aria-label="网站设置" @click="settingsOpen = true">
          <AppIcon name="settings" />
        </AppButton>
        <AppButton variant="icon" aria-label="登录" @click="navigateTo('/login')">
          <AppIcon name="user" />
        </AppButton>
        <AppButton v-if="isMobile" variant="icon" aria-label="打开菜单" @click="mobileOpen = true">
          <AppIcon name="menu" />
        </AppButton>
      </div>
    </div>
  </header>

  <HeaderMobileMenu :open="mobileOpen" @close="mobileOpen = false" />
  <HeaderSettingsPanel v-model="settingsOpen" />
</template>

<script setup lang="ts">
import { ThemeToggle } from '~/assets/icons'

const themeStore = useThemeStore()
const searchQuery = ref('')
const searchInputRef = ref<{ focus: () => void; blur: () => void } | null>(null)
const mobileOpen = ref(false)
const settingsOpen = ref(false)
const isMac = ref(false)
const breakpoints = useBreakpoints({ tablet: 992 })
const isMobile = breakpoints.smaller('tablet')

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad/.test(navigator.userAgent)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

function onKeydown(event: KeyboardEvent) {
  if ((isMac.value ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchInputRef.value?.focus()
  }
  if (event.key === 'Escape') {
    searchInputRef.value?.blur()
    searchQuery.value = ''
    settingsOpen.value = false
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header-height);
  min-height: var(--header-height);
  padding: 8px 0;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(14px);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.logo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-color);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-menu {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 18px;
}

.nav-menu > a,
.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-secondary);
  font: inherit;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: color var(--duration-fast) ease;
}

.nav-menu > a:hover,
.nav-menu > a.router-link-active,
.nav-item:hover {
  color: var(--text-color);
}

.nav-menu > a::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--text-color);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav-menu > a:hover::after,
.nav-menu > a.router-link-active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (hover: hover) and (pointer: fine) {
  .logo-btn:hover {
    transform: translateY(-1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-btn,
  .nav-menu > a,
  .nav-menu > a::after {
    transition: none;
  }

  .logo-btn:hover {
    transform: none;
  }
}

.search-input {
  width: 200px;
}

.header-actions :deep(.app-input),
.header-actions :deep(.app-btn--icon) {
  min-height: 32px;
  height: 32px;
}

.header-actions :deep(.app-btn--icon) {
  width: 32px;
}

.shortcut {
  font-size: 11px;
  color: var(--text-tertiary);
  background: var(--hover-bg);
  border-radius: 4px;
  padding: 2px 6px;
}

</style>
