import { defineStore } from 'pinia'

interface FontOption {
  id: string
  name: string
}

// 集中管理字体配置
const fontConfig = {
  default: {
    id: 'default',
    name: '默认字体',
    cssVar: 'var(--font-family-default)'
  },
  dingTalkJinBuTi: {
    id: 'dingTalkJinBuTi',
    name: '钉钉进步体',
    cssVar: 'var(--font-family-dingTalkJinBuTi)'
  },
  alimamaDaoLiTi: {
    id: 'alimamaDaoLiTi',
    name: '阿里妈妈刀隶体',
    cssVar: 'var(--font-family-alimamaDaoLiTi)'
  },
  alimamaFangYuanTiVF: {
    id: 'alimamaFangYuanTiVF',
    name: '阿里妈妈方圆体',
    cssVar: 'var(--font-family-alimamaFangYuanTiVF)'
  },
  alimamaShuHeiTi: {
    id: 'alimamaShuHeiTi',
    name: '阿里妈妈数黑体',
    cssVar: 'var(--font-family-alimamaShuHeiTi)'
  },
  ibaotu: {
    id: 'ibaotu',
    name: '包图小白体',
    cssVar: 'var(--font-family-ibaotu)'
  },
  // 添加新字体只需在此处添加一项配置
}

export const useFontStore = defineStore('font', {
  state: () => ({
    currentFont: 'default'
  }),
  getters: {
    availableFonts: () => Object.values(fontConfig).map(font => ({ id: font.id, name: font.name })) as FontOption[]
  },
  actions: {
    setFont(fontId: string) {
      // 确保选择的字体在可用字体列表中
      if (Object.keys(fontConfig).includes(fontId)) {
        this.currentFont = fontId as unknown as any
        this.applyFontToDOM(fontId)
      }
    },

    applyFontToDOM(fontId: string) {
      // 应用字体到DOM
      const root = document.documentElement
      // 先清除所有字体相关的类
      Object.keys(fontConfig).forEach(id => {
        root.classList.remove(`font-${id}`)
      })
      // 添加对应的类
      root.classList.add(`font-${fontId}`)
      // 从配置中获取CSS变量
      const fontCssVar = fontConfig[fontId as keyof typeof fontConfig]?.cssVar || fontConfig.default.cssVar
      root.style.setProperty('--current-font-family', fontCssVar)
      // 为了确保全局应用，也设置在body上
      document.body.style.fontFamily = fontCssVar
    },
    
    getFontFamilyValue(fontId: string): string {
      return fontConfig[fontId as keyof typeof fontConfig]?.cssVar || fontConfig.default.cssVar
    },

    // 初始化字体 - 可以从本地存储中读取用户偏好
    initFont() {
      // 从localStorage读取之前保存的字体设置
      const savedFont = localStorage.getItem('font-preference')
      
      if (savedFont && Object.keys(fontConfig).includes(savedFont)) {
        this.currentFont = savedFont as unknown as any
        this.applyFontToDOM(savedFont)
      } else {
        // 使用默认字体
        this.setFont('default')
      }
    },

    // 保存字体偏好到本地存储
    savePreference() {
      localStorage.setItem('font-preference', this.currentFont as unknown as string)
    }
  }
}) 