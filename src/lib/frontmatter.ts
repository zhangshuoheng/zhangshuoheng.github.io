/**
 * 极简 frontmatter 解析器（零依赖，纯浏览器可用）。
 *
 * 为什么不用 gray-matter：它依赖 Node 的 Buffer / fs，在浏览器里会抛
 * "Buffer is not defined" 导致页面白屏，且会把 60 kB 的 js-yaml 打进包里。
 *
 * 支持的 YAML 子集：
 *   key: value
 *   key: "带引号的值"
 *   key: [a, b, c]
 *   key:
 *     - a
 *     - b
 *   key: true / false
 *   # 整行注释
 */

export interface FrontmatterData {
  [key: string]: string | string[] | boolean
}

export interface ParsedFrontmatter {
  data: FrontmatterData
  /** 去掉 frontmatter 后的正文 */
  content: string
}

/** 匹配文件开头的 --- ... --- 区块（容忍 BOM 与 CRLF） */
const FRONTMATTER_RE = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function unquote(value: string): string {
  const trimmed = value.trim()
  const quoted =
    trimmed.length > 1 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  return quoted ? trimmed.slice(1, -1) : trimmed
}

/** 仅当 # 位于行首或前面是空白时视为注释，避免破坏 URL 里的 # */
function stripComment(line: string): string {
  return line.replace(/(^|\s)#.*$/, '$1').trimEnd()
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = FRONTMATTER_RE.exec(raw)
  if (!match) return { data: {}, content: raw }

  const data: FrontmatterData = {}
  const content = raw.slice(match[0].length)

  let pendingKey: string | null = null
  let pendingList: string[] | null = null

  const flushList = () => {
    if (pendingKey && pendingList && pendingList.length > 0) {
      data[pendingKey] = pendingList
    }
    pendingList = null
  }

  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = stripComment(rawLine)
    if (!line.trim()) continue

    // 多行数组项：  - 值
    const listItem = /^\s*-\s*(.*)$/.exec(line)
    if (listItem && pendingKey) {
      pendingList = pendingList ?? []
      pendingList.push(unquote(listItem[1]))
      continue
    }

    // 键值对：key: value
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line)
    if (!kv) continue

    flushList()
    const key = kv[1]
    const value = kv[2].trim()
    pendingKey = key

    if (!value) {
      // 值在随后的 "- xxx" 行中
      pendingList = []
      continue
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item))
        .filter((item) => item.length > 0)
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true'
    } else {
      data[key] = unquote(value)
    }
  }

  flushList()
  return { data, content }
}

/** 取值辅助：确保拿到字符串 */
export function asString(value: string | string[] | boolean | undefined, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

/** 取值辅助：确保拿到字符串数组 */
export function asStringArray(value: string | string[] | boolean | undefined): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) return [value]
  return []
}
