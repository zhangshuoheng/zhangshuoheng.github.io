import { parseFrontmatter, asString, asStringArray } from './frontmatter'

/**
 * 博客引擎：自动扫描 src/content/posts/*.md。
 * 新增一篇文章 = 在 src/content/posts/ 下新增一个 .md 文件，无需改任何代码。
 *
 * frontmatter 由 src/lib/frontmatter.ts 解析（零依赖，纯浏览器可用）。
 */

export interface PostFrontmatter {
  /** 文章标题 */
  title: string
  /** 发布日期，格式 YYYY-MM-DD */
  date: string
  /** 标签（支持筛选） */
  tags: string[]
  /** 摘要（列表页与 SEO description 使用） */
  summary?: string
  /** 封面图：public 下的路径（如 /images/blog/xxx.svg）或完整 URL */
  cover?: string
  /** 设为 false 可隐藏文章（草稿） */
  published?: boolean
}

export interface Post extends PostFrontmatter {
  /** 由文件名自动生成，如 my-first-post.md → my-first-post */
  slug: string
  /** Markdown 正文 */
  content: string
  /** 估算阅读时长（分钟） */
  readingMinutes: number
}

const postModules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const base = path.split('/').pop() ?? path
  return base.replace(/\.md$/, '')
}

function parsePost(path: string, raw: string): Post {
  const { data, content } = parseFrontmatter(raw)

  // 粗略阅读时长：去掉代码块与符号后按字数估算，中文约 500 字/分钟
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*`\-\[\]()!|]/g, '')
    .trim()
  const readingMinutes = Math.max(1, Math.round(text.length / 500))

  return {
    slug: slugFromPath(path),
    title: asString(data.title) || '未命名文章',
    date: asString(data.date),
    tags: asStringArray(data.tags),
    summary: asString(data.summary),
    cover: asString(data.cover) || undefined,
    published: data.published !== false,
    content,
    readingMinutes,
  }
}

/** 全部已发布文章，按时间倒序 */
export function getAllPosts(): Post[] {
  return Object.entries(postModules)
    .map(([path, raw]) => parsePost(path, raw))
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

/** 所有标签（去重、按中文习惯排序），用于筛选栏 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag)
  }
  return [...tags].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

/** YYYY-MM-DD → 2026年9月23日 */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
