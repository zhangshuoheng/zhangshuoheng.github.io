import { Link } from 'react-router-dom'
import { site } from '../lib/site'
import { SocialIcon, MailIcon, MapPinIcon } from './Icons'

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于' },
  { to: '/projects', label: '项目' },
  { to: '/blog', label: '博客' },
  { to: '/contact', label: '联系' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200/70 bg-white dark:border-zinc-800/70 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* 品牌 */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-400 text-sm font-bold text-white"
              >
                {site.monogram}
              </span>
              {site.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {site.description}
            </p>
            <div className="mt-4 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 站点导航 */}
          <nav aria-label="页脚导航">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">站点</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 联系 */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">联系</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <MailIcon className="h-4 w-4" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-zinc-200/70 pt-6 text-xs text-zinc-400 sm:flex-row dark:border-zinc-800/70 dark:text-zinc-500">
          <p>
            © {year} {site.name} · 保留所有权利
          </p>
          <p>由 React + TypeScript + Tailwind CSS 构建</p>
        </div>
      </div>
    </footer>
  )
}
