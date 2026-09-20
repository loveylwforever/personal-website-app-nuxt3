<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- 方形渐变背景，使用主题色变量 -->
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="getCssVar('--gradient-start')" />
        <stop offset="100%" :stop-color="getCssVar('--gradient-end')" />
      </linearGradient>
      <linearGradient id="logoBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="getCssVar('--gradient-end')" />
        <stop offset="100%" :stop-color="getCssVar('--gradient-start')" />
      </linearGradient>
    </defs>
    <!-- 外边框渐变 -->
    <rect x="7" y="7" width="86" height="86" rx="20" fill="none" stroke="url(#logoBorderGradient)" stroke-width="4" />
    <!-- 背景渐变 -->
    <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#logoGradient)" />
  </svg>
</template>

<script setup lang="ts">
function getCssVar(name: string) {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(name) || '#c96442'
  }
  return '#c96442'
}
</script> 