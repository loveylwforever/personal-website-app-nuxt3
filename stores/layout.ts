import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<'default' | 'alternative'>('default')

  function setLayout(newLayout: 'default' | 'alternative') {
    layout.value = newLayout
    localStorage.setItem('homeLayout', newLayout)
  }

  function initLayout() {
    const saved = localStorage.getItem('homeLayout')
    if (saved === 'default' || saved === 'alternative') {
      layout.value = saved
    }
  }

  return { layout, setLayout, initLayout }
}) 