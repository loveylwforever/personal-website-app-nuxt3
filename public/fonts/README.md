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
const fontConfig = {
  default: {
    id: '字体id',
    name: '字体名',
    cssVar: 'var(--font-family-default)'
  }
}
```

完成上述步骤后，您的自定义字体就可以在网站中使用了。 