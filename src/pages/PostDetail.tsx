import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import Reveal from '../components/Reveal'
import { getAllPosts, getPostBySlug, formatDate } from '../lib/blog'
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon } from '../components/Icons'

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <Seo title="文章不存在" path={`/blog/${slug ?? ''}`} />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">404</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">文章不存在</h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          这篇文章可能已被删除，或链接有误。
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回博客列表
        </Link>
      </div>
    )
  }

  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === post.slug)
  const prev = index > 0 ? posts[index - 1] : undefined // 更新的文章
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined // 更早的文章

  return (
    <>
      <Seo
        title={post.title}
        description={post.summary || post.title}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        publishedTime={post.date}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
        <Reveal>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            返回博客列表
          </Link>
        </Reveal>

        {post.cover && (
          <Reveal delay={60}>
            <img
              src={post.cover}
              alt={`${post.title} 封面`}
              loading="lazy"
              decoding="async"
              className="mt-8 aspect-[16/9] w-full rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
            />
          </Reveal>
        )}

        <Reveal delay={100}>
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400 dark:text-zinc-500">
              <time dateTime={post.date} className="inline-flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </time>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" />
                阅读约 {post.readingMinutes} 分钟
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <Markdown content={post.content} />
          </div>
        </Reveal>

        {/* 上一篇 / 下一篇 */}
        {(prev || next) && (
          <Reveal>
            <nav
              aria-label="文章导航"
              className="mt-14 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800"
            >
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    上一篇
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-zinc-50 dark:group-hover:text-brand-300">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 text-right transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    下一篇
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-zinc-50 dark:group-hover:text-brand-300">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          </Reveal>
        )}
      </article>
    </>
  )
}
