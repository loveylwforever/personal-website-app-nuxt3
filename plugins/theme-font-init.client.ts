export default defineNuxtPlugin(() => {
  const fontStore = useFontStore();
  const layoutStore = useLayoutStore();
  fontStore.initFont();
  layoutStore.initLayout();
});
