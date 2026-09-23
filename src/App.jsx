import { useState, useEffect, useRef } from 'react'

// ── Thumbnail memakai screenshot asli di public/shots (tanpa import) ──

// ── Data lama dimapping ke layout referensi ──

const PROJECTS = [
  {
    title: 'My Music - Automated Music Player',
    short: 'My Music',
    desc: 'Automated music player with intelligent playlist organization and seamless audio playback.',
    fullDesc:
      'My Music is a feature-rich music player with intelligent playlist curation, crossfade transitions, equalizer controls, and a responsive interface. Backend handles library indexing, metadata parsing, and preference storage.',
    tech: ['Laravel', 'MySQL', 'React', 'Tailwind'],
    tags: ['Web App', 'Kumpin Studio'],
    category: 'Real Project',
    github: 'https://github.com/galxtria/MyMusic.git',
    year: '2025',
    shot: '/shots/mymusic.jpg',
    frame: 'browser',
  },
  {
    title: 'MoneyTrackerV2 - Smart Budget Planner',
    short: 'MoneyTrackerV2',
    desc: 'Smart budget planner with daily safe-spend limits and automatic insights.',
    fullDesc:
      'MoneyTrackerV2 is a budget planning app built with TypeScript and Tailwind. Monthly budget tracking with remaining-budget overview, daily safe-spend allowance calculation, expense logging, and automatic insights that update with every new transaction.',
    tech: ['TypeScript', 'Tailwind'],
    tags: ['Mobile App', 'Personal'],
    category: 'Real Project',
    github: 'https://github.com/galxtria/MoneyTrackerV2.git',
    year: '2026',
    shot: '/shots/moneytracker-v2.jpg',
    frame: 'phone',
    tint: 'from-[#dbe7ff] to-[#aec6f5]',
  },
  {
    title: 'KostHub App - Boarding House Manager',
    short: 'KostHub App',
    desc: 'Boarding house management with financial efficiency and real-time room tracking.',
    fullDesc:
      'KostHub is a boarding house management platform: real-time occupancy tracking, automated financial reports, tenant management with digital contracts, and payment reminder notifications.',
    tech: ['Java', 'Android', 'Firebase'],
    tags: ['Mobile App', 'KostHub'],
    category: 'Real Project',
    github: 'https://github.com/galxtria/KostHub.git',
    year: '2026',
    shot: '/shots/kosthub-app.jpg',
    frame: 'phone',
    tint: 'from-[#d7f1ea] to-[#aedfd3]',
  },
  {
    title: 'KostHub Web - Property Platform',
    short: 'KostHub Web',
    desc: 'Full-stack boarding house platform with property discovery and order management.',
    fullDesc:
      'KostHub Web is the web counterpart built with Laravel, React, and Tailwind. Property search with filters, curated recommendations, tenant dashboard, and billing management.',
    tech: ['Laravel', 'React', 'Tailwind'],
    tags: ['Landing Page', 'KostHub'],
    category: 'Exploration',
    github: 'https://github.com/galxtria/KostHub_Web.git',
    year: '2026',
    shot: '/shots/kosthub-web.jpg',
    frame: 'browser',
  },
]

const EXPERIENCE_MORE = [
  { place: 'Informatics Student', detail: "Bachelor's Degree — RPL graduate continuing to university", date: '2024 — Now' },
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
  const cls = className || 'h-[13px] w-[13px] shrink-0 text-black/45'
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
      title={s.label === 'Email' ? 'Klik untuk menyalin email' : s.label}
      className={`${className} spot-pill`}
    >
      {copied ? (
        <svg className="h-[13px] w-[13px] shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <SocialIcon label={s.label} />
      )}
      {copied ? 'Copied!' : s.label}
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
        c.style.transitionDelay = `${i * 90}ms`
        requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('revealed')))
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f2f2f4] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-black/40 rise-in">Portfolio © 2026</p>
      <p className="mt-3 text-5xl md:text-6xl font-black tracking-tighter" aria-label="Galxtria">
        {word.split('').map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className={`rise-in inline-block ${i < 4 ? 'text-outline' : 'text-black'}`}
            style={{ animationDelay: `${150 + i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
      </p>
      <p className="mt-3 text-[12px] font-medium tracking-[0.2em] uppercase text-black/50 rise-in" style={{ animationDelay: '700ms' }}>
        Frontend Developer
      </p>
      <div className="mt-8 w-52 rise-in" style={{ animationDelay: '850ms' }}>
        <div className="h-[2px] overflow-hidden rounded-full bg-black/10">
          <div className="h-full bg-black transition-[width] duration-100" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-black/40">
          <span>LOADING</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}

// ── Navbar (ref Image 1) ──

function Navbar({ loaded }) {
  const [active, setActive] = useState('Work')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      let cur = 'Work'
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top <= 240) cur = l.label
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const go = (id, label) => {
    setActive(label)
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        loaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-5">
        <div className={`flex items-center justify-between gap-3 px-2 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-black/10 bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[12px] font-black tracking-[0.18em] shadow-sm border border-black/10"
          >
            GALXTRIA
          </button>

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id, l.label)}
                className={`transition-colors hover:text-black ${active === l.label ? 'text-black' : 'text-black/55'}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go('contact', 'Contact')}
              className="btn-shine hidden sm:inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Let&apos;s Talk <span aria-hidden>↗</span>
            </button>
            <button onClick={() => setOpen((o) => !o)} className="md:hidden p-2" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (<><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>) : (<><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>)}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl p-2 shadow-lg">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id, l.label)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${active === l.label ? 'bg-black text-white' : 'text-black/70'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

// ── Foto portrait: default hitam-putih, warna mengikuti kursor (spotlight) ──

function PortraitReveal() {
  const wrapRef = useRef(null)
  const [src, setSrc] = useState('/portrait-cutout.png')

  const setActive = (on) => wrapRef.current?.setAttribute('data-active', on ? 'true' : 'false')

  const updateSpot = (clientX, clientY) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${clientX - r.left}px`)
    el.style.setProperty('--my', `${clientY - r.top}px`)
    setActive(true)
  }

  const onFail = () => setSrc((s) => (s === '/portrait-cutout.png' ? '/potrait.png' : 'placeholder'))

  if (src === 'placeholder') {
    return (
      <div className="portrait-breathe relative overflow-hidden rounded-t-full bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-500 aspect-[3/4] flex items-end justify-center">
        <span className="absolute top-8 text-[64px] md:text-[84px] font-black text-white/60 select-none">G</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <p className="relative z-10 pb-4 px-4 text-center text-[10px] font-medium text-white/90 leading-snug">
          Foto tidak ditemukan
        </p>
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      data-active="false"
      onMouseMove={(e) => updateSpot(e.clientX, e.clientY)}
      onMouseLeave={() => setActive(false)}
      onTouchMove={(e) => { const t = e.touches[0]; if (t) updateSpot(t.clientX, t.clientY) }}
      onTouchEnd={() => setActive(false)}
      className="portrait-reveal relative w-full md:w-fit md:h-full cursor-crosshair select-none [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)]"
    >
      {/* Lapisan warna (bawah) */}
      <img src={src} alt="" aria-hidden="true" draggable={false} onError={onFail} className="block w-full md:h-full md:w-auto" />
      {/* Lapisan hitam-putih (atas) — dilubangi spotlight mengikuti kursor */}
      <img src={src} alt="Galxtria" draggable={false} onError={onFail} className="reveal-gray absolute inset-0 block h-full w-full grayscale" />
    </div>
  )
}

// ── Hero (ref Image 1): 1 baris outline+solid, foto overlap teks, info kiri-bawah + sosmed kanan-bawah ──

function Hero({ visible }) {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col bg-white pt-24 md:pt-28">
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
          <span className="text-black">TRIA</span>
        </h1>

        {/* Baris bawah: info kiri — foto tengah overlap teks — sosmed kanan */}
        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-4 items-end -mt-[6vw] md:-mt-[6vw]">
          <div className="rise-in order-2 md:order-1 text-center md:text-left md:pb-20" style={{ animationDelay: '300ms' }}>
            <p className="text-xl font-bold">Frontend Developer</p>
            <p className="mx-auto md:mx-0 mt-1 max-w-[280px] text-[13px] leading-relaxed text-black/55">
              Designing digital products that are clear, usable, and conversion focused.
            </p>
            <p className="mx-auto md:mx-0 mt-3 flex max-w-[280px] items-center justify-center md:justify-start gap-1.5 text-[12px] font-medium text-black/55">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Denpasar, Bali — ID
            </p>
            <p className="mx-auto md:mx-0 mt-2 max-w-[280px] text-[12px] leading-relaxed text-black/55">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
              Currently into <span className="font-semibold text-black/80">TypeScript, React &amp; Tailwind</span>
            </p>
              <a
                href="/cv.pdf"
                download="Galxtria-CV.pdf"
                className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
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
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 text-[13px] font-medium text-black/70 shadow-sm hover:border-black hover:text-black transition-colors"
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

function Thumbnail({ p, zoom = true, vivid = false, fill = false }) {
  const motion = zoom ? 'transition-all duration-500 group-hover:scale-[1.04]' : vivid ? 'transition-all duration-500 group-hover:scale-[1.02]' : ''
  // Di kartu grid: hitam-putih, berwarna saat hover. Di modal/spotlight: selalu berwarna.
  const tone = zoom && !vivid ? 'grayscale group-hover:grayscale-0' : ''
  // fill = mengisi parent ber-height tetap agar semua thumbnail SAMA ukurannya.
  // Tanpa fill = pakai aspect ratio.
  const box = fill ? 'h-full w-full' : 'aspect-[16/9] w-full'
  return (
    <img src={p.shot} alt={p.short} loading="lazy" decoding="async" className={`${box} object-cover object-top ${tone} ${motion}`} />
  )
}

// ── Selected Work (ref Image 2) ──

function Work() {
  const ref = useReveal(0.08)
  const total = PROJECTS.length
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen((cur) => (cur === i ? null : i))

  return (
    <section id="work" ref={ref} className="relative w-full scroll-mt-16 bg-white">
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <span aria-hidden className="watermark absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,10vw,7rem)] font-black tracking-tight text-black/[0.05]">
          PORTFOLIO
        </span>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">/SELECTED WORK</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
            {String(total).padStart(2, '0')} projects — 2025 / 26
          </p>
        </div>
        <p data-reveal className="relative mt-4 max-w-xl text-sm leading-relaxed text-black/55">
          Index of selected work — click a row to expand the case study inline.
        </p>

        <div className="mx-auto mt-10 md:mt-14 w-full max-w-6xl border-b border-black/10">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i
            return (
              <div key={p.title} data-reveal className="border-t border-black/10">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(i)
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${p.title}`}
                  className={`group relative flex cursor-pointer flex-col gap-4 py-5 transition-colors duration-200 hover:bg-black/[0.025] sm:gap-5 sm:py-6 md:flex-row md:items-center md:gap-8 md:py-7 md:pl-4 md:pr-2 ${isOpen ? 'bg-black/[0.025]' : ''}`}
                >
                  <span className="flex shrink-0 items-center gap-3 md:w-20">
                    <span className="font-mono text-[12px] tracking-[0.2em] text-black/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span aria-hidden className={`ml-auto flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180 border-black bg-black text-white' : 'border-black/15 text-black/50'}`}>
                      ↓
                    </span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
                      {p.tags[0]} • {p.year} • {p.category}
                    </span>
                    <span className="mt-2 block text-[1.35rem] md:text-[1.9rem] font-extrabold leading-[1.1] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {p.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[13px] md:text-sm leading-relaxed text-black/55">
                      {p.desc}
                    </span>
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-black/45">
                      {p.tech.join('  •  ')}
                    </span>
                  </span>

                  {/* Thumb preview disembunyikan saat terbuka di mobile —
                      gambar besarnya sudah tampil di detail, biar tidak dobel & panjang */}
                  <span className={`relative shrink-0 overflow-hidden rounded-xl border border-black/10 bg-zinc-100 h-[150px] w-full sm:h-[190px] md:block md:h-[168px] md:w-[288px] ${isOpen ? 'hidden' : 'block'}`}>
                    <span className="block h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <Thumbnail p={p} zoom={false} vivid fill />
                    </span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                  </span>

                  <span aria-hidden className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border text-base transition-all duration-300 md:flex ${isOpen ? 'rotate-180 border-black bg-black text-white' : 'border-black/15 text-black/50 group-hover:border-black group-hover:bg-black group-hover:text-white'}`}>
                    ↓
                  </span>
                </div>

                {/* Detail mengembang inline — tanpa popup */}
                <div className={`service-panel ${isOpen ? 'open' : ''}`}>
                  <div>
                    <div className="panel-body grid gap-5 border-t border-dashed border-black/10 py-5 md:grid-cols-[1fr_1.1fr] md:gap-10 md:py-8 md:pl-[7.5rem] md:pr-2">
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">About this project</p>
                        <p className="mt-3 text-[13.5px] md:text-sm leading-relaxed text-black/65">{p.fullDesc}</p>
                        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">Tech stack</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75">
                              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black" />
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
                          >
                            View on GitHub <span aria-hidden>↗</span>
                          </a>
                          <button
                            onClick={() => toggle(i)}
                            className="rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/60 transition-colors hover:border-black hover:text-black"
                          >
                            Collapse ↑
                          </button>
                        </div>
                      </div>
                      {/* Tinggi DIKUNCI (bukan min-h) agar semua gambar detail SAMA —
                          patokan landscape My Music, shot HP di-crop cover */}
                      <div className="relative h-[210px] overflow-hidden rounded-xl border border-black/10 bg-zinc-100 sm:h-[260px] md:h-[340px]">
                        <Thumbnail p={p} zoom={false} vivid fill />
                        <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="flex items-center justify-center gap-3 pt-8 pb-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-black/30">
          <span aria-hidden className="h-px w-8 bg-black/15" />
          Selected 2025 — 2026 • click a row to expand
          <span aria-hidden className="h-px w-8 bg-black/15" />
        </p>
      </div>
    </section>
  )
}

// ── Experience — full gelap tanpa card, sorot internship asli ──

function Experience() {
  const ref = useReveal(0.08)
  return (
    <section id="experience" ref={ref} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#131315] text-white">
      <span aria-hidden className="watermark pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(3.5rem,11vw,8rem)] font-black tracking-tight text-white/[0.05]">
        EXPERIENCE
      </span>
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">/EXPERIENCE</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Denpasar, Bali — ID</p>
        </div>

        <article data-reveal className="mt-10 md:mt-14 border-t border-white/15 pt-8 md:pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Featured role</p>
          <h3 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08] tracking-tight">
            PT Benlaris<br /> Sahabat Dewata
          </h3>
          <p className="mt-4 text-[15px] md:text-lg font-medium text-white/75">
            Web &amp; Graphic Design Intern <span className="text-white/25"> • </span> Denpasar Selatan
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-black">Des 2022 – Feb 2023</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-[12px] font-medium text-white/80">Jun 2023 – Sep 2023</span>
          </div>
          <p className="mt-6 max-w-2xl text-sm md:text-[15px] leading-relaxed text-white/55">
            Two internship periods supporting the company&apos;s web presence and visual design needs —
            from responsive web pages to graphic design assets.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Responsive Web', 'Graphic Design', 'Figma'].map((t) => (
              <span key={t} className="chip-glow chip-glow-dark rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] font-medium text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white">
                {t}
              </span>
            ))}
          </div>
        </article>

        <div data-reveal className="mt-10 md:mt-12 border-t border-white/15">
          {EXPERIENCE_MORE.map((e) => (
            <div key={e.place} onMouseMove={spotMove} className="spot-dark-row group grid grid-cols-[1fr_auto] items-center gap-2 border-b border-white/10 py-6 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <p className="text-[15px] font-bold">{e.place}</p>
                <p className="mt-1 text-[13px] text-white/50">{e.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[12px] md:text-[13px] text-white/60 whitespace-nowrap">{e.date}</p>
                <span aria-hidden className="-translate-x-1 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">↗</span>
              </div>
            </div>
          ))}
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
        <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">{c.label}</span>
        <span className="mt-1 block truncate text-base md:text-lg font-semibold text-black/85">{copied ? 'Copied!' : c.value}</span>
      </span>
      <span aria-hidden className="contact-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 group-hover:border-black group-hover:text-white">
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

  const cls = 'contact-spot group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-6 md:p-7 text-left shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-black/25 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.25)]'

  if (c.href) {
    return (
      <a ref={ref} onMouseMove={onMove} href={c.href} target="_blank" rel="noreferrer" data-reveal className={cls}>
        {body}
      </a>
    )
  }
  return (
    <button ref={ref} onMouseMove={onMove} onClick={copyEmail} title="Klik untuk menyalin email" data-reveal className={cls}>
      {body}
    </button>
  )
}

function LocalTime() {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Makassar',
          }).format(new Date())
        )
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time} WITA</span>
}

function Contact() {
  const ref = useReveal(0.1)
  return (
    <section id="contact" ref={ref} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white/55 backdrop-blur border-t border-black/5">
      {/* Watermark + cahaya lembut */}
      <span aria-hidden className="watermark pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(3.5rem,11vw,8rem)] font-black tracking-tight text-black/[0.05]">
        CONTACT
      </span>
      <span aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-[8%] h-56 w-56 rounded-full bg-black/[0.04] blur-2xl" />
      <span aria-hidden className="pointer-events-none absolute bottom-10 right-[6%] h-64 w-64 rounded-full bg-black/[0.05] blur-2xl" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24 text-center">
        <p data-reveal className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-black/40">
          <span aria-hidden className="h-px w-8 bg-black/20" />
          Get in touch
          <span aria-hidden className="h-px w-8 bg-black/20" />
        </p>
        <h2 data-reveal className="contact-headline mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
          <span className="rise-in inline-block" style={{ animationDelay: '100ms' }}>Let&apos;s</span>{' '}
          <span className="rise-in inline-block" style={{ animationDelay: '200ms' }}>Build</span>
          <br />
          <span className="hl-outline text-outline rise-in inline-block" style={{ animationDelay: '320ms' }}>Something</span>{' '}
          <span className="hl-outline text-outline rise-in inline-block" style={{ animationDelay: '420ms' }}>Amazing</span>
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-2xl text-sm md:text-[15px] leading-relaxed text-black/55">
          Got a project in mind? Let&apos;s collaborate and create something extraordinary together.
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 text-left sm:grid-cols-2">
          {CONTACT_CARDS.map((c) => (
            <ContactCard key={c.id} c={c} />
          ))}
        </div>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[11px] font-semibold shadow-sm border border-black/10">
            <span className="avail-dot relative h-2 w-2 rounded-full bg-green-500" />
            Available for projects &amp; collaborations
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-black/55">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            DENPASAR, ID — <LocalTime />
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-semibold text-black/60 shadow-sm transition-all hover:-translate-y-0.5 hover:border-black hover:text-black"
          >
            Back to top <span aria-hidden>↑</span>
          </button>
        </div>
      </div>
      <p className="relative pb-8 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-black/35">© 2026 Galxtria</p>
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
    <div className="cloud-sky relative min-h-screen text-[#111]">
      {!loaded && <Splash onFinish={() => setLoaded(true)} />}
      <Navbar loaded={loaded} />
      <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero visible={loaded} />
        <Work />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
