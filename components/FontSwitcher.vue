<template>
  <div class="font-switcher">
    <h3 class="font-switcher__title">字体设置</h3>
    <div class="font-switcher__options">
      <div 
        v-for="font in availableFonts" 
        :key="font.id"
        class="font-switcher__option"
        :class="{ 'font-switcher__option--active': currentFont === font.id }"
        @click="changeFont(font.id)"
      >
        <span>{{ font.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFontStore } from '~/stores/font'

const fontStore = useFontStore()

// 计算属性用于获取当前字体和可用字体列表
const currentFont = computed(() => fontStore.currentFont)
const availableFonts = computed(() => fontStore.availableFonts)

// 改变字体方法
function changeFont(fontId: string) {
  fontStore.setFont(fontId)
  // 保存用户偏好
  fontStore.savePreference()
}

// 组件挂载时初始化字体
onMounted(() => {
  fontStore.initFont()
})
</script>

<style lang="scss" scoped>
.font-switcher {
  margin: 1rem 0;
  
  &__title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  &__option {
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f5f5f5;
    }
    
    &--active {
      background-color: #f0f0f0;
      border-color: #aaa;
    }
  }
}
</style> 