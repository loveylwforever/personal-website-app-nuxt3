<script setup lang="ts">
import type { IconName } from '~/types/icons'

const props = withDefaults(defineProps<{
  name: IconName
  size?: number | string
}>(), {
  size: 18,
})

const paths: Record<IconName, string[]> = {
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M20 20l-3.5-3.5'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M5 20a7 7 0 0 1 14 0'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  settings: ['M5 8h14', 'M8 5v6', 'M5 16h14', 'M16 13v6'],
  'arrow-down': ['M6 9l6 6 6-6'],
  'arrow-left': ['M15 6l-6 6 6 6'],
  'arrow-right': ['M9 6l6 6-6 6'],
  check: ['M5 12l5 5L20 7'],
  lock: ['M8 11V8a4 4 0 1 1 8 0v3', 'M7 11h10v9H7z'],
  monitor: ['M4 5h16v11H4z', 'M8 21h8', 'M12 16v5'],
  image: ['M5 6h14v12H5z', 'M5 15l4-4 3 3 2-2 5 5', 'M9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
  download: ['M12 4v11', 'M8 11l4 4 4-4', 'M5 20h14'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 3v2', 'M12 19v2', 'M4.2 4.2l1.4 1.4', 'M18.4 18.4l1.4 1.4', 'M3 12h2', 'M19 12h2', 'M4.2 19.8l1.4-1.4', 'M18.4 5.6l1.4-1.4'],
  moon: ['M15 4.5A7.5 7.5 0 1 0 19.5 15 6 6 0 0 1 15 4.5z'],
  loading: ['M12 4a8 8 0 1 1-8 8'],
  chat: ['M6 18l-2 3 5-2h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v8a3 3 0 0 0 2 2.8Z'],
  robot: ['M8 9h8v8H8z', 'M12 5v4', 'M10 12h.01', 'M14 12h.01', 'M9 17h6'],
  video: ['M4 8h11v9H4z', 'M15 11l5-3v9l-5-3z'],
  document: ['M7 4h7l4 4v12H7z', 'M14 4v4h4'],
  lightning: ['M13 3L5 14h7l-1 7 8-11h-7z'],
  connection: ['M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1', 'M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1'],
  bell: ['M6 17h12l-1-7a5 5 0 0 0-10 0z', 'M10 17a2 2 0 0 0 4 0'],
  cpu: ['M8 8h8v8H8z', 'M12 4v2', 'M12 18v2', 'M4 12h2', 'M18 12h2'],
  chart: ['M4 19h16', 'M6 16l4-6 3 3 5-8'],
  info: ['M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M12 11v5', 'M12 8h.01'],
  share: ['M14 5l7 7-7 7', 'M3 12h17'],
  rocket: [
    'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
    'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
    'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0',
    'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  ],
  sparkle: [
    'M12 3l1.5 5.2L19 10l-5.5 1.8L12 17l-1.5-5.2L5 10l5.5-1.8Z',
    'M19 4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z',
  ],
}
</script>

<template>
  <svg
    class="app-icon"
    :class="{ 'is-spin': name === 'loading' }"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths[name]" :key="i" :d="d" />
  </svg>
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}

.is-spin {
  animation: spin 0.9s linear infinite;
  stroke-dasharray: 40;
  stroke-dashoffset: 12;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
