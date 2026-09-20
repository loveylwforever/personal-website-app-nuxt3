# 某某软件

A modern chat application clone built with Nuxt 3, featuring a beautiful and responsive design with multiple layout options.

## Features

- 🎨 Two layout options for the homepage
- 💬 Real-time chat functionality
- 📱 Responsive design
- 🎯 Modern UI/UX
- ⚡ Built with Nuxt 3 for optimal performance

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd personal-website-app-nuxt3
```

2. Install dependencies:
```bash
# Using pnpm
pnpm install
```

### Development

Start the development server:

```bash
# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:3000`

### Layout Switching

The application supports two different layout options for the homepage:

1. **Default Layout**: The standard layout with a clean, modern design
2. **Alternative Layout**: A different layout option with unique styling

To switch between layouts:

1. Navigate to the homepage
2. Look for the layout toggle button in the navigation bar
3. Click the toggle button to switch between layouts

The layout preference will be saved in your browser's local storage for future visits.

## Production

### Building for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm build

# Using yarn
yarn build

# Using bun
bun run build
```

### Preview Production Build

```bash
# Using npm
npm run preview

# Using pnpm
pnpm preview

# Using yarn
yarn preview

# Using bun
bun run preview
```

## Deployment

For deployment instructions, check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 主题切换波纹动画（Ripple Effect）

### 设计说明
- 主题切换时，点击按钮会以点击点为圆心扩散出圆形遮罩，动画完成后切换主题，提升用户体验。
- 动画颜色根据当前主题自动调整，亮色主题用深色波纹，暗色主题用浅色波纹。

### 主要实现文件
- `components/ThemeRipple.vue`：波纹动画组件，支持自定义颜色、位置和动画结束回调。
- `components/AppHeader.vue`：在主题切换按钮集成波纹动画，点击时获取坐标并触发动画。

### 使用说明
1. 在主题切换按钮的点击事件中，调用 `onThemeToggle(e: MouseEvent)`，传入事件对象。
2. 动画结束后自动切换主题。
3. 波纹动画组件可复用于其他需要点击扩散效果的场景。

### 可优化点
- 支持自定义动画时长、透明度。
- 支持移动端长按或手势触发。
- 可扩展为全局指令，便于多处复用。

## 全局 Logo 文字配置说明

本项目的 Logo 组件（`components/Logo.vue`）支持全局统一设置 logo 文字，无需在每个页面单独传递。

### 如何全局设置

1. 打开 `nuxt.config.ts`，在 `runtimeConfig.public` 下设置 `logoText`：

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      logoText: 'JW' // 全站 logo 文字
    }
  }
})
```

2. 只需 `<Logo />`，logo 文字会自动读取全局配置。

### 如何单独覆盖

如需在某处显示不同 logo 文字，可直接传递 `text` 属性：

```vue
<Logo text="自定义" />
```

此时该 logo 只显示自定义文字，不受全局配置影响。
