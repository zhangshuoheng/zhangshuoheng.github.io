/**
 * gray-matter 的本地类型声明（该包未发布官方类型，npm 上也无 @types）。
 * 只声明了本项目用到的 API 子集。
 */

declare module 'gray-matter' {
  interface GrayMatterFile<T> {
    /** 解析出的 frontmatter 数据（YAML 对象） */
    data: Record<string, unknown>
    /** 去除 frontmatter 后的正文 */
    content: T
    /** 原始文件内容 */
    orig: Buffer | string
    /** 解析出的 frontmatter 原文 */
    matter: string
    /** frontmatter 使用的语言（yaml / json / toml 等） */
    language: string
    /** 是否为空 frontmatter */
    isEmpty: boolean
  }

  interface GrayMatterOption {
    excerpt?: boolean | string | ((input: string, options: GrayMatterOption) => string)
  }

  /** 解析带 frontmatter 的字符串：返回 data + content */
  function matter(input: string, options?: GrayMatterOption): GrayMatterFile<string>

  export = matter
}
