import { defineStore } from "pinia";

interface FontOption {
  id: string;
  name: string;
  cssVar: string;
}

const fontConfig: Record<string, FontOption> = {
  default: {
    id: "default",
    name: "默认字体",
    cssVar: "var(--font-family-default)",
  },
  dingTalkJinBuTi: {
    id: "dingTalkJinBuTi",
    name: "钉钉进步体",
    cssVar: "var(--font-family-dingTalkJinBuTi)",
  },
  alimamaDaoLiTi: {
    id: "alimamaDaoLiTi",
    name: "阿里妈妈刀隶体",
    cssVar: "var(--font-family-alimamaDaoLiTi)",
  },
  alimamaFangYuanTiVF: {
    id: "alimamaFangYuanTiVF",
    name: "阿里妈妈方圆体",
    cssVar: "var(--font-family-alimamaFangYuanTiVF)",
  },
  alimamaShuHeiTi: {
    id: "alimamaShuHeiTi",
    name: "阿里妈妈数黑体",
    cssVar: "var(--font-family-alimamaShuHeiTi)",
  },
  ibaotu: {
    id: "ibaotu",
    name: "包图小白体",
    cssVar: "var(--font-family-ibaotu)",
  },
};

function applyFontToDOM(fontId: string) {
  if (!import.meta.client) return;
  const root = document.documentElement;
  Object.keys(fontConfig).forEach((id) => {
    root.classList.remove(`font-${id}`);
  });
  const font = fontConfig[fontId] ?? fontConfig.default;
  root.classList.add(`font-${font.id}`);
  root.style.setProperty("--current-font-family", font.cssVar);
}

export const useFontStore = defineStore("font", {
  state: () => ({
    currentFont: "default",
  }),
  getters: {
    availableFonts: (): Pick<FontOption, "id" | "name">[] =>
      Object.values(fontConfig).map(({ id, name }) => ({ id, name })),
  },
  actions: {
    setFont(fontId: string) {
      if (!fontConfig[fontId]) return;
      this.currentFont = fontId;
      applyFontToDOM(fontId);
    },
    getFontFamilyValue(fontId: string) {
      return fontConfig[fontId]?.cssVar ?? fontConfig.default.cssVar;
    },
    initFont() {
      if (!import.meta.client) return;
      const saved = localStorage.getItem("font-preference");
      this.setFont(saved && fontConfig[saved] ? saved : "default");
    },
    savePreference() {
      if (!import.meta.client) return;
      localStorage.setItem("font-preference", this.currentFont);
    },
  },
});
