<template>
  <svg 
    viewBox="0 0 24 24" 
    class="theme-toggle-icon" 
    :class="{ 'is-dark': isDark }"
    width="1em" 
    height="1em" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="moon-mask">
      <rect x="0" y="0" width="24" height="24" fill="white" />
      <circle cx="24" cy="10" r="6" fill="black" />
    </mask>
    <circle
      class="sun"
      cx="12"
      cy="12"
      r="6"
      mask="url(#moon-mask)"
    />
    <g class="sun-beams">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.theme-toggle-icon {
  --icon-fill: var(--text-secondary);
  --icon-fill-hover: var(--text-color);
  
  width: 20px;
  height: 20px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center;
  
  &:hover {
    --icon-fill: var(--icon-fill-hover);
  }
  
  .sun {
    fill: none;
    stroke: var(--icon-fill);
    stroke-width: 2;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  
  .sun-beams {
    stroke: var(--icon-fill);
    stroke-width: 1.5;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    transform-origin: center;
  }
  
  &.is-dark {
    transform: rotate(180deg);
    
    .sun {
      fill: var(--icon-fill);
    }
    
    .sun-beams {
      opacity: 0;
      transform: scale(0.6);
    }
  }
}
</style> 