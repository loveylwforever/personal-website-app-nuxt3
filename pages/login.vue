<template>
  <div class="login-page" :class="themeStore.currentTheme">
    <div class="back-home-btn" @click="goHome">
      <el-icon><ArrowLeft /></el-icon>
      返回首页
    </div>
    <div class="login-left">
      <Three3DParticles :theme="themeStore.currentTheme" />
    </div>
    <div class="login-right">
      <div class="login-card">
        <!-- 主题切换开关 -->
        <div class="theme-toggle" @click="themeStore.toggleTheme">
          <el-icon v-if="themeStore.isDark"><Sunny /></el-icon>
          <el-icon v-else><Moon /></el-icon>
        </div>
        
        <!-- 品牌元素 -->
        <div class="brand-wrapper">
          <div class="app-logo">
            <Logo style="width:50px;height:50px;" />
          </div>
          <h2>{{ isRegister ? '创建新账号' : '欢迎回来' }}</h2>
          <p class="welcome-text">{{ isRegister ? '加入我们的社区，探索更多可能' : '登录您的账号，继续您的旅程' }}</p>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <!-- 用户名输入框 -->
          <div class="form-item" :class="{ 'focus': activeInput === 'username' }">
            <el-input 
              v-model="form.username" 
              placeholder="用户名" 
              @focus="activeInput = 'username'"
              @blur="validateUsername"
              :class="{ 'is-error': errors?.value?.username }"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
            <div v-if="errors?.value?.username" class="error-message">{{ errors?.value?.username }}</div>
          </div>
          
          <!-- 密码输入框 -->
          <div class="form-item" :class="{ 'focus': activeInput === 'password' }">
            <el-input 
              v-model="form.password" 
              type="password" 
              placeholder="密码" 
              @focus="activeInput = 'password'"
              @blur="validatePassword"
              :class="{ 'is-error': errors?.value?.password }"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
            <div v-if="errors?.value?.password" class="error-message">{{ errors?.value?.password }}</div>
          </div>
          
          <!-- 确认密码输入框（注册时显示） -->
          <div v-if="isRegister" class="form-item" :class="{ 'focus': activeInput === 'confirm' }">
            <el-input 
              v-model="form.confirm" 
              type="password" 
              placeholder="确认密码" 
              @focus="activeInput = 'confirm'"
              @blur="validateConfirm"
              :class="{ 'is-error': errors?.value?.confirm }"
            >
              <template #prefix>
                <el-icon><Check /></el-icon>
              </template>
            </el-input>
            <div v-if="errors?.value?.confirm" class="error-message">{{ errors?.value?.confirm }}</div>
          </div>
          
          <!-- 记住我选项 -->
          <div class="form-options">
            <el-checkbox v-model="rememberMe" label="记住我" />
            <span v-if="!isRegister" class="forgot-password">忘记密码？</span>
          </div>
          
          <!-- 登录/注册按钮 -->
          <el-button 
            type="primary" 
            class="login-btn" 
            native-type="submit"
            :loading="isSubmitting"
          >
            {{ isRegister ? '创建账号' : '登录' }}
          </el-button>
        </form>
        
        <!-- 其他登录方式 -->
        <div class="social-login">
          <div class="divider">
            <span>或使用以下方式</span>
          </div>
          <div class="social-icons">
            <div class="social-icon wechat"><Wechat /></div>
            <div class="social-icon qq"><QQ /></div>
            <div class="social-icon weibo"><el-icon><Promotion /></el-icon></div>
          </div>
        </div>
        
        <!-- 切换登录/注册 -->
        <div class="switch-link">
          <span @click="switchMode">
            {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import Three3DParticles from '~/components/Three3DParticles.vue'
import Wechat from '~/assets/icons/Wechat.vue'
import QQ from '~/assets/icons/qq.vue'
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Check, 
  Promotion,
  Moon,
  Sunny
} from '@element-plus/icons-vue'
import Logo from '~/components/Logo.vue'

definePageMeta({ layout: false })

// 使用Pinia的theme store管理主题
const themeStore = useThemeStore()

const isRegister = ref(false)
const form = ref({ username: '', password: '', confirm: '' })
const activeInput = ref('')
const rememberMe = ref(false)
const isSubmitting = ref(false)
const router = useRouter()

// 确保errors有初始值，解决SSR问题
const errors = ref({
  username: '',
  password: '',
  confirm: ''
})

// 确保服务端渲染时errors已初始化
if (typeof window === 'undefined') {
  // 服务端渲染时执行
  errors.value = {
    username: '',
    password: '',
    confirm: ''
  }
}

onMounted(() => {
  // 确保客户端渲染时errors已初始化
  if (!errors.value) {
    errors.value = {
      username: '',
      password: '',
      confirm: ''
    }
  }
  
  // 确保主题设置在DOM中正确应用
  themeStore.updateDOM()
})

function validateUsername() {
  activeInput.value = ''
  if (!form.value.username) {
    errors.value.username = '请输入用户名'
    return false
  }
  if (form.value.username.length < 3) {
    errors.value.username = '用户名至少需要3个字符'
    return false
  }
  errors.value.username = ''
  return true
}

function validatePassword() {
  activeInput.value = ''
  if (!form.value.password) {
    errors.value.password = '请输入密码'
    return false
  }
  if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6个字符'
    return false
  }
  errors.value.password = ''
  return true
}

function validateConfirm() {
  activeInput.value = ''
  if (!form.value.confirm) {
    errors.value.confirm = '请确认密码'
    return false
  }
  if (form.value.confirm !== form.value.password) {
    errors.value.confirm = '两次输入的密码不一致'
    return false
  }
  errors.value.confirm = ''
  return true
}

function validateForm() {
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()
  
  if (isRegister.value) {
    const isConfirmValid = validateConfirm()
    return isUsernameValid && isPasswordValid && isConfirmValid
  }
  
  return isUsernameValid && isPasswordValid
}

function handleSubmit() {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // 模拟API请求
  setTimeout(() => {
    isSubmitting.value = false
    router.push('/')
  }, 1500)
}

function switchMode() {
  isRegister.value = !isRegister.value
  errors.value.username = ''
  errors.value.password = ''
  errors.value.confirm = ''
}

function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  position: relative;
  
  // 亮色模式和暗色模式不同的渐变背景
  &.light {
    background: linear-gradient(135deg, #f3e7ff, #dacaff);
    
    .login-card {
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.08),
        0 1px 1px rgba(0,0,0,0.03),
        inset 0 1px 1px rgba(255,255,255,0.9),
        inset 0 0 15px rgba(var(--gradient-start-rgb), 0.05);
    }
    
    .back-home-btn {
      background: rgba(255,255,255,0.9);
      color: var(--gradient-start);
      
      &:hover {
        background: white;
      }
    }
  }
  
  &.dark {
    background: linear-gradient(135deg, #2a1b47, #1e1438);
    
    .login-card {
      background: rgba(30, 30, 40, 0.95);
      color: var(--text-color);
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.25),
        0 1px 1px rgba(0,0,0,0.1),
        inset 0 1px 1px rgba(255,255,255,0.05),
        inset 0 0 15px rgba(var(--gradient-start-rgb), 0.05);
    }
    
    .back-home-btn {
      background: rgba(30, 30, 40, 0.8);
      color: rgba(255, 255, 255, 0.9);
      
      &:hover {
        background: rgba(40, 40, 50, 0.9);
      }
    }
    
    .welcome-text {
      color: var(--text-secondary);
    }
    
    .form-item .el-input {
      .el-input__wrapper {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1);
        
        &.is-focus {
          box-shadow: 0 3px 12px rgba(var(--gradient-start-rgb), 0.2), 0 0 0 1px var(--gradient-start) !important;
        }
      }
      
      input {
        color: var(--text-color);
        
        &::placeholder {
          color: var(--text-tertiary);
        }
      }
    }
    
    .switch-link {
      color: var(--primary-light);
    }
    
    .social-icons .social-icon {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
    }
  }
}

// 主题切换开关
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 10;
  border: 1px solid var(--border-color);
  
  &:hover {
    transform: rotate(30deg);
    background: var(--hover-bg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .el-icon {
    font-size: 18px;
  }
}

.dark .theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
}

.light .theme-toggle {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.05);
  color: var(--text-color);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
}

.back-home-btn {
  position: absolute;
  top: 32px;
  right: 40px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 20px;
  padding: 8px 18px 8px 14px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.25s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.login-left {
  flex: 1.2;
  position: relative;
  background: transparent;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(10px);
  min-width: 360px;
}

.login-card {
  width: 380px;
  padding: 40px 36px;
  border-radius: 24px;
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
  }
}

.brand-wrapper {
  text-align: center;
  margin-bottom: 30px;
}

.app-logo {
  width: 70px;
  height: 70px;
  margin: 0 auto 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 15px rgba(var(--gradient-start-rgb), 0.2);
  
  .logo-image {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
}

h2 {
  text-align: center;
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-text {
  color: var(--text-secondary);
  font-size: 15px;
  margin: 0 0 12px;
}

.form-item {
  margin-bottom: 24px;
  position: relative;
  transition: all 0.3s ease;
  
  &.focus {
    transform: translateY(-2px);
  }
  
  .el-input {
    --el-input-border-radius: 12px;
    --el-input-height: 48px;
    --el-input-hover-border-color: var(--gradient-start);
    --el-input-focus-border-color: var(--gradient-start);
    
    .el-input__wrapper {
      padding: 0 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      
      &.is-focus {
        box-shadow: 0 3px 12px rgba(var(--gradient-start-rgb), 0.15), 0 0 0 1px var(--gradient-start) !important;
      }
    }
    
    &.is-error .el-input__wrapper {
      box-shadow: 0 2px 8px rgba(245,108,108,0.1), 0 0 0 1px rgba(245,108,108,0.5);
    }
    
    .el-input__prefix {
      padding: 0 8px 0 0;
      color: var(--text-secondary);
    }
    
    &.is-focus .el-input__prefix {
      color: var(--gradient-start);
    }
  }
  
  .error-message {
    position: absolute;
    left: 0;
    bottom: -18px;
    font-size: 12px;
    color: var(--el-color-danger);
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  // 自定义复选框样式，跟随主题色
  :deep(.el-checkbox) {
    --el-checkbox-checked-bg-color: var(--gradient-start);
    --el-checkbox-checked-text-color: var(--gradient-start);
    --el-checkbox-checked-border-color: var(--gradient-start);
    --el-checkbox-checked-icon-color: #fff;
    
    .el-checkbox__inner:hover {
      border-color: var(--gradient-start);
    }
    
    &.is-checked .el-checkbox__label {
      color: var(--gradient-start);
    }
    
    // 使用渐变背景色
    &.is-checked .el-checkbox__inner {
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      border-color: var(--gradient-start);
    }
  }
  
  .forgot-password {
    color: var(--primary-color);
    font-size: 14px;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border: none;
  color: #fff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0));
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px rgba(var(--gradient-start-rgb), 0.25);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(var(--gradient-start-rgb), 0.2);
  }
}

.social-login {
  margin-bottom: 20px;
  
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    &::before, &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(0,0,0,0.1);
    }
    
    span {
      padding: 0 12px;
      font-size: 13px;
      color: var(--text-secondary);
    }
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
    
    .social-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f7fa;
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-3px);
      }
      
      &.wechat {
        color: var(--text-color);
        
        :deep(svg) {
          width: 24px;
          height: 24px;
          transition: all 0.2s ease;
        }
        
        &:hover {
          background: #f5f7fa;
          color: var(--gradient-start);
        }
      }
      
      &.qq {
        color: var(--text-color);
        
        :deep(svg) {
          width: 24px;
          height: 24px;
          transition: all 0.2s ease;
        }
        
        &:hover {
          background: #f5f7fa;
          color: var(--gradient-start);
        }
      }
      
      &.qq:hover {
        background: #f5f7fa;
      }
      
      &.weibo:hover {
        background: #e6162d;
        color: white;
      }
    }
  }
}

.switch-link {
  text-align: center;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  
  span {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0;
      height: 1px;
      background: var(--primary-color);
      transition: width 0.25s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
}

@media (max-width: 900px) {
  .login-page {
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    padding: 20px;
  }
  
  .login-left {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    z-index: 0;
  }
  
  .login-right {
    flex: none;
    width: 100%;
    min-width: 0;
    background: transparent;
    backdrop-filter: none;
    z-index: 1;
    align-items: center;
    justify-content: center;
  }
  
  .login-card {
    margin: 0 auto;
    width: 90%;
    max-width: 380px;
    padding: 30px 24px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: 
      0 10px 30px rgba(0,0,0,0.15),
      0 1px 1px rgba(0,0,0,0.05),
      inset 0 1px 1px rgba(255,255,255,0.9);
  }
  
  .back-home-btn {
    top: 16px;
    left: 16px;
    right: auto;
    font-size: 14px;
    padding: 6px 14px 6px 10px;
    background: rgba(255,255,255,0.85);
  }
  
  .app-logo {
    width: 60px;
    height: 60px;
    
    .logo-image {
      width: 42px;
      height: 42px;
    }
  }
  
  h2 {
    font-size: 24px;
  }
  
  .welcome-text {
    font-size: 14px;
  }
  
  .form-item .el-input {
    --el-input-height: 44px;
  }
  
  .login-btn {
    height: 44px;
  }
}

// 小屏幕手机适配
@media (max-width: 480px) {
  .login-card {
    width: 100%;
    padding: 24px 20px;
  }
  
  .social-login .social-icons {
    gap: 12px;
    
    .social-icon {
      width: 38px;
      height: 38px;
    }
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .theme-toggle {
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
  }
}
</style> 