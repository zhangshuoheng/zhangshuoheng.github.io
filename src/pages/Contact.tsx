import type { FormEvent } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { site } from '../lib/site'
import { MailIcon, MapPinIcon, SocialIcon, SendIcon } from '../components/Icons'

export default function Contact() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    // 无后端方案：组装 mailto 链接，交给系统邮件客户端发送
    const subject = `[网站来信] 来自 ${name}`
    const body = `${message}\n\n——\n来自：${name}\n邮箱：${email}`
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  const inputClass =
    'w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-brand-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500'

  return (
    <>
      <Seo title="联系我" description={`联系${site.name}：邮箱、社交账号或直接留言。`} path="/contact" />

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            联系我
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            无论是技术问题、项目合作还是随便聊聊，都欢迎来信。我通常在 1-2 个工作日内回复。
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* 联系方式 */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-zinc-400 dark:text-zinc-500">邮箱</span>
                  <span className="block truncate text-sm font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-zinc-50 dark:group-hover:text-brand-300">
                    {site.email}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-zinc-400 dark:text-zinc-500">所在地</span>
                  <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {site.location}
                  </span>
                </span>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs text-zinc-400 dark:text-zinc-500">社交账号</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {site.socials
                    .filter((s) => s.id !== 'mail')
                    .map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                      >
                        <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 留言表单（mailto 方案，无需后端） */}
          <Reveal delay={120} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">给我留言</h2>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                点击发送后将打开你的邮件客户端（mailto 方案，无需后端）。
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    姓名
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="你的名字" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    邮箱
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  留言内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="想聊点什么？"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                发送留言
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </>
  )
}
