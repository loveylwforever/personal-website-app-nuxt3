<template>
  <div class="forum-detail-page" v-if="post">
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <div class="meta">
        <span>作者：{{ post.author }}</span>
        <span>发表于：{{ post.createdAt }}</span>
        <span>浏览：{{ post.views }}</span>
        <span>最后活动：{{ post.lastActiveAt }}</span>
      </div>
    </div>
    <div class="post-content">{{ post.content }}</div>
    <div class="comments-block">
      <h3>全部回复（{{ post.comments.length }}）</h3>
      <div v-if="post.comments.length === 0" class="empty">暂无回复</div>
      <div v-for="c in post.comments" :key="c.id" class="comment">
        <span class="comment-author">{{ c.author }}</span>：{{ c.content }}
        <span class="comment-date">{{ c.createdAt }}</span>
      </div>
      <!-- 回复表单 -->
      <form @submit.prevent="submitComment" class="comment-form">
        <input v-model="author" placeholder="你的昵称" maxlength="12" required />
        <input v-model="content" placeholder="回复内容..." maxlength="100" required />
        <button type="submit">回复</button>
      </form>
    </div>
    <NuxtLink to="/forum" class="back-link">← 返回主题列表</NuxtLink>
  </div>
  <div v-else class="empty">主题不存在</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForumStore } from '~/stores/forum'

const route = useRoute()
const router = useRouter()
const store = useForumStore()
const postId = route.params.id as string
const post = ref(store.posts.find((p: import('~/stores/forum').ForumPost) => p.id === postId))
const author = ref('')
const content = ref('')

// 进入详情页自动增加浏览数
onMounted(() => {
  if (post.value) {
    store.addView(postId)
    post.value.views++ // 本地同步
  }
})

// 回复主题
function submitComment() {
  if (author.value && content.value && post.value) {
    store.addComment(postId, author.value, content.value)
    content.value = ''
  }
}
</script>

<style scoped>
.forum-detail-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 16px;
}
.post-header h2 { margin-bottom: 8px; }
.meta { color: #888; font-size: 13px; display: flex; gap: 16px; margin-bottom: 12px; }
.post-content { font-size: 16px; margin-bottom: 24px; }
.comments-block { background: #faf9f5; border-radius: 8px; padding: 16px; }
.comment { font-size: 14px; color: #555; margin-bottom: 8px; }
.comment-author { font-weight: bold; color: var(--gradient-start); }
.comment-date { font-size: 12px; color: #aaa; margin-left: 8px; }
.comment-form { display: flex; gap: 8px; margin-top: 16px; }
.comment-form input { flex: 1; padding: 8px; border: 1px solid #eee; border-radius: 6px; }
button { padding: 0 16px; border: none; border-radius: 6px; background: var(--gradient-start); color: #fff; cursor: pointer; }
.back-link { display: inline-block; margin-top: 24px; color: var(--gradient-start); text-decoration: underline; }
.empty { text-align: center; color: #aaa; margin-top: 32px; }
</style> 