<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 开始'
})

const { download } = useDownload()

const platforms = [
  { label: 'Windows', value: 'windows' },
  { label: 'macOS', value: 'macos' },
  { label: 'Linux', value: 'linux' },
]
</script>

<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">开始使用</h1>
      
      <div class="installation-steps">
        <div class="step-card lift-card reveal">
          <div class="step-number">1</div>
          <h3>下载安装包</h3>
          <p>选择适合您系统的安装包下载：</p>
          <div class="download-options">
            <AppButton v-for="item in platforms" :key="item.value" @click="download(item.value)">
              <AppIcon name="download" :size="16" />
              {{ item.label }}
            </AppButton>
          </div>
        </div>
        
        <div class="step-card lift-card reveal" style="--reveal-delay: 60ms">
          <div class="step-number">2</div>
          <h3>安装应用</h3>
          <p>根据您的操作系统，按照以下步骤安装：</p>
          <div class="installation-instructions">
            <div class="os-tab">
              <h4>Windows</h4>
              <ol>
                <li>双击下载的 .exe 文件</li>
                <li>按照安装向导提示进行安装</li>
                <li>完成后即可启动应用</li>
              </ol>
            </div>
            <div class="os-tab">
              <h4>macOS</h4>
              <ol>
                <li>打开下载的 .dmg 文件</li>
                <li>将应用拖入 Applications 文件夹</li>
                <li>首次运行时点击"打开"确认</li>
              </ol>
            </div>
            <div class="os-tab">
              <h4>Linux</h4>
              <ol>
                <li>赋予执行权限：<code>chmod +x app.AppImage</code></li>
                <li>直接运行：<code>./app.AppImage</code></li>
                <li>或集成到系统菜单</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="step-card lift-card reveal" style="--reveal-delay: 120ms">
          <div class="step-number">3</div>
          <h3>开始使用</h3>
          <p>完成安装后：</p>
          <ol>
            <li>启动应用并注册/登录账号</li>
            <li>加入已有群聊或创建新的群聊</li>
            <li>开始与好友某某、体验 AI 助手等功能</li>
          </ol>
          <AppButton class="start-button" @click="navigateTo('/experience')">
            立即体验 Web 版
          </AppButton>
        </div>
      </div>
      
      <div class="requirements">
        <h2 class="page-section-title">系统要求</h2>
        <div class="requirements-grid">
          <div class="requirement-card lift-card reveal">
            <h4>Windows</h4>
            <ul>
              <li>Windows 10/11 64位</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
          <div class="requirement-card lift-card reveal" style="--reveal-delay: 50ms">
            <h4>macOS</h4>
            <ul>
              <li>macOS 11.0 或更高</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
          <div class="requirement-card lift-card reveal" style="--reveal-delay: 100ms">
            <h4>Linux</h4>
            <ul>
              <li>Ubuntu 20.04 或其他主流发行版</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.installation-steps {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 64px;
}

.step-card {
  position: relative;
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
}

.step-number {
  position: absolute;
  top: -20px;
  left: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--on-primary);
  font-size: 20px;
  font-weight: 700;
}

.step-card h3 {
  margin: 0 0 16px;
  font-size: 24px;
}

.step-card p,
.step-card li,
.requirement-card li {
  color: var(--text-secondary);
}

.download-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.os-tab {
  margin-bottom: 24px;
}

.os-tab h4,
.requirement-card h4 {
  margin: 0 0 12px;
  font-size: 18px;
}

code {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--hover-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.start-button {
  width: 100%;
  min-height: 48px;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.requirement-card {
  padding: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
}

@media (max-width: 768px) {
  .step-card {
    padding: 24px;
  }
}
</style>
