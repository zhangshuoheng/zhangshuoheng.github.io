import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

/** 标题锚点图标（悬停标题时显示 #，点击可复制链接） */
const headingAnchor = {
  type: 'element' as const,
  tagName: 'span' as const,
  properties: {
    className: ['heading-anchor'],
    'aria-hidden': true,
  },
  children: [{ type: 'text' as const, value: '#' }],
}

interface MarkdownProps {
  content: string
  className?: string
}

/**
 * Markdown 渲染器：
 * - GFM 语法（表格、任务列表、删除线）
 * - 标题自动生成锚点 id + 悬停显示 # 链接
 * - 代码块语法高亮（标注语言即可，如 ```ts）
 * - 图片懒加载
 */
export default function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`markdown prose prose-zinc dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append', content: headingAnchor }],
          [rehypeHighlight, { ignoreMissing: true }],
        ]}
        components={{
          img: (props) => (
            <img
              src={props.src}
              alt={props.alt ?? ''}
              title={props.title}
              loading="lazy"
              decoding="async"
              className="rounded-xl border border-zinc-200 dark:border-zinc-800"
            />
          ),
          a: ({ href, children }) => {
            const external =
              typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))
            return (
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
