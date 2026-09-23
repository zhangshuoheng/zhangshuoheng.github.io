import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { intro, skills, timeline } from '../data/about'

export default function About() {
  return (
    <>
      <Seo title="关于我" description={`关于${'你的名字'}：技能栈与经历。`} path="/about" />

      <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6">
        {/* 编辑提示（上线前删除本卡片即可） */}
        <Reveal>
          <aside className="mb-10 rounded-xl border border-dashed border-zinc-300 bg-zinc-100/60 px-4 py-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
            💡 编辑提示：本页所有内容（自我介绍、技能、时间线）都在
            <code className="mx-1 rounded bg-zinc-200/80 px-1 py-0.5 font-mono dark:bg-zinc-800">
              src/data/about.ts
            </code>
            中维护，替换为真实信息后删除本提示框即可。
          </aside>
        </Reveal>

        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            About
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            关于我
          </h1>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            {intro.split('\n\n').map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </Reveal>

        {/* 技能栈 */}
        <section className="mt-14">
          <SectionHeading eyebrow="Skills" title="技能栈" />
          <div className="grid gap-4 sm:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {group.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 经历时间线 */}
        <section className="mt-14">
          <SectionHeading eyebrow="Timeline" title="经历" />
          <Reveal>
            <ol className="relative ml-1.5 space-y-10 border-l border-zinc-200 pl-8 dark:border-zinc-800">
              {timeline.map((item) => (
                <li key={item.title + item.period} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.375rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-brand-500/20"
                  />
                  <p className="font-mono text-xs font-medium text-brand-600 dark:text-brand-300">
                    {item.period}
                  </p>
                  <h3 className="mt-1.5 font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  {item.org && (
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{item.org}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      </div>
    </>
  )
}
