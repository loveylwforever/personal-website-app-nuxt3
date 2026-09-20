<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
    <defs>
      <linearGradient :id="fillId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--gradient-start)" />
        <stop offset="100%" stop-color="var(--gradient-end)" />
      </linearGradient>
      <linearGradient :id="strokeId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--gradient-end)" />
        <stop offset="100%" stop-color="var(--gradient-start)" />
      </linearGradient>
    </defs>
    <rect x="7" y="7" width="86" height="86" rx="20" fill="none" :stroke="`url(#${strokeId})`" stroke-width="4" />
    <rect x="10" y="10" width="80" height="80" rx="18" :fill="`url(#${fillId})`" />
  </svg>
</template>

<script setup lang="ts">
const uid = useId()
const fillId = `logo-fill-${uid}`
const strokeId = `logo-stroke-${uid}`
</script>
