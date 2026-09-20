<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="app-toasts" aria-live="polite">
      <p v-for="item in toasts" :key="item.id" class="app-toast" :class="item.type">
        {{ item.message }}
      </p>
    </div>
  </Teleport>
</template>

<style scoped>
.app-toasts {
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 120;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateX(-50%);
  pointer-events: none;
}

.app-toast {
  margin: 0;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);
  font-size: 14px;
}

.app-toast.success {
  box-shadow: 0 0 0 1px var(--primary-color), 0 8px 24px rgb(0 0 0 / 10%);
}

.app-toast.warning,
.app-toast.error {
  box-shadow: 0 0 0 1px #b53333, 0 8px 24px rgb(0 0 0 / 10%);
}
</style>
