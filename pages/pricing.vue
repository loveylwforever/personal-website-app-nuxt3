<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: '某某软件 - 定价'
})

import { Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const handleDownload = (plan: string) => {
  ElMessage.success('开始下载免费版')
  // TODO: Implement download logic
}

const handlePurchase = (plan: string) => {
  ElMessage.success('正在跳转到支付页面')
  // TODO: Implement purchase logic
}

const handleContact = () => {
  ElMessage.success('正在为您打开客服对话')
  // TODO: Implement contact logic
}
</script>

<template>
  <div class="pricing-page">
    <div class="container">
      <h1 class="page-title">定价</h1>
      <p class="page-subtitle">选择最适合您的计划</p>
      
      <div class="pricing-grid">
        <div class="pricing-card free">
          <div class="card-header">
            <h3>免费版</h3>
            <div class="price">
              <span class="amount">¥0</span>
              <span class="period">/永久</span>
            </div>
          </div>
          <div class="card-content">
            <ul class="features-list">
              <li>
                <el-icon><Check /></el-icon>
                基础某某功能
              </li>
              <li>
                <el-icon><Check /></el-icon>
                群聊支持（最多50人）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                文件传输（单文件≤20MB）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                基础AI助手（每日10次）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                在线时长（每日4小时）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                在线时长（每日4小时）
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <el-button type="primary" class="warm-cta" @click="handleDownload('free')">
              立即下载
            </el-button>
          </div>
        </div>
        
        <div class="pricing-card pro">
          <div class="popular-badge">最受欢迎</div>
          <div class="card-header">
            <h3>专业版</h3>
            <div class="price">
              <span class="amount">¥19</span>
              <span class="period">/月</span>
            </div>
          </div>
          <div class="card-content">
            <ul class="features-list">
              <li>
                <el-icon><Check /></el-icon>
                包含免费版所有功能
              </li>
              <li>
                <el-icon><Check /></el-icon>
                无限群聊人数
              </li>
              <li>
                <el-icon><Check /></el-icon>
                文件传输（单文件≤500MB）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                高级AI助手（无限次数）
              </li>
              <li>
                <el-icon><Check /></el-icon>
                无限在线时长
              </li>
              <li>
                <el-icon><Check /></el-icon>
                优先客服支持
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <el-button type="primary" class="warm-cta" @click="handlePurchase('pro')">
              立即购买
            </el-button>
          </div>
        </div>
        
        <div class="pricing-card enterprise">
          <div class="card-header">
            <h3>企业版</h3>
            <div class="price">
              <span class="amount">¥399</span>
              <span class="period">/年</span>
            </div>
          </div>
          <div class="card-content">
            <ul class="features-list">
              <li>
                <el-icon><Check /></el-icon>
                包含专业版所有功能
              </li>
              <li>
                <el-icon><Check /></el-icon>
                私有化部署
              </li>
              <li>
                <el-icon><Check /></el-icon>
                自定义AI模型
              </li>
              <li>
                <el-icon><Check /></el-icon>
                API集成支持
              </li>
              <li>
                <el-icon><Check /></el-icon>
                7×24小时技术支持
              </li>
              <li>
                <el-icon><Check /></el-icon>
                定制化功能开发
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <el-button type="primary" class="warm-cta" @click="handleContact">
              联系我们
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="faq-section">
        <h2>常见问题</h2>
        <el-collapse>
          <el-collapse-item title="如何升级到专业版？" name="1">
            <p>您可以在应用内点击"升级专业版"按钮，选择支付方式（支持支付宝、微信支付）完成购买。升级后立即生效，享受所有专业版特权。</p>
          </el-collapse-item>
          <el-collapse-item title="是否支持退款？" name="2">
            <p>我们提供7天无理由退款服务。如果您对服务不满意，可以在购买后7天内申请全额退款。超过7天的退款请联系客服评估处理。</p>
          </el-collapse-item>
          <el-collapse-item title="企业版如何部署？" name="3">
            <p>企业版支持私有化部署在您的服务器上。我们的技术团队会提供全程部署支持，确保系统稳定运行。您也可以根据需求定制专属功能。</p>
          </el-collapse-item>
          <el-collapse-item title="可以更换订阅计划吗？" name="4">
            <p>可以。您可以随时在不同订阅计划间切换。升级时，我们会按剩余时间比例补差价；降级时，我们会在下个计费周期生效。</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pricing-page {
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
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-bottom: 64px;
    
    .pricing-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 32px;
      position: relative;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        background: var(--hover-bg);
      }
      
      &.pro {
        border: 2px solid var(--gradient-start);
        
        .popular-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          color: #fff;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
        }
      }
      
      .card-header {
        text-align: center;
        margin-bottom: 24px;
        
        h3 {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-color);
          margin: 0 0 16px;
        }
        
        .price {
          .amount {
            font-size: 48px;
            font-weight: bold;
            background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: var(--text-color);
          }
          
          .period {
            font-size: 16px;
            color: var(--text-secondary);
          }
        }
      }
      
      .card-content {
        margin-bottom: 24px;
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          
          li {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            margin-bottom: 12px;
            font-size: 14px;
            
            .el-icon {
              color: var(--gradient-start);
            }
          }
        }
      }
      
      .card-footer {
        text-align: center;
        margin-top: 24px;
        margin-bottom: 0;
        
        .el-button {
          width: 100%;
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
    transform: translateY(-1px);
  }
  
  .faq-section {
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 32px;
      color: var(--text-color);
    }
    
    :deep(.el-collapse) {
      border: none;
      background: transparent;
      
      .el-collapse-item {
        margin-bottom: 16px;
        
        .el-collapse-item__header {
          background: var(--card-bg);
          border: none;
          color: var(--text-color);
          font-size: 16px;
          padding: 16px;
          border-radius: 8px;
          transition: background 0.3s, color 0.3s, border-radius 0.3s, box-shadow 0.3s cubic-bezier(.4,1.01,.32,1), transform 0.25s cubic-bezier(.4,1.01,.32,1);
          will-change: transform, box-shadow;
          
          &:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 24px rgba(201,100,66,0.12);
            z-index: 1;
          }
          
          &.is-active {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        
        .el-collapse-item__wrap {
          background: var(--hover-bg);
          border: none;
          
          .el-collapse-item__content {
            color: var(--text-secondary);
            padding: 16px;
            font-size: 14px;
            line-height: 1.6;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .pricing-page {
    padding: 40px 0;
    
    .page-title {
      font-size: 28px;
    }
    
    .page-subtitle {
      font-size: 16px;
      margin-bottom: 32px;
    }
    
    .pricing-grid {
      gap: 24px;
      margin-bottom: 48px;
      
      .pricing-card {
        padding: 24px;
        
        .card-header {
          h3 {
            font-size: 20px;
          }
          
          .price {
            .amount {
              font-size: 36px;
            }
            
            .period {
              font-size: 14px;
            }
          }
        }
      }
    }
    
    .faq-section {
      h2 {
        font-size: 24px;
        margin-bottom: 24px;
      }
    }
  }
}
</style> 