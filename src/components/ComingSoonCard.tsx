import { PlusIcon } from './Icons'

interface ComingSoonCardProps {
  title?: string
  hint?: string
}

/** "敬请期待"占位卡片：项目/文章较少时填充网格，保持版面完整 */
export default function ComingSoonCard({
  title = '敬请期待',
  hint = '新内容正在路上，很快与大家见面。',
}: ComingSoonCardProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/60 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
        <PlusIcon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[15px] font-semibold text-zinc-700 dark:text-zinc-200">{title}</p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">{hint}</p>
      </div>
    </div>
  )
}
