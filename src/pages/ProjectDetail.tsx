import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import Reveal from '../components/Reveal'
import { projects, getProjectBySlug } from '../data/projects'
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from '../components/Icons'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <Seo title="项目不存在" path={`/projects/${slug ?? ''}`} />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">404</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">项目不存在</h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          该项目可能已被移除，或链接有误。
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回项目列表
        </Link>
      </div>
    )
  }

  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? projects[index - 1] : undefined
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined

  return (
    <>
      <Seo
        title={project.title}
        description={project.tagline}
        path={`/projects/${project.slug}`}
        image={project.cover}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            返回项目列表
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <img
            src={project.cover}
            alt={`${project.title} 封面`}
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[16/9] w-full rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
          />
        </Reveal>

        <Reveal delay={140}>
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {project.year}
              </span>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              {project.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              {project.tagline}
            </p>

            {/* 外链 */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) =>
                link.url && link.url !== '#' ? (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    {link.label}
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-400 dark:border-zinc-700 dark:text-zinc-500"
                    title="链接占位，上线后替换"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </header>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <Markdown content={project.description} />
          </div>
        </Reveal>

        {/* 上一个 / 下一个 */}
        {(prev || next) && (
          <Reveal>
            <nav
              aria-label="项目导航"
              className="mt-14 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800"
            >
              {prev ? (
                <Link
                  to={`/projects/${prev.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    上一个项目
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
                  to={`/projects/${next.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 text-right transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    下一个项目
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

        <Reveal>
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              对这个项目感兴趣，或者有类似的想法？
            </p>
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              与我联系
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </article>
    </>
  )
}
