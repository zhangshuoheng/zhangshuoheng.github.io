---
title: 博客开张：这个站点是怎么搭起来的
date: 2026-09-23
tags:
  - 站点
  - 前端
  - 指南
summary: 记录这个个人站点的技术选型与内容管理方式：React + Vite + TypeScript + Tailwind CSS，博客由 Markdown 驱动，新增一篇文章只需要放一个 .md 文件。
cover: /images/blog/example-cover.svg
published: true
---

欢迎来到我的个人站点。第一篇文章想写点「元」的东西：**这个网站本身是怎么搭起来的**——因为它的搭建过程，恰好也是我最近在补的工程课。

## 为什么要有一个自己的站点

简历和成绩单只能说明一部分事情。我希望有一个地方可以长期沉淀：写过的代码、踩过的坑、读过的论文笔记，以及一些还没想清楚的思考。放在自己的域名下，格式和节奏都由自己决定。

## 技术选型

选型的原则是「简单、可长期维护、零成本上线」：

| 部分 | 选择 | 理由 |
| --- | --- | --- |
| 框架 | React + Vite + TypeScript | 生态成熟，构建快，类型安全 |
| 样式 | Tailwind CSS v4 | 设计令牌集中管理，改主题只动一处 |
| 内容 | Markdown + frontmatter | 写作时只关心内容，不碰代码 |
| 部署 | GitHub Pages + Actions | 免费、自动构建，推送即上线 |

没有数据库，也没有后端：所有内容都是仓库里的文件，构建时打包成静态站点。

## 内容是怎么管理的

### 新增一篇文章

只要在 `src/content/posts/` 下新建一个 `.md` 文件，文件名就是链接地址。文件开头写上 frontmatter：

```yaml
---
title: 文章标题
date: 2026-09-23
tags:
  - 随笔
summary: 一两句话的摘要。
cover: /images/blog/example-cover.svg
---
```

正文用标准 Markdown 书写，代码块标注语言即可自动高亮：

```ts
interface Post {
  title: string
  date: string
  tags: string[]
}

function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}
```

### 新增一个项目

项目信息集中在 `src/data/projects.ts`，新增一个项目就是在数组里追加一条记录，页面、筛选、详情页会自动生效。

## 设计上的几个取舍

- **默认暗色**：长时间阅读更舒服，浅色模式保留在右上角，随时可切
- **克制的动效**：只用滚动渐入与页面淡入，并且尊重系统「减少动态效果」设置
- **内容少也不空**：项目或文章不足时用「敬请期待」卡片补位，版面始终完整
- **无障碍与 SEO 是基本功**：语义化标签、跳转链接、每页独立的 title / description / OG 标签

## 接下来

- [x] 站点上线，博客跑通
- [ ] 补上真实的项目经历与实习经历
- [ ] 开始写技术笔记（机器学习 / 算法为主）
- [ ] 把站点细节继续打磨：文章目录、RSS、阅读量统计

> 在对的时间，争取做最好的自己。

如果你也在搭自己的站点，欢迎来信交流。
