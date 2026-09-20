<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppToast />
</template>

<script setup lang="ts">
useHead({
  noscript: [{
    innerHTML: '<style>.reveal,.hero-rise,.hero-rise-late{opacity:1!important;transform:none!important;animation:none!important}</style>',
  }],
})
</script>
