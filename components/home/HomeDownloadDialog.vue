<script setup lang="ts">
import Download from '~/assets/icons/download.vue'

const open = defineModel<boolean>({ default: false })
const { preferred, download, downloadOptions } = useDownload()
</script>

<template>
  <AppDialog v-model="open" title="选择下载版本">
    <div class="download-options">
      <article v-for="option in downloadOptions" :key="option.id" class="download-option">
        <div>
          <h4>{{ option.name }}</h4>
          <p>{{ option.description }}</p>
        </div>
        <div class="download-option__action">
          <span v-if="option.id === preferred" class="recommend">推荐</span>
          <AppButton @click="download(option.id)">
            <Download />
            下载
          </AppButton>
        </div>
      </article>
    </div>
  </AppDialog>
</template>

<style scoped>
.download-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.download-option {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-height: 140px;
  padding: 20px 18px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
}

.download-option h4 {
  margin: 0 0 4px;
  font-size: 16px;
}

.download-option p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.4;
}

.download-option__action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.recommend {
  font-size: 10px;
  font-weight: 700;
  color: var(--on-primary);
  background: var(--primary-color);
  border-radius: 4px;
  padding: 2px 6px;
}

@media (max-width: 550px) {
  .download-options {
    grid-template-columns: 1fr;
  }
}
</style>
