<template>
  <div class="login-page" :class="themeStore.currentTheme">
    <div class="back-home-btn" @click="goHome">
      <AppIcon name="arrow-left" :size="16" />
      返回首页
    </div>
    <div class="login-left">
      <ClientOnly>
        <Three3DParticles :theme="themeStore.currentTheme" />
      </ClientOnly>
    </div>
    <div class="login-right">
      <div class="login-card">
        <!-- 主题切换开关 -->
        <div class="theme-toggle" @click="themeStore.toggleTheme">
          <AppIcon :name="themeStore.isDark ? 'sun' : 'moon'" />
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
            <AppInput
              v-model="form.username"
              placeholder="用户名"
              :invalid="!!errors.username"
              @focus="activeInput = 'username'"
              @blur="validateUsername"
            >
              <template #prefix>
                <AppIcon name="user" :size="16" />
              </template>
            </AppInput>
            <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
          </div>
          
          <div class="form-item" :class="{ 'focus': activeInput === 'password' }">
            <AppInput
              v-model="form.password"
              type="password"
              placeholder="密码"
              :invalid="!!errors.password"
              @focus="activeInput = 'password'"
              @blur="validatePassword"
            >
              <template #prefix>
                <AppIcon name="lock" :size="16" />
              </template>
            </AppInput>
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          </div>
          
          <div v-if="isRegister" class="form-item" :class="{ 'focus': activeInput === 'confirm' }">
            <AppInput
              v-model="form.confirm"
              type="password"
              placeholder="确认密码"
              :invalid="!!errors.confirm"
              @focus="activeInput = 'confirm'"
              @blur="validateConfirm"
            >
              <template #prefix>
                <AppIcon name="check" :size="16" />
              </template>
            </AppInput>
            <div v-if="errors.confirm" class="error-message">{{ errors.confirm }}</div>
          </div>
          
          <div class="form-options">
            <AppCheckbox v-model="rememberMe" label="记住我" />
            <span v-if="!isRegister" class="forgot-password">忘记密码？</span>
          </div>
          
          <AppButton type="submit" class="login-btn" :loading="isSubmitting">
            {{ isRegister ? '创建账号' : '登录' }}
          </AppButton>
        </form>
        
        <!-- 其他登录方式 -->
        <div class="social-login">
          <div class="divider">
            <span>或使用以下方式</span>
          </div>
          <div class="social-icons">
            <div class="social-icon wechat"><Wechat /></div>
            <div class="social-icon qq"><QQ /></div>
            <div class="social-icon weibo"><AppIcon name="share" /></div>
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
import Wechat from '~/assets/icons/Wechat.vue'
import QQ from '~/assets/icons/qq.vue'

definePageMeta({ layout: false })

const themeStore = useThemeStore()
const router = useRouter()
const isRegister = ref(false)
const form = ref({ username: '', password: '', confirm: '' })
const activeInput = ref('')
const rememberMe = ref(false)
const isSubmitting = ref(false)
const errors = ref({
  username: '',
  password: '',
  confirm: '',
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
  position: relative;
  display: flex;
  min-height: 100dvh;
  background: var(--bg-color);
}

.back-home-btn {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
}

.login-left {
  flex: 1.2;
  min-width: 0;
  overflow: hidden;
}

.login-right {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 360px;
  padding: var(--page-gutter);
}

.login-card {
  position: relative;
  width: 100%;
  max-width: 380px;
  padding: 40px 32px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--card-bg);
  box-shadow: var(--shadow-lift);
}

.brand-wrapper {
  margin-bottom: 28px;
  text-align: center;
}

.app-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: var(--radius-lg);
  background: var(--primary-color);
}

h2 {
  margin: 0 0 8px;
  color: var(--text-color);
  font-size: 28px;
  font-weight: 600;
}

.welcome-text {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.form-item {
  position: relative;
  margin-bottom: 28px;
}

.form-item :deep(.app-input) {
  min-height: 48px;
}

.error-message {
  position: absolute;
  left: 0;
  bottom: -18px;
  color: var(--danger);
  font-size: 12px;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.forgot-password {
  color: var(--primary-color);
  font-size: 14px;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  min-height: 48px;
  margin-bottom: 24px;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: var(--text-tertiary);
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  padding: 0 12px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
}

.social-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.switch-link {
  color: var(--primary-color);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

@media (max-width: 900px) {
  .login-page {
    justify-content: center;
  }

  .login-left {
    position: absolute;
    inset: 0;
  }

  .login-right {
    position: relative;
    z-index: 1;
    min-width: 0;
    width: 100%;
  }

  .back-home-btn {
    top: 16px;
    left: 16px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 28px 20px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>