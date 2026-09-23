import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PostCard from '../components/PostCard'
import ProjectCard from '../components/ProjectCard'
import ComingSoonCard from '../components/ComingSoonCard'
import { site } from '../lib/site'
import { getAllPosts } from '../lib/blog'
import { projects } from '../data/projects'
import { SocialIcon, ArrowRightIcon } from '../components/Icons'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  const postFillers = Math.max(0, 3 - posts.length)
  const projectFillers = Math.max(0, 3 - featured.length)

  return (
    <>
      <Seo path="/" />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* 装饰光斑（克制） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-96 w-96 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-500/10"
        />
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pb-24">
          <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <Reveal>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {site.hero.greeting}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
                  {site.name}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {site.hero.valueProp}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-3 text-sm font-medium italic text-brand-600 dark:text-brand-300">
                  「{site.motto}」
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {site.hero.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    {site.hero.ctaPrimary ?? '查看我的项目'}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                  >
                    {site.hero.ctaSecondary ?? '阅读博客'}
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
                  {site.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                    >
                      <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 头像 */}
            <Reveal delay={150} className="shrink-0">
              <div className="relative">
                <img
                  src="/images/avatar.svg"
                  alt={`${site.name} 的头像`}
                  width={240}
                  height={240}
                  className="h-44 w-44 rounded-3xl ring-1 ring-zinc-200 sm:h-52 sm:w-52 dark:ring-zinc-800"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 align-middle" />
                  {site.hero.status}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 最新文章 ===== */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Blog"
          title="最新文章"
          description="记录技术、思考与生活。"
          action={{ label: '查看全部', to: '/blog' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <PostCard post={post} />
            </Reveal>
          ))}
          {Array.from({ length: postFillers }).map((_, i) => (
            <Reveal key={`post-filler-${i}`} delay={(posts.length + i) * 80}>
              <ComingSoonCard
                title="更多文章即将发布"
                hint="欢迎常来看看，或通过「联系我」给我投稿灵感。"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 精选项目 ===== */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="精选项目"
          description="一些我引以为傲的作品。"
          action={{ label: '查看全部', to: '/projects' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
          {Array.from({ length: projectFillers }).map((_, i) => (
            <Reveal key={`project-filler-${i}`} delay={(featured.length + i) * 80}>
              <ComingSoonCard />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 底部 CTA ===== */}
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-zinc-200 bg-white px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              想聊聊想法、项目或合作？
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              我通常在 1-2 个工作日内回复邮件。无论是技术问题还是商业合作，都欢迎来信。
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              联系我
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
