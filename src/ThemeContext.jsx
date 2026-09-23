import { createContext, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const ThemeContext = createContext()

const applyTheme = (dark) => {
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  html.style.colorScheme = dark ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0b0d' : '#ffffff')
}

export function ThemeProvider({ children }) {
  // Default TERANG (sesuai desain) — hormati sistem hanya bila belum ada pilihan tersimpan.
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const dark = saved === 'dark'
      setIsDark(dark)
      applyTheme(dark)
    } else {
      const sysDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
      setIsDark(sysDark)
      applyTheme(sysDark)
    }
  }, [])

  const toggleTheme = (ev) => {
    const newDark = !document.documentElement.classList.contains('dark')
    const commit = () => {
      localStorage.setItem('theme', newDark ? 'dark' : 'light')
      setIsDark(newDark)
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    // Browser modern: wipe melingkar berawal tepat dari tengah tombol toggle.
    if (document.startViewTransition && !reduce) {
      // Titik asal = tengah tombol pemicu (konsisten walau klik di pinggir tombol).
      let x = window.innerWidth - 60
      let y = 60
      const rect = ev?.currentTarget?.getBoundingClientRect?.()
      if (rect && (rect.width > 0 || rect.height > 0)) {
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      } else if (typeof ev?.clientX === 'number' && typeof ev?.clientY === 'number') {
        x = ev.clientX
        y = ev.clientY
      }
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyTheme(newDark)
          commit()
        })
      })
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 550, easing: 'cubic-bezier(0.16,1,0.3,1)', pseudoElement: '::view-transition-new(root)' }
          )
        })
        .catch(() => {})
      return
    }

    // Fallback: ganti instan + transisi warna manual 500ms.
    applyTheme(newDark)
    commit()
    if (!reduce) {
      const html = document.documentElement
      html.classList.add('theme-fade')
      setTimeout(() => html.classList.remove('theme-fade'), 600)
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
