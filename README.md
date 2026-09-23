# 仉烁蘅 · 个人网站

极简暗色风格的个人网站：展示个人信息、项目作品与博客文章。

- **技术栈**：React 19 + Vite + TypeScript + Tailwind CSS v4 + React Router
- **内容管理**：博客 = Markdown 文件（`src/content/posts/*.md`），项目 = 本地 TS 数据文件（`src/data/projects.ts`）
- **无需后端 / 数据库**，已配置 GitHub Pages 自动部署（同时保留 Vercel / Netlify 配置）
- 特性：默认简约暗色（可切浅色）、响应式布局、滚动渐入微动效、页面过渡、代码高亮、标题锚点、图片懒加载、基础 SEO（含 OG 标签）、404 页面、无障碍基础规范

---

## 一、技术方案总览

```
浏览器
 └─ React SPA（React Router 前端路由，支持 /blog/:slug 等深链接）
     ├─ 项目数据  → src/data/projects.ts（本地 TS 数组，改文件即生效）
     ├─ 博客内容  → src/content/posts/*.md（frontmatter + Markdown）
     │                └─ 构建时由 Vite import.meta.glob 自动扫描，新增文件无需改代码
     ├─ 个人配置  → src/lib/site.ts（姓名、邮箱、社交链接、SEO 默认值）
     └─ 主题      → Tailwind v4 class 策略深色模式（localStorage + 系统偏好）
部署        → GitHub Pages（.github/workflows/deploy.yml 自动构建），Vercel / Netlify 配置作为备选
```

**新增内容的核心理念**：项目 = 在数组里加一条记录；文章 = 在目录里加一个 `.md` 文件。除此之外**不需要改任何代码**。

---

## 二、目录结构（★ = 你以后需要改的文件夹）

```
DP_01/
├── public/                        ★ 静态资源（图片都放这里，路径以 / 开头引用）
│   ├── favicon.svg                ★ 站点图标
│   ├── og-default.svg             ★ 默认分享图（建议替换为 1200×630 的 PNG）
│   └── images/
│       ├── avatar.svg             ★ 头像占位图（替换为你的照片/头像）
│       ├── projects/              ★ 项目封面图放这里
│       └── blog/                  ★ 文章封面图放这里
├── src/
│   ├── content/
│   │   └── posts/                 ★★★ 博客文章：每新增一个 .md 文件 = 一篇文章
│   │       └── hello-blog.md           （首篇文章，可复制它作为新文章模板）
│   ├── data/
│   │   ├── projects.ts            ★★★ 项目数据：每新增一条记录 = 一个项目
│   │   └── about.ts               ★ 关于页内容：自我介绍 / 技能 / 时间线
│   ├── lib/
│   │   ├── site.ts                ★★ 全站个人配置：姓名、邮箱、社交、SEO
│   │   └── blog.ts                    博客引擎（扫描 .md、解析 frontmatter）——一般不用动
│   ├── components/                    通用组件（导航、卡片、Markdown 渲染等）
│   ├── pages/                         8 个页面（首页/关于/项目/项目详情/博客/文章详情/联系/404）
│   ├── hooks/useTheme.ts              主题切换 Hook
│   ├── styles/index.css               全局样式：主题色、字体、动画、代码高亮配色
│   ├── App.tsx                        路由与布局
│   └── main.tsx                       应用入口
├── index.html                     入口 HTML（默认 SEO 标签 + 防闪烁主题脚本）
├── scripts/postbuild.mjs          构建后生成 404.html（GitHub Pages 深链接回退）
├── .github/workflows/deploy.yml   GitHub Actions：推送 main 自动部署到 GitHub Pages
├── vite.config.ts
├── vercel.json                    Vercel 部署配置（备选方案）
├── netlify.toml                   Netlify 部署配置（备选方案）
└── package.json
```

---

## 三、本地运行 / 构建

要求：Node.js ≥ 18（推荐 20+）。

```bash
# 1. 安装依赖（首次）
npm install

# 2. 本地开发（默认 http://localhost:5173，支持热更新）
npm run dev

# 3. 类型检查 + 生产构建（产物在 dist/）
npm run build

# 4. 本地预览构建产物（默认 http://localhost:4173）
npm run preview
```

---

## 四、部署

### 方式 A：GitHub Pages（已配置好，推荐）

仓库 `zhangshuoheng.github.io` 是 GitHub Pages 的**用户站点**仓库，推送完成后访问 **https://zhangshuoheng.github.io** 即可看到成品。

1. 把代码推送到 `main` 分支（命令见下方「首次推送到 GitHub」）。
2. 打开仓库 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**（只需设置这一次）。
3. 之后每次 `git push`，`.github/workflows/deploy.yml` 会自动执行 `npm ci && npm run build` 并把 `dist/` 发布出去；进度可在仓库 **Actions** 标签页查看，通常 1–2 分钟完成。
4. 构建脚本会额外生成 `dist/404.html`，因此直接访问 `/blog/hello-blog` 这类深链接也能正常打开（GitHub Pages 不支持 rewrite，这是标准做法）。

### 首次推送到 GitHub

```bash
git init -b main
git add .
git commit -m "feat: 个人网站上线"
git remote add origin https://github.com/zhangshuoheng/zhangshuoheng.github.io.git
git push -u origin main
```

首次推送会弹出浏览器窗口，用 Git Credential Manager 登录 GitHub 完成授权。

> 如果远端仓库已有提交（例如初始化时生成的 README），先执行 `git pull --rebase origin main` 再推送；确定要覆盖远端时可用 `git push -u origin main --force`。

### 方式 B：Vercel（备选）

1. 把项目推到 GitHub（`git init && git add . && git commit -m "init" && git push`）。
2. 打开 [vercel.com](https://vercel.com) → **Add New → Project** → 导入该仓库。
3. 框架预设会自动识别 Vite（Build Command: `npm run build`，Output: `dist`），直接 **Deploy**。
4. 仓库里的 `vercel.json` 已配置 SPA 回退与干净 URL，无需额外设置。

命令行方式：`npm i -g vercel && vercel`（首次按提示登录，之后 `vercel --prod` 部署）。

### 方式 C：Netlify（备选）

1. 推送到 GitHub 后，打开 [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**。
2. Build command: `npm run build`，Publish directory: `dist`，点击 Deploy。
3. 也可以直接把 `dist/` 文件夹拖进 Netlify Drop（但注意：拖拽部署不执行 `netlify.toml`，需手动在站点设置里加 SPA 回退规则 `/* → /index.html 200`；建议用 Git 方式部署）。

> 站点地址已写在 `src/lib/site.ts` 的 `url` 字段（当前为 `https://zhangshuoheng.github.io`）；若绑定了自定义域名，只需改这一处，OG 标签与 canonical 会自动跟随。

---

## 五、高频操作 A：新增一个项目

**只需编辑一个文件**：`src/data/projects.ts`，在 `projects` 数组末尾追加一条记录：

```ts
{
  slug: 'my-project',          // 唯一标识，决定详情页地址 /projects/my-project
  title: '我的项目',            // 项目名称
  tagline: '一句话简介。',       // 卡片与详情页副标题
  description: `## 项目简介\n\n（支持 Markdown：标题、列表、代码块、链接…）`,
  cover: '/images/projects/my-cover.svg',   // 封面图（放入 public/images/projects/）
  tech: ['React', 'TypeScript'],            // 技术栈标签（显示 + 参与筛选）
  tags: ['前端'],                            // 分类标签（参与筛选）
  links: [
    { label: '在线演示', url: 'https://xxx.com' },
    { label: '源码仓库', url: 'https://github.com/xxx/xxx' },
  ],
  featured: true,               // true 时展示在首页"精选项目"
  year: '2025',
},
```

字段说明：

| 字段 | 说明 | 必填 |
| --- | --- | --- |
| `slug` | 详情页 URL 标识，只用英文小写/数字/连字符，全局唯一 | ✅ |
| `title` | 项目名称 | ✅ |
| `tagline` | 一句话简介 | ✅ |
| `description` | 详情页正文，Markdown 格式 | ✅ |
| `cover` | 封面图，`public/` 内路径或完整 URL | ✅ |
| `tech` | 技术栈数组（卡片徽标 + 筛选） | ✅ |
| `tags` | 分类数组（筛选） | ✅ |
| `links` | 外链按钮；未上线前可写 `#`（会显示为占位样式） | 可选 |
| `featured` | 首页精选展示 | 可选 |
| `year` | 年份徽标 | 可选 |

**注意**：`description` 用的是 TS 模板字符串，正文里如果要用反引号包裹的代码块，请改用 `\`` 转义或普通字符串拼接。

---

## 六、高频操作 B：新增一篇博客文章

**只需新建一个文件**：`src/content/posts/你的文章名.md`（文件名即链接，如 `hello-world.md` → `/blog/hello-world`）。

frontmatter 模板（文件开头的 `---` 之间）：

```yaml
---
title: 文章标题
date: 2025-06-01
tags:
  - 技术
  - 随笔
summary: 一两句话的摘要（列表页和 SEO 使用）。
cover: /images/blog/hello-cover.svg
published: true
---
```

正文从这里开始，支持标准 Markdown + GFM（表格、任务列表、删除线）：

```md
## 小标题（自动生成锚点）

**加粗**、`行内代码`、[链接](https://example.com)

```ts
const hello = 'world'
```

![图片描述](/images/blog/hello-cover.svg)
```

字段说明：

| 字段 | 说明 | 必填 |
| --- | --- | --- |
| `title` | 文章标题 | ✅ |
| `date` | 发布日期，格式 `YYYY-MM-DD`（列表按此倒序） | ✅ |
| `tags` | 标签数组，用于筛选 | ✅ |
| `summary` | 摘要（列表页 + SEO description），建议填写 | 建议 |
| `cover` | 封面图（`public/` 内路径或完整 URL） | 可选 |
| `published` | 设为 `false` 即草稿，不在任何地方展示 | 可选 |

**零代码**：保存文件即可 —— 开发模式热更新立即生效，构建时自动扫描新文件。代码块只要标注语言（` ```ts `、` ```bash ` 等）就自动高亮；图片自动懒加载；正文里相对路径的图片请用 `/images/...` 开头的 public 路径。

---

## 七、个性化定制清单

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、头像旁的一句话、社交链接、邮箱、SEO 默认文案 | `src/lib/site.ts`（全部集中在这里） |
| 头像图片 | `public/images/avatar.svg` 替换为你的照片（建议方形 400×400+） |
| 主题色（当前为靛蓝 `#5E6AD2`） | `src/styles/index.css` 里 `@theme` 的 `--color-brand-*` |
| 字体 | `src/styles/index.css` 的 `--font-sans` / `--font-mono` + `index.html` 的 Google Fonts 链接 |
| 深色/浅色 | 默认 **简约暗色** 风格；导航栏右上角可切回浅色，选择会记忆在 localStorage |
| 关于页内容 | `src/data/about.ts` |
| 站点图标 | `public/favicon.svg` |
| 分享图（OG） | `public/og-default.svg`，建议换成 1200×630 PNG |

## 八、联系表单说明

表单使用 **mailto 方案**（点发送 → 打开系统邮件客户端），无需后端。如果你想用第三方表单服务（如 Formspree），修改 `src/pages/Contact.tsx` 的 `handleSubmit`：

```ts
// Formspree 示例：https://formspree.io 注册后得到表单 ID
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  await fetch('https://formspree.io/f/你的表单ID', {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  alert('发送成功！')
}
```

## 九、常见问题

- **深色模式下刷新会闪白？** 不会 —— `index.html` 内联脚本会在首屏前设置 `.dark`。
- **刷新 /blog/xxx 出现 404？** 本地 dev 不会；线上部署请确认 `vercel.json` / `netlify.toml` 已生效（Git 方式部署会自动生效）。
- **如何隐藏某篇文章？** frontmatter 加 `published: false`。
- **如何在文章/项目里用自定义图片？** 图片放进 `public/images/`，引用 `/images/xxx.png`；注意文件名不要含中文与空格。
- **文章与项目多了之后要分页吗？** 当前列表页直接展示全部；数量大了可在 `src/pages/Blog.tsx` 里加简单的"加载更多"或分页。
