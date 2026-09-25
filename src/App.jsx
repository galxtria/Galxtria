import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from './ThemeContext.jsx'
import { useLang, localize } from './LanguageContext.jsx'

// ── Thumbnail memakai screenshot asli di public/shots (tanpa import) ──

// ── Data lama dimapping ke layout referensi ──

const PROJECTS = [
  {
    title: 'MoneyTrackerV2 - Smart Budget Planner',
    short: 'MoneyTrackerV2',
    desc: {
      en: 'Smart budget planner with daily safe-spend limits and automatic insights.',
      id: 'Perencana anggaran cerdas dengan batas belanja harian dan wawasan otomatis.',
    },
    fullDesc: {
      en: 'MoneyTrackerV2 is a budget planner that works fully offline, built with React, TypeScript, and Tailwind. Monthly budget tracking with a daily safe-spend allowance, expense logging stored locally via Dexie.js (IndexedDB), charts with Recharts, and installable PWA support.',
      id: 'MoneyTrackerV2 adalah perencana anggaran yang bekerja sepenuhnya offline, dibangun dengan React, TypeScript, dan Tailwind. Dilengkapi pelacakan anggaran bulanan beserta batas belanja harian, pencatatan pengeluaran yang tersimpan lokal melalui Dexie.js (IndexedDB), grafik dengan Recharts, serta dukungan PWA yang dapat diinstal.',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Dexie.js', 'Recharts'],
    tags: { en: ['Mobile App', 'Personal'], id: ['Aplikasi Mobile', 'Personal'] },
    category: { en: 'Real Project', id: 'Proyek Nyata' },
    role: 'Frontend Developer',
    github: 'https://github.com/galxtria/MoneyTrackerV2.git',
    demo: 'https://moneytrackerv2-woad.vercel.app',
    year: '2026',
    shot: '/shots/moneytrackerv2_new.png',
    frame: 'phone',
    tint: 'from-[#dbe7ff] to-[#aec6f5]',
  },
  {
    title: 'KostHub Web - Property Platform',
    short: 'KostHub Web',
    desc: {
      en: 'Full-stack boarding house web app with admin and user dashboards for property and order management.',
      id: 'Aplikasi web kos full-stack dengan dasbor admin dan pengguna untuk mengelola properti serta pesanan.',
    },
    fullDesc: {
      en: 'KostHub Web is a full-stack monorepo web app: Laravel 12 REST API with Sanctum auth and SQLite storage, plus a React and Vite frontend with React Router, Zustand, Tailwind, Leaflet maps, and QR code support. Includes an admin dashboard for properties and orders, and a user portal for property discovery and bookings.',
      id: 'KostHub Web adalah aplikasi web full-stack monorepo: REST API Laravel 12 dengan autentikasi Sanctum dan penyimpanan SQLite, serta frontend React dan Vite dengan React Router, Zustand, Tailwind, peta Leaflet, dan dukungan kode QR. Dilengkapi dasbor admin untuk properti dan pesanan, serta portal pengguna untuk pencarian properti dan pemesanan.',
    },
    tech: ['Laravel', 'React', 'Tailwind', 'SQLite'],
    tags: { en: ['Web App', 'KostHub'], id: ['Web App', 'KostHub'] },
    category: { en: 'Exploration', id: 'Eksplorasi' },
    role: 'Full-Stack Developer',
    github: 'https://github.com/galxtria/KostHub_Web.git',
    year: '2026',
    shot: '/shots/kosthub-web.jpg',
    frame: 'browser',
  },
  // NOTE: Kartu "KostHub App" disembunyikan sementara — link
  // https://github.com/galxtria/KostHub mengembalikan 404 dan stack-nya
  // (Java/Android/Firebase) tidak terverifikasi. Tampilkan lagi setelah
  // repo dipublikasikan / link diperbaiki.
  {
    title: 'My Music - Automated Music Player',
    short: 'My Music',
    desc: {
      en: 'Automated music player with intelligent playlist organization and seamless audio playback.',
      id: 'Pemutar musik otomatis dengan pengelolaan playlist cerdas dan pemutaran yang mulus.',
    },
    fullDesc: {
      en: 'My Music is a Laravel 12 and React music library app with Bootstrap and Tailwind styling, React Router navigation, and SQLite storage. The backend handles library indexing, metadata parsing, and preference storage with a Vite build setup.',
      id: 'My Music adalah aplikasi pustaka musik Laravel 12 dan React dengan gaya Bootstrap dan Tailwind, navigasi React Router, serta penyimpanan SQLite. Backend-nya menangani pengindeksan pustaka, penguraian metadata, dan penyimpanan preferensi, dibangun dengan konfigurasi Vite.',
    },
    tech: ['Laravel', 'React', 'Bootstrap', 'Tailwind', 'SQLite'],
    tags: { en: ['Web App', 'Kumpin Studio'], id: ['Web App', 'Kumpin Studio'] },
    category: { en: 'Real Project', id: 'Proyek Nyata' },
    role: 'Full-Stack Developer',
    github: 'https://github.com/galxtria/MyMusic.git',
    year: '2025',
    shot: '/shots/mymusic.jpg',
    frame: 'browser',
  },
]

const EDUCATION = [
  {
    id: 'instiki',
    period: '2024 — Present',
    badge: { en: 'Undergraduate', id: 'Mahasiswa' },
    place: 'Institut Bisnis dan Teknologi Indonesia',
    role: { en: 'S1 · Informatics', id: 'S1 · Informatika' },
    desc: {
      en: 'Focused on frontend development, multi-platform apps, and AI integration.',
      id: 'Berfokus pada pengembangan frontend, aplikasi lintas platform, dan integrasi AI.',
    },
  },
  {
    id: 'smkn1',
    period: '2021 — 2024',
    badge: null,
    place: 'SMK Negeri 1 Denpasar',
    role: 'Rekayasa Perangkat Lunak (RPL)',
    desc: {
      en: 'Vocational foundation in software engineering, covering programming fundamentals and web basics.',
      id: 'Dasar rekayasa perangkat lunak dari SMK, meliputi fundamental pemrograman dan web.',
    },
  },
]

const WORK_EXPERIENCE = [
  {
    id: 'benlaris',
    period: 'Des 2022 – Feb 2023 • Jun 2023 – Sep 2023',
    badge: { en: 'Internship', id: 'Magang' },
    place: 'PT Benlaris Sahabat Dewata',
    role: { en: 'Web & Graphic Design Intern', id: 'Magang Web & Desain Grafis' },
    desc: {
      en: "Supported the company's web presence and visual design, covering responsive web pages and graphic design assets.",
      id: 'Mendukung website dan desain visual perusahaan, mulai dari halaman web responsif hingga aset grafis.',
    },
  },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/galxtria' },
  { label: 'Instagram', href: 'https://www.instagram.com/galxtria/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/praditautama25' },
  { label: 'Email', href: 'mailto:utamapradita5@gmail.com' },
]

// Helper spotlight: set --mx/--my mengikuti kursor (satu gaya untuk semua section).
// Pakai via onMouseMove={spotMove} pada elemen ber-class spot-pill / spot-light / spot-dark-row.
const spotMove = (e) => {
  const el = e.currentTarget
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function SocialIcon({ label, className }) {
  const cls = className || 'h-[13px] w-[13px] shrink-0 text-black/45 dark:text-white/45'
  if (label === 'GitHub')
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  if (label === 'Instagram')
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  if (label === 'LinkedIn')
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

// Pill sosmed: Email menyalin alamat saat diklik (dengan status "Copied!")
function SocialPill({ s, className }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()
  const EMAIL = 'utamapradita5@gmail.com'

  const onClick = async (e) => {
    if (s.label !== 'Email') return
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <a
      href={s.href}
      onClick={onClick}
      onMouseMove={spotMove}
      {...(s.label !== 'Email' ? { target: '_blank', rel: 'noreferrer' } : {})}
      title={s.label === 'Email' ? t('copy_title') : s.label}
      className={`${className} spot-pill`}
    >
      {copied ? (
        <svg className="h-[13px] w-[13px] shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <SocialIcon label={s.label} />
      )}
      {copied ? t('copied') : s.label}
    </a>
  )
}

// ── Hooks ──

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Munculkan semua [data-reveal] yang belum tampil (dengan stagger).
    // Dijalankan ulang setiap ada elemen baru — mis. kartu hasil ganti filter.
    const revealNew = () => {
      const fresh = [...el.querySelectorAll('[data-reveal]:not(.revealed)')]
      fresh.forEach((c, i) => {
        const delay = i * 90
        c.style.transitionDelay = `${delay}ms`
        requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('revealed')))
        // Hapus delay setelah animasi selesai agar transisi hover tidak ikut tertunda.
        setTimeout(() => {
          c.style.transitionDelay = ''
        }, 1000 + delay)
      })
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealNew()
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    const mo = new MutationObserver(revealNew)
    mo.observe(el, { childList: true, subtree: true })
    return () => {
      obs.disconnect()
      mo.disconnect()
    }
  }, [threshold])
  return ref
}

// ── Splash sinematik: huruf stagger + counter persen + exit tirai ke atas ──

function Splash({ onFinish }) {
  const [leaving, setLeaving] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const DUR = 1500
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DUR)
      setPct(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        setTimeout(onFinish, 780)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onFinish])

  const word = 'GALXTRIA'
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f2f2f4] dark:bg-[#0e0e11] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-black/40 dark:text-white/40 rise-in">Portfolio © 2026</p>
      <p className="mt-3 text-5xl md:text-6xl font-black tracking-tighter" aria-label="Galxtria">
        {word.split('').map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className={`rise-in inline-block ${i < 4 ? 'text-outline' : 'text-black dark:text-white'}`}
            style={{ animationDelay: `${150 + i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
      </p>
      <p className="mt-3 text-[12px] font-medium tracking-[0.2em] uppercase text-black/50 dark:text-white/50 rise-in" style={{ animationDelay: '700ms' }}>
        Frontend Developer
      </p>
      <div className="mt-8 w-52 rise-in" style={{ animationDelay: '850ms' }}>
        <div className="h-[2px] overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="h-full bg-black dark:bg-white transition-[width] duration-100" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-black/40 dark:text-white/40">
          <span>LOADING</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}

// ── Toggle bahasa: satu tombol, sekali pencet langsung ganti EN ↔ ID ──

function LangToggle() {
  const { lang, setLang, t } = useLang()
  const isEN = lang === 'en'
  return (
    <button
      onClick={() => setLang(isEN ? 'id' : 'en')}
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

function Navbar({ loaded }) {
  const [active, setActive] = useState('work')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLang()
  const links = [
    { id: 'work', label: t('nav_work') },
    { id: 'skills', label: t('nav_skills') },
    { id: 'experience', label: t('nav_experience') },
    { id: 'contact', label: t('nav_contact') },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
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

  const go = (id) => {
    setActive(id)
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        loaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
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

          <nav className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-7 text-[13px] font-medium">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`shrink-0 transition-colors hover:text-black dark:hover:text-white ${active === l.id ? 'text-black dark:text-white' : 'text-black/55 dark:text-white/55'}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
            <LangToggle />
            <button
              onClick={toggleTheme}
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
          <div id="mobile-nav" className="md:hidden mt-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl p-2 shadow-lg dark:border-white/10 dark:bg-[#141416]/95">
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

function PortraitReveal() {
  const { t } = useLang()
  const [src, setSrc] = useState('/portrait-cutout.png')

  const onFail = () => setSrc((s) => (s === '/portrait-cutout.png' ? '/potrait.png' : 'placeholder'))

  if (src === 'placeholder') {
    return (
      <div className="portrait-breathe relative overflow-hidden rounded-t-full bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-500 aspect-[3/4] flex items-end justify-center">
        <span className="absolute top-8 text-[64px] md:text-[84px] font-black text-white/60 select-none">G</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <p className="relative z-10 pb-4 px-4 text-center text-[10px] font-medium text-white/90 leading-snug">
          {t('photo_na')}
        </p>
      </div>
    )
  }

  return (
    <div className="group/portrait relative w-full md:w-fit md:h-full select-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.35)] hover:ring-1 hover:ring-black/15 dark:hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.8)] dark:hover:ring-white/25">
      <img
        src={src}
        alt="Galxtria"
        draggable={false}
        onError={onFail}
        className="block w-full grayscale brightness-[.94] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/portrait:grayscale-0 group-hover/portrait:brightness-105 md:h-full md:w-auto"
      />
      {/* Badge status mono muncul saat hover */}
      <span className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur transition-all duration-500 group-hover/portrait:opacity-100 dark:bg-white/90 dark:text-black">
        <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white dark:bg-black" />
        {t('hero_badge')}
      </span>
    </div>
  )
}

// ── Hero (ref Image 1): 1 baris outline+solid, foto overlap teks, info kiri-bawah + sosmed kanan-bawah ──

function Hero({ visible }) {
  const { t } = useLang()
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col bg-white dark:bg-[#0b0b0d] pt-24 md:pt-28">
      <div className="flex w-full flex-1 flex-col justify-center px-4 md:px-8">
      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* Nama raksasa satu baris: GALX outline + TRIA solid */}
        <h1
          className={`relative z-0 text-center font-black leading-none tracking-[-0.02em] whitespace-nowrap text-[clamp(2.8rem,11.5vw,10rem)] transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontFamily: 'Archivo, Inter, system-ui, sans-serif' }}
        >
          <span className="text-outline">GALX</span>
          <span className="text-black dark:text-white">TRIA</span>
        </h1>

        {/* Baris bawah: info kiri — foto tengah overlap teks — sosmed kanan */}
        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-4 items-end -mt-[6vw] md:-mt-[6vw]">
          <div className="rise-in order-2 md:order-1 text-center md:text-left md:pb-20" style={{ animationDelay: '300ms' }}>
            <p className="text-xl font-bold">{t('hero_role')}</p>
            <p className="mx-auto md:mx-0 mt-1 max-w-[280px] text-[13px] leading-relaxed text-black/55 dark:text-white/55">
              {t('hero_tagline')}
            </p>
            <p className="mx-auto md:mx-0 mt-3 flex max-w-[280px] items-center justify-center md:justify-start gap-1.5 text-[12px] font-medium text-black/55 dark:text-white/55">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Denpasar, Bali, Indonesia
            </p>
              <a
                href="/cv.pdf"
                download="Galxtria-CV.pdf"
                className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t('hero_cv')}
              </a>
          </div>

          {/* Foto: tinggi mengikuti layar, badan ditempel ke tepi bawah hero */}
          <div className="order-1 md:order-2 mx-auto md:mx-0 w-[300px] sm:w-[380px] md:w-auto md:h-[70svh] md:flex md:justify-center md:justify-self-center">
            <PortraitReveal />
          </div>

          <div className="rise-in order-3 flex md:justify-end justify-center md:pb-20" style={{ animationDelay: '450ms' }}>
            <div className="flex md:flex-col flex-wrap justify-center gap-2.5">
              {SOCIALS.map((s) => (
                <SocialPill
                  key={s.label}
                  s={s}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 text-[13px] font-medium text-black/70 shadow-sm hover:border-black hover:text-black transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

// ── Thumbnail: selalu uniform cover (patokan: shot landscape My Music).
// Shot HP pun di-crop cover agar ukurannya SAMA persis dengan shot web —
// tanpa mockup HP & tanpa layer blur (blur-2xl repaint tiap frame saat expand → animasi patah).

function Thumbnail({ p, zoom = true, vivid = false, fill = false, fit = 'object-cover object-top' }) {
  const motion = zoom ? 'transition-all duration-500 group-hover:scale-[1.04]' : vivid ? 'transition-all duration-500 group-hover:scale-[1.02]' : ''
  // Di kartu grid: hitam-putih, berwarna saat hover. Di modal/spotlight: selalu berwarna.
  const tone = zoom && !vivid ? 'grayscale group-hover:grayscale-0' : ''
  // fill = mengisi parent ber-height tetap agar semua thumbnail SAMA ukurannya.
  // Tanpa fill = pakai aspect ratio.
  const box = fill ? 'h-full w-full' : 'aspect-[16/9] w-full'
  return (
    <img src={p.shot} alt={p.short} loading="lazy" decoding="async" className={`${box} ${fit} ${tone} ${motion}`} />
  )
}

// ── Efek 3D tilt mengikuti kursor untuk preview project (pengganti zoom) ──

function Tilt({ className = '', max = 7, reveal, children }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transition = 'transform 0.08s linear, box-shadow 0.4s ease'
    el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease'
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <figure
      ref={ref}
      data-reveal={reveal}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} will-change-transform transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]`}
    >
      {children}
    </figure>
  )
}

// ── Modal detail project + lightbox fullscreen (klik thumbnail → detail, klik gambar di modal → zoom) ──

function ProjectModal({ p, index, total, onClose, onZoom, onPrev, onNext, paused }) {
  const { lang, t } = useLang()
  const L = (v) => localize(lang, v)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (paused) return
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext, paused])

  return (
    <div
      className="backdrop-in fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-in relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141416]"
      >
        <button
          onClick={onClose}
          aria-label={t('modal_close_details')}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black/70 shadow-lg hover:border-black hover:text-black transition-colors dark:border-white/15 dark:bg-black/60 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
        >
          ✕
        </button>
        <button
          onClick={onZoom}
          title={t('modal_enlarge_title')}
          className="group/img relative block w-full cursor-zoom-in"
        >
          <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.frame === 'phone' ? (p.tint || 'from-zinc-100 to-zinc-200') : 'from-zinc-100 to-zinc-200'} dark:from-white/10 dark:to-white/5`}>
            <Thumbnail p={p} zoom={false} vivid fill fit={p.frame === 'phone' ? 'object-contain' : 'object-cover object-top'} />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white opacity-0 transition-opacity group-hover/img:opacity-100">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
              {t('modal_enlarge')}
            </span>
          </div>
        </button>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[12px] tracking-[0.2em] text-black/40 dark:text-white/40">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-black/15 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-black/55 dark:border-white/20 dark:text-white/60">
              {L(p.category)}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">{p.year} · {L(p.tags)[0]}</span>
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-black/60 dark:text-white/60">{L(p.fullDesc)}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">{t('role_prefix')}: {p.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75 dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t('btn_github')} <span aria-hidden>↗</span>
            </a>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 hover:border-black hover:text-black transition-colors dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
              >
                {t('btn_demo')} <span aria-hidden>↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 hover:border-black hover:text-black transition-colors dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
            >
              {t('modal_close')}
            </button>
          </div>
          {/* Prev / Next antar project */}
          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
            <button
              onClick={onPrev}
              aria-label={t('modal_prev_aria')}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-black/50 hover:bg-black/5 hover:text-black transition-colors dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span aria-hidden>←</span> {t('modal_prev')}
            </button>
            <span className="font-mono text-[11px] tracking-[0.2em] text-black/40 dark:text-white/40">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={onNext}
              aria-label={t('modal_next_aria')}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-black/50 hover:bg-black/5 hover:text-black transition-colors dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {t('modal_next')} <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ p, onClose }) {
  const { t } = useLang()
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('lightbox_of', { x: p.short })}
    >
      <img
        src={p.shot}
        alt={p.short}
        onClick={onClose}
        className={`max-h-[85vh] w-auto max-w-full rounded-xl shadow-2xl ${p.frame === 'phone' ? 'object-contain' : 'object-contain'}`}
      />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
        {p.short} · {t('lightbox_hint')}
      </p>
    </div>
  )
}

// ── Skills: ringkasan stack yang dipakai di repo GitHub ──

const SKILLS = [
  {
    group: { en: 'Frontend', id: 'Frontend' },
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Sass'],
  },
  {
    group: { en: 'Backend & Data', id: 'Backend & Data' },
    items: ['Laravel', 'PHP', 'REST API', 'Sanctum Auth', 'SQLite', 'IndexedDB'],
  },
  {
    group: { en: 'Tools & Platform', id: 'Tools & Platform' },
    items: ['Vite', 'Git & GitHub', 'Vercel', 'PWA', 'Recharts', 'Leaflet', 'Zustand', 'Figma', 'VS Code', 'npm', 'Chrome DevTools'],
  },
]

function Skills() {
  const ref = useReveal(0.08)
  const { lang, t } = useLang()
  const L = (v) => localize(lang, v)
  return (
    <section id="skills" ref={ref} className="relative w-full scroll-mt-16 bg-white dark:bg-[#0b0b0d]">
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <span data-reveal="fade" aria-hidden className="watermark absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,10vw,7rem)] font-black tracking-tight text-black/[0.05] dark:text-white/[0.06]">
          SKILLS
        </span>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('skills_title')}</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
            {t('skills_sub')}
          </p>
        </div>
        <p data-reveal className="relative mt-4 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55">
          {t('skills_desc')}
        </p>

        {/* Daftar grup simpel: nomor + nama di kiri, pills di kanan */}
        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-black/10 dark:border-white/10">
          {SKILLS.map((g, gi) => (
            <div
              key={L(g.group)}
              data-reveal
              className="group flex flex-col gap-4 border-b border-black/10 py-7 transition-colors duration-300 hover:bg-black/[0.02] md:flex-row md:items-baseline md:gap-8 dark:border-white/10 dark:hover:bg-white/[0.03]"
            >
              <p className="flex shrink-0 items-baseline gap-3 md:w-60">
                <span className="font-mono text-[11px] tracking-[0.2em] text-black/40 dark:text-white/40">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {L(g.group)}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75 transition-colors duration-300 hover:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/30">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Selected Work: showcase 2 kolom selang-seling, thumbnail ringkas ──

function Work() {
  const ref = useReveal(0.08)
  const { lang, t } = useLang()
  const L = (v) => localize(lang, v)
  const [active, setActive] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const total = PROJECTS.length

  return (
    <section id="work" ref={ref} className="relative w-full scroll-mt-16 bg-white dark:bg-[#0b0b0d]">
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <span data-reveal="fade" aria-hidden className="watermark absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,10vw,7rem)] font-black tracking-tight text-black/[0.05] dark:text-white/[0.06]">
          PORTFOLIO
        </span>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('work_title')}</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
            {String(total).padStart(2, '0')} {t('work_meta')}
          </p>
        </div>
        <p data-reveal className="relative mt-4 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55">
          {t('work_sub')}
        </p>

        <div className="mx-auto mt-10 md:mt-14 w-full max-w-6xl">
          {PROJECTS.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <article
                key={p.title}
                data-reveal
                className="group grid items-center gap-6 border-t border-black/10 py-10 last:border-b dark:border-white/10 md:grid-cols-2 md:gap-10 md:py-12"
              >
                <div className={`min-w-0 ${flip ? 'md:order-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[12px] tracking-[0.2em] text-black/40 dark:text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full border border-black/15 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-black/55 dark:border-white/20 dark:text-white/60">
                      {L(p.category)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl md:text-4xl font-extrabold leading-[1.05] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[13px] md:text-sm leading-relaxed text-black/55 dark:text-white/55">
                    {L(p.fullDesc)}
                  </p>

                  <dl className="mt-6 grid max-w-md grid-cols-3 gap-4">
                    {[
                      [t('lbl_year'), p.year],
                      [t('lbl_platform'), L(p.tags)[0]],
                      [t('lbl_role'), p.role],
                    ].map(([label, value]) => (
                      <div key={label} className="border-l border-black/15 pl-3 dark:border-white/20">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">{label}</dt>
                        <dd className="mt-1.5 text-base md:text-lg font-extrabold tracking-tight">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75 dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                      {t('btn_github')} <span aria-hidden>↗</span>
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 transition-all hover:-translate-y-0.5 hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                      >
                        {t('btn_demo')} <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Klik thumbnail → buka modal detail; gambar di modal bisa di-zoom fullscreen */}
                <Tilt reveal="scale" className={`min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-zinc-100 shadow-sm dark:border-white/10 dark:bg-white/5 ${flip ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
                    <span aria-hidden className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
                    </span>
                    <span className="mx-auto font-mono text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">{p.short}</span>
                    <span aria-hidden className="w-10" />
                  </div>
                  <button
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(i) }}
                    title={t('view_details', { x: p.short })}
                    aria-label={t('view_details', { x: p.short })}
                    className="group/shot relative block w-full cursor-zoom-in text-left"
                  >
                  <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.frame === 'phone' ? (p.tint || 'from-zinc-100 to-zinc-200') : 'from-zinc-100 to-zinc-200'} dark:from-white/10 dark:to-white/5`}>
                    <span className="block h-full w-full transition-transform duration-500 group-hover/shot:scale-[1.03]">
                      <Thumbnail p={p} zoom={false} vivid={false} fill fit={p.frame === 'phone' ? 'object-contain' : 'object-cover object-top'} />
                    </span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                    <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-black/0 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-semibold text-black shadow-lg dark:bg-black/85 dark:text-white">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                        {t('view_details_short')}
                      </span>
                    </span>
                  </div>
                  </button>
                </Tilt>
              </article>
            )
          })}
        </div>

        <p className="flex items-center justify-center gap-3 pt-8 pb-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
          <span aria-hidden className="h-px w-8 bg-black/15 dark:bg-white/15" />
          {t('work_foot')}
          <span aria-hidden className="h-px w-8 bg-black/15 dark:bg-white/15" />
        </p>
      </div>
      {/* Portal ke body: keluar dari stacking context <main>, jadi tidak ketutup navbar */}
      {active !== null &&
        createPortal(
          <ProjectModal
            p={PROJECTS[active]}
            index={active}
            total={total}
            onClose={() => setActive(null)}
            onZoom={() => setZoomed(true)}
            onPrev={() => setActive((a) => (a - 1 + total) % total)}
            onNext={() => setActive((a) => (a + 1) % total)}
            paused={zoomed}
          />,
          document.body
        )}
      {zoomed &&
        active !== null &&
        createPortal(<Lightbox p={PROJECTS[active]} onClose={() => setZoomed(false)} />, document.body)}
    </section>
  )
}

// ── Background: konsep 2 kolom (Education + Experience) sebagai timeline gaya web ──

function TimelineItem({ item, first }) {
  const { lang } = useLang()
  const L = (v) => localize(lang, v)
  return (
    <li
      data-reveal
      onMouseMove={spotMove}
      className="spot-dark-row group relative pb-10 pl-8 last:pb-0 md:pl-10"
    >
      <span aria-hidden className="absolute bottom-0 left-[9px] top-6 w-px bg-white/10 dark:bg-black/10" />
      <span
        aria-hidden
        className={`absolute left-[5px] top-2 h-[9px] w-[9px] rounded-full transition-colors duration-300 ${
          first
            ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] dark:bg-black dark:shadow-[0_0_0_4px_rgba(0,0,0,0.10)]'
            : 'bg-[#131315] ring-1 ring-white/30 group-hover:bg-white/60 dark:bg-[#e9e6e0] dark:ring-black/30 dark:group-hover:bg-black/50'
        }`}
      />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{item.period}</p>
        {item.badge && (
          <span className="shrink-0 rounded-full border border-white/20 px-3.5 py-1 text-[11px] font-medium text-white/75 dark:border-black/20 dark:text-black/70">
            {L(item.badge)}
          </span>
        )}
      </div>
      <p className="mt-3 text-xl md:text-2xl font-extrabold leading-[1.1] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
        {item.place}
      </p>
      <p className="mt-2 text-[13px] md:text-sm font-medium text-white/60 dark:text-black/60">{L(item.role)}</p>
      <p className="mt-3 max-w-md text-[13px] md:text-sm leading-relaxed text-white/55 dark:text-black/60">{L(item.desc)}</p>
    </li>
  )
}

function Experience() {
  const ref = useReveal(0.08)
  const { t } = useLang()
  return (
    <section id="experience" ref={ref} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#131315] text-white dark:bg-[#e9e6e0] dark:text-[#161614]">
      <span data-reveal="fade" aria-hidden className="watermark pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(3.5rem,11vw,8rem)] font-black tracking-tight text-white/[0.05] dark:text-black/[0.06]">
        BACKGROUND
      </span>
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('exp_title')}</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{t('exp_sub')}</p>
        </div>
        <p data-reveal className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 dark:text-black/60">
          {t('exp_desc')}
        </p>

        <div className="mx-auto mt-10 md:mt-14 grid w-full max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{t('exp_edu')}</p>
            <ul className="mt-8">
              {EDUCATION.map((item, i) => (
                <TimelineItem key={item.id} item={item} first={i === 0} />
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{t('exp_exp')}</p>
            <ul className="mt-8">
              {WORK_EXPERIENCE.map((item, i) => (
                <TimelineItem key={item.id} item={item} first={i === 0} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Contact (gaya referensi: headline besar + grid kartu 2×2, dalam style terang) ──

const CONTACT_CARDS = [
  { id: 'email', label: 'Email', value: 'utamapradita5@gmail.com', href: null, copy: 'utamapradita5@gmail.com', tile: 'bg-zinc-900', icon: 'text-white' },
  { id: 'github', label: 'GitHub', value: 'github.com/galxtria', href: 'https://github.com/galxtria', tile: 'bg-zinc-900', icon: 'text-white' },
  { id: 'instagram', label: 'Instagram', value: '@galxtria', href: 'https://www.instagram.com/galxtria/', tile: 'bg-zinc-900', icon: 'text-white' },
  { id: 'linkedin', label: 'LinkedIn', value: 'Pradita Utama', href: 'https://www.linkedin.com/in/praditautama25', tile: 'bg-zinc-900', icon: 'text-white' },
]

function ContactCard({ c }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()
  const ref = useRef(null)

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
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const body = (
    <>
      <span aria-hidden className="contact-glow" />
      <span className={`contact-tile flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.tile}`}>
        <SocialIcon label={c.label === 'Email' ? 'Email' : c.label === 'GitHub' ? 'GitHub' : c.label === 'Instagram' ? 'Instagram' : 'LinkedIn'} className={`h-6 w-6 ${c.icon}`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">{c.label}</span>
        <span className="mt-1 block truncate text-base md:text-lg font-semibold text-black/85 dark:text-white/90">{copied ? t('copied') : c.value}</span>
      </span>
      <span aria-hidden className="contact-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 group-hover:border-black group-hover:text-white dark:border-white/15 dark:text-white/50 dark:group-hover:border-white">
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

  const cls = 'contact-spot group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-6 md:p-7 text-left shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-black/25 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/25 dark:hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.7)]'

  if (c.href) {
    return (
      <a ref={ref} onMouseMove={onMove} href={c.href} target="_blank" rel="noreferrer" data-reveal className={cls}>
        {body}
      </a>
    )
  }
  return (
    <button ref={ref} onMouseMove={onMove} onClick={copyEmail} title={t('copy_title')} data-reveal className={cls}>
      {body}
    </button>
  )
}

// ── Back to top mengambang: muncul setelah scroll ──

function BackToTop({ visible }) {
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

function Contact() {
  const ref = useReveal(0.1)
  const { t } = useLang()
  return (
    <section id="contact" ref={ref} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white/55 backdrop-blur border-t border-black/5 dark:bg-black/40 dark:border-white/10">
      {/* Watermark + cahaya lembut */}
      <span data-reveal="fade" aria-hidden className="watermark pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(3.5rem,11vw,8rem)] font-black tracking-tight text-black/[0.05] dark:text-white/[0.06]">
        CONTACT
      </span>
      <span aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl dark:bg-white/[0.07]" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-[8%] h-56 w-56 rounded-full bg-black/[0.04] blur-2xl dark:bg-white/[0.05]" />
      <span aria-hidden className="pointer-events-none absolute bottom-10 right-[6%] h-64 w-64 rounded-full bg-black/[0.05] blur-2xl dark:bg-white/[0.06]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24 text-center">
        <p data-reveal className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
          <span aria-hidden className="h-px w-8 bg-black/20 dark:bg-white/20" />
          {t('contact_eyebrow')}
          <span aria-hidden className="h-px w-8 bg-black/20 dark:bg-white/20" />
        </p>
        <h2 data-reveal className="contact-headline mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
          <span className="rise-in inline-block" style={{ animationDelay: '100ms' }}>{t('contact_hl_1')}</span>{' '}
          <span className="rise-in inline-block" style={{ animationDelay: '200ms' }}>{t('contact_hl_2')}</span>
          <br />
          <span className="hl-outline text-outline rise-in inline-block" style={{ animationDelay: '320ms' }}>{t('contact_hl_3')}</span>{' '}
          <span className="hl-outline text-outline rise-in inline-block" style={{ animationDelay: '420ms' }}>{t('contact_hl_4')}</span>
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-2xl text-sm md:text-[15px] leading-relaxed text-black/55 dark:text-white/55">
          {t('contact_desc')}
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 text-left sm:grid-cols-2">
          {CONTACT_CARDS.map((c) => (
            <ContactCard key={c.id} c={c} />
          ))}
        </div>
      </div>
      <p className="relative pb-8 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-black/35 dark:text-white/35">© 2026 Galxtria</p>
    </section>
  )
}

// ── App ──

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Galxtria'
  }, [])

  return (
    <div className="cloud-sky relative min-h-screen text-[#111] dark:text-[#f4f2ed]">
      {!loaded && <Splash onFinish={() => setLoaded(true)} />}
      <Navbar loaded={loaded} />
      <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero visible={loaded} />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <BackToTop visible={loaded} />
    </div>
  )
}
