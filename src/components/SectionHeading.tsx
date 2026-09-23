import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './Icons'
import Reveal from './Reveal'

interface SectionHeadingProps {
  /** 顶部小字眉标，如"LATEST POSTS" */
  eyebrow?: string
  title: string
  description?: string
  /** 右侧"查看全部"链接 */
  action?: { label: string; to: string }
}

export default function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-300"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
    </Reveal>
  )
}
