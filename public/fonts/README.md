# 字体文件使用说明

本文件夹用于存放网站使用的字体文件。请按照以下步骤添加和使用自定义字体：

## 添加字体文件

1. 将您喜欢的字体文件（.ttf, .woff, .woff2 等格式）放入此文件夹
2. 建议命名规则：字体名称+字重+样式，例如：`SourceHanSansCN-Regular.ttf`

## 在样式中注册字体

添加完字体文件后，需要在 `assets/scss/fonts.scss` 文件中注册这些字体：

```scss
@font-face {
  font-family: '您的字体名称';
  src: url('~/assets/fonts/您的字体文件名.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## 在字体管理器中添加选项

编辑 `stores/font.ts` 文件，在 `availableFonts` 数组中添加新字体：

```typescript
availableFonts: [
  { id: 'default', name: '默认字体' },
  { id: 'custom1', name: '自定义字体1' },
  { id: '您的字体ID', name: '您的字体显示名称' },
  // 添加更多字体...
],
```

同时，在 `applyFontToDOM` 方法中添加相应的处理逻辑：

```typescript
applyFontToDOM(fontId: string) {
  const root = document.documentElement
  
  switch (fontId) {
    // ... 现有代码 ...
    case '您的字体ID':
      root.style.setProperty('--current-font-family', 'var(--font-family-您的字体名称)')
      break
    // ... 其他字体 ...
  }
}
```

## 在CSS变量中注册

最后，在 `assets/scss/fonts.scss` 中的 `:root` 部分添加CSS变量：

```scss
:root {
  // ... 现有变量 ...
  --font-family-您的字体名称: '您的字体名称', #{$font-family-default};
}
```

完成上述步骤后，您的自定义字体就可以在网站中使用了。 