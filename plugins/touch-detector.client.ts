/**
 * 触摸设备检测插件
 * 为非触摸设备添加no-touch类，优化悬停效果
 */

export default defineNuxtPlugin({
  name: 'touch-detector',
  enforce: 'pre', // 尽早执行
  setup() {
    // 仅在客户端执行
    if (process.client) {
      // 检测是否支持触摸
      const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                // @ts-ignore
                (navigator.msMaxTouchPoints > 0));
      };

      // DOM加载完成后执行
      window.addEventListener('DOMContentLoaded', () => {
        if (!isTouchDevice()) {
          document.documentElement.classList.add('no-touch');
        } else {
          document.documentElement.classList.add('touch');
        }
      });

      // 立即检测一次
      if (!isTouchDevice()) {
        document.documentElement.classList.add('no-touch');
      } else {
        document.documentElement.classList.add('touch');
      }
    }
    
    return {
      provide: {
        isTouchDevice: () => process.client ? 
          (('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           // @ts-ignore
           (navigator.msMaxTouchPoints > 0)) : false
      }
    };
  }
}); 