<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">某某圈</h1>
      <p class="page-subtitle">分享使用心得，交流技术经验</p>

      <div class="forum-layout">
        <aside class="forum-sidebar page-card lift-card reveal">
          <div class="sidebar-section">
            <div class="sidebar-title">导航</div>
            <ul class="sidebar-list">
              <li class="active">主题</li>
              <li>用户</li>
              <li>徽章</li>
              <li>小组</li>
              <li>关于</li>
            </ul>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-title">分类</div>
            <ul class="category-list">
              <li><span class="cat-dot discussion"></span>讨论</li>
              <li><span class="cat-dot howto"></span>使用方法</li>
              <li><span class="cat-dot feature"></span>功能建议</li>
              <li><span class="cat-dot bug"></span>问题反馈</li>
              <li><span class="cat-dot feedback"></span>意见反馈</li>
              <li class="all-categories">全部分类</li>
            </ul>
          </div>
        </aside>

        <section class="forum-content">
          <div class="pinned-topics">
            <div class="pinned-actions">
              <div class="pinned-title">置顶主题</div>
              <NuxtLink to="/forum/new" class="post-btn">发帖</NuxtLink>
            </div>
            <div class="pinned-list">
              <div class="pinned-item">新功能发布/置顶主题示例</div>
              <div class="pinned-item">论坛公告/置顶主题示例</div>
            </div>
          </div>

          <div class="forum-table page-card reveal" style="--reveal-delay: 60ms">
            <div class="forum-table-header">
              <span class="col-topic">主题</span>
              <span class="col-replies">回复</span>
              <span class="col-views">浏览</span>
              <span class="col-activity">活跃</span>
            </div>
            <NuxtLink
              v-for="post in sortedPosts"
              :key="post.id"
              :to="`/forum/${post.id}`"
              class="forum-table-row"
            >
              <span class="col-topic">{{ post.title }}</span>
              <span class="col-replies">{{ post.comments.length }}</span>
              <span class="col-views">{{ post.views }}</span>
              <span class="col-activity">{{ post.lastActiveAt }}</span>
            </NuxtLink>
            <div v-if="!sortedPosts.length" class="empty">暂无主题，快来发帖吧！</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 某某圈'
})

const store = useForumStore()
const sortedPosts = computed(() =>
  [...store.posts].sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime())
)
</script>

<style scoped>
.forum-layout {
  display: flex;
  gap: 24px;
}

.forum-sidebar {
  width: 220px;
  flex-shrink: 0;
  padding: 24px 16px;
}

.sidebar-section + .sidebar-section {
  margin-top: 28px;
}

.sidebar-title {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.sidebar-list,
.category-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-list li,
.category-list li {
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  color: var(--text-color);
  font-size: 14px;
}

.sidebar-list li.active {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  font-weight: 600;
}

.category-list li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.cat-dot.discussion { background: #c98b42; }
.cat-dot.howto { background: #d97757; }
.cat-dot.feature { background: #6b8f71; }
.cat-dot.bug { background: var(--primary-color); }
.cat-dot.feedback { background: #b55a5a; }

.all-categories {
  margin-top: 8px;
  color: var(--text-tertiary);
  font-size: 13px;
}

.forum-content {
  flex: 1;
  min-width: 0;
}

.pinned-topics {
  margin-bottom: 24px;
}

.pinned-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.pinned-title {
  font-size: 16px;
  font-weight: 600;
}

.post-btn {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--primary-color);
  color: var(--on-primary);
  font-size: 14px;
  font-weight: 600;
}

.pinned-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pinned-item {
  padding: 8px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--card-bg);
  color: var(--text-secondary);
  font-size: 14px;
}

.forum-table-header,
.forum-table-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
}

.forum-table-header {
  color: var(--text-tertiary);
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.forum-table-row {
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.forum-table-row:last-of-type {
  border-bottom: 0;
}

.forum-table-row {
  transition: background-color var(--duration-fast) ease, transform var(--duration-fast) var(--ease-out);
}

.forum-table-row:hover {
  background: var(--hover-bg);
}

@media (hover: hover) and (pointer: fine) {
  .forum-table-row:hover {
    transform: translateX(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .forum-table-row:hover {
    transform: none;
  }
}

.col-topic {
  flex: 2;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-replies,
.col-views,
.col-activity {
  flex: 1;
  text-align: center;
  color: var(--text-secondary);
}

.empty {
  padding: 32px 0;
  color: var(--text-tertiary);
  text-align: center;
}

@media (max-width: 900px) {
  .forum-layout {
    flex-direction: column;
  }

  .forum-sidebar {
    width: 100%;
  }
}
</style>
