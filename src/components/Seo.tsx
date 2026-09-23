import { useEffect } from 'react'
import { site, absoluteUrl } from '../lib/site'

interface SeoProps {
  /** 页面标题；不传则用站点默认标题 */
  title?: string
  /** 页面描述；不传则用站点默认描述 */
  description?: string
  /** 页面路径，如 /blog/my-post */
  path?: string
  /** 分享图（OG image），public 路径或完整 URL */
  image?: string
  /** 页面类型 */
  type?: 'website' | 'article'
  /** 文章发布时间（type 为 article 时使用），格式 YYYY-MM-DD */
  publishedTime?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * 轻量 SEO 组件：设置 <title>、description、OG 标签、canonical 等。
 * 每个页面渲染一次 <Seo ... /> 即可，文章详情页传入独立信息。
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.title
    const desc = description ?? site.description
    const url = absoluteUrl(path)
    const img = absoluteUrl(image ?? '/og-default.svg')

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    if (type === 'article' && publishedTime) {
      setMeta('property', 'article:published_time', `${publishedTime}T00:00:00+08:00`)
      setMeta('property', 'article:author', site.author)
    }
  }, [title, description, path, image, type, publishedTime])

  return null
}
