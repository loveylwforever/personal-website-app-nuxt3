import { defineStore } from "pinia";

export type HomeLayout = "default" | "alternative";

export const useLayoutStore = defineStore("layout", () => {
  const layout = ref<HomeLayout>("default");

  function setLayout(next: HomeLayout) {
    layout.value = next;
    if (import.meta.client) {
      localStorage.setItem("homeLayout", next);
    }
  }

  function initLayout() {
    if (!import.meta.client) return;
    const saved = localStorage.getItem("homeLayout");
    if (saved === "default" || saved === "alternative") {
      layout.value = saved;
    }
  }

  return { layout, setLayout, initLayout };
});
