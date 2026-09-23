/**
 * 构建后处理：
 * 1. 生成 dist/404.html —— GitHub Pages 没有 rewrite 规则，用它兜住 /blog/xxx 这类深链接
 *    （GitHub Pages 会把未知路径交给 404.html，React Router 随即接管并渲染正确页面）
 * 2. 生成 .nojekyll —— 跳过 Jekyll 处理
 */
import { copyFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dist = 'dist'

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))
await writeFile(join(dist, '.nojekyll'), '')

console.log('✓ 已生成 dist/404.html（SPA 深链接回退）与 dist/.nojekyll')
