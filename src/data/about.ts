/**
 * "关于我"页面数据 —— 技能栈与经历时间线都在这里维护。
 * 带「待填写」标记的内容请按你的真实情况补充或删除。
 */

export interface SkillGroup {
  /** 技能分组名，如"AI / 算法方向" */
  title: string
  skills: string[]
}

export interface TimelineItem {
  /** 时间段，如"2023.09 — 至今" */
  period: string
  /** 职位 / 角色 / 专业 */
  title: string
  /** 公司 / 学校（可选） */
  org?: string
  /** 一句话描述做了什么、取得了什么成果 */
  description: string
}

/** 关于页开头的一段自我介绍 */
export const intro = `我是仉烁蘅，东北师范大学计算机科学与技术专业在读，方向是人工智能，目标是大厂 AI 岗。

我正在为此打基础：把数据结构与算法、操作系统、计算机网络这些核心课学扎实，同时在机器学习与深度学习方向持续投入。

学习之外，我最喜欢的两件事是滑雪和健身——一个让我学会掌控速度与风险，一个让我相信长期主义。

我的格言是：在对的时间，争取做最好的自己。`

/** 技能栈（按你的真实掌握情况增删，避免写不熟的技术） */
export const skills: SkillGroup[] = [
  { title: 'AI / 算法方向', skills: ['机器学习', '深度学习', 'Python', 'PyTorch'] },
  { title: '计算机基础', skills: ['数据结构与算法', '操作系统', '计算机网络', '数据库'] },
  { title: '工具', skills: ['Git', 'Linux', 'VS Code', 'Jupyter'] },
]

/** 经历时间线（按时间倒序排列） */
export const timeline: TimelineItem[] = [
  {
    period: '20XX — 至今', // ← 改成你的入学年份，例如 2023 — 至今
    title: '计算机科学与技术 · 本科在读',
    org: '东北师范大学',
    description:
      '系统学习计算机核心课程，并在人工智能方向持续投入。（可补充：核心课程、竞赛、科研、绩点排名等）',
  },
  {
    period: '20XX — 20XX',
    title: '【待填写】实习 / 项目 / 竞赛经历',
    org: '公司 / 团队 / 赛事名称',
    description: '用一两句话写清你做了什么、用了什么技术、取得了什么结果（最好带数字）。',
  },
]
