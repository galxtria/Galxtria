import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LanguageContext.jsx'
import { useTheme } from '../ThemeContext.jsx'
import { safeTrack } from '../utils/helpers.js'
import { LangToggle } from './chrome.jsx'

export function Navbar({ loaded }) {
  const [active, setActive] = useState('work')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, show: false })
  const navRef = useRef(null)
  const lastY = useRef(0)
  const openRef = useRef(open)
  openRef.current = open
  const { isDark, toggleTheme } = useTheme()
  const { t, lang } = useLang()
  const links = [
    { id: 'work', label: t('nav_work') },
    { id: 'skills', label: t('nav_skills') },
    { id: 'experience', label: t('nav_experience') },
    { id: 'contact', label: t('nav_contact') },
  ]

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const last = lastY.current
      if (y > last + 4 && y > 320 && !openRef.current) setHidden(true)
      else if (y < last - 4 || y <= 320) setHidden(false)
      if (Math.abs(y - last) > 4) lastY.current = y
      let cur = 'work'
      for (const l of ['work', 'skills', 'experience', 'contact']) {
        const el = document.getElementById(l)
        if (el && el.getBoundingClientRect().top <= 240) cur = l
      }
      setActive(cur)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Pill indikator: mengikuti posisi tombol link aktif
  useEffect(() => {
    const place = () => {
      const nav = navRef.current
      if (!nav) return
      const btn = nav.querySelector(`[data-link="${active}"]`)
      if (!btn) {
        setPill((p) => ({ ...p, show: false }))
        return
      }
      setPill({ left: btn.offsetLeft, width: btn.offsetWidth, show: true })
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active, lang, loaded])

  const go = (id) => {
    setActive(id)
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        !loaded || (hidden && !open) ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-3 sm:px-4 md:px-8 pt-3 sm:pt-5">
        <div className={`flex items-center justify-between gap-2 px-2 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-black/10 bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b0d]/80 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'border-transparent bg-transparent'
        }`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-black tracking-[0.18em] shadow-sm border border-black/10 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            GALXTRIA
          </button>

          <nav ref={navRef} className="hidden md:flex relative min-w-0 flex-1 items-center justify-center gap-1 text-[13px] font-medium">
            <span
              aria-hidden
              className="nav-pill"
              style={{ width: pill.width, transform: `translateX(${pill.left}px)`, opacity: pill.show ? 1 : 0 }}
            />
            {links.map((l) => (
              <button
                key={l.id}
                data-link={l.id}
                onClick={() => go(l.id)}
                className={`relative z-10 shrink-0 rounded-full px-3 py-1.5 transition-colors hover:text-black dark:hover:text-white ${active === l.id ? 'text-black dark:text-white' : 'text-black/55 dark:text-white/55'}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
            <LangToggle />
            <button
              onClick={(e) => {
                toggleTheme(e)
                safeTrack('switch_theme', { theme: isDark ? 'light' : 'dark' })
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 shadow-sm transition-all hover:rotate-12 hover:border-black hover:text-black dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
            >
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go('contact')}
              className="btn-shine hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t('nav_talk')} <span aria-hidden>↗</span>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={t('nav_menu')}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 shadow-sm transition-colors hover:border-black hover:text-black md:hidden dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (<><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>) : (<><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>)}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="menu-in md:hidden mt-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl p-2 shadow-lg dark:border-white/10 dark:bg-[#141416]/95">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active === l.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10'}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white sm:hidden dark:bg-white dark:text-black"
            >
              {t('nav_talk')} <span aria-hidden>↗</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

// ── Foto portrait: hitam-putih, jadi berwarna penuh + zoom halus saat hover ──

// ── Foto portrait: diam total, B&W → full-color statis saat hover ──
// Efek besarnya ada di teks GALXTRIA belakang (fill-pour), bukan di foto.
