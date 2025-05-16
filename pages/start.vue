<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '极物聊天 - 开始'
})

import { Download } from '@element-plus/icons-vue'

const downloadWindows = () => {
  ElMessage.success('开始下载 Windows 版本')
  // TODO: Implement actual download
}

const downloadMacOS = () => {
  ElMessage.success('开始下载 macOS 版本')
  // TODO: Implement actual download
}

const downloadLinux = () => {
  ElMessage.success('开始下载 Linux 版本')
  // TODO: Implement actual download
}

const handleWebExperience = () => {
  window.open('https://jiwuchat.kiwi233.top', '_blank')
}
</script>

<template>
  <div class="start-page">
    <div class="container">
      <h1 class="page-title">开始使用</h1>
      
      <div class="installation-steps">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>下载安装包</h3>
          <p>选择适合您系统的安装包下载：</p>
          <div class="download-options">
            <el-button type="primary" @click="downloadWindows">
              <el-icon><Download /></el-icon>
              Windows
            </el-button>
            <el-button type="primary" @click="downloadMacOS">
              <el-icon><Download /></el-icon>
              macOS
            </el-button>
            <el-button type="primary" @click="downloadLinux">
              <el-icon><Download /></el-icon>
              Linux
            </el-button>
          </div>
        </div>
        
        <div class="step-card">
          <div class="step-number">2</div>
          <h3>安装应用</h3>
          <p>根据您的操作系统，按照以下步骤安装：</p>
          <div class="installation-instructions">
            <div class="os-tab">
              <h4>Windows</h4>
              <ol>
                <li>双击下载的 .exe 文件</li>
                <li>按照安装向导提示进行安装</li>
                <li>完成后即可启动应用</li>
              </ol>
            </div>
            <div class="os-tab">
              <h4>macOS</h4>
              <ol>
                <li>打开下载的 .dmg 文件</li>
                <li>将应用拖入 Applications 文件夹</li>
                <li>首次运行时点击"打开"确认</li>
              </ol>
            </div>
            <div class="os-tab">
              <h4>Linux</h4>
              <ol>
                <li>赋予执行权限：<code>chmod +x jiwu-chat.AppImage</code></li>
                <li>直接运行：<code>./jiwu-chat.AppImage</code></li>
                <li>或集成到系统菜单</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="step-card">
          <div class="step-number">3</div>
          <h3>开始使用</h3>
          <p>完成安装后：</p>
          <ol>
            <li>启动应用并注册/登录账号</li>
            <li>加入已有群聊或创建新的群聊</li>
            <li>开始与好友聊天、体验 AI 助手等功能</li>
          </ol>
          <el-button type="primary" class="start-button" @click="handleWebExperience">
            立即体验 Web 版
          </el-button>
        </div>
      </div>
      
      <div class="requirements">
        <h2>系统要求</h2>
        <div class="requirements-grid">
          <div class="requirement-card">
            <h4>Windows</h4>
            <ul>
              <li>Windows 10/11 64位</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
          <div class="requirement-card">
            <h4>macOS</h4>
            <ul>
              <li>macOS 11.0 或更高</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
          <div class="requirement-card">
            <h4>Linux</h4>
            <ul>
              <li>Ubuntu 20.04 或其他主流发行版</li>
              <li>4GB RAM</li>
              <li>500MB 存储空间</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-page {
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
    margin-bottom: 48px;
    text-align: center;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--text-color);
  }
  
  .installation-steps {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 64px;
    
    .step-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 32px;
      position: relative;
      
      .step-number {
        position: absolute;
        top: -20px;
        left: -20px;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
      
      h3 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 16px;
        color: var(--text-color);
      }
      
      p {
        font-size: 16px;
        color: var(--text-secondary);
        margin: 0 0 24px;
      }
      
      .download-options {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 24px;
        
        .el-button {
          min-width: 130px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          border: none;
          color: white;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }
          
          .el-icon {
            font-size: 16px;
            position: relative;
            z-index: 2;
            margin-right: 6px;
          }
          
          span {
            position: relative;
            z-index: 2;
          }
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(var(--gradient-start-rgb), 0.25);
            
            &::before {
              opacity: 1;
            }
          }
        }
      }

      .el-button + .el-button {
        margin-left: 0;
      }
      
      .installation-instructions {
        .os-tab {
          margin-bottom: 24px;
          
          h4 {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-color);
            margin: 0 0 12px;
          }
          
          ol {
            margin: 0;
            padding-left: 20px;
            color: var(--text-secondary);
            
            li {
              margin-bottom: 8px;
              
              code {
                background: rgba(255, 255, 255, 0.1);
                padding: 2px 6px;
                border-radius: 4px;
                font-family: monospace;
              }
            }
          }
        }
      }
      
      ol {
        color: var(--text-secondary);
        margin: 0 0 24px;
        padding-left: 20px;
        
        li {
          margin-bottom: 8px;
        }
      }
      
      .start-button {
        width: 100%;
        height: 48px !important;
        border-radius: 8px !important;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) !important;
        border: none !important;
        color: white !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        span {
          position: relative;
          z-index: 2;
        }
        
        &:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(var(--gradient-start-rgb), 0.3) !important;
          
          &::before {
            opacity: 1;
          }
        }
      }
    }
  }
  
  .requirements {
    h2 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 32px;
      text-align: center;
      color: var(--text-color);
    }
    
    .requirements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      
      .requirement-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 24px;
        
        h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-color);
          margin: 0 0 16px;
        }
        
        ul {
          margin: 0;
          padding-left: 20px;
          color: var(--text-secondary);
          
          li {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .start-page {
    padding: 40px 0;
    
    .page-title {
      font-size: 28px;
      margin-bottom: 32px;
    }
    
    .installation-steps {
      gap: 24px;
      margin-bottom: 48px;
      
      .step-card {
        padding: 24px;
        
        .step-number {
          top: -16px;
          left: -16px;
          width: 32px;
          height: 32px;
          font-size: 16px;
        }
        
        h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }
        
        p {
          font-size: 14px;
          margin-bottom: 16px;
        }
      }
    }
    
    .requirements {
      h2 {
        font-size: 24px;
        margin-bottom: 24px;
      }
    }
  }
}
</style> 