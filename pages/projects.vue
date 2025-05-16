<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '极物聊天 - 项目'
})

import {
  User,
  Document,
  ChatDotRound,
  Download,
  Monitor,
  Lightning,
  Connection,
  Bell,
  Cpu,
  Setting,
  DataLine,
  Lock
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const visitProject = (project: string) => {
  switch (project) {
    case 'circle':
      window.open('https://circle.jiwuchat.com', '_blank')
      break
    case 'tauri':
      router.push('/jiwu-chat-tauri')
      break
    case 'electron':
      router.push('/jiwu-chat-electron')
      break
    case 'admin':
      router.push('/jiwu-admin')
      break
  }
}
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <h1 class="page-title">项目</h1>
      <p class="page-subtitle">探索极物生态的其他优秀项目</p>
      
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-header">
            <div class="project-icon">🌐</div>
            <h3>极物圈</h3>
            <div class="project-badge">社区</div>
          </div>
          <p class="project-description">
            一个面向开发者和用户的社区平台，分享使用心得，交流技术经验，共同成长。
          </p>
          <div class="project-features">
            <div class="feature">
              <el-icon><User /></el-icon>
              活跃用户 10K+
            </div>
            <div class="feature">
              <el-icon><Document /></el-icon>
              技术文章 1K+
            </div>
            <div class="feature">
              <el-icon><ChatDotRound /></el-icon>
              每日互动 5K+
            </div>
          </div>
          <div class="project-actions">
            <el-button type="primary" @click="visitProject('circle')">
              访问社区
            </el-button>
          </div>
        </div>
        
        <div class="project-card">
          <div class="project-header">
            <div class="project-icon">💻</div>
            <h3>极物聊天（Tauri）</h3>
            <div class="project-badge">桌面端</div>
          </div>
          <p class="project-description">
            基于 Tauri2 构建的轻量级桌面客户端，为 Windows、macOS 和 Linux 用户提供原生体验。
          </p>
          <div class="project-features">
            <div class="feature">
              <el-icon><Download /></el-icon>
              安装包 ~8MB
            </div>
            <div class="feature">
              <el-icon><Monitor /></el-icon>
              跨平台支持
            </div>
            <div class="feature">
              <el-icon><Lightning /></el-icon>
              极速启动
            </div>
          </div>
          <div class="project-actions">
            <el-button type="primary" @click="visitProject('tauri')">
              了解更多
            </el-button>
          </div>
        </div>
        
        <div class="project-card">
          <div class="project-header">
            <div class="project-icon">⚡</div>
            <h3>极物聊天（Electron）</h3>
            <div class="project-badge">桌面端</div>
          </div>
          <p class="project-description">
            基于 Electron 构建的功能完整版桌面客户端，提供更丰富的系统集成能力。
          </p>
          <div class="project-features">
            <div class="feature">
              <el-icon><Connection /></el-icon>
              系统集成
            </div>
            <div class="feature">
              <el-icon><Bell /></el-icon>
              通知中心
            </div>
            <div class="feature">
              <el-icon><Cpu /></el-icon>
              硬件加速
            </div>
          </div>
          <div class="project-actions">
            <el-button type="primary" @click="visitProject('electron')">
              了解更多
            </el-button>
          </div>
        </div>
        
        <div class="project-card">
          <div class="project-header">
            <div class="project-icon">🔧</div>
            <h3>极物后台系统</h3>
            <div class="project-badge">管理端</div>
          </div>
          <p class="project-description">
            强大的后台管理系统，提供用户管理、数据分析、系统配置等完整的管理功能。
          </p>
          <div class="project-features">
            <div class="feature">
              <el-icon><Setting /></el-icon>
              系统配置
            </div>
            <div class="feature">
              <el-icon><DataLine /></el-icon>
              数据分析
            </div>
            <div class="feature">
              <el-icon><Lock /></el-icon>
              权限管理
            </div>
          </div>
          <div class="project-actions">
            <el-button type="primary" @click="visitProject('admin')">
              了解更多
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="ecosystem-section">
        <h2>生态系统</h2>
        <p>我们正在构建一个完整的即时通讯生态系统，欢迎加入我们</p>
        <div class="ecosystem-stats">
          <div class="stat-item">
            <div class="stat-value">4+</div>
            <div class="stat-label">核心项目</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10K+</div>
            <div class="stat-label">活跃用户</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100+</div>
            <div class="stat-label">开源贡献者</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">1K+</div>
            <div class="stat-label">GitHub Stars</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects-page {
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
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
    margin-bottom: 64px;
  }
  
  .project-card {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 32px;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px var(--border-color);
    
    &:hover {
      transform: translateY(-4px);
      background: var(--hover-bg);
    }
    
    .project-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      
      .project-icon {
        font-size: 32px;
        margin-right: 8px;
      }
      
      h3 {
        font-size: 20px;
        font-weight: 600;
        color: var(--text-color);
        margin: 0;
      }
      
      .project-badge {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: #fff;
        font-size: 12px;
        border-radius: 8px;
        padding: 2px 10px;
        margin-left: 8px;
        white-space: nowrap;
      }
    }
    
    .project-description {
      color: var(--text-secondary);
      font-size: 15px;
      margin-bottom: 16px;
    }
    
    .project-features {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
      
      .feature {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--text-secondary);
        font-size: 14px;
        
        .el-icon {
          color: var(--gradient-start);
        }
      }
    }
    
    .project-actions {
      margin-top: 24px;
      
      .el-button {
        width: 100%;
        height: 44px;
      }
    }
  }
  
  .ecosystem-section {
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
      margin: 0 0 48px;
    }
    
    .ecosystem-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
      
      .stat-item {
        .stat-value {
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding: 40px 0;
    
    .page-title {
      font-size: 28px;
    }
    
    .page-subtitle {
      font-size: 16px;
      margin-bottom: 32px;
    }
    
    .projects-grid {
      gap: 24px;
      margin-bottom: 48px;
    }
    
    .ecosystem-section {
      padding: 40px 16px;
      
      h2 {
        font-size: 24px;
      }
      
      p {
        font-size: 14px;
        margin-bottom: 32px;
      }
      
      .ecosystem-stats {
        gap: 24px;
        
        .stat-item {
          .stat-value {
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style> 