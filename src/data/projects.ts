/**
 * 项目数据 —— 全站唯一的项目清单。
 * 新增一个项目 = 在下面数组里新增一条记录（复制"示例项目"那条改即可），无需改任何其他代码。
 */

export interface ProjectLink {
  /** 按钮文字，如"在线演示"、"源码仓库" */
  label: string
  /** 链接地址（占位先用 #，上线后替换为真实地址） */
  url: string
}

export interface Project {
  /** 唯一标识，用于详情页 URL：/projects/{slug}。只能用英文小写字母、数字、连字符 */
  slug: string
  /** 项目名称 */
  title: string
  /** 一句话简介（卡片与详情页副标题） */
  tagline: string
  /** 详细介绍，支持 Markdown（## 标题、列表、代码块、链接等都可用） */
  description: string
  /** 封面图：public 下的路径（如 /images/projects/xxx.svg）或完整 URL */
  cover: string
  /** 技术栈标签（显示在卡片上，也参与筛选） */
  tech: string[]
  /** 分类标签（参与筛选；可以是"全栈/前端/工具"等） */
  tags: string[]
  /** 外链按钮 */
  links: ProjectLink[]
  /** 是否在首页"精选项目"展示 */
  featured?: boolean
  /** 年份（卡片左上角徽标） */
  year: string
}

export const projects: Project[] = [
  {
    slug: 'personal-website',
    title: '个人网站（本站）',
    tagline: '用 React + Vite + TypeScript + Tailwind CSS 搭建的极简暗色个人站点，Markdown 驱动博客。',
    description: `## 项目简介

这是你现在看到的这个站点。目标很简单：**做一个加载快、好维护、能长期写下去的个人主页**——不需要数据库，也不需要后端。

## 功能亮点

- 极简暗色设计，支持浅色模式切换（记忆用户选择）
- 博客完全由 Markdown 驱动：新增文章 = 在 \`src/content/posts/\` 放一个 \`.md\` 文件
- 项目数据集中在单个 TS 文件，支持按技术栈 / 标签筛选
- 代码高亮、标题锚点、图片懒加载、滚动渐入与页面过渡动效
- 每个页面独立 SEO（title / description / OG 标签）
- 响应式布局：桌面端与移动端都完整可用

## 技术实现

- \`React 19 + React Router 7\`：前端路由与页面级代码分割（Markdown 渲染器按需加载）
- \`Vite\`：开发热更新与生产构建
- \`Tailwind CSS v4\`：设计令牌与暗色主题（class 策略 + 首屏防闪烁脚本）
- \`react-markdown\` + 自研 frontmatter 解析器：零依赖解析 frontmatter，渲染 Markdown（GFM、代码高亮、标题锚点）
- 部署：GitHub Actions 自动构建并发布到 GitHub Pages；构建产物附带 404.html，保证深链接可用

## 为什么自己写而不用现成主题

想借这个项目把工程链路走一遍：设计系统、路由与代码分割、内容管线、SEO、CI/CD 部署——这些在写业务代码时很少有机会从头搭一遍。`,
    cover: '/images/projects/example-cover.svg',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    tags: ['前端', '站点'],
    links: [
      { label: '在线访问', url: 'https://zhangshuoheng.github.io' },
      { label: '源码仓库', url: 'https://github.com/zhangshuoheng/zhangshuoheng.github.io' },
    ],
    featured: true,
    year: '2026',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** 所有筛选标签（分类标签 + 技术栈合并去重） */
export function getProjectTags(): string[] {
  const set = new Set<string>()
  for (const p of projects) {
    for (const t of p.tags) set.add(t)
    for (const t of p.tech) set.add(t)
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}
