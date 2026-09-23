/**
 * 站点全局配置 —— 全站个人信息只在这里改。
 */

export type SocialId = 'github' | 'twitter' | 'linkedin' | 'mail'

export interface Social {
  id: SocialId
  label: string
  href: string
}

export const site = {
  /** 姓名 / 昵称（导航栏、页脚、SEO 标题都会用到） */
  name: '仉烁蘅',
  /** Logo 图标上显示的字（建议一个英文字母，如 Z） */
  monogram: 'Z',

  /** SEO：全站默认标题与描述 */
  title: '仉烁蘅 —— 个人网站',
  description: '东北师范大学 · 计算机科学与技术 | 专注人工智能方向，目标大厂 AI 岗。',

  /** 站点地址（OG 标签 / canonical 使用，必须带协议） */
  url: 'https://zhangshuoheng.github.io',

  /** 作者名（文章 SEO 用） */
  author: '仉烁蘅',

  /** 联系邮箱（取自本机 git 配置，如需更换请改这里） */
  email: '18526787363@163.com',
  location: '吉林 · 长春',

  /** 个人格言（首页 Hero 展示） */
  motto: '在对的时间，争取做最好的自己',

  /** 首页 Hero 区内容 */
  hero: {
    greeting: '你好，我是',
    /** 一句话价值主张 */
    valueProp:
      '东北师范大学计算机科学与技术专业在读，专注人工智能方向，目标是大厂 AI 岗。',
    /** 头像下方的小状态标签 */
    status: '目标：大厂 AI 岗',
    /** Hero 区关键词 */
    keywords: ['人工智能', '计算机科学与技术', '滑雪', '健身'],
    /** Hero 两个按钮文案 */
    ctaPrimary: '查看我的项目',
    ctaSecondary: '阅读博客',
  },

  /** 社交链接（不需要的条目直接删除或注释掉即可） */
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/zhangshuoheng' },
    { id: 'mail', label: '邮箱', href: 'mailto:18526787363@163.com' },
    // 补上账号后取消注释即可显示：
    // { id: 'twitter', label: 'X (Twitter)', href: 'https://twitter.com/你的用户名' },
    // { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/你的用户名' },
  ] satisfies Social[],
}

/** 把站内路径拼成绝对 URL（OG 标签需要绝对地址） */
export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${site.url}${path}`
}
