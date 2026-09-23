import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Chip from '../components/Chip'
import ProjectCard from '../components/ProjectCard'
import ComingSoonCard from '../components/ComingSoonCard'
import { projects, getProjectTags } from '../data/projects'

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(() => getProjectTags(), [])

  const filtered = useMemo(
    () =>
      activeTag
        ? projects.filter((p) => p.tags.includes(activeTag) || p.tech.includes(activeTag))
        : projects,
    [activeTag],
  )

  const countFor = (tag: string) =>
    projects.filter((p) => p.tags.includes(tag) || p.tech.includes(tag)).length

  // 无筛选时用"敬请期待"卡片补位，避免内容少时版面空荡
  const fillers = activeTag ? 0 : Math.max(0, 3 - filtered.length)

  return (
    <>
      <Seo title="项目" description="我的项目作品集。" path="/projects" />

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Projects
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            项目
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            一些我做过的东西，从想法到上线。按标签筛选，点击卡片查看详情。
          </p>
        </Reveal>

        {/* 筛选栏 */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="按标签筛选项目">
            <Chip
              label="全部"
              count={projects.length}
              active={activeTag === null}
              onClick={() => setActiveTag(null)}
            />
            {tags.map((t) => (
              <Chip
                key={t}
                label={t}
                count={countFor(t)}
                active={activeTag === t}
                onClick={() => setActiveTag(t)}
              />
            ))}
          </div>
        </Reveal>

        {/* 空状态 */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
            <p className="text-[15px] font-medium text-zinc-700 dark:text-zinc-200">
              没有找到「{activeTag}」相关的项目
            </p>
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="mt-4 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              查看全部项目
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
            {Array.from({ length: fillers }).map((_, i) => (
              <Reveal key={`filler-${i}`} delay={((filtered.length + i) % 3) * 80}>
                <ComingSoonCard />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
