# 我的工具箱

零基础项目：纯 HTML + CSS + JavaScript 的**单文件**网站，双击即可运行，无需安装任何依赖、无需服务器、无需备案。

在线地址：https://t20-j.github.io/tangt/

## 功能

### 🧰 实用工具
- **单位换算**：长度（米/厘米/毫米/千米/英寸/英尺）、重量（克/千克/斤/磅/盎司）、温度（摄氏/华氏/开尔文）
- **密码生成器**：长度 4–64 位，可选大小写字母、数字、符号；使用 `crypto.getRandomValues` 加密安全随机数；一键复制
- **文本工具**：字符数 / 单词数 / 行数统计，一键转大写、转小写

### 🎮 小游戏
- **数独**：三档难度（简单 38 挖空 / 中等 46 / 困难 52），回溯算法生成并通过"解数计数"保证**唯一解**；冲突高亮、数字键盘、提示、计时、胜利判定
- **舒尔特方格** 4/5/6 阶（含 3×3）：按 1→N² 顺序点击，点错闪红，首次点击开始计时，最佳成绩存 `localStorage`
- **五子棋**：15×15 棋盘，双人对战 / 人机对战；AI 用四方向棋型评分（活四、冲四、活三…）+ 对手防守权重；支持悔棋

### 📐 测量工具
- **屏幕尺子**：上方英寸（1/16 细分）、下方厘米（毫米细分）；用标准银行卡（宽 85.6mm）校准，比例保存在本机
- **分贝仪**：`getUserMedia` + `AnalyserNode` 读取 RMS 估算环境音量，含峰值保持与校准偏差

### 🌐 网络查询
- [ping0.cc](https://ping0.cc/)：IP 归属地、运营商、原生/广播 IP 检测
- [browserleaks.com/ip](https://browserleaks.com/ip)：浏览器 IP 泄露与指纹检测

## 使用

双击 `index.html`，用浏览器打开即可。

> ⚠️ 分贝仪需要麦克风权限，浏览器只在 **https** 或 **localhost** 下才允许录音，所以线上（GitHub Pages）可用，本地双击打开可能不可用。

## 技术栈

- HTML5（语义化标签、Canvas）
- CSS3（CSS 变量、Flex、Grid、`prefers-color-scheme` 自动深色模式、响应式）
- 原生 JavaScript（DOM 操作、事件委托、Canvas 2D、Web Audio、Clipboard API、localStorage）

没有框架、没有依赖、没有构建步骤 —— 这也是零基础阶段最适合的技术形态。

## 目录结构

```
工具站/
├── index.html              ← 整个网站（结构 + 样式 + 脚本）
├── manifest.webmanifest    ← PWA 应用清单（名称、图标、全屏启动）
├── sw.js                   ← Service Worker（离线缓存）
├── icon-192.png            ← 桌面 / 安装图标 192×192
├── icon-512.png            ← 安装图标 512×512
├── icon-maskable-512.png   ← Android 自适应图标（maskable）
├── apple-touch-icon.png    ← iOS「添加到主屏幕」图标 180×180
└── README.md
```

所有文件都放在**仓库根目录**（和 `index.html` 同级），PWA 才能正常识别。

## 更新到 GitHub（网页方式，不用装软件）

1. 打开仓库 https://github.com/t20-j/tangt
2. 点 `index.html` → 右上角铅笔图标（Edit）→ 全选删除 → 粘贴新的完整内容 → `Commit changes`
3. 或者：`Add file` → `Upload files` → 把新文件拖进去 → `Commit changes`
4. 等 1–3 分钟，刷新 https://t20-j.github.io/tangt/ 即可看到新版本（页面没变就按 `Ctrl + F5` 强制刷新）

## 做成 Android App

### 已打包版本 v1.1.0（离线版，推荐）

- 下载地址：https://github.com/t20-j/tangt/releases/latest/download/my-toolbox-offline-v1.1.0.apk
- Release 页面：https://github.com/t20-j/tangt/releases/tag/v1.1.0
- 安装包：`我的工具箱-离线版-v1.1.0.apk`（约 2.8 MB，在上一级目录）
- 形式：**Capacitor**，把整个网站打进 App，**完全离线可用、不依赖浏览器**
- 包名 `com.t20j.toolbox`，versionCode 2，versionName 1.1.0，minSdk 22，targetSdk 34
- 已声明麦克风权限（`RECORD_AUDIO`），分贝仪可用
- 与 v1.0.0（TWA）的区别：

  | | v1.0.0 TWA | v1.1.0 离线版 |
  |---|---|---|
  | 网页来源 | 线上加载 | 打包在 App 内 |
  | 需要联网 | 首次需要 | 不需要 |
  | 依赖 Chrome | 是 | 否 |
  | 体积 | 0.98 MB | 2.8 MB |
  | 改网页生效 | 自动 | 需重新打包 |

- 构建工程：`%LOCALAPPDATA%\appbuild\cap`（源码 `www/index.html` 由 `_prepare_cap.mjs` 生成并 `npx cap sync` 同步）

### 已打包版本 v1.0.0（TWA）

- 下载地址：https://github.com/t20-j/tangt/releases/tag/v1.0.0
- 安装包：`我的工具箱-v1.0.0.apk`（约 0.98 MB，在上一级目录）
- 包名 `com.t20j.toolbox`，versionCode 1，minSdk 24（Android 7.0+），targetSdk 36
- 形式：TWA（Trusted Web Activity），原生外壳 + 加载线上网页，**需要联网**
- 签名：`app-build/android.keystore`，别名 `android`，密码 `toolbox2026`
  - SHA-256 指纹：`58:46:B9:40:13:C8:C0:5D:34:E8:F4:E3:D5:93:6A:02:0E:F8:A9:D0:D2:32:B7:4C:39:AE:78:7A:76:BB:20:8F`
  - ⚠️ 这个 keystore 和密码务必保存好，以后升级 App 必须用同一个签名
- 已上传 `.well-known/assetlinks.json` + `.nojekyll`，所以 App 打开时**不显示地址栏**
- 改网站内容后 App 里自动生效，不需要重新打包；只有换图标 / 改名字 / 改包名才需要重打

### 方式一：直接安装到桌面（PWA，零成本）

手机 Chrome 打开 https://t20-j.github.io/tangt/ → 右上角 `⋮` → **添加到主屏幕**。
之后从桌面图标打开就是全屏、无地址栏，断网也能打开（`sw.js` 已缓存页面）。

### 方式二：自己重新打包成 .apk（PWABuilder 网页，不需要装开发环境）

1. 打开 https://www.pwabuilder.com ，输入网址 `https://t20-j.github.io/tangt/`
2. 点 **Package for stores** → 选 **Android**
3. 应用名填「我的工具箱」，包名填 `com.t20j.toolbox`（可改，但之后别再变）
4. 下载 zip，解压得到 `.apk`，传到手机安装（需允许「安装未知来源应用」）
5. 生成的包是 **TWA**：原生外壳 + 加载线上网页，仍然需要联网

**去掉顶部地址栏**（可选）：打包完 PWABuilder 会给一个 SHA-256 指纹，在仓库根目录新建
`.well-known/assetlinks.json`，内容：

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.t20j.toolbox",
    "sha256_cert_fingerprints": ["把 PWABuilder 给的指纹填这里"]
  }
}]
```

### 方式三：Capacitor（可完全离线、可上架）

需要电脑装 JDK 17 + Android Studio：

```bash
npm install -g @capacitor/cli
npx cap init "我的工具箱" com.t20j.toolbox --web-dir=.
npx cap add android
npx cap open android
```

把 `index.html` 等文件放进 `www/`，用 Android Studio 点 Run 即可安装到手机。

## 隐私

所有计算都在浏览器本地完成，不上传任何数据、不埋点、不追踪。密码和文本只存在于当前页面内存中。

## 后续计划

- [ ] 添加二维码生成器
- [ ] 添加倒计时 / 番茄钟
- [ ] 添加单位换算的历史记录
- [ ] 支持手动切换深色 / 浅色主题
- [ ] 拆分为多文件（`style.css` / `main.js`）并引入 Vite 构建
