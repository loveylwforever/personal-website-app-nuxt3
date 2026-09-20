<template>
  <div class="page">
    <div class="container container--narrow">
      <h1 class="page-title">发新帖</h1>
      <p class="page-subtitle">与社区分享你的想法或问题</p>

      <form class="post-form page-card" @submit.prevent="submitPost">
        <label>
          标题
          <AppInput v-model="title" placeholder="请输入标题" />
        </label>
        <label>
          分类
          <AppSelect v-model="category" placeholder="请选择" :options="categoryOptions" />
        </label>
        <label>
          内容
          <textarea v-model="content" rows="8" placeholder="请输入内容" />
        </label>
        <div class="actions">
          <AppButton variant="ghost" @click="router.push('/forum')">取消</AppButton>
          <AppButton type="submit">提交</AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 发新帖'
})

const router = useRouter()
const { success, warning } = useToast()
const title = ref('')
const category = ref('')
const content = ref('')

const categoryOptions = [
  { value: 'discussion', label: '讨论' },
  { value: 'howto', label: '使用方法' },
  { value: 'feature', label: '功能建议' },
  { value: 'bug', label: '问题反馈' },
  { value: 'feedback', label: '意见反馈' },
]

function submitPost() {
  if (!title.value.trim() || !category.value || !content.value.trim()) {
    warning('请填写完整内容')
    return
  }
  success('发帖成功！')
  router.push('/forum')
}
</script>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
}

.post-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: var(--text-color);
  font: inherit;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 768px) {
  .post-form {
    padding: 20px;
  }

  .actions :deep(.app-btn) {
    flex: 1;
  }
}
</style>
