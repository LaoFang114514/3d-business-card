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

一个纯前端的 3D 电子名片展示页：名片在页面中央自动旋转，可用手指 / 鼠标拖动查看正反面，支持缩放，底部有悬浮操作栏。想换成自己的名片只需编辑 `config.js` 一个文件。

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
| 关于 按钮 | 弹出对话框，含固定的项目链接、版权信息与 ICP / 公安联网备案（版权与备案可在 config.js 中改） |
| 暂停 / 开始旋转 按钮 | 切换自动旋转 |
| 社交 按钮 | 在原位向上展开成一排社交媒体图标，点击在新标签页打开；点空白处或按 Esc 收起 |
| 亮色 / 暗色 | 「社交」栏第一个按钮切换主题；默认值在 `config.js` 的「暗色模式」里设置（`auto` / `light` / `dark`） |

## 📁 文件结构

```
├── config.js     # ★ 要改内容的只改这个文件（标题 / 图片 / 社交媒体 / 关于标题 / 版权 / 备案）
├── 使用说明.txt   # 给完全不懂编程的人看的纯文本说明，记事本就能打开
├── index.html    # 主页面（结构骨架，一般不用动）
├── main.js       # 交互逻辑 + 平台图标库（一般不用动）
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
2. **把自己的名片图片放进目录**，例如 `front.png` / `back.png`（建议带圆角、正反面同比例）
3. **打开 `config.js`，照着注释改** —— 标题、正反面图片文件名、旋转速度、暗色模式、社交媒体列表、关于弹窗的版权与 ICP / 公安联网备案全在这一个文件里（弹窗里的三条项目链接固定）。其他文件不用碰。完全没碰过代码的人，先读同目录的 `使用说明.txt`
4. **加一个社交平台只要一行**：`{ 名称: '小红书', 链接: 'https://www.xiaohongshu.com/...' }`，图标会按名称和网址自动识别（认不出时用通用链接图标）
5. **本地看效果** — 双击 `index.html` 即可；想用带地址栏的本地服务，在目录里执行 `npx serve` 之类
6. **部署** — 上传到任意静态托管服务即可（mdui 通过 CDN 加载，无需安装依赖）

## 📝 许可

本项目采用 MIT 许可，各位可随意使用、修改。

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

A pure front-end 3D business card showcase: the card auto-rotates in the center of the page, can be dragged with finger / mouse to see both sides, supports zooming, and has a floating action bar at the bottom. Making it yours only takes editing the single `config.js` file.

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
| About button | Opens a dialog with fixed project links, copyright and ICP / public security filing info (copyright and filings are configurable in config.js) |
| Pause / Play button | Toggles auto rotation |
| Social button | Expands in place into a row of social media icons above the bar; each opens in a new tab. Tap elsewhere or press Esc to collapse |
| Light / dark | The first button in the social tray switches themes; set the default via "暗色模式" in `config.js` (`auto` / `light` / `dark`) |

## 📁 File Structure

```
├── config.js     # ★ The only file you need to edit (title / images / social media / about title / copyright / filings)
├── 使用说明.txt   # Plain-text guide for non-programmers (opens in Notepad)
├── index.html    # Page skeleton (usually no need to touch)
├── main.js       # Interaction logic + platform icon library (usually no need to touch)
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
2. **Put your own card images in the folder**, e.g. `front.png` / `back.png` (rounded corners and matching aspect ratio recommended)
3. **Open `config.js` and follow the comments** — title, image file names, rotation speed, dark mode, social media list and the about dialog's copyright and ICP / public security filing info all live in this single file (the three project links in the dialog are fixed). Nothing else needs editing. Never touched code before? Read `使用说明.txt` in the same folder first
4. **Adding a platform is one line**: `{ 名称: 'Portfolio', 链接: 'https://example.com' }` — the icon is detected from the name and URL, falling back to a generic link icon
5. **Preview** — open `index.html` in a browser, or run a local static server such as `npx serve`
6. **Deploy** — upload to any static hosting service (mdui is loaded from a CDN, no install needed)

## 📝 License

This project is licensed under the MIT License. Feel free to use and modify.
