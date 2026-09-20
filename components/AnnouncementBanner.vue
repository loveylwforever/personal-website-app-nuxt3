<script setup lang="ts">
function openChangelog() {
  navigateTo('/changelog')
}
</script>

<template>
  <div class="announcement-banner">
    <div class="container">
      <button type="button" class="update-tag" @click="openChangelog">
        <span class="version">
          <AppIcon name="sparkle" :size="14" />
          0.0.0
        </span>
        <span class="divider" aria-hidden="true">|</span>
        <span class="message">修复问题，优化用户体验，体验更流畅</span>
        <AppIcon name="rocket" class="rocket" :size="16" />
        <span class="action">
          查看更新日志
          <AppIcon name="arrow-right" class="action-arrow" :size="12" />
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.announcement-banner {
  padding-top: 24px;
}

.announcement-banner .container {
  display: flex;
  justify-content: center;
}

.update-tag {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  max-width: 100%;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid color-mix(in srgb, var(--primary-color) 28%, var(--border-color));
  background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  color: var(--text-color);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.version,
.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--primary-color);
  white-space: nowrap;
}

.action {
  font-size: 12px;
}

.divider {
  color: color-mix(in srgb, var(--primary-color) 40%, var(--text-tertiary));
}

.message {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rocket,
.action-arrow {
  flex-shrink: 0;
  color: var(--primary-color);
  transition: transform 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .update-tag:hover {
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 48%, var(--border-color));
    box-shadow: var(--shadow-whisper);
    transform: translateY(-1px);
  }

  .update-tag:hover .rocket {
    transform: translate(2px, -3px) rotate(-12deg);
  }

  .update-tag:hover .action-arrow {
    transform: translateX(4px);
  }
}

.update-tag:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .update-tag,
  .rocket,
  .action-arrow {
    transition: background-color 160ms ease, border-color 160ms ease;
  }

  .update-tag:hover,
  .update-tag:hover .rocket,
  .update-tag:hover .action-arrow,
  .update-tag:active {
    transform: none;
  }
}

@media (max-width: 768px) {
  .update-tag {
    font-size: 12px;
  }
}
</style>
