<template>
  <div class="dialog-mask">
    <div class="post-dialog-gradient">
      <div class="post-dialog-card">
        <div class="dialog-header">
          <h2>发新帖</h2>
          <p class="desc">与社区分享你的想法或问题</p>
        </div>
        <div class="form-group">
          <label for="title">标题</label>
          <input id="title" v-model="title" class="input-title" placeholder="请输入标题" />
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <el-select v-model="category" placeholder="请选择" class="input-category" style="width:100%">
            <el-option v-for="opt in categoryOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </div>
        <div class="form-group">
          <label for="content">内容</label>
          <textarea id="content" v-model="content" class="input-content" rows="8" placeholder="请输入内容"></textarea>
        </div>
        <div class="actions">
          <button class="post-btn" @click="submitPost">提交</button>
          <NuxtLink to="/forum" class="cancel-btn">取消</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
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
    ElMessage.warning('请填写完整内容')
    return
  }
  // 这里可以调用API或store保存帖子
  ElMessage.success('发帖成功！')
  router.push('/forum')
}
</script>

<style scoped>
:root {
  --gradient-start: #3b82f6;
  --gradient-end: #6366f1;
  --dialog-bg: #fff;
  --dialog-text: #23272f;
  --input-bg: #fff;
  --input-border: #bfc8dc;
  --input-shadow: 0 2px 8px rgba(80,80,120,0.04);
  --input-placeholder: #bfc8dc;
  --select-bg: #f4f6fa;
  --option-bg: #fff;
}
[data-theme="dark"] {
  --gradient-start: #23272f;
  --gradient-end: #353a45;
  --dialog-bg: #23272f;
  --dialog-text: #f3f4f6;
  --input-bg: #23272f;
  --input-border: #444a58;
  --input-shadow: 0 2px 8px rgba(0,0,0,0.12);
  --input-placeholder: #666e7a;
  --select-bg: #23272f;
  --option-bg: #23272f;
}
.dialog-mask {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}
.post-dialog-gradient {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  padding: 2.5px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 40px rgba(80,80,120,0.18);
}
.post-dialog-card {
  background: var(--dialog-bg);
  color: var(--dialog-text);
  border-radius: 22px;
  padding: 40px 36px 32px 36px;
  width: 50vw;
  max-width: 800px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-shadow: 0 2px 16px rgba(80,80,120,0.10);
  position: relative;
}
@media (max-width: 600px) {
  .post-dialog-card { padding: 24px 8px; width: 98vw; min-width: 0; }
}
.dialog-header h2 {
  font-size: 24px;
  font-weight: bold;
  color: var(--gradient-end, #6366f1);
  margin-bottom: 2px;
}
.dialog-header .desc {
  color: #888;
  font-size: 14px;
  margin-bottom: 0;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
label {
  font-size: 15px;
  color: #bbb;
  font-weight: 500;
}
.input-title, .input-content {
  background: #fff;
  color: #23272f;
  border: 2px solid #e0e7ef;
  border-radius: 12px;
  font-size: 17px;
  padding: 12px 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(80,80,120,0.04);
  transition: border 0.18s, box-shadow 0.18s, background 0.18s;
}
[data-theme="dark"] input.input-title,
[data-theme="dark"] textarea.input-content {
  background: #23272f !important;
  color: #f3f4f6 !important;
  border: 2px solid #353a45 !important;
}
.input-title:focus, .input-content:focus {
  border-color: var(--gradient-end, #6366f1);
  outline: none;
}
.input-title::placeholder,
.input-content::placeholder {
  color: #bfc8dc;
  opacity: 1;
}
[data-theme="dark"] .input-title::placeholder,
[data-theme="dark"] .input-content::placeholder {
  color: #666e7a;
}
.input-category {
  width: 100%;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 10px;
}
.post-btn {
  border-radius: 999px;
  padding: 12px 36px;
  font-size: 17px;
  background: linear-gradient(90deg, var(--gradient-start, #3b82f6), var(--gradient-end, #6366f1));
  color: #fff;
  border: none;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(80,80,120,0.10);
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s;
}
.post-btn:hover {
  background: linear-gradient(90deg, var(--gradient-end, #6366f1), var(--gradient-start, #3b82f6));
  box-shadow: 0 4px 16px rgba(80,80,120,0.16);
}
.cancel-btn {
  border-radius: 999px;
  padding: 12px 28px;
  font-size: 17px;
  color: #bbb;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.18s;
  text-decoration: none;
}
.cancel-btn:hover {
  background: #232a36;
}

/* el-select 下拉菜单背景色明暗模式适配 */
:deep(.el-select-dropdown) {
  background-color: #fff !important;
  color: #23272f !important;
}
[data-theme="dark"] :deep(.el-select-dropdown) {
  background-color: #23272f !important;
  color: #f3f4f6 !important;
}
:deep(.el-select-dropdown__item) {
  color: inherit !important;
}
[data-theme="dark"] :deep(.el-select-dropdown__item) {
  color: inherit !important;
}
</style> 