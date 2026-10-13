import { useEffect, useState } from 'react'
import { useLang } from '../LanguageContext.jsx'

const DOT_SECTIONS = ['work', 'skills', 'experience', 'contact']

export function SectionDots({ visible }) {
  const [current, setCurrent] = useState('work')
  const { t } = useLang()

  useEffect(() => {
    if (!visible) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setCurrent(en.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    DOT_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [visible])

  if (!visible) return null
  const label = (id) => {
    if (id === 'work') return t('nav_work')
    if (id === 'skills') return t('nav_skills')
    if (id === 'experience') return t('nav_experience')
    return t('nav_contact')
  }
  return (
    <nav aria-label={t('nav_menu')} className="section-dots">
      {DOT_SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => {
            setCurrent(id)
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label={label(id)}
          aria-current={current === id ? 'true' : undefined}
          className={`section-dot${current === id ? ' section-dot-on' : ''}`}
        >
          <span className="section-dot-tip">{label(id)}</span>
        </button>
      ))}
    </nav>
  )
}

// ── Splash tipografi: nama besar fade-blur + garis tipis ──

export function Splash({ onFinish }) {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)))
    const t1 = setTimeout(() => setLeaving(true), 1050)
    const t2 = setTimeout(onFinish, 1500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-out dark:bg-[#0b0b0d] ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <h1
        aria-label="Galxtria"
        className={`relative z-0 whitespace-nowrap text-center font-black leading-none tracking-[-0.02em] text-[clamp(2.8rem,11.5vw,10rem)] transition-all duration-700 ease-out ${
          show ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-4 opacity-0 blur-md'
        }`}
        style={{ fontFamily: 'Archivo, Inter, system-ui, sans-serif', transitionDelay: '100ms' }}
      >
        <span className="text-outline">GALX</span>
        <span className="text-black dark:text-white">TRIA</span>
      </h1>
      <p
        className={`mt-4 text-[12px] font-medium uppercase tracking-[0.3em] text-black/45 transition-all duration-700 ease-out dark:text-white/45 ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
        style={{ transitionDelay: '220ms' }}
      >
        Frontend Developer
      </p>
      <div className="mt-8 h-px w-40 overflow-hidden bg-black/10 dark:bg-white/10">
        <div
          className={`h-full w-full origin-left bg-black/60 transition-transform duration-[1000ms] ease-out dark:bg-white/60 ${
            show ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </div>
  )
}

// ── Toggle bahasa: satu tombol, sekali pencet langsung ganti EN ↔ ID ──

export function LangToggle() {
  const { lang, setLang, t } = useLang()
  const isEN = lang === 'en'
  return (
    <button
      onClick={() => {
        const next = isEN ? 'id' : 'en'
        setLang(next)
        safeTrack('switch_lang', { lang: next })
      }}
      title={isEN ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
      aria-label={`${t('lang_label')}: ${lang.toUpperCase()} → ${(isEN ? 'id' : 'en').toUpperCase()}`}
      className="group flex h-9 shrink-0 items-center rounded-full border border-black/10 bg-white/80 p-1 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-px hover:border-black/25 hover:shadow-md active:translate-y-0 active:scale-95 dark:border-white/15 dark:bg-white/[0.06] dark:hover:border-white/35"
    >
      <span className="relative grid grid-cols-2 rounded-full bg-black/[0.06] p-0.5 dark:bg-white/10">
        <span
          aria-hidden
          className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-white dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
            isEN ? 'translate-x-0' : 'translate-x-full'
          }`}
        />
        {['en', 'id'].map((code) => {
          const on = (code === 'en') === isEN
          return (
            <span
              key={code}
              aria-hidden={!on}
              className={`relative z-10 w-8 py-1 text-center text-[10px] font-black tracking-[0.12em] transition-colors duration-300 ${
                on ? 'text-white dark:text-black' : 'text-black/35 dark:text-white/35'
              }`}
            >
              {code.toUpperCase()}
            </span>
          )
        })}
      </span>
      <span aria-live="polite" className="sr-only">
        {lang.toUpperCase()}
      </span>
    </button>
  )
}

// ── Navbar (ref Image 1) ──
