import { Link } from 'react-router-dom'
import type { Post } from '../lib/blog'
import { formatDate } from '../lib/blog'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from './Icons'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-black/25">
      <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="inline-flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" />
          {post.readingMinutes} 分钟
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
        <Link
          to={`/blog/${post.slug}`}
          className="transition-colors hover:text-brand-600 dark:hover:text-brand-300"
        >
          {post.title}
        </Link>
      </h3>

      {post.summary && (
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {post.summary}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
        <ArrowRightIcon className="h-4 w-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-zinc-600" />
      </div>
    </article>
  )
}
