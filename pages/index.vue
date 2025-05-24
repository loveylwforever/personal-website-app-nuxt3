<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 首页'
})

import { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { useLayoutStore } from '~/stores/layout'
import { useMouseInElement } from '@vueuse/core'
import { ArrowDown, Monitor, Picture } from '@element-plus/icons-vue'
import Browser from '~/assets/icons/brower.vue'
import Download from '~/assets/icons/download.vue'
import { ElMessage } from 'element-plus/es/components/message'
import { useRouter } from 'vue-router'
import { detectOS, getPreferredDownloadPlatform, getPlatformDisplay, getPlatformButtonClass, type Platform } from '~/utils/platformDetect'
import Three3DParticles from '~/components/Three3DParticles.vue'

const layoutStore = useLayoutStore()
const router = useRouter()
const isAlternativeLayout = computed(() => layoutStore.layout === 'alternative')

// 主题状态 - 使用Nuxt的ColorMode
const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value)

// 添加客户端专用的状态
const isClientSide = ref(process.client)
const isInitialized = ref(false)

// 用户平台状态 - 设置默认值
const currentPlatform = ref<Platform>('windows') // 默认为windows
const preferredDownloadPlatform = ref<Platform>('windows') // 默认为windows
const platformDisplay = computed(() => getPlatformDisplay(preferredDownloadPlatform.value))
const platformButtonClass = computed(() => getPlatformButtonClass(preferredDownloadPlatform.value))

// 共用状态
const screenshotWrapper = ref<HTMLElement | null>(null)
const showOtherDownloads = ref(false)

// 3D hover effect 相关变量
let currentX = 0
let currentY = 0
let targetX = 0
let targetY = 0
let animating = false

// 下载选项
const downloadOptions = [
  { id: 'windows', name: 'Windows', description: 'Windows 10/11 x64/ARM64 安装包', emoji: '🪟', icon: 'windows-icon' },
  { id: 'macos', name: 'macOS', description: 'Intel & Apple Silicon 通用版本', emoji: '🍎', icon: 'macos-icon' },
  { id: 'linux', name: 'Linux', description: 'AppImage 格式，适用于大多数发行版', emoji: '🐧', icon: 'linux-icon' },
  { id: 'android', name: 'Android', description: 'APK 安装包，支持 Android 8.0+', emoji: '📱', icon: 'android-icon' },
  { id: 'ios', name: 'iOS', description: 'TestFlight 测试版，支持 iOS 14+', emoji: '🍏', icon: 'ios-icon' }
]

// 确保全文定义正确
const fullText = '某某软件'

// 打字机效果相关变量 (仅在默认布局中使用)
const typewriterChars = ref<string[]>([])
const typewriterVisible = ref<boolean[]>([])
let typewriterFrame: number | null = null
const typewriterIndex = ref(0)
const typewriterPhase = ref<'typing' | 'pausingAfterTyping' | 'deleting' | 'pausingAfterDeleting'>('typing')
let lastFrameTime = 0

const TYPING_INTERVAL = 140 // ms
const DELETING_INTERVAL = 90 // ms，略微放慢删除速度
const PAUSE_AFTER_TYPING = 1500 // ms，延长完整显示的停留时间
const PAUSE_AFTER_DELETING = 700 // ms，延长空白状态的停留时间

// 打字机动画函数
const runTypewriterRAF = (now = performance.now()) => {
  if (!typewriterFrame) return
  
  if (typewriterPhase.value === 'typing') {
    if (now - lastFrameTime >= TYPING_INTERVAL) {
      if (typewriterIndex.value < fullText.length) {
        // 设置字符并立即显示，不使用setTimeout
        typewriterChars.value[typewriterIndex.value] = fullText[typewriterIndex.value]
        typewriterVisible.value[typewriterIndex.value] = true
        
        typewriterIndex.value++
        lastFrameTime = now
      } else {
        typewriterPhase.value = 'pausingAfterTyping'
        lastFrameTime = now
      }
    }
  } else if (typewriterPhase.value === 'pausingAfterTyping') {
    if (now - lastFrameTime >= PAUSE_AFTER_TYPING) {
      typewriterPhase.value = 'deleting'
      lastFrameTime = now
    }
  } else if (typewriterPhase.value === 'deleting') {
    if (now - lastFrameTime >= DELETING_INTERVAL) {
      if (typewriterIndex.value > 0) {
        typewriterIndex.value--
        
        // 设置不可见（触发淡出动画）
        typewriterVisible.value[typewriterIndex.value] = false
        
        // 等待淡出动画完成后再清空字符
        setTimeout(() => {
          if (typewriterChars.value && typewriterIndex.value < typewriterChars.value.length) {
            typewriterChars.value[typewriterIndex.value] = ''
          }
        }, 400)
        
        lastFrameTime = now
      } else {
        typewriterPhase.value = 'pausingAfterDeleting'
        lastFrameTime = now
      }
    }
  } else if (typewriterPhase.value === 'pausingAfterDeleting') {
    if (now - lastFrameTime >= PAUSE_AFTER_DELETING) {
      typewriterPhase.value = 'typing'
      lastFrameTime = now
    }
  }
  
  typewriterFrame = requestAnimationFrame(runTypewriterRAF)
}

// 3D动画效果
const animateScreenshot = () => {
  if (!screenshotWrapper.value) return
  // 缓动到目标值
  currentX += (targetX - currentX) * 0.15
  currentY += (targetY - currentY) * 0.15

  // 降低旋转和阴影参数
  const rotateX = currentY * 8
  const rotateY = currentX * 8
  const shadowX = currentX * 12
  const shadowY = currentY * 12
  const shadowBlur = 32 + Math.abs(shadowX) + Math.abs(shadowY)

  screenshotWrapper.value.style.transform = `
    perspective(1000px)
    rotateX(${-rotateX}deg)
    rotateY(${-rotateY}deg)
    scale(1.01)
    translateZ(10px)
  `
  screenshotWrapper.value.style.boxShadow = `
    ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(0,0,0,0.12),
    0 0 16px rgba(var(--gradient-start-rgb), 0.10)
  `
  if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
    requestAnimationFrame(animateScreenshot)
  } else {
    animating = false
  }
}

const setupScreenshotHoverEffect = () => {
  if (screenshotWrapper.value) {
    screenshotWrapper.value.style.willChange = 'transform, box-shadow'
    const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(screenshotWrapper.value)
    watch([elementX, elementY, isOutside], () => {
      if (!screenshotWrapper.value) return
      if (isOutside.value) {
        targetX = 0
        targetY = 0
      } else {
        // 归一化到 -1~1
        targetX = ((elementX.value || 0) / (elementWidth.value || 1)) * 2 - 1
        targetY = ((elementY.value || 0) / (elementHeight.value || 1)) * 2 - 1
      }
      if (!animating) {
        animating = true
        requestAnimationFrame(animateScreenshot)
      }
    })
  }
}

// 平台检测和下载处理函数
const detectPlatform = () => {
  // 仅在客户端执行
  if (!isClientSide.value) return

  try {
    const detectedPlatform = detectOS()
    const preferredPlatform = getPreferredDownloadPlatform()
    // 设置当前检测到的平台
    currentPlatform.value = detectedPlatform
    preferredDownloadPlatform.value = preferredPlatform
    isInitialized.value = true
  } catch (error) {
    // 设置默认平台为 Windows
    preferredDownloadPlatform.value = 'windows'
    isInitialized.value = true
  }
}

// 下载处理函数
const handleDownload = (command: string) => {
  ElMessage.success(`开始下载 ${command} 版本`)
  // 实际下载逻辑
}

const downloadForPlatform = (platform: Platform = preferredDownloadPlatform.value) => {
  ElMessage.success(`开始下载 ${getPlatformDisplay(platform)} 版本`)
  // 实际下载逻辑
  
  // 根据不同平台执行不同的下载操作
  switch (platform) {
    case 'windows':
      // Windows下载逻辑
      break
    case 'macos':
      // macOS下载逻辑
      break
    case 'linux':
      // Linux下载逻辑
      break
    default:
      // 其他平台处理
      break
  }
}

const downloadWindows = () => {
  downloadForPlatform('windows')
}

const downloadMac = () => {
  downloadForPlatform('macos')
}

const downloadLinux = () => {
  downloadForPlatform('linux')
}

const handleWebExperience = () => {
  window.open('https://jiwuchat.kiwi233.top', '_blank')
}

const openWebVersion = () => {
  router.push('/experience')
}

const downloadFile = (id: string) => {
  const option = downloadOptions.find(opt => opt.id === id)
  if (option) {
    downloadForPlatform(id as Platform)
  }
}

// 首次加载时立即检测平台
if (isClientSide.value) {
  detectPlatform()
}

onMounted(() => {
  // 初始化数据
  initializeTypewriter()
  
  // 确保在客户端再次检测平台，防止首次检测不准确
  if (isClientSide.value) {
    detectPlatform()
  }
  
  // 设置一个短暂的延迟再次初始化，确保DOM已完全渲染
  setTimeout(() => {
    // 无论哪种布局都重新初始化打字机效果
    initializeTypewriter()
    
    // 确保DOM完全渲染后设置3D悬停效果
    setupScreenshotHoverEffect()
  }, 100)
})

// 优化初始化函数
const initializeTypewriter = () => {
  // 重置为正确长度的数组
  typewriterChars.value = new Array(fullText.length).fill('')
  typewriterVisible.value = new Array(fullText.length).fill(false)
  typewriterIndex.value = 0
  typewriterPhase.value = 'typing'
  lastFrameTime = performance.now()
  
  if (typewriterFrame) {
    cancelAnimationFrame(typewriterFrame)
    typewriterFrame = null
  }
  
  // 延迟一帧启动动画，确保状态已更新
  requestAnimationFrame(() => {
    typewriterFrame = requestAnimationFrame(runTypewriterRAF)
  })
}

// 监听布局变化
watch(() => layoutStore.layout, (newLayout) => {
  // 在布局变化时，重新初始化打字机效果
  initializeTypewriter()
  // 添加延迟以确保DOM更新后再设置3D效果
  setTimeout(() => {
    // 在布局变化时，重新设置3D悬停效果
    setupScreenshotHoverEffect()
  }, 100)
})

onUnmounted(() => {
  // 清理动画帧
  if (typewriterFrame) {
    cancelAnimationFrame(typewriterFrame)
    typewriterFrame = null
  }
})
</script>

<template>
  <div :class="[isAlternativeLayout ? 'home-centered' : 'home-page']">
    <!-- 居中布局(alternative) -->
    <template v-if="isAlternativeLayout">
      <div class="hero-section">
        <h1 class="title">
          <template v-for="(char, i) in typewriterChars" :key="i">
            <span class="type-char" :class="{ visible: typewriterVisible[i] }">{{ char }}</span>
          </template>
        </h1>
        <p class="subtitle">一个轻量的某某软件</p>
        
        <div class="description">
          一款基于 Tauri2 和 Nuxt3 构建的轻量级（~ 8 MB）客户端即时通讯应用，配合 AI 群聊机器人（如 DeepSeek、讯飞星火）、WebRTC 音视频通话，屏幕共享和 AI 视频物服...
        </div>
        
        <div class="action-buttons">
          <el-dropdown trigger="click" class="download-dropdown">
            <el-button type="primary" :class="`download-button ${platformButtonClass}`">
              <Download />
              {{ platformDisplay }}
              <el-icon class="arrow"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a href="#" class="dropdown-link" @click="downloadWindows">
                    <el-icon><Monitor /></el-icon>
                    Windows
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#" class="dropdown-link" @click="downloadMac">
                    <el-icon><Monitor /></el-icon>
                    macOS
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#" class="dropdown-link" @click="downloadLinux">
                    <el-icon><Monitor /></el-icon>
                    Linux
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <el-button class="web-button" @click="openWebVersion">
            <el-icon><Browser /></el-icon>
            Web端体验
          </el-button>
        </div>
        
        <div class="other-info" @click="showOtherDownloads = true" style="cursor:pointer;">其他版本下载</div>
      </div>
      
      <div class="preview-section">
        <div class="preview-image" ref="screenshotWrapper">
          <div class="screenshot-glow"></div>
          <el-image 
            class="app-screenshot" 
            src="/preview-1.png" 
            fit="cover"
            alt="JiWu Chat Application Screenshot">
            <template #error>
              <div class="image-placeholder">
                <el-icon><Picture /></el-icon>
                <p>示例截图</p>
              </div>
            </template>
          </el-image>
        </div>
      </div>
    </template>
    
    <!-- 默认布局 -->
    <template v-else>
      <main class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-title-container">
              <div class="hero-title-glow"></div>
              <h1 class="hero-title">
                <template v-for="(char, i) in typewriterChars" :key="i">
                  <span class="type-char" :class="{ visible: typewriterVisible[i] }">{{ char }}</span>
                </template>
              </h1>
            </div>
            <h2 class="hero-tagline">一个轻量的某某软件</h2>
            <p class="hero-description">
              一款基于 <span class="highlight">Tauri2</span> 和 <span class="highlight">Nuxt3</span> 
              构建的轻量级 (≈ 8 MB) 多平台即时通讯应用，配备 AI 群聊机器人（如 <span class="highlight">DeepSeek</span>、讯飞星火）、
              <span class="highlight">WebRTC</span> 音视频通话，屏幕共享和 AI 购物客服...
            </p>
            <div class="download-buttons">
              <el-dropdown trigger="click" @command="handleDownload">
                <el-button :class="`download-button ${platformButtonClass}`">
                  <Download />
                  {{ platformDisplay }}
                  <el-icon class="arrow-icon"><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="macos">Apple Silicon 版本</el-dropdown-item>
                    <el-dropdown-item command="macos-intel">Intel 版本</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              
              <el-button type="primary" class="download-button web-button" @click="handleWebExperience">
                <el-icon><Browser /></el-icon>
                Web端体验
              </el-button>
            </div>
            <p class="other-downloads" @click="showOtherDownloads = true">其他版本下载</p>
          </div>
          <div class="app-screenshot-container">
            <div class="screenshot-wrapper" ref="screenshotWrapper">
              <div class="screenshot-glow"></div>
              <el-image 
                class="app-screenshot" 
                src="/preview-1.png" 
                fit="cover"
                alt="JiWu Chat Application Screenshot">
                <template #error>
                  <div class="image-placeholder">
                    <el-icon><Picture /></el-icon>
                    <p>示例截图</p>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">功能特点</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>多平台轻量架构</h3>
              <p>基于 Tauri2 + Nuxt3 构建，安装包仅 ~8MB，支持 Android/Windows/macOS/Linux/Web 等平台</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">💬</div>
              <h3>智能消息中枢</h3>
              <p>基于 WebSocket 实现，支持图片、视频、文件、语音、@用户等消息推拉机制，完整消息交互体系</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h3>AI增强通信</h3>
              <p>集成 DeepSeek、讯飞星火、KimiAI 等大模型，支持群聊AI助手、AI商品智能客服等功能</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📞</div>
              <h3>实时互动系统</h3>
              <p>基于 WebRTC 的语音视频通话、屏幕共享功能，支持设备监测和切换</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>个性化体验</h3>
              <p>全局深色模式、自定义通知音效、下载路径设置、界面主题定制等个性化功能</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🔌</div>
              <h3>可扩展</h3>
              <p>集成扩展插件机制，待支持插件开发、安装、更新、卸载等功能</p>
            </div>
          </div>
        </div>
      </section>
    </template>
    
    <!-- 通用的下载对话框 -->
    <el-dialog
      v-model="showOtherDownloads"
      title="选择下载版本"
      width="600px"
      class="download-dialog"
    >
      <div class="download-options">
        <div class="download-option" v-for="option in downloadOptions" :key="option.id">
          <div class="option-info">
            <div class="option-icon" :class="option.icon">{{ option.emoji }}</div>
            <div class="option-details">
              <h4>{{ option.name }}</h4>
              <p>{{ option.description }}</p>
            </div>
          </div>
          <el-badge 
            v-if="option.id === preferredDownloadPlatform" 
            value="推荐" 
            :offset="[5, -5]"
            class="download-badge"
          >
            <el-button 
              type="primary" 
              size="default" 
              @click="downloadFile(option.id)"
              :class="{ 'recommended-platform': option.id === preferredDownloadPlatform }"
            >
              <Download />
              下载
            </el-button>
          </el-badge>
          <el-button 
            v-else
            type="primary" 
            size="default" 
            @click="downloadFile(option.id)"
          >
            <Download />
            下载
          </el-button>
        </div>
      </div>
    </el-dialog>
    
    <!-- 3D粒子背景 - 直接传递当前主题 -->
    <Three3DParticles :theme="colorMode.value" class="particles-background" />
  </div>
</template>

<style lang="scss" scoped>
/* 粒子背景样式 */
.particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 放在所有内容之后 */
  pointer-events: none; /* 确保不干扰用户交互 */
  opacity: 0.8; /* 稍微调低透明度，使其更像背景 */
}

/* 移动端粒子背景适配 */
@media (max-width: 768px) {
  .particles-background {
    opacity: 0.6; /* 在移动端进一步降低不透明度，减少视觉干扰 */
  }
}

/* 居中布局样式 */
.home-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 100vh;
  padding: 20px;
  
  .hero-section {
    max-width: 640px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    text-align: center;
    position: relative;
    
    .title {
      font-size: 48px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
      position: relative;
      display: flex;
      justify-content: center;
      
      .type-char {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        
        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    
    .subtitle {
      font-size: 24px;
      color: var(--text-color);
      margin-bottom: 24px;
    }
    
    .description {
      font-size: 16px;
      color: var(--text-secondary);
      margin-bottom: 32px;
      max-width: 600px;
      line-height: 1.6;
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      
      .download-button, .web-button {
        height: 44px;
        border-radius: 8px;
        padding: 0 20px;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        
        .el-icon {
          margin-right: 8px;
          font-size: 18px;
        }
        
        :deep(.download-icon) {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
        
        .arrow {
          margin-left: 6px;
          font-size: 14px;
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
      }
      
      /* 通用平台按钮样式 */
      .download-button {
        &.windows-button {
          background: var(--gradient-start);
          border: none;
          color: white;
          
          &:hover {
            background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
          }
        }
        
        &.macos-button {
          background: var(--gradient-start);
          border: none;
          color: white;
          
          &::before {
            opacity: 0;
            background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
          }
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
            
            &::before {
              opacity: 1;
            }
          }
        }
        
        &.linux-button {
          background: var(--gradient-start);
          border: none;
          color: white;
          
          &::before {
            opacity: 0;
            background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
          }
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
            
            &::before {
              opacity: 1;
            }
          }
        }
        
        &.unknown-button {
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          border: none;
          color: white;
          
          &:hover {
            opacity: 0.9;
          }
        }
      }
      
      .web-button {
        background: rgba(var(--gradient-start-rgb), 0.1);
        border: 2px solid var(--gradient-start);
        color: var(--gradient-start);
        
        .el-icon {
          font-size: 20px;
          margin-right: 10px;
        }
        
        :deep(.browser-icon) {
          margin-right: 0;
          width: auto;
          height: auto;
        }
        
        &:hover {
          background: var(--gradient-start);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
        }
      }
    }
    
    .other-info {
      font-size: 14px;
      color: var(--text-tertiary);
      text-decoration: underline;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--text-secondary);
      }
    }
  }
  
  .preview-section {
    margin-top: 40px; // 减小顶部间距
    width: 100%;
    max-width: 1400px; // 增加最大宽度
    padding: 0 24px; // 添加水平内边距
    
    .preview-image {
      position: relative;
      width: 95%; // 增加宽度占比
      max-width: 1200px; // 增加最大宽度
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      transform-style: preserve-3d;
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      will-change: transform, box-shadow;
      backface-visibility: hidden;
      
      .screenshot-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150%;
        height: 150%;
        background: radial-gradient(
          circle,
          rgba(var(--gradient-start-rgb), 0.2) 0%,
          rgba(var(--gradient-start-rgb), 0.1) 30%,
          transparent 70%
        );
        opacity: 0;
        filter: blur(40px);
        z-index: -1;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      &:hover .screenshot-glow {
        opacity: 0.4;
      }
      
      .image-placeholder {
        width: 100%;
        height: 600px; // 增加占位符高度
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.5);
        
        .el-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
      }
      
      .app-screenshot {
        width: 100%;
        height: auto;
        display: block;
        transform: translateZ(0);
        backface-visibility: hidden;
        transition: transform 0.2s ease;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    
    .hero-section {
      margin-top: 40px;
      
      .title {
        font-size: 36px;
      }
      
      .subtitle {
        font-size: 20px;
      }
      
      .description {
        font-size: 14px;
        margin-bottom: 24px;
      }
      
      .action-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 320px;
        gap: 12px;
        
        .download-dropdown {
          width: 100%;
          
          .el-button {
            width: 100%;
          }
        }
        
        .download-button, .web-button {
          width: 100%;
          height: 44px;
          padding: 0 16px;
          font-size: 16px;
        }
      }
    }
    
    .preview-section {
      margin-top: 24px;
      padding: 0 16px;
      
      .preview-image {
        width: 100%;
        
        .image-placeholder {
          height: 400px;
        }
      }
    }
  }
}

/* 默认布局样式 */
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  .hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    position: relative;
    overflow: visible;

    .container {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      width: 100%;
      gap: 48px;
    }

    .hero-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      min-width: 0;
      z-index: 1;
    }

    .hero-title-container {
      position: relative;
      display: block;
      margin-bottom: 32px;
      min-height: 80px;
      width: 100%;
      z-index: 1;
      .hero-title-glow {
        display: none;
      }
      .hero-title {
        position: relative;
        z-index: 2;
        opacity: 0;
        animation: fadeIn 1s ease-in 0.2s forwards;
        color: var(--text-color);
        font-size: 56px;
        font-weight: 900;
        text-align: left;
        letter-spacing: 2px;
        line-height: 1.1;
        text-shadow: none;
        transition: font-size 0.3s;
        word-break: break-all;
        display: block !important; /* 强制使用block显示 */
        
        .type-char {
          position: relative;
          z-index: 3;
          opacity: 0;
          color: var(--text-color);
          font-weight: 900;
          transition: opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          display: inline-block;
          min-width: 1px; /* 确保即使为空也占据空间 */
          
          &.visible {
            opacity: 1;
          }
        }
      }
    }
    
    .hero-tagline {
      font-size: 24px;
      color: var(--text-color);
      margin: 0 0 24px;
    }
    
    .hero-description {
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 0 32px;
      
      .highlight {
        color: var(--gradient-start);
        font-weight: 500;
      }
    }
    
    .download-buttons {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      
      .download-button, .web-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 0 28px;
        height: 48px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        min-width: 160px;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        :deep(.download-icon), .arrow-icon, .web-icon {
          font-size: 18px;
          position: relative;
          z-index: 1;
        }
        
        span {
          position: relative;
          z-index: 1;
        }
      }
      
      .download-button.windows-button {
        background: var(--gradient-start);
        border: none;
        color: white;
        
        &::before {
          opacity: 0;
          background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
          
          &::before {
            opacity: 1;
          }
        }
        
        /* 下载图标样式由组件内部控制 */
        
        .arrow-icon {
          margin-left: 8px;
          font-size: 14px;
        }
      }
      
      .download-button.macos-button {
        background: rgba(var(--gradient-start-rgb), 0.1);
        border: 2px solid var(--gradient-start);
        color: var(--gradient-start);
        
        &::before {
          opacity: 0;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        }
        
        &:hover {
          background: var(--gradient-start);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
        }
      }
      
      .download-button.linux-button {
        background: var(--gradient-start);
        border: none;
        color: white;
        
        &::before {
          opacity: 0;
          background: linear-gradient(135deg, var(--gradient-end), var(--gradient-start));
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
          
          &::before {
            opacity: 1;
          }
        }
      }
      
      .download-button.unknown-button {
        background: var(--gradient-start);
        border: none;
        color: white;
      }
      
      .web-button {
        background: rgba(var(--gradient-start-rgb), 0.1);
        border: 2px solid var(--gradient-start);
        color: var(--gradient-start);
        
        .el-icon {
          font-size: 20px;
          margin-right: 10px;
        }
        
        :deep(.browser-icon) {
          margin-right: 0;
          width: auto;
          height: auto;
        }
        
        &:hover {
          background: var(--gradient-start);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--gradient-start-rgb), 0.25);
        }
      }
    }
    
    .other-downloads {
      color: var(--text-secondary);
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--text-color);
      }
    }
    
    .app-screenshot-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      min-width: 0;
      z-index: 0;
      .screenshot-wrapper {
        position: relative;
        width: 80%;
        max-width: 480px;
        border-radius: 12px;
        overflow: hidden;
        transform-style: preserve-3d;
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 1.5px solid var(--border-color);
        background: var(--card-bg);
        .screenshot-glow {
          display: none;
        }
        .app-screenshot {
          width: 100%;
          height: auto;
          display: block;
          transform: translateZ(0);
        }
        .image-placeholder {
          width: 100%;
          height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          
          .el-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
        }
      }
    }
  }

  .features-section {
    background-color: var(--bg-darker);
    background-image: radial-gradient(ellipse at top left, rgba(var(--gradient-start-rgb), 0.15) 0%, transparent 65%);
    padding: 80px 0;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
      color: var(--text-color);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 32px;
    }

    .feature-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 32px 24px;
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 1;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-color: var(--gradient-start);
      }
      
      .feature-icon {
        font-size: 36px;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 20px;
        margin-bottom: 12px;
        color: var(--text-color);
      }
      
      p {
        font-size: 15px;
        line-height: 1.6;
        color: var(--text-secondary);
      }
    }
  }
}

/* 居中布局 */
.home-centered .hero-section .title {
  position: relative;
  display: inline-flex;
  align-items: center;
  
  .cursor-alt {
    display: none;
  }
}

/* 更新淡入动画，使用更平滑的缓动函数 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .home-page {
    .hero-section {
      padding: 40px 0;
      
      .container {
        flex-direction: column;
        gap: 24px;
      }
      
      .hero-title-container {
        margin-bottom: 20px;
        
        .hero-title {
          font-size: 42px;
          text-align: center;
        }
      }
      
      .hero-tagline {
        font-size: 20px;
        margin-bottom: 16px;
        text-align: center;
        width: 100%;
      }
      
      .hero-description {
        font-size: 14px;
        margin-bottom: 24px;
        text-align: center;
        width: 100%;
      }
      
      .download-buttons {
        width: 100%;
        flex-direction: column;
        gap: 16px;
        
        .download-button, .web-button {
          width: 100%;
          height: 44px;
        }
      }
      
      .other-downloads {
        text-align: center;
        width: 100%;
      }
      
      .app-screenshot-container {
        width: 100%;
        
        .screenshot-wrapper {
          width: 100%;
          max-width: 100%;
        }
      }
    }
    
    .features-section {
      padding: 40px 0;
      
      .section-title {
        font-size: 28px;
        margin-bottom: 32px;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
  }
  
  .home-centered {
    padding: 16px;
    
    .hero-section {
      margin-top: 40px;
      
      .title {
        font-size: 36px;
      }
      
      .subtitle {
        font-size: 20px;
      }
      
      .description {
        font-size: 14px;
        margin-bottom: 24px;
      }
      
      .action-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 320px;
        gap: 12px;
        
        .download-dropdown {
          width: 100%;
          
          .el-button {
            width: 100%;
          }
        }
        
        .download-button, .web-button {
          width: 100%;
          height: 44px;
          padding: 0 16px;
          font-size: 16px;
        }
      }
    }
  }
}

/* 添加一个全局样式覆盖，确保文字在两种模式下都清晰可见 */
.home-page, .home-centered {
  .hero-title, .title {
    color: var(--text-color);
    font-weight: 900;
  }
}

/* 单独设置暗色模式的样式 */
html.dark {
  .home-page, .home-centered {
    .hero-title, .title, .type-char {
      color: #fff;
    }
  }
}

/* Badge样式自定义 */
:deep(.el-badge) {
  --el-badge-bg-color: var(--gradient-start);
  --el-badge-radius: 4px;
  
  .el-badge__content {
    font-size: 10px;
    padding: 1px 5px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }
}

/* 修改主内容容器样式，确保内容正常显示 */
.home-centered, .home-page {
  position: relative;
  isolation: isolate; /* 创建新的层叠上下文 */
}

/* 共用样式 */
.download-dialog {
  .download-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .download-option {
    background: var(--card-bg);
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    padding: 20px 18px 16px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 140px;
    transition: box-shadow 0.22s cubic-bezier(.4,1.01,.32,1), transform 0.22s cubic-bezier(.4,1.01,.32,1);
    border: 1.5px solid var(--border-color);
    position: relative;
    overflow: visible !important;
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }
    
    &:hover {
      box-shadow: 0 6px 24px rgba(var(--gradient-end-rgb), 0.10);
      transform: translateY(-3px) scale(1.025);
      border-color: var(--gradient-start);
      
      .el-button {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        border-color: transparent;
        color: #FFFFFF;
      }
    }
    .option-info {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
      .option-icon {
        font-size: 32px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
      }
      .option-details {
        flex: 1;
        min-width: 0;
        h4 {
          font-size: 16px;
          margin: 0 0 4px;
          font-weight: 600;
          color: var(--text-color);
        }
        p {
          font-size: 13px;
          margin: 0;
          color: var(--text-secondary);
          white-space: normal;
          line-height: 1.4;
        }
      }
    }
    
    .download-badge {
      align-self: flex-end;
    }
    
    .el-button {
      align-self: flex-end;
      transition: all 0.3s ease;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .el-icon {
        font-size: 14px;
        margin-right: 6px;
        transform: scale(0.9);
      }
      
      :deep(.download-icon) {
        width: 16px;
        height: 16px;
        transform: scale(0.85);
        margin-right: 6px;
      }
      
      &.recommended-platform {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        border-color: transparent;
        position: relative;
      }
    }
  }
  
  // 添加移动端适配
  @media (max-width: 550px) {
    .download-options {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
    }
    
    .download-option {
      min-height: 120px;
    }
  }
}

:deep(.el-dialog) {
  --el-dialog-margin-top: 20vh;
  border-radius: 16px;
  background: 
    linear-gradient(var(--bg-color), var(--bg-color)) padding-box,
    linear-gradient(135deg, var(--gradient-start), var(--gradient-end)) border-box;
  border: 2px solid transparent;
  overflow: visible;
  position: relative;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.15), 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  color: var(--text-color);
  
  .el-dialog__content {
    width: 100%;
    overflow: visible;
  }
  
  .el-dialog__header {
    border-bottom: 1px solid var(--border-color);
    padding: 20px;
    margin-right: 0;
    position: relative;
    
    .el-dialog__title {
      font-weight: 600;
      font-size: 18px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .el-dialog__body {
    padding: 24px;
    position: relative;
  }
  
  @media (max-width: 768px) {
    --el-dialog-margin-top: 10vh;
    border-radius: 14px;
    border-width: 2px;
    width: 95% !important;
    max-width: 500px !important;
    
    .el-dialog__header {
      padding: 16px;
      
      .el-dialog__title {
        font-size: 16px;
      }
    }
    
    .el-dialog__body {
      padding: 16px;
    }
  }
}

:deep(.el-dialog__headerbtn) {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--text-color) !important;
  &:hover, &:focus {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    color: var(--gradient-start) !important;
  }
}

:deep(.el-dialog__headerbtn:hover) .el-dialog__close {
  color: var(--gradient-start) !important;
}

:deep(.el-dropdown-menu) {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  
  .el-dropdown-menu__item {
    color: var(--text-color) !important;
    
    &:hover, &:focus, &:active, &.is-active, &.selected, &.is-selected {
      color: var(--gradient-start) !important;
      background-color: rgba(var(--gradient-start-rgb), 0.1) !important;
    }
    
    &.el-dropdown-menu__item--divided {
      color: var(--gradient-start) !important;
    }
    
    .dropdown-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: inherit;
      text-decoration: none;
      
      .el-icon {
        font-size: 16px;
      }
    }
  }
}

/* 在深色模式下覆盖下拉菜单样式 */
html.dark :deep(.el-dropdown-menu) {
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .el-dropdown-menu__item {
    color: rgba(255, 255, 255, 0.8) !important;
    
    &:hover, &:focus, &:active, &.is-active, &.selected, &.is-selected {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
}

/* 全局覆盖Element Plus的下拉菜单项样式 */
:root {
  --el-dropdown-menuItem-hover-fill: color-mix(in srgb, var(--gradient-start) 15%, transparent);
  --el-dropdown-menuItem-hover-color: var(--gradient-start);
  --el-dropdown-menuItem-active-color: var(--gradient-start);
  --el-dropdown-menuItem-active-fill: color-mix(in srgb, var(--gradient-start) 10%, transparent);
}

/* 修复在Firefox和Safari中的兼容性问题 */
@supports not (color-mix(in srgb, white, black)) {
  :root {
    --el-dropdown-menuItem-hover-fill: rgba(var(--gradient-start-rgb), 0.15);
    --el-dropdown-menuItem-hover-color: var(--gradient-start);
    --el-dropdown-menuItem-active-color: var(--gradient-start);
    --el-dropdown-menuItem-active-fill: rgba(var(--gradient-start-rgb), 0.1);
  }
}
</style>