import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Chip from '../components/Chip'
import PostCard from '../components/PostCard'
import ComingSoonCard from '../components/ComingSoonCard'
import { getAllPosts, getAllTags } from '../lib/blog'

export default function Blog() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const posts = useMemo(() => getAllPosts(), [])
  const tags = useMemo(() => getAllTags(), [])

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts
  const fillers = activeTag ? 0 : Math.max(0, 2 - filtered.length)

  return (
    <>
      <Seo title="博客" description="我的技术博客：记录技术、思考与生活。" path="/blog" />

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            博客
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            记录技术、思考与生活。共 {posts.length} 篇文章，按发布时间倒序排列。
          </p>
        </Reveal>

        {tags.length > 0 && (
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="按标签筛选文章">
              <Chip
                label="全部"
                count={posts.length}
                active={activeTag === null}
                onClick={() => setActiveTag(null)}
              />
              {tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  count={posts.filter((p) => p.tags.includes(t)).length}
                  active={activeTag === t}
                  onClick={() => setActiveTag(t)}
                />
              ))}
            </div>
          </Reveal>
        )}

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
            <p className="text-[15px] font-medium text-zinc-700 dark:text-zinc-200">
              还没有「{activeTag}」相关的文章
            </p>
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="mt-4 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              查看全部文章
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 80}>
                <PostCard post={post} />
              </Reveal>
            ))}
            {Array.from({ length: fillers }).map((_, i) => (
              <Reveal key={`filler-${i}`} delay={((filtered.length + i) % 2) * 80}>
                <ComingSoonCard
                  title="更多文章即将发布"
                  hint="写作需要时间，感谢你的耐心等待。"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
