<template>
  <div class="page">
    <div class="container container--narrow">
      <template v-if="post">
        <h1 class="page-title page-title--start">{{ post.title }}</h1>
        <p class="page-subtitle page-subtitle--start post-meta">
          作者 {{ post.author }} · 发表于 {{ post.createdAt }} · 浏览 {{ post.views }} · 最后活动 {{ post.lastActiveAt }}
        </p>
        <div class="post-content page-card lift-card reveal">{{ post.content }}</div>
        <div class="comments-block page-card lift-card reveal" style="--reveal-delay: 60ms">
          <h2 class="page-section-title">全部回复（{{ post.comments.length }}）</h2>
          <div v-if="post.comments.length === 0" class="empty">暂无回复</div>
          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <span class="comment-author">{{ comment.author }}</span>
            <span>{{ comment.content }}</span>
            <time>{{ comment.createdAt }}</time>
          </div>
          <form class="comment-form" @submit.prevent="submitComment">
            <AppInput v-model="author" placeholder="你的昵称" />
            <AppInput v-model="content" placeholder="回复内容..." />
            <AppButton type="submit">回复</AppButton>
          </form>
        </div>
        <NuxtLink to="/forum" class="back-link">返回主题列表</NuxtLink>
      </template>
      <p v-else class="empty">主题不存在</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 主题详情'
})

const route = useRoute()
const store = useForumStore()
const postId = computed(() => String(route.params.id))
const post = computed(() => store.posts.find(item => item.id === postId.value))
const author = ref('')
const content = ref('')

onMounted(() => {
  if (post.value) store.addView(postId.value)
})

function submitComment() {
  if (author.value && content.value && post.value) {
    store.addComment(postId.value, author.value, content.value)
    content.value = ''
  }
}
</script>

<style scoped>
.post-meta {
  font-size: 14px;
}

.post-content,
.comments-block {
  padding: 24px;
  margin-bottom: 24px;
}

.post-content {
  font-size: 16px;
  line-height: 1.7;
}

.comments-block .page-section-title {
  text-align: left;
  margin-bottom: 16px;
  font-size: 18px;
}

.comment {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-secondary);
  font-size: 14px;
}

.comment-author {
  color: var(--primary-color);
  font-weight: 600;
}

.comment time {
  margin-left: auto;
  color: var(--text-tertiary);
  font-size: 12px;
}

.comment-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.comment-form :deep(.app-input) {
  flex: 1;
  min-width: 160px;
}

.back-link {
  color: var(--text-secondary);
  font-size: 14px;
}

.back-link:hover {
  color: var(--text-color);
}

.empty {
  color: var(--text-tertiary);
  text-align: center;
}

@media (max-width: 768px) {
  .comment-form :deep(.app-btn) {
    width: 100%;
  }
}
</style>
