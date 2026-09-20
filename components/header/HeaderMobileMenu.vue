<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const ecosystemOpen = ref(false)

function close() {
  ecosystemOpen.value = false
  emit('close')
}

watch(() => useRoute().path, close)
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="mobile-overlay" @click.self="close">
      <aside class="mobile-menu">
        <div class="mobile-menu__header">
          <div class="logo-row">
            <Logo style="width:32px;height:32px;" />
            <span>某某软件</span>
          </div>
          <AppButton variant="icon" aria-label="关闭菜单" @click="close">
            <AppIcon name="close" />
          </AppButton>
        </div>
        <nav class="mobile-menu__nav">
          <NuxtLink to="/" @click="close">首页</NuxtLink>
          <NuxtLink to="/start" @click="close">开始</NuxtLink>
          <NuxtLink to="/pricing" @click="close">定价</NuxtLink>
          <NuxtLink to="/experience" @click="close">体验</NuxtLink>
          <NuxtLink to="/projects" @click="close">项目</NuxtLink>
          <NuxtLink to="/message" @click="close">留言</NuxtLink>
          <NuxtLink to="/changelog" @click="close">更新日志</NuxtLink>
          <button type="button" @click="ecosystemOpen = !ecosystemOpen">
            生态
            <AppIcon name="arrow-down" :size="14" />
          </button>
          <div v-if="ecosystemOpen" class="submenu">
            <NuxtLink to="/forum" @click="close">某某圈</NuxtLink>
          </div>
        </nav>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgb(0 0 0 / 45%);
  backdrop-filter: blur(4px);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 80vw);
  height: 100dvh;
  overflow: auto;
  background: var(--bg-color);
  box-shadow: -2px 0 10px rgb(0 0 0 / 10%);
  animation: slide-in 0.25s ease;
}

.mobile-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.logo-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.mobile-menu__nav a,
.mobile-menu__nav button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.mobile-menu__nav a:hover,
.mobile-menu__nav button:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

.submenu {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--hover-bg);
}

.submenu a {
  padding-left: 32px;
  font-size: 14px;
}

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>
