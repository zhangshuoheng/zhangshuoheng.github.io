import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { ArrowLeftIcon } from '../components/Icons'

export default function NotFound() {
  return (
    <>
      <Seo title="页面不存在" path="/404" />
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="bg-gradient-to-r from-brand-500 to-brand-300 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          页面不存在
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          你访问的页面可能已被移动或删除。试试从首页重新出发？
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          回到首页
        </Link>
      </div>
    </>
  )
}
