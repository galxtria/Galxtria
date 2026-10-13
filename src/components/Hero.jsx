import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../LanguageContext.jsx'
import { SOCIALS } from '../data/portfolio.js'
import { SocialPill } from './Social.jsx'
import { CvPreviewModal } from './CvModal.jsx'

export function PortraitReveal({ onActiveChange }) {
  const { t } = useLang()
  const [src, setSrc] = useState('/portrait-cutout.png')
  const [active, setActive] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onFail = () => setSrc((s) => (s === '/portrait-cutout.png' ? '/potrait.png' : 'placeholder'))

  const setBoth = (v) => {
    setActive(v)
    onActiveChange?.(v)
  }

  const handleEnter = (e) => {
    if (e.pointerType === 'touch') return
    setBoth(true)
  }

  const handleLeave = () => setBoth(false)

  // Fallback touch: tap tampilkan warna + picu teks 1.5 detik
  const handleClick = () => {
    if (window.matchMedia?.('(hover: hover)').matches) return
    setBoth(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setBoth(false), 1500)
  }

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
    <div
      data-active={active ? 'true' : 'false'}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onClick={handleClick}
      className="portrait-reveal group/portrait relative w-full md:w-fit md:h-full select-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)]"
    >
      <div className="grid">
        {/* Lapisan bawah: versi berwarna */}
        <img
          src={src}
          alt="Galxtria"
          draggable={false}
          onError={onFail}
          className="col-start-1 row-start-1 block w-full brightness-105 md:h-full md:w-auto"
        />
        {/* Lapisan atas: B&W, fade-out statis saat aktif (tanpa spotlight/tilt/zoom) */}
        <img
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="reveal-gray col-start-1 row-start-1 block w-full grayscale brightness-[.94] md:h-full md:w-auto"
        />
      </div>
      {/* Badge status mono muncul saat hover */}
      <span className={`pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur transition-opacity duration-300 group-hover/portrait:opacity-100 dark:bg-white/90 dark:text-black ${active ? 'opacity-100' : 'opacity-0'}`}>
        <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white dark:bg-black" />
        {t('hero_badge')}
      </span>
    </div>
  )
}

// ── Hero (ref Image 1): 1 baris outline+solid, foto overlap teks, info kiri-bawah + sosmed kanan-bawah ──

export function Hero({ visible }) {
  const { t } = useLang()
  const [heroActive, setHeroActive] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  // Stagger wipe kiri → kanan untuk fill-pour (dipertajam 0–350ms)
  const letters = [
    { ch: 'G', cls: 'hl-outline', d: '0ms' },
    { ch: 'A', cls: 'hl-outline', d: '50ms' },
    { ch: 'L', cls: 'hl-outline', d: '100ms' },
    { ch: 'X', cls: 'hl-outline', d: '150ms' },
    { ch: 'T', cls: 'hl-solid', d: '200ms' },
    { ch: 'R', cls: 'hl-solid', d: '250ms' },
    { ch: 'I', cls: 'hl-solid', d: '300ms' },
    { ch: 'A', cls: 'hl-solid', d: '350ms' },
  ]
  const filled = heroActive ? letters.length : 0
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col bg-white dark:bg-[#0b0b0d] pt-24 md:pt-28">
      <div className="flex w-full flex-1 flex-col justify-center px-4 md:px-8">
      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* Nama raksasa: hover foto → GALX terisi solid, TRIA jadi outline (fill-pour) */}
        <div className="hero-title-wrap relative" data-hero-active={heroActive ? 'true' : 'false'}>
          <div aria-hidden className="hero-glow" />
          <h1
            data-hero-active={heroActive ? 'true' : 'false'}
            className={`hero-title relative z-0 text-center font-black leading-none whitespace-nowrap text-[clamp(2.8rem,11.5vw,10rem)] transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: 'Archivo, Inter, system-ui, sans-serif' }}
          >
            {letters.map((l, i) => (
              <span key={i} aria-hidden="true" className={`hl-letter ${l.cls}`} style={{ transitionDelay: l.d }}>
                {l.ch}
              </span>
            ))}
            <span aria-hidden="true" className="hero-shine">
              GALXTRIA
            </span>
            <span className="sr-only">GALXTRIA</span>
          </h1>
          {/* Baseline wipe + counter mono */}
          <div aria-hidden className="hero-baseline-row">
            <span className="hero-baseline" />
            <span className="hero-count">
              {String(filled).padStart(2, '0')}/08
            </span>
          </div>
        </div>

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
              <button
                onClick={() => setCvOpen(true)}
                className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t('hero_cv')}
              </button>
              {cvOpen && createPortal(<CvPreviewModal onClose={() => setCvOpen(false)} />, document.body)}
          </div>

          {/* Foto: tinggi mengikuti layar, badan ditempel ke tepi bawah hero */}
          <div className="order-1 md:order-2 mx-auto md:mx-0 w-[300px] sm:w-[380px] md:w-auto md:h-[70svh] md:flex md:justify-center md:justify-self-center">
            <PortraitReveal onActiveChange={setHeroActive} />
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
