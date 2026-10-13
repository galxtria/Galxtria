import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../LanguageContext.jsx'
import { isFunCopy, safeTrack } from '../utils/helpers.js'
import { burstConfetti } from '../confetti.js'
import { useReveal } from '../hooks/hooks.js'
import { Magnetic } from './primitives.jsx'
import { SocialIcon } from './Social.jsx'
import { CvPreviewModal } from './CvModal.jsx'

// ── Contact: daftar index ala Skills/Work (tanpa form) ──

const CONTACT_CARDS = [
  { id: 'email', label: 'Email', value: 'utamapradita5@gmail.com', href: null, copy: 'utamapradita5@gmail.com' },
  { id: 'github', label: 'GitHub', value: 'github.com/galxtria', href: 'https://github.com/galxtria' },
  { id: 'instagram', label: 'Instagram', value: '@galxtria', href: 'https://www.instagram.com/galxtria/' },
  { id: 'linkedin', label: 'LinkedIn', value: 'Pradita Utama', href: 'https://www.linkedin.com/in/praditautama25' },
]

export function ContactCard({ c, index, featured }) {
  const [copied, setCopied] = useState(false)
  const [fun, setFun] = useState(false)
  const { t } = useLang()

  const copyEmail = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(c.copy)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = c.copy
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    burstConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)
    safeTrack('copy_email', { source: 'contact' })
    setFun(isFunCopy())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const body = (
    <>
      <span aria-hidden className="font-mono text-[11px] tracking-[0.2em] text-black/40 transition-colors duration-300 group-hover:text-black dark:text-white/40 dark:group-hover:text-white">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-zinc-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-black/30 group-hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-white/10 dark:group-hover:border-white/30 ${featured ? 'h-12 w-12' : 'h-10 w-10'}`}>
        <SocialIcon label={c.label} className={`${featured ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} text-black/70 dark:text-white/70`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-base md:text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
          {c.label}
          {featured && (
            <span className="rounded-full border border-black/15 px-2.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-black/50 dark:border-white/20 dark:text-white/60">
              {t('contact_preferred')}
            </span>
          )}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[12px] tracking-wide text-black/55 dark:text-white/55">
          {copied ? (fun ? t('copied_fun') : t('copied')) : c.value}
        </span>
      </span>
      <span aria-hidden className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-black/30 transition-colors duration-300 group-hover:text-black/60 sm:block dark:text-white/30 dark:group-hover:text-white/60">
        {c.href ? t('contact_open') : t('contact_copy')}
      </span>
      <span aria-hidden className="contact-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 dark:border-white/15 dark:text-white/50">
        {c.href ? (
          <span className="text-base leading-none">↗</span>
        ) : copied ? (
          <span className="text-base leading-none text-green-600">✓</span>
        ) : (
          <svg className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </span>
    </>
  )

  const cls = `group flex w-full items-center gap-4 md:gap-6 border-b border-black/10 py-5 md:py-6 text-left transition-colors duration-300 hover:bg-black/[0.02] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black dark:border-white/10 dark:hover:bg-white/[0.03] dark:focus-visible:outline-white${featured ? ' contact-featured' : ''}`

  if (c.href) {
    return (
      <a href={c.href} target="_blank" rel="noreferrer" data-reveal className={cls}>
        {body}
      </a>
    )
  }
  return (
    <button onClick={copyEmail} title={t('copy_title')} data-reveal className={cls}>
      {body}
    </button>
  )
}

// ── Back to top mengambang: muncul setelah scroll ──

export function BackToTop({ visible }) {
  const [show, setShow] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('back_top')}
      title={t('back_top')}
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-black hover:text-black dark:border-white/15 dark:bg-white/10 dark:text-white/70 dark:hover:border-white dark:hover:text-white ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span aria-hidden className="text-base leading-none">↑</span>
    </button>
  )
}

export function Contact() {
  const ref = useReveal(0.08)
  const { t } = useLang()
  const [cvOpen, setCvOpen] = useState(false)

  const goWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const footNav = [
    { id: 'work', label: t('nav_work') },
    { id: 'skills', label: t('nav_skills') },
    { id: 'experience', label: t('nav_experience') },
  ]

  return (
    <section id="contact" ref={ref} className="relative w-full scroll-mt-16 overflow-hidden bg-white dark:bg-[#0b0b0d]">
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <span data-reveal="fade" aria-hidden className="watermark absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,10vw,7rem)] font-black tracking-tight text-black/[0.05] dark:text-white/[0.06]">
          CONTACT
        </span>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('contact_title')}</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
            {t('contact_sub')}
          </p>
        </div>
        <p data-reveal className="relative mt-4 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55">
          {t('contact_desc')}
        </p>

        <div className="mx-auto mt-8 w-full max-w-6xl border-t border-black/10 dark:border-white/10">
          {CONTACT_CARDS.map((c, i) => (
            <ContactCard key={c.id} c={c} index={i} featured={c.id === 'email'} />
          ))}
        </div>

        <div data-reveal className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c1c20] via-[#131315] to-black text-white shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/10 dark:from-[#f4f1eb] dark:via-[#e9e6e0] dark:to-[#d8d4cc] dark:text-[#161614] dark:ring-black/10">
          <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
          <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-black/30" />
          <span aria-hidden className="pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-black/[0.07]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 left-[4%] h-72 w-72 rounded-full bg-white/[0.07] blur-3xl dark:bg-black/[0.05]" />
          <span aria-hidden className="pointer-events-none absolute bottom-2 right-8 hidden select-none text-[100px] font-black leading-none text-white/10 md:block dark:text-black/10">
            ↗
          </span>
          <div className="relative flex flex-col gap-8 p-8 sm:p-10 md:flex-row md:items-end md:justify-between md:p-14">
            <div className="min-w-0">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">
                <span aria-hidden className="h-px w-8 bg-white/25 dark:bg-black/25" />
                {t('contact_eyebrow')}
              </p>
              <p className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
                {t('contact_cta_title')
                  .split(' ')
                  .map((w, i, arr) => (
                    <span key={i} data-reveal className="inline-block">
                      {w}
                      {i < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 dark:text-black/60">
                {t('contact_cta_desc')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <Magnetic>
                <button
                  onClick={goWork}
                  className="btn-shine inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(255,255,255,0.4)] dark:bg-black dark:text-white dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)]"
                >
                  {t('contact_cta_work')} <span aria-hidden>↗</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setCvOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white hover:text-white dark:border-black/20 dark:text-black/70 dark:hover:border-black dark:hover:text-black"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t('hero_cv')}
                </button>
              </Magnetic>
              {cvOpen && createPortal(<CvPreviewModal onClose={() => setCvOpen(false)} />, document.body)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 pb-2 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            © {new Date().getFullYear()} Galxtria
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            Denpasar, ID
          </p>
          <nav aria-label="Footer" className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            {footNav.map((l) => (
              <button
                key={l.id}
                onClick={() => goSection(l.id)}
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={goTop}
              aria-label={t('back_top')}
              title={t('back_top')}
              className="transition-colors hover:text-black dark:hover:text-white"
            >
              <span aria-hidden>↑</span>
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}

// ── App ──
