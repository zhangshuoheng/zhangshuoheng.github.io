import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/** 深/浅模式下浏览器工具栏与原生控件取色（与页面背景保持一致） */
const THEME_COLORS: Record<Theme, string> = {
  light: '#fafafa',
  dark: '#09090b',
}

/** 初始主题跟随 <html> 上的 .dark（由 index.html 内联脚本在首屏前设置，默认暗色） */
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
