<div align="center">

# 🪪 3D 名片

**一个 3D 电子名片展示网页**

<a href="https://laofang114514.github.io/3d-business-card/">GitHub Pages 演示</a> ·
<a href="https://3d-business-card-x0umh8ry29m.qoder.zone/">Qoder Sites 演示</a> ·
<a href="https://github.com/LaoFang114514/3d-business-card">GitHub</a> ·
<a href="https://gitcode.com/LaoFang233/3d-business-card">GitCode</a>

</div>

---

## ✨ 简短描述

一个纯前端的 3D 电子名片展示页：名片在页面中央自动旋转，可用手指 / 鼠标拖动查看正反面，支持缩放，底部有悬浮操作栏。

- 使用 [mdui 2](https://github.com/zdhxiong/mdui)（Material Design 3）UI 组件库 + CDN 引入，图标为内联 SVG
- 由 [Qoder](https://qoder.com/) + DeepSeek 辅助编写
- 无任何构建依赖，打开即用

## 🎮 交互说明

| 操作 | 效果 |
| --- | --- |
| 自动旋转 | 名片绕竖直轴缓慢旋转（默认开启） |
| 上下拖动 | 翻转查看，松手后自动回弹至水平正中 |
| 左右拖动（暂停时） | 手动旋转，松手后有惯性衰减 |
| 滚轮 / 双指捏合 | 缩放名片（已禁用网页整体缩放，只缩放名片） |
| 关于 按钮 | 弹出对话框，含项目链接（GitHub / GitCode / MDUI） |
| 暂停 / 开始旋转 按钮 | 切换自动旋转 |
| 主页 按钮 | 跳转到个人主页 |

## 📁 文件结构

```
├── index.html    # 主页面（含关于弹窗与底部按钮栏）
├── main.js       # 交互逻辑（旋转、回弹、惯性、缩放、投影）
├── style.css     # 样式、3D 卡片厚度与地面投影
├── front.png     # 名片正面图片
├── back.png      # 名片背面图片
├── favicon.png   # 网站图标
└── LICENSE       # 开源许可证
```

## 🚀 部署项目

1. **克隆项目**
   ```bash
   git clone https://github.com/LaoFang114514/3d-business-card.git
   ```
2. **替换名片图片** — 将 `front.png` 和 `back.png` 替换为你自己的名片图片（建议带圆角、正反面同比例）
3. **修改标题** — 在 `index.html` 中修改 `.title` 与关于弹窗内的标题文字
4. **修改链接** — 在 `main.js` 中修改主页跳转 `HOME_URL`；关于弹窗内的链接在 `index.html` 的 `#aboutDialog` 中修改
5. **部署** — 直接用浏览器打开 `index.html`，或部署到任意静态托管服务（mdui 通过 CDN 加载，无需安装依赖）

## 📝 许可

本项目采用 CC0-1.0 许可，各位可随意使用、修改。

---

<div align="center">

# 🪪 3D Business Card

**A 3D digital business card showcase webpage**

<a href="https://laofang114514.github.io/3d-business-card/">GitHub Pages Demo</a> ·
<a href="https://3d-business-card-x0umh8ry29m.qoder.zone/">Qoder Sites Demo</a> ·
<a href="https://github.com/LaoFang114514/3d-business-card">GitHub</a> ·
<a href="https://gitcode.com/LaoFang233/3d-business-card">GitCode</a>

</div>

---

## ✨ Brief Description

A pure front-end 3D business card showcase: the card auto-rotates in the center of the page, can be dragged with finger / mouse to see both sides, supports zooming, and has a floating action bar at the bottom.

- Built with the [mdui 2](https://github.com/zdhxiong/mdui) (Material Design 3) UI component library via CDN, with inline SVG icons
- Co-developed using [Qoder](https://qoder.com/) + DeepSeek
- No build step or dependencies — just open and go

## 🎮 Interactions

| Action | Effect |
| --- | --- |
| Auto rotation | The card slowly rotates around the vertical axis (on by default) |
| Drag vertically | Flip the card; it springs back to level on release |
| Drag horizontally (when paused) | Manual rotation with inertia decay on release |
| Wheel / pinch | Zoom the card only (page-level zoom is disabled) |
| About button | Opens a dialog with project links (GitHub / GitCode / MDUI) |
| Pause / Play button | Toggles auto rotation |
| Home button | Jumps to the personal homepage |

## 📁 File Structure

```
├── index.html    # Main page (about dialog and bottom action bar)
├── main.js       # Interaction logic (rotation, spring-back, inertia, zoom, shadow)
├── style.css     # Styles, 3D card thickness and ground shadow
├── front.png     # Front side of the business card
├── back.png      # Back side of the business card
├── favicon.png   # Site favicon
└── LICENSE       # Open source license
```

## 🚀 Deployment

1. **Clone the project**
   ```bash
   git clone https://github.com/LaoFang114514/3d-business-card.git
   ```
2. **Replace card images** — Replace `front.png` and `back.png` with your own card images (rounded corners and matching aspect ratio recommended)
3. **Modify the title** — Edit `.title` and the dialog headline text in `index.html`
4. **Modify links** — Update `HOME_URL` in `main.js`; dialog links live in `#aboutDialog` inside `index.html`
5. **Deploy** — Open `index.html` directly in a browser, or deploy to any static hosting service (mdui is loaded from a CDN, no install needed)

## 📝 License

This project is licensed under CC0-1.0. Feel free to use and modify.
