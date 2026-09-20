<script setup lang="ts">
defineProps<{
  chars: string[]
  visible: boolean[]
}>()
</script>

<template>
  <span class="home-typewriter">
    <span
      v-for="(char, i) in chars"
      :key="i"
      class="type-char"
      :class="{ visible: visible[i] }"
    >{{ char }}</span>
  </span>
</template>

<style scoped>
.home-typewriter {
  display: inline;
}

.type-char {
  display: inline-block;
  min-width: 1px;
  opacity: 0;
  color: inherit;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.type-char.visible {
  opacity: 1;
}
</style>
