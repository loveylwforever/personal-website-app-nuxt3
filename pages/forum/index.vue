<template>
  <div class="forum-main-layout">
    <!-- 左侧导航栏 -->
    <aside class="forum-sidebar">
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
      <div class="sidebar-section categories">
        <div class="sidebar-title">分类</div>
        <ul class="category-list">
          <li><span class="cat-dot cat-discussion"></span>讨论</li>
          <li><span class="cat-dot cat-howto"></span>使用方法</li>
          <li><span class="cat-dot cat-feature"></span>功能建议</li>
          <li><span class="cat-dot cat-bug"></span>问题反馈</li>
          <li><span class="cat-dot cat-feedback"></span>意见反馈</li>
          <li class="all-categories">全部分类</li>
        </ul>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <section class="forum-content">
      <!-- 置顶主题区域 -->
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
      <!-- 主题列表表格 -->
      <div class="forum-table-block">
        <div class="forum-table-header">
          <span class="col-topic">主题</span>
          <span class="col-replies">回复</span>
          <span class="col-views">浏览</span>
          <span class="col-activity">活跃</span>
        </div>
        <div v-for="post in sortedPosts" :key="post.id" class="forum-table-row">
          <NuxtLink :to="`/forum/${post.id}`" class="col-topic forum-topic-link">{{ post.title }}</NuxtLink>
          <span class="col-replies">{{ post.comments.length }}</span>
          <span class="col-views">{{ post.views }}</span>
          <span class="col-activity">{{ post.lastActiveAt }}</span>
        </div>
        <div v-if="!sortedPosts.length" class="empty">暂无主题，快来发帖吧！</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const store = useForumStore()
const sortedPosts = computed(() =>
  [...store.posts].sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime())
)
</script>

<style scoped>
:root {
  --forum-bg-light: rgba(245, 247, 250, 0.85);
  --forum-bg-dark: rgba(30, 32, 40, 0.85);
  --sidebar-bg: var(--gradient-start, #c96442);
  --sidebar-bg-dark: #222b3a;
}
[data-theme="dark"] {
  --forum-bg: var(--forum-bg-dark);
  --sidebar-bg: var(--sidebar-bg-dark);
}
html, body {
  background: var(--forum-bg, var(--forum-bg-light));
  transition: background 0.3s;
}
.forum-main-layout {
  display: flex;
  min-height: 100vh;
  margin: 24px;
  padding: 24px;
  gap: 32px;
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(12px);
}
.forum-sidebar {
  width: 220px;
  background: color-mix(in srgb, var(--bg-darker) 72%, var(--card-bg));
  color: var(--text-color);
  border-radius: 14px;
  padding: 24px 16px;
  box-shadow: 0 2px 8px rgba(80,80,120,0.06);
  display: flex;
  flex-direction: column;
  gap: 32px;
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(120,120,180,0.08);
}
.sidebar-title, .sidebar-list li, .category-list li {
  color: var(--text-color);
}
.sidebar-title {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 12px;
  letter-spacing: 1px;
}
.sidebar-list, .category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-list li {
  padding: 6px 0 6px 8px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 15px;
  transition: background 0.18s, color 0.18s;
  position: relative;
}
.sidebar-list li.active {
  font-weight: 600;
  color: var(--text-color);
  background: rgba(var(--gradient-start-rgb), 0.14);
  box-shadow: none;
  position: relative;
}
.sidebar-list li.active::before {
  content: '';
  position: absolute;
  left: 0; top: 6px; bottom: 6px;
  width: 4px;
  border-radius: 3px;
  background: var(--gradient-end, #d97757);
}
.category-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0 4px 8px;
  font-size: 14px;
  border-radius: 5px;
  transition: background 0.18s, color 0.18s;
}
.category-list li:hover {
  background: rgba(var(--gradient-end-rgb),0.07);
  color: var(--gradient-end);
}
.cat-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.cat-discussion { background: #c98b42; }
.cat-howto { background: #f59e42; }
.cat-feature { background: #22c55e; }
.cat-bug { background: #c96442; }
.cat-feedback { background: #f43f5e; }
.all-categories { color: #888; font-size: 13px; margin-top: 8px; }

.forum-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.pinned-topics {
  margin-bottom: 24px;
}
.pinned-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.pinned-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  letter-spacing: 1px;
}
.post-btn {
  background: #c96442;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 22px;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(80,80,120,0.10);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.post-btn:hover {
  box-shadow: 0 0 0 1px #d1cfc5;
  transform: translateY(-1px);
}
.pinned-list {
  display: flex;
  gap: 16px;
}
.pinned-item {
  background: color-mix(in srgb, var(--card-bg) 92%, var(--bg-color));
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-secondary);
  box-shadow: 0 1.5px 6px rgba(80,80,120,0.07);
  border: 1px solid rgba(120,120,180,0.07);
  backdrop-filter: blur(4px);
}
.forum-table-block {
  background: color-mix(in srgb, var(--card-bg) 95%, var(--bg-color));
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(80,80,120,0.10);
  padding: 0 0 8px 0;
  border: 1.5px solid rgba(120,120,180,0.09);
  backdrop-filter: blur(8px);
}
.forum-table-header {
  display: flex;
  font-weight: bold;
  color: var(--text-tertiary);
  font-size: 15px;
  border-bottom: 1px solid #eee;
  padding: 16px 24px 8px 24px;
  gap: 0;
  letter-spacing: 1px;
}
.forum-table-row {
  display: flex;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid #f0eee6;
  padding: 12px 24px;
  gap: 0;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 8px;
}
.forum-table-row:hover {
  background: rgba(var(--gradient-start-rgb),0.08);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.col-topic { flex: 2; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.col-replies, .col-views, .col-activity { flex: 1; text-align: center; }
.forum-topic-link { color: var(--text-color); text-decoration: none; cursor: pointer; font-weight: 500; }
.forum-topic-link:hover { color: var(--gradient-start); }
.empty { text-align: center; color: #aaa; margin: 32px 0; }
@media (max-width: 900px) {
  .forum-main-layout { flex-direction: column; gap: 0; padding: 12px 8px; }
  .forum-sidebar { width: 100%; flex-direction: row; gap: 24px; padding: 12px 8px; border-radius: 8px; margin-bottom: 16px; }
  .forum-content { margin-top: 16px; }
  .forum-table-header, .forum-table-row { padding-left: 8px; padding-right: 8px; }
}
</style> 