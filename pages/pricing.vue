<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 定价'
})

const { success } = useToast()

const plans = [
  {
    id: 'free',
    name: '免费版',
    price: '¥0',
    period: '/永久',
    action: '立即下载',
    features: ['基础某某功能', '群聊支持（最多50人）', '文件传输（单文件≤20MB）', '基础AI助手（每日10次）', '在线时长（每日4小时）'],
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥19',
    period: '/月',
    popular: true,
    action: '立即购买',
    features: ['包含免费版所有功能', '无限群聊人数', '文件传输（单文件≤500MB）', '高级AI助手（无限次数）', '无限在线时长', '优先客服支持'],
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '¥399',
    period: '/年',
    action: '联系我们',
    features: ['包含专业版所有功能', '私有化部署', '自定义AI模型', 'API集成支持', '7×24小时技术支持', '定制化功能开发'],
  },
]

const faqs = [
  { title: '如何升级到专业版？', body: '您可以在应用内点击"升级专业版"按钮，选择支付方式（支持支付宝、微信支付）完成购买。升级后立即生效，享受所有专业版特权。' },
  { title: '是否支持退款？', body: '我们提供7天无理由退款服务。如果您对服务不满意，可以在购买后7天内申请全额退款。超过7天的退款请联系客服评估处理。' },
  { title: '企业版如何部署？', body: '企业版支持私有化部署在您的服务器上。我们的技术团队会提供全程部署支持，确保系统稳定运行。您也可以根据需求定制专属功能。' },
  { title: '可以更换订阅计划吗？', body: '可以。您可以随时在不同订阅计划间切换。升级时，我们会按剩余时间比例补差价；降级时，我们会在下个计费周期生效。' },
]

function handlePlan(id: string) {
  if (id === 'free') success('开始下载免费版')
  else if (id === 'pro') success('正在跳转到支付页面')
  else success('正在为您打开客服对话')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">定价</h1>
      <p class="page-subtitle">选择最适合您的计划</p>
      
      <div class="pricing-grid">
        <article v-for="plan in plans" :key="plan.id" class="pricing-card" :class="plan.id">
          <div v-if="plan.popular" class="popular-badge">最受欢迎</div>
          <header>
            <h3>{{ plan.name }}</h3>
            <div class="price">
              <span class="amount">{{ plan.price }}</span>
              <span class="period">{{ plan.period }}</span>
            </div>
          </header>
          <ul>
            <li v-for="feature in plan.features" :key="feature">
              <AppIcon name="check" :size="16" />
              {{ feature }}
            </li>
          </ul>
          <AppButton class="plan-btn" @click="handlePlan(plan.id)">{{ plan.action }}</AppButton>
        </article>
      </div>
      
      <div class="faq-section">
        <h2 class="page-section-title">常见问题</h2>
        <AppCollapse :items="faqs" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
}

.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--shadow-whisper);
}

.pricing-card.pro {
  border: 2px solid var(--primary-color);
}

.popular-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  background: var(--primary-color);
  color: var(--on-primary);
  font-size: 12px;
}

.pricing-card header {
  margin-bottom: 24px;
  text-align: center;
}

.pricing-card h3 {
  margin: 0 0 16px;
  font-size: 24px;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-color);
}

.period {
  color: var(--text-secondary);
}

.pricing-card ul {
  flex: 1;
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
}

.pricing-card li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-secondary);
  font-size: 14px;
}

.pricing-card li :deep(.app-icon) {
  color: var(--primary-color);
}

.plan-btn {
  width: 100%;
}

.faq-section {
  max-width: var(--page-narrow);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .amount {
    font-size: 36px;
  }
}
</style>
