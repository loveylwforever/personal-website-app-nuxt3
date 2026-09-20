<script setup lang="ts">
defineProps<{
  items: { title: string; body: string }[]
}>()
</script>

<template>
  <div class="app-collapse">
    <details v-for="item in items" :key="item.title" class="app-collapse__item">
      <summary>{{ item.title }}</summary>
      <p>{{ item.body }}</p>
    </details>
  </div>
</template>

<style scoped>
.app-collapse {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.app-collapse__item {
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  overflow: hidden;
}

.app-collapse__item summary {
  list-style: none;
  padding: 16px;
  cursor: pointer;
  font-size: 16px;
  color: var(--text-color);
}

.app-collapse__item summary::-webkit-details-marker {
  display: none;
}

.app-collapse__item summary:hover {
  background: var(--hover-bg);
}

.app-collapse__item p {
  margin: 0;
  padding: 0 16px 16px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  background: var(--hover-bg);
}
</style>
