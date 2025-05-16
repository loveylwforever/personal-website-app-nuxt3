<template>
  <div class="changelog-page">
    <div class="container">
      <h1 class="page-title">更新日志</h1>
      <p class="page-description">记录每一次进步与改变</p>

      <div class="timeline-cards">
        <!-- Latest Version -->
        <div class="timeline-row">
          <div class="timeline-dot latest"></div>
          <div class="timeline-line"></div>
          <div class="changelog-card latest">
            <div class="card-header">
              <span class="version-tag">最新版本</span>
              <h2 class="version-number">v0.0.0</h2>
              <time class="release-date">2024年3月15日</time>
            </div>
            <div class="card-body">
              <div class="change-category">
                <h3>✨ 新功能</h3>
                <ul>
                  <li>支持 WebRTC 音视频通话功能</li>
                  <li>新增屏幕共享功能</li>
                  <li>集成 AI 助手支持（DeepSeek、讯飞星火）</li>
                </ul>
              </div>
              <div class="change-category">
                <h3>🐛 问题修复</h3>
                <ul>
                  <li>修复移动端显示异常问题</li>
                  <li>修复消息发送失败时的错误提示</li>
                  <li>修复在线状态同步延迟问题</li>
                </ul>
              </div>
              <div class="change-category">
                <h3>🚀 性能优化</h3>
                <ul>
                  <li>优化图片加载速度</li>
                  <li>减少首次加载时间</li>
                  <li>优化移动端网络性能</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Previous Version -->
        <div class="timeline-row">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
          <div class="changelog-card">
            <div class="card-header">
              <h2 class="version-number">v0.0.0-beta.2</h2>
              <time class="release-date">2024年3月1日</time>
            </div>
            <div class="card-body">
              <div class="change-category">
                <h3>✨ 新功能</h3>
                <ul>
                  <li>新增文件传输功能</li>
                  <li>支持消息撤回</li>
                  <li>新增用户个人资料设置</li>
                </ul>
              </div>
              <div class="change-category">
                <h3>💄 界面优化</h3>
                <ul>
                  <li>优化深色模式配色</li>
                  <li>改进移动端适配</li>
                  <li>新增过渡动画效果</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Beta Version -->
        <div class="timeline-row">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
          <div class="changelog-card">
            <div class="card-header">
              <h2 class="version-number">v0.0.0-beta.1</h2>
              <time class="release-date">2024年2月15日</time>
            </div>
            <div class="card-body">
              <div class="change-category">
                <h3>🎉 首次发布</h3>
                <ul>
                  <li>基础聊天功能</li>
                  <li>用户认证系统</li>
                  <li>多平台支持</li>
                  <li>基础 UI 界面</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '极物聊天 - 更新日志'
})
// 如果需要设置页面标题，可以用如下方式：
import { onMounted } from 'vue'
onMounted(() => {
  document.title = '更新日志 - 极物聊天'
})
</script>

<style lang="scss" scoped>
.changelog-page {
  min-height: calc(100vh - 180px);
  padding: 60px 0;
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .page-title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 12px;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }
  .page-description {
    text-align: center;
    color: var(--text-secondary);
    font-size: 16px;
    margin-bottom: 60px;
  }
  .timeline-cards {
    position: relative;
    margin: 0 auto;
    // padding-left: 32px;
    &::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 0;
      bottom: 0;
      width: 2.5px;
      background: linear-gradient(to bottom, var(--gradient-start), var(--gradient-end));
      z-index: 0;
      border-radius: 2px;
      opacity: 0.3;
    }
  }
  .timeline-row {
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-bottom: 40px;
    min-height: 120px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .timeline-dot {
    position: absolute;
    left: 7px;
    top: 32px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 3px solid var(--gradient-start);
    box-shadow: 0 2px 8px rgba(var(--gradient-start-rgb), 0.12);
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &.latest {
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      border: 3px solid var(--gradient-end);
      box-shadow: 0 0 12px rgba(var(--gradient-end-rgb), 0.4);
    }
  }
  .timeline-line {
    display: none;
  }
  .changelog-card {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 rgba(var(--gradient-start-rgb), 0.08), 0 1.5px 8px 0 rgba(0,0,0,0.04);
    border: 1.5px solid var(--border-color);
    padding: 28px 32px 20px 32px;
    margin-left: 48px;
    min-width: 0;
    flex: 1;
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transform: translateX(0);
    &.latest {
      border-left: 4px solid var(--gradient-end);
      box-shadow: 0 8px 32px 0 rgba(var(--gradient-end-rgb), 0.12), 0 2px 12px 0 rgba(0,0,0,0.06);
    }
    &:hover {
      transform: translateX(6px);
      box-shadow: 0 8px 32px 0 rgba(var(--gradient-start-rgb), 0.16), 0 2px 12px 0 rgba(0,0,0,0.08);
      border-color: var(--gradient-start);
      background: var(--hover-bg);
      
      & + .timeline-dot {
        transform: scale(1.2);
        box-shadow: 0 0 16px rgba(var(--gradient-start-rgb), 0.3);
      }
    }
    &::before {
      display: none;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
      .version-tag {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(var(--gradient-start-rgb), 0.12);
        border: 1px solid rgba(var(--gradient-start-rgb), 0.18);
        border-radius: 20px;
        color: var(--gradient-start);
        font-size: 12px;
        margin-right: 8px;
        font-weight: 500;
      }
      .version-number {
        font-size: 22px;
        font-weight: 700;
        color: var(--text-color);
        margin: 0 0 0 0;
      }
      .release-date {
        font-size: 14px;
        color: var(--text-secondary);
        margin-left: auto;
        font-weight: 400;
      }
    }
    .card-body {
      display: flex;
      flex-direction: column;
      gap: 18px;
      .change-category {
        h3 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            position: relative;
            padding-left: 18px;
            margin-bottom: 7px;
            color: var(--text-tertiary);
            font-size: 14px;
            line-height: 1.7;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 10px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--gradient-start);
              opacity: 0.6;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .changelog-page {
    padding: 32px 0;
    .container {
      padding: 0 16px;
    }
    .page-title {
      font-size: 28px;
    }
    .page-description {
      font-size: 13px;
      margin-bottom: 32px;
    }
    .timeline-cards {
      // padding-left: 24px;
      &::before {
        left: 12px;
        width: 2px;
      }
    }
    .timeline-row {
      margin-bottom: 24px;
      min-height: 80px;
    }
    .timeline-dot {
      width: 13px;
      height: 13px;
      left: 6px;
      top: 18px;
    }
    .changelog-card {
      padding: 16px 16px 12px 16px;
      margin-left: 28px;
      border-radius: 10px;
      gap: 10px;
      
      &:hover {
        transform: translateX(3px);
      }
      
      &::before {
        display: none;
      }
      .card-header {
        gap: 8px;
        .version-number {
          font-size: 16px;
        }
        .release-date {
          font-size: 12px;
        }
      }
      .card-body {
        gap: 10px;
        .change-category {
          h3 {
            font-size: 13px;
            margin-bottom: 6px;
          }
          ul li {
            font-size: 12px;
            padding-left: 13px;
            &::before {
              width: 4px;
              height: 4px;
              top: 7px;
            }
          }
        }
      }
    }
  }
}
</style> 