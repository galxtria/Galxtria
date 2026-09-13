import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const applyTheme = (dark) => {
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      const dark = saved === 'dark'
      setIsDark(dark)
      applyTheme(dark)
    } else {
      applyTheme(true)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDark = !prev
      localStorage.setItem('theme', newDark ? 'dark' : 'light')
      applyTheme(newDark)
      return newDark
    })
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
