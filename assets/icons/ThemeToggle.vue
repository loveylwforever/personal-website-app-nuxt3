<template>
  <svg 
    viewBox="0 0 24 24" 
    class="theme-toggle-icon" 
    :class="{ 'is-dark': isDark }"
    width="1em" 
    height="1em" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <clipPath id="moon-clip-path">
        <rect x="0" y="0" width="24" height="24" />
        <circle cx="24" cy="10" r="6" transform="translate(0 0)" />
      </clipPath>
    </defs>
    <circle
      class="sun"
      cx="12"
      cy="12"
      r="5.5"
      clip-path="url(#moon-clip-path)"
    />
    <g class="sun-beams" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
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
  
  width: 22px;
  height: 22px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center;
  will-change: transform;
  
  &:hover {
    --icon-fill: var(--icon-fill-hover);
  }
  
  .sun {
    fill: none;
    stroke: var(--icon-fill);
    stroke-width: 2;
    transition: fill 0.4s ease, stroke 0.4s ease;
    vector-effect: non-scaling-stroke;
  }
  
  .sun-beams {
    stroke: var(--icon-fill);
    stroke-width: 1.5;
    transition: all 0.4s ease;
    transform-origin: center;
    vector-effect: non-scaling-stroke;
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

// 优化交互体验
html.no-touch {
  .theme-toggle-icon {
    &:hover {
      .sun {
        transform: scale(1.05);
      }
      
      .sun-beams {
        transform: scale(1.05);
      }
      
      &.is-dark .sun-beams {
        opacity: 0;
        transform: scale(0.6);
      }
    }
  }
}

// 减少动画在移动设备上的过渡时间
@media (max-width: 768px) {
  .theme-toggle-icon {
    transition-duration: 0.3s;
    
    .sun, .sun-beams {
      transition-duration: 0.3s;
    }
  }
}
</style> 