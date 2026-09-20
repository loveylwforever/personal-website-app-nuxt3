<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-logo">
          <Logo style="width:32px;height:32px;" />
          <span>某某软件</span>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h3>产品</h3>
          <NuxtLink to="/start">开始使用</NuxtLink>
          <NuxtLink to="/pricing">定价</NuxtLink>
          <NuxtLink to="/experience">体验</NuxtLink>
          <NuxtLink to="/projects">项目</NuxtLink>
        </div>
        <div class="link-group">
          <h3>生态</h3>
          <NuxtLink to="/forum">某某圈</NuxtLink>
        </div>
        <div class="link-group">
          <h3>资源</h3>
          <NuxtLink to="/changelog">更新日志</NuxtLink>
        </div>
      </div>

      <div class="footer-bottom">
        <p>不忘初心，方得始终</p>
        <p>© {{ currentYear }} JamieGao. 版权所有.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  padding: 48px 0 28px;
  border-top: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--bg-darker) 70%, var(--card-bg));
}

.footer-top {
  margin-bottom: 32px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
  font-weight: 700;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-group h3 {
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
}

.link-group a {
  color: var(--text-secondary);
  font-size: 14px;
}

.link-group a:hover {
  color: var(--text-color);
}

.footer-bottom {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--text-tertiary);
  font-size: 13px;
}

.footer-bottom p {
  margin: 0 0 6px;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 32px 0 20px;
  }

  .footer-logo,
  .footer-bottom {
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-links {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
