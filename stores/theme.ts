import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === "dark");
  const currentTheme = computed(() => (isDark.value ? "dark" : "light"));

  function toggleTheme() {
    colorMode.preference = isDark.value ? "light" : "dark";
  }

  return {
    isDark,
    currentTheme,
    toggleTheme,
  };
});
