<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 体验'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChatDotRound,
  Service as RobotIcon,
  VideoCamera,
  Monitor,
  Download,
  InfoFilled,
  Loading as LoadingIcon
} from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(true)
const demoFrame = ref<HTMLIFrameElement | null>(null)

const handleIframeLoad = () => {
  loading.value = false
}

const handleDownload = () => {
  router.push('/start')
}

const handleLearnMore = () => {
  router.push('/')
}
</script>

<template>
  <div class="experience-page">
    <div class="container">
      <h1 class="page-title">在线体验</h1>
      <p class="page-subtitle">无需下载，立即体验某某软件的强大功能</p>
      
      <div class="demo-section">
        <div class="demo-container">
          <div class="demo-header">
            <div class="demo-controls">
              <div class="control red"></div>
              <div class="control yellow"></div>
              <div class="control green"></div>
            </div>
            <div class="demo-title">某某软件 Web 版</div>
          </div>
          <div class="demo-content">
            <div class="loading-container" v-if="loading">
              <el-icon class="loading-icon"><LoadingIcon /></el-icon>
              <p>正在加载 Web 应用...</p>
            </div>
            <iframe
              v-else
              ref="demoFrame"
              src="https://jiwuchat.kiwi233.top"
              frameborder="0"
              @load="handleIframeLoad"
            ></iframe>
          </div>
        </div>
        
        <div class="features-list">
          <div class="feature-item">
            <el-icon class="feature-icon"><ChatDotRound /></el-icon>
            <div class="feature-content">
              <h3>即时通讯</h3>
              <p>体验流畅的一对一某某和群聊功能，支持文字、图片、文件等多种消息类型</p>
            </div>
          </div>
          
          <div class="feature-item">
            <el-icon class="feature-icon"><RobotIcon /></el-icon>
            <div class="feature-content">
              <h3>AI 助手</h3>
              <p>尝试与智能 AI 助手对话，体验 DeepSeek、讯飞星火等大模型的强大能力</p>
            </div>
          </div>
          
          <div class="feature-item">
            <el-icon class="feature-icon"><VideoCamera /></el-icon>
            <div class="feature-content">
              <h3>音视频通话</h3>
              <p>测试高清视频通话和语音通话功能，体验流畅的实时通讯体验</p>
            </div>
          </div>
          
          <div class="feature-item">
            <el-icon class="feature-icon"><Monitor /></el-icon>
            <div class="feature-content">
              <h3>屏幕共享</h3>
              <p>一键开启屏幕共享，支持全屏或应用窗口共享，适合远程协作</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <h2>准备好了吗？</h2>
        <p>下载桌面客户端，享受更完整的功能体验</p>
        <div class="cta-buttons">
          <el-button type="primary" class="warm-cta" @click="handleDownload">
            <el-icon><Download /></el-icon>
            下载客户端
          </el-button>
          <el-button @click="handleLearnMore" class="theme-text-btn">
            <el-icon><InfoFilled /></el-icon>
            了解更多
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.experience-page {
  padding: 80px 0;
  min-height: 100vh;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .page-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--text-color);
  }
  
  .page-subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 48px;
  }
  
  .demo-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 48px;
    margin-bottom: 64px;
    
    .demo-container {
      background: var(--card-bg) !important;
      border-radius: 12px;
      overflow: hidden;
      
      .demo-header {
        background: var(--header-bg) !important;
        opacity: 1 !important;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        
        .demo-controls {
          display: flex;
          gap: 8px;
          margin-right: 16px;
          
          .control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            
            &.red { background-color: #ff5f57; }
            &.yellow { background-color: #febc2e; }
            &.green { background-color: #28c840; }
          }
        }
        
        .demo-title {
          color: var(--text-color) !important;
          font-size: 14px;
        }
      }
      
      .demo-content {
        height: 600px;
        position: relative;
        
        .loading-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.7);
          z-index: 1;
          
          .loading-icon {
            font-size: 48px;
            color: var(--gradient-start);
            animation: spin 1s linear infinite;
          }
          
          p {
            margin-top: 16px;
            color: var(--text-secondary);
          }
        }
        
        iframe {
          width: 100%;
          height: 100%;
          background: transparent !important;
        }
      }
    }
    
    .features-list {
      display: flex;
      flex-direction: column;
      gap: 40px;
      
      .feature-item {
        display: flex;
        gap: 16px;
        padding: 24px;
        background: var(--card-bg) !important;
        opacity: 1 !important;
        border-radius: 12px;
        box-shadow: 0 4px 24px 0 rgba(var(--gradient-end-rgb), 0.08), 0 1.5px 8px 0 rgba(0,0,0,0.04);
        border: 1.5px solid var(--border-color);
        transition: box-shadow 0.05s cubic-bezier(.4,0,.6,1), transform 0.05s cubic-bezier(.4,0,.6,1), border-color 0.05s cubic-bezier(.4,0,.6,1);
        &:hover {
          background: var(--card-bg) !important;
          opacity: 1 !important;
          box-shadow: 0 8px 40px 0 rgba(var(--gradient-end-rgb), 0.16), 0 2px 12px 0 rgba(0,0,0,0.08);
          transform: translateY(-3px) scale(1.025);
          border-color: var(--gradient-start);
        }
        .feature-icon {
          font-size: 24px;
          color: var(--gradient-start);
        }
        .feature-content {
          h3 {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-color);
            margin: 0 0 8px;
          }
          p {
            font-size: 14px;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.6;
          }
        }
      }
    }
  }
  
  .cta-section {
    text-align: center;
    padding: 64px 0;
    background: var(--card-bg);
    border-radius: 12px;
    
    h2 {
      font-size: 28px;
      font-weight: bold;
      color: var(--text-color);
      margin: 0 0 16px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    p {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0 0 32px;
    }
    
    .cta-buttons {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 32px;
      
      .el-button {
        min-width: 160px;
        height: 48px;
        font-size: 16px;
        padding: 0 28px;
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        
        .el-button {
          width: 100%;
        }
      }
    }
  }
}

:deep(.warm-cta.el-button--primary) {
  background: #c96442 !important;
  border-color: #c96442 !important;
  color: #faf9f5 !important;
  box-shadow: 0 0 0 1px #c96442 !important;
}

:deep(.warm-cta.el-button--primary:hover) {
  box-shadow: 0 0 0 1px #d1cfc5 !important;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 992px) {
  .experience-page {
    .demo-section {
      grid-template-columns: 1fr;
      gap: 32px;
      
      .demo-container {
        .demo-content {
          height: 400px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .experience-page {
    padding: 40px 0;
    
    .page-title {
      font-size: 28px;
    }
    
    .page-subtitle {
      font-size: 16px;
      margin-bottom: 32px;
    }
    
    .demo-section {
      margin-bottom: 48px;
      
      .demo-container {
        .demo-content {
          height: 300px;
        }
      }
    }
    
    .cta-section {
      padding: 40px 16px;
      
      h2 {
        font-size: 24px;
      }
      
      p {
        font-size: 14px;
        margin-bottom: 24px;
      }
      
      .cta-buttons {
        flex-direction: column;
        
        .el-button {
          width: 100%;
        }
      }
    }
  }
}

.theme-text-btn {
  color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  background: transparent !important;
  &:hover,
  &:focus,
  &:active {
    color: #fff !important;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) !important;
    border-color: var(--gradient-end) !important;
  }
}
</style> 