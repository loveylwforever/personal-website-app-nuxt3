<script setup lang="ts">
import type { HomeLayout } from '~/stores/layout'

const open = defineModel<boolean>({ default: false })
const layoutStore = useLayoutStore()
const fontStore = useFontStore()
const currentFont = ref(fontStore.currentFont)

watch(currentFont, (value) => {
  fontStore.setFont(value)
  fontStore.savePreference()
})

function setLayout(value: HomeLayout) {
  layoutStore.setLayout(value)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="settings-mask" @click.self="open = false">
      <section class="settings-panel">
        <header>
          <h2>
            <AppIcon name="settings" />
            网站设置
          </h2>
          <AppButton variant="icon" aria-label="关闭设置" @click="open = false">
            <AppIcon name="close" />
          </AppButton>
        </header>

        <div class="settings-body">
          <div class="settings-section">
            <h3>布局设置</h3>
            <div class="layout-options">
              <label :class="{ selected: layoutStore.layout === 'default' }">
                <input
                  type="radio"
                  name="home-layout"
                  value="default"
                  :checked="layoutStore.layout === 'default'"
                  @change="setLayout('default')"
                >
                <span class="preview preview-default" />
                默认布局
              </label>
              <label :class="{ selected: layoutStore.layout === 'alternative' }">
                <input
                  type="radio"
                  name="home-layout"
                  value="alternative"
                  :checked="layoutStore.layout === 'alternative'"
                  @change="setLayout('alternative')"
                >
                <span class="preview preview-center" />
                居中布局
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h3>字体设置</h3>
            <AppSelect
              v-model="currentFont"
              :options="fontStore.availableFonts.map((font) => ({ label: font.name, value: font.id }))"
            />
            <div class="font-preview" :style="{ fontFamily: fontStore.getFontFamilyValue(currentFont) }">
              <p>字体预览：某某软件</p>
              <p>The quick brown fox jumps over the lazy dog.</p>
              <p>123456790</p>
            </div>
          </div>
        </div>

        <footer>
          <AppButton @click="open = false">确认</AppButton>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.settings-mask {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 45%);
  backdrop-filter: blur(4px);
}

.settings-panel {
  display: flex;
  flex-direction: column;
  width: min(560px, 90vw);
  max-height: 85vh;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-lift);
}

.settings-panel header,
.settings-panel footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
}

.settings-panel footer {
  justify-content: flex-end;
  border-bottom: 0;
  border-top: 1px solid var(--border-color);
}

.settings-panel h2,
.settings-panel h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.settings-panel h2 {
  font-size: 18px;
}

.settings-panel h3 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
}

.settings-body {
  overflow: auto;
}

.settings-section {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
}

.layout-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.layout-options label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.layout-options input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.preview {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background:
    linear-gradient(var(--border-color), var(--border-color)) 0 0 / 100% 20% no-repeat,
    var(--card-bg);
}

.preview-default {
  background:
    linear-gradient(var(--border-color), var(--border-color)) 0 0 / 100% 20% no-repeat,
    linear-gradient(var(--primary-color), var(--primary-color)) 10% 35% / 80% 28% no-repeat,
    var(--card-bg);
}

.preview-center {
  background:
    linear-gradient(var(--border-color), var(--border-color)) 0 0 / 100% 20% no-repeat,
    linear-gradient(var(--primary-color), var(--primary-color)) 20% 40% / 60% 36% no-repeat,
    var(--card-bg);
}

.layout-options label.selected .preview {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 25%, transparent);
}

.font-preview {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-color);
}

.font-preview p {
  margin: 8px 0;
}

@media (max-width: 768px) {
  .layout-options {
    grid-template-columns: 1fr;
  }
}
</style>
