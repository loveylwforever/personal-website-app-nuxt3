<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-logo">
            <Logo style="width:36px;height:36px;" />
            <span class="logo-text">某某软件</span>
          </div>
          
          <!-- <div class="footer-social">
            <a href="#" class="social-link" title="微信">
              <span class="social-icon">💬</span>
            </a>
            <a href="https://github.com/kiwi2333/jiwu-chat" target="_blank" rel="noopener" class="social-link" title="GitHub">
              <span class="social-icon">📂</span>
            </a>
            <a href="https://jiwuchat.kiwi233.top" target="_blank" rel="noopener" class="social-link" title="官网">
              <span class="social-icon">🌐</span>
            </a>
          </div> -->
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h3>产品</h3>
            <NuxtLink to="/start">开始使用</NuxtLink>
            <NuxtLink to="/pricing">定价</NuxtLink>
            <NuxtLink to="/experience">体验</NuxtLink>
            <NuxtLink to="/projects">项目</NuxtLink>
          </div>
          
          <div class="link-group">
            <h3>生态</h3>
            <NuxtLink to="/forum">某某圈</NuxtLink>
            <NuxtLink to="/jiwu-admin">某某后台系统</NuxtLink>
          </div>
          
          <div class="link-group">
            <h3>资源</h3>
            <NuxtLink to="/changelog">更新日志</NuxtLink>
            <a href="#" target="_blank" rel="noopener">GitHub</a>
            <a href="#" target="_blank" rel="noopener">官方网站</a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-slogan">～不忘初心，方得始终～</div>
          <div class="footer-copyright">© {{ currentYear }} JamieGao. 版权所有. 保留所有权利.</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Logo from '~/components/Logo.vue'
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  padding: 40px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 50px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  opacity: 0.95;
  backdrop-filter: blur(10px);
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 36px;
    position: relative;
    z-index: 1;
  }
  
  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .logo {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      color: white;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .logo-text {
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      letter-spacing: 0.5px;
    }
  }
  
  // .footer-social {
  //   display: flex;
  //   gap: 16px;
    
  //   .social-link {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     width: 36px;
  //     height: 36px;
  //     background: rgba(255, 255, 255, 0.1);
  //     border-radius: 50%;
  //     color: white;
  //     text-decoration: none;
  //     transition: all 0.3s ease;
      
  //     &:hover {
  //       background: rgba(255, 255, 255, 0.2);
  //       transform: translateY(-3px);
  //     }
      
  //     .social-icon {
  //       font-size: 18px;
  //     }
  //   }
  // }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 28px;
    
    .link-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      h3 {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 8px;
        position: relative;
        padding-bottom: 8px;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
      }
      
      a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 14px;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-flex;
        align-items: center;
        padding-left: 0;
        margin-bottom: 4px;
        
        &::before {
          content: '›';
          margin-right: 6px;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.15s ease, transform 0.15s ease;
          font-size: 18px;
          line-height: 0;
        }
        
        &:hover {
          color: white;
          transform: translateX(2px);
          
          &::before {
            opacity: 0.8;
            transform: translateX(0);
          }
        }
      }
    }
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    .footer-slogan {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    
    .footer-copyright {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
    }
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 30px 0 15px;
    margin-top: 30px;
    
    .container {
      padding: 0 20px;
    }
    
    .footer-content {
      gap: 28px;
    }
    
    .footer-top {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
    
    .footer-logo {
      justify-content: center;
    }
    
    // .footer-social {
    //   justify-content: center;
    // }
    
    .footer-links {
      grid-template-columns: 1fr;
      gap: 24px;
      text-align: center;
      
      .link-group {
        align-items: center;
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        
        h3 {
          margin-bottom: 14px;
          
          &::after {
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
          }
        }
        
        a {
          justify-content: center;
          padding: 6px 0;
          text-align: center;
          display: block;
          
          &::before {
            display: none;
          }
          
          &:hover {
            transform: translateY(-1px);
          }
        }
      }
    }
    
    .footer-bottom {
      padding-top: 18px;
      
      .footer-slogan {
        font-size: 13px;
      }
      
      .footer-copyright {
        font-size: 11px;
      }
    }
  }
}
</style>