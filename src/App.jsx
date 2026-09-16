import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useTheme } from './ThemeContext'
import mymusicImg from './assets/images/mymusic.svg'
import mymusicLightImg from './assets/images/mymusic-light.svg'
import expensetrackerImg from './assets/images/expensetracker.svg'
import expensetrackerLightImg from './assets/images/expensetracker-light.svg'
import kosthubImg from './assets/images/kosthub-app.svg'
import kosthubLightImg from './assets/images/kosthub-app-light.svg'
import kosthubWebImg from './assets/images/kosthub-web.svg'
import kosthubWebLightImg from './assets/images/kosthub-web-light.svg'

// ─────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────

/** Enhanced scroll-reveal with staggered children */
function useStaggerReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          // Stagger children with data-reveal attribute
          const children = el.querySelectorAll('[data-reveal]')
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 100}ms`
            requestAnimationFrame(() => child.classList.add('revealed'))
          })
          obs.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, revealed }
}

/** Mouse position tracker — returns a ref (no re-renders) */
function useMousePosition() {
  const pos = useRef({ x: 0, y: 0, nx: 0.5, ny: 0.5 })

  useEffect(() => {
    const handler = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      pos.current.nx = e.clientX / window.innerWidth
      pos.current.ny = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}

/** Detect mobile / low-perf device — runs once */
function useIsMobile() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    const isTouchPrimary = window.matchMedia('(hover: none)').matches
    const isNarrow = window.innerWidth < 768
    const lowCores = (navigator.hardwareConcurrency || 4) <= 4
    return isTouchPrimary || (isNarrow && lowCores)
  }, [])
}

/** Magnetic element hook */
function useMagnetic(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    const handleLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
    }

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseleave', handleLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Home', 'Projects', 'About', 'Contact']

const PROJECTS = [
  {
    title: 'My Music',
    desc: 'Automated music player application with intelligent playlist organization and seamless audio playback.',
    fullDesc: 'My Music is a feature-rich music player application that leverages intelligent algorithms for playlist curation and seamless audio playback. It includes auto-generated playlists based on listening habits, crossfade transitions, equalizer controls, and a sleek responsive interface. The backend handles music library indexing, metadata parsing, and user preference storage for personalized recommendations.',
    tech: ['Laravel', 'MySQL', 'Tailwind'],
    github: 'https://github.com/Praddddd/MyMusic.git',
    year: '2025',
    img: mymusicImg,
    imgLight: mymusicLightImg,
  },
  {
    title: 'Expense Tracker',
    desc: 'A sleek, automated mobile application designed for seamless financial management and budget organization.',
    fullDesc: 'Expense Tracker is a comprehensive mobile financial management tool that enables users to effortlessly log, categorize, and analyze their daily transactions on the go. It features an intuitive mobile interface, real-time budget monitoring, and visual data insights tailored for a seamless smartphone experience.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/Praddddd/money_manager.git',
    year: '2026',
    img: expensetrackerImg,
    imgLight: expensetrackerLightImg,
  },
  {
    title: 'KostHub App',
    desc: 'Boarding house management system engineered for financial efficiency and real-time room tracking across multiple properties.',
    fullDesc: 'KostHub is a comprehensive boarding house management platform designed for property owners managing multiple locations. It features real-time room occupancy tracking, automated financial reporting with income/expense analytics, tenant management with digital contracts, and push notification alerts for payment reminders. The system includes a dashboard with visual analytics for occupancy rates, revenue trends, and maintenance scheduling.',
    tech: ['Java', 'Android', 'Firebase', 'Material UI'],
    github: 'https://github.com/Praddddd/KostHub.git',
    year: '2026',
    img: kosthubImg,
    imgLight: kosthubLightImg,
  },
  {
    title: 'KostHub Web',
    desc: 'Full-stack boarding house platform with property discovery, curated recommendations, and tenant order management.',
    fullDesc: 'KostHub Web is the web counterpart of the KostHub mobile app, built with Laravel, React, and Tailwind CSS. It features property search with filters, curated room recommendations with pricing and facilities, a tenant dashboard with active room tracking, and order and billing management — all in a responsive interface for tenants and property owners.',
    tech: ['Laravel', 'React', 'Tailwind'],
    github: 'https://github.com/galxtria/KostHub_Web.git',
    year: '2026',
    img: kosthubWebImg,
    imgLight: kosthubWebLightImg,
  },
]

const TECH_STACK = [
  // Original stack
  { name: 'React', color: '#61DAFB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Tailwind CSS', color: '#06B6D4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Next.js', color: '#FFFFFF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Figma', color: '#F24E1E', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'TypeScript', color: '#3178C6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', color: '#68A063', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  // Added stack
  { name: 'Java', color: '#ED8B00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python', color: '#3776AB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'PHP', color: '#777BB4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'Dart', color: '#0175C2', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
  { name: 'JavaScript', color: '#F7DF1E', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Laravel', color: '#FF2D20', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Flutter', color: '#02569B', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
]

// Terminal boot sequence lines
const TERMINAL_BOOT = [
  { text: '> initializing frontend_environment...', delay: 0 },
  { text: '  ✓ environment loaded', status: true, delay: 400 },
  { text: '> loading core modules...', delay: 700 },
  { text: '  ✓ modules ready', status: true, delay: 1100 },
  { text: '> compiling stack.config.ts...', delay: 1400 },
  { text: '  ✓ compiled successfully', status: true, delay: 1800 },
  { text: '', delay: 2000 },
]

// ─────────────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const expanded = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onOver = (e) => {
      const t = e.target
      if (t.closest('a, button, [data-magnetic], .project-card-hover, .hex-item')) {
        if (!expanded.current) {
          expanded.current = true
          dot.classList.add('expanded')
          ring.classList.add('expanded')
        }
      }
    }

    const onOut = (e) => {
      const t = e.relatedTarget
      if (!t || !t.closest('a, button, [data-magnetic], .project-card-hover, .hex-item')) {
        if (expanded.current) {
          expanded.current = false
          dot.classList.remove('expanded')
          ring.classList.remove('expanded')
        }
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    let raf
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18)

      dot.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`
      ring.style.transform = `translate3d(${target.current.x - 16}px, ${target.current.y - 16}px, 0)`

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SPLASH SCREEN — Premium Typographic Reveal with Percentage Counter
// ─────────────────────────────────────────────────────────────────────

function SplashScreen({ onFinish }) {
  const { isDark } = useTheme()
  const [phase, setPhase] = useState('loading') // loading → fade → done
  const [percent, setPercent] = useState(0)

  const stars = useMemo(() => {
    // Hanya selusin titik samar — aksen, bukan hujan bintang
    const rand = (seed) => {
      let s = seed
      return () => {
        s = (s * 9301 + 49297) % 233280
        return s / 233280
      }
    }
    const r = rand(7)
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${8 + r() * 84}%`,
      top: `${10 + r() * 80}%`,
      size: 1 + r() * 1.2,
      opacity: 0.16 + r() * 0.22,
      delay: `${(r() * 4).toFixed(2)}s`,
      duration: `${(3 + r() * 3).toFixed(2)}s`,
    }))
  }, [])

  useEffect(() => {
    // Rapid percentage counter
    const startTime = Date.now()
    const duration = 1400 // ms for counter to reach 100

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for snappy feel
      const eased = 1 - Math.pow(1 - progress, 3)
      setPercent(Math.round(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)

    // Phase transitions
    const t1 = setTimeout(() => setPhase('fade'), 1550)
    const t2 = setTimeout(() => onFinish(), 1950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === 'fade' ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ background: isDark ? '#050505' : '#fcfcfe' }}
    >
      {/* Garis divider atas — sama seperti hero section */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: isDark
            ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)'
            : 'linear-gradient(to right, transparent, rgba(139,92,246,0.18), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Glow lembut di belakang nama — sama seperti hero glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[400px] pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(139,92,246,0.09) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Selusin bintang samar sebagai aksen */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="splash-faint-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              background: isDark ? '#d9d4e8' : '#6d28d9',
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Sengaja tanpa planet — bersih seperti hero section */}

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Nama — huruf muncul satu per satu (gradasi di tiap huruf agar tidak hilang) */}
        <h1
          aria-label="Galxtria."
          className="text-[clamp(3.5rem,11vw,7.5rem)] font-black tracking-tighter leading-none"
          style={{ filter: isDark ? 'drop-shadow(0 0 26px rgba(139,92,246,0.18))' : 'none' }}
        >
          {'Galxtria.'.split('').map((ch, i) => (
            <span
              key={i}
              className={`splash-letter bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? 'from-purple-300 via-purple-400 to-violet-400'
                  : 'from-[#4c1d95] via-[#5b21b6] to-[#4338ca]'
              }`}
              style={{ animationDelay: `${150 + i * 55}ms` }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </h1>

        {/* Loader minimal — garis tipis + persen */}
        <div className="mt-10 flex items-center gap-4 splash-rise" style={{ animationDelay: '650ms' }}>
          <div
            className="h-[2px] w-44 sm:w-56 overflow-hidden rounded-full"
            style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(76,29,149,0.12)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${percent}%`,
                background: isDark
                  ? 'linear-gradient(to right, #a855f7, #8b5cf6)'
                  : 'linear-gradient(to right, #4c1d95, #7c3aed)',
                transition: 'width 0.08s linear',
              }}
            />
          </div>
          <span
            className={`text-xs font-mono font-medium tracking-[0.2em] tabular-nums ${isDark ? 'text-purple-200/70' : 'text-violet-800/80'}`}
            style={{ minWidth: '4ch', textAlign: 'left' }}
          >
            {percent}%
          </span>
        </div>
      </div>

      {/* Penanda bawah */}
      <div className={`absolute bottom-8 text-[10px] font-mono tracking-[0.35em] uppercase ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
        Galxtria © 2026
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// INTERACTIVE BACKGROUND — Ambient orbs with mouse tracking
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// CELESTIAL BODY — moon (dark) / sun (light), anchored inside Hero
// Rendered absolute against the hero section so it scrolls away with it
// instead of sticking to the viewport like the fixed background does
// ─────────────────────────────────────────────────────────────────────

function CelestialBody({ innerRef, isMobile }) {
  const { isDark } = useTheme()

  if (isMobile) return null

  return (
    <div
      ref={innerRef}
      className="absolute select-none w-[520px] h-[520px] top-[2%] right-[4%]"
      style={{
        transition: 'transform 1.6s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
        {/* Dark Mode: Frosted Crescent — quiet glassmorphism, low-contrast */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: isDark ? 0.9 : 0, transition: 'opacity 1.2s ease', transform: isDark ? 'scale(1)' : 'scale(0.95)', filter: isDark ? 'blur(0)' : 'blur(10px)' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible glass-drift" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="crescentGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b8b0d6" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#7a7390" stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="earthshine" cx="35%" cy="32%" r="78%">
                <stop offset="0%" stopColor="#232030" stopOpacity="0.7" />
                <stop offset="55%" stopColor="#16131f" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0a0910" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="crescentLight" x1="20%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stopColor="#f4f1f9" />
                <stop offset="45%" stopColor="#cfc8e2" />
                <stop offset="78%" stopColor="#9a90b5" />
                <stop offset="100%" stopColor="#6f6789" />
              </linearGradient>
              <radialGradient id="craterGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
                <stop offset="70%" stopColor="#000000" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
              </radialGradient>
              <mask id="crescentMask">
                <rect width="400" height="400" fill="black" />
                <circle cx="200" cy="200" r="68" fill="white" />
                <circle cx="178" cy="182" r="60" fill="black" />
              </mask>
              <clipPath id="moonClip">
                <circle cx="200" cy="200" r="68" />
              </clipPath>
              <filter id="soft10" x="-70%" y="-70%" width="240%" height="240%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              <filter id="soft6" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* whisper halo — very dim */}
            <circle cx="200" cy="200" r="150" fill="url(#crescentGlow)" />

            {/* 6 quiet stars, low opacity */}
            <g fill="#d9d4e8">
              <circle cx="96" cy="110" r="1.3" opacity="0.35" className="glass-twinkle" />
              <circle cx="310" cy="100" r="1.2" opacity="0.3" className="glass-twinkle" style={{ animationDelay: '1.4s' }} />
              <circle cx="330" cy="250" r="1.1" opacity="0.28" className="glass-twinkle" style={{ animationDelay: '2.2s' }} />
              <circle cx="80" cy="270" r="1.2" opacity="0.3" className="glass-twinkle" style={{ animationDelay: '0.8s' }} />
              <circle cx="150" cy="70" r="1" opacity="0.25" className="glass-twinkle" style={{ animationDelay: '2.8s' }} />
              <circle cx="290" cy="310" r="1" opacity="0.25" className="glass-twinkle" style={{ animationDelay: '1.9s' }} />
            </g>

            {/* single hairline orbit — frosted */}
            <ellipse cx="200" cy="200" rx="102" ry="36" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.13" transform="rotate(-22 200 200)" />
            <circle cx="288" cy="172" r="2" fill="#cfc8e2" opacity="0.35" />

            {/* frosted glass backing disc */}
            <circle cx="200" cy="200" r="68" fill="#ffffff" opacity="0.035" />
            <circle cx="200" cy="200" r="68" fill="url(#earthshine)" />
            <circle cx="200" cy="200" r="68" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.09" />

            {/* 2 faint craters only */}
            <g clipPath="url(#moonClip)">
              <circle cx="186" cy="196" r="9" fill="url(#craterGrad)" opacity="0.5" />
              <circle cx="210" cy="224" r="6.5" fill="url(#craterGrad)" opacity="0.4" />
              <ellipse cx="182" cy="226" rx="24" ry="18" fill="#000000" opacity="0.18" filter="url(#soft6)" />
            </g>

            {/* slim matte crescent */}
            <g mask="url(#crescentMask)">
              <circle cx="200" cy="200" r="68" fill="url(#crescentLight)" opacity="0.92" />
              <g clipPath="url(#moonClip)">
                <ellipse cx="192" cy="198" rx="12" ry="52" fill="#4a4459" opacity="0.28" filter="url(#soft6)" />
              </g>
              <circle cx="200" cy="200" r="68" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.28" filter="url(#soft2)" />
            </g>
          </svg>
        </div>

        {/* Light Mode: Clean Morning Sun — simple, warm, elegant */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: isDark ? 0 : 1, transition: 'opacity 1.2s ease', transform: isDark ? 'scale(0.95)' : 'scale(1)', filter: isDark ? 'blur(10px)' : 'blur(0)' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible glass-drift" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sunAmbient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.30" />
                <stop offset="45%" stopColor="#fcd34d" stopOpacity="0.12" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sunCoreGrad" cx="42%" cy="36%" r="75%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="42%" stopColor="#fef6dd" />
                <stop offset="70%" stopColor="#fde68a" />
                <stop offset="90%" stopColor="#f3d27a" />
                <stop offset="100%" stopColor="#d9c8f0" />
              </radialGradient>
              <linearGradient id="sunRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
              </linearGradient>
              <clipPath id="sunClip">
                <circle cx="200" cy="200" r="58" />
              </clipPath>
              <filter id="sunBlur5" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* single warm halo */}
            <circle cx="200" cy="200" r="150" fill="url(#sunAmbient)" />

            {/* core */}
            <circle cx="200" cy="200" r="58" fill="url(#sunCoreGrad)" />
            <g clipPath="url(#sunClip)">
              <ellipse cx="180" cy="174" rx="26" ry="16" fill="#ffffff" opacity="0.7" filter="url(#sunBlur5)" />
            </g>
            {/* crisp-but-soft edge */}
            <circle cx="200" cy="200" r="58" fill="none" stroke="url(#sunRingGrad)" strokeWidth="1.4" opacity="0.65" />

            {/* one thin orbit ring — quiet nod to the space theme */}
            <circle cx="200" cy="200" r="80" fill="none" stroke="#8b7ab8" strokeWidth="0.8" opacity="0.22" />

            {/* two faint sparkles */}
            <g fill="#8b7ab8">
              <circle cx="122" cy="158" r="1.3" opacity="0.35" className="glass-twinkle" />
              <circle cx="282" cy="242" r="1.4" opacity="0.32" className="glass-twinkle" style={{ animationDelay: '1.8s' }} />
            </g>
          </svg>
        </div>
    </div>
  )
}

function Background({ mouseRef, isMobile }) {
  const { isDark } = useTheme()
  const orb1 = useRef(null)
  const orb2 = useRef(null)

  useEffect(() => {
    if (isMobile) return
    let raf
    const animate = () => {
      const { nx, ny } = mouseRef.current
      const o1x = (nx - 0.5) * 40
      const o1y = (ny - 0.5) * 30
      const o2x = (nx - 0.5) * -50
      const o2y = (ny - 0.5) * -35
      if (orb1.current) orb1.current.style.transform = `translate(${o1x}px, ${o1y}px)`
      if (orb2.current) orb2.current.style.transform = `translate(${o2x}px, ${o2y}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [mouseRef, isMobile])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Celestial body (moon/sun) now lives in Hero so it scrolls with the hero section */}
      {/* Ambient orb 1 — simplified on mobile (no animation, static glow) */}
      <div
        ref={orb1}
        className={`absolute top-[-10%] left-[15%] rounded-full ${isDark ? 'opacity-[0.07]' : 'opacity-[0.14]'} ${isMobile ? 'w-[400px] h-[400px]' : 'w-[700px] h-[700px]'}`}
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,1) 0%, transparent 70%)',
          filter: isMobile ? 'blur(60px)' : 'blur(120px)',
          animation: isMobile ? 'none' : 'orb-drift-1 25s ease-in-out infinite',
          transition: isMobile ? 'none' : 'transform 1.5s ease-out',
          willChange: isMobile ? 'auto' : 'transform',
        }}
      />
      {/* Ambient orb 2 */}
      <div
        ref={orb2}
        className={`absolute bottom-[-15%] right-[5%] rounded-full ${isDark ? 'opacity-[0.05]' : 'opacity-[0.10]'} ${isMobile ? 'w-[350px] h-[350px]' : 'w-[600px] h-[600px]'}`}
        style={{
          background: isDark ? 'radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(236,72,153,1) 0%, transparent 70%)',
          filter: isMobile ? 'blur(50px)' : 'blur(100px)',
          animation: isMobile ? 'none' : 'orb-drift-2 30s ease-in-out infinite',
          transition: isMobile ? 'none' : 'transform 1.5s ease-out',
          willChange: isMobile ? 'auto' : 'transform',
        }}
      />
      {/* Orb 3 — desktop only */}
      {!isMobile && (
        <div
          className="absolute top-[35%] left-[55%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, rgba(192,132,252,1) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'orb-drift-3 22s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      )}

      {/* Noise grain texture — desktop only (very GPU-heavy) */}
      {!isMobile && (
        <div
          className="absolute inset-[-50%] opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            animation: 'grain-shift 8s steps(10) infinite',
          }}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// NAVBAR — with sliding active pill indicator & high-visibility scroll
// ─────────────────────────────────────────────────────────────────────

function Navbar({ visible }) {
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pillStyle, setPillStyle] = useState({})
  const navContainerRef = useRef(null)
  const itemRefs = useRef({})
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = NAV_LINKS.map((link) => ({
        id: link,
        el: document.getElementById(link.toLowerCase()),
      }))

      let currentActive = 'Home'
      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect()
          if (rect.top <= 200) {
            currentActive = section.id
          }
        }
      }
      setActive(currentActive)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Calculate pill position when active changes
  useEffect(() => {
    const activeEl = itemRefs.current[active]
    const container = navContainerRef.current
    if (!activeEl || !container) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()

    setPillStyle({
      left: activeRect.left - containerRect.left,
      top: activeRect.top - containerRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [active, scrolled])

  const handleNav = useCallback((link) => {
    setActive(link)
    setMobileOpen(false)
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('Home')}
          className="text-[13px] font-bold tracking-[0.25em] dark:text-zinc-400 text-violet-900 uppercase dark:hover:text-white hover:text-violet-950 transition-colors duration-200 cursor-none"
        >
          Galxtria.
        </button>

        <div className="hidden md:flex items-center gap-3">
          <div
            ref={navContainerRef}
            className={`flex items-center gap-1 px-1.5 py-1.5 rounded-xl border transition-all duration-300 relative ${
              scrolled
                ? 'dark:bg-[#050505]/90 bg-white/90 backdrop-blur-2xl dark:border-purple-500/30 border-violet-200/60 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
                : 'dark:bg-white/[0.02] bg-white/60 backdrop-blur-xl dark:border-white/[0.05] border-violet-200/40'
            }`}
          >
            <div
              className="absolute rounded-md dark:bg-white/[0.08] bg-violet-100 dark:shadow-[0_0_12px_rgba(168,85,247,0.1)] shadow-[0_0_8px_rgba(168,85,247,0.2)] z-0"
              style={{
                left: pillStyle.left ?? 0,
                top: pillStyle.top ?? 0,
                width: pillStyle.width ?? 0,
                height: pillStyle.height ?? 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'left, width',
              }}
            />
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                ref={(el) => { itemRefs.current[link] = el }}
                onClick={() => handleNav(link)}
                className={`relative z-10 px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 cursor-none ${
                  active === link
                    ? 'dark:text-white text-slate-900'
                    : 'dark:text-zinc-500 text-slate-600 dark:hover:text-zinc-200 hover:text-slate-800'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
          <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-xl dark:bg-white/[0.06] bg-white border dark:border-white/[0.08] border-slate-200 dark:text-zinc-300 text-slate-700 dark:hover:text-white hover:text-slate-900 hover:border-violet-200/60 shadow-sm transition-all cursor-pointer shrink-0" aria-label="Toggle theme">{isDark ? (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>) : (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>)}</button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button onClick={toggleTheme} className="p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors cursor-pointer" aria-label="Toggle theme">{isDark ? (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>) : (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>)}</button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 border dark:border-transparent border-slate-200 dark:bg-transparent bg-white transition-colors cursor-pointer"
            aria-label="Menu"
          >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen
              ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mx-6 mb-4 p-2 rounded-xl dark:bg-[#050505]/90 bg-white/90 backdrop-blur-2xl dark:border dark:border-purple-500/30 border border-purple-400/25 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                active === link ? 'dark:text-white text-slate-900 dark:bg-white/[0.05] bg-violet-50' : 'dark:text-zinc-500 text-slate-600 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────
// HERO — with parallax shapes, shimmer text fix, Download CV button
// ─────────────────────────────────────────────────────────────────────

function Hero({ visible, mouseRef, isMobile }) {
  const parallaxRef = useRef(null)
  const planetRef = useRef(null)

  useEffect(() => {
    if (isMobile) return

    let raf
    const animate = () => {
      if (parallaxRef.current) {
        const { nx, ny } = mouseRef.current
        const shapes = parallaxRef.current.children
        const factors = [0.04, -0.03, 0.05, -0.02, 0.035]
        for (let i = 0; i < shapes.length; i++) {
          const f = factors[i] || 0.03
          const dx = (nx - 0.5) * window.innerWidth * f
          const dy = (ny - 0.5) * window.innerHeight * f
          shapes[i].style.transform = `translate(${dx}px, ${dy}px)`
        }
      }
      if (planetRef.current) {
        const { nx, ny } = mouseRef.current
        planetRef.current.style.transform = `translate(${(nx - 0.5) * 18}px, ${(ny - 0.5) * 14}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [mouseRef, isMobile])

  return (
    <section
      id="home"
      className={`min-h-[100svh] flex flex-col items-center justify-center px-6 relative transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent" />

      {/* Moon / sun — absolute to hero, scrolls away with it */}
      <CelestialBody innerRef={planetRef} isMobile={isMobile} />

      {/* Hero glow behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[400px] dark:bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_65%)] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.06)_0%,_transparent_65%)] pointer-events-none" />

      {/* Floating parallax shapes behind text */}
      {/* Floating parallax shapes — desktop only (5 rAF-animated shapes are too heavy for mobile) */}
      {!isMobile && (
        <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

          <div
            className="absolute top-[55%] left-[8%] w-24 h-24 rounded-full opacity-[0.04]"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.6), rgba(192,132,252,0.4))',
              filter: 'blur(20px)',
              transition: 'transform 0.6s ease-out',
              animation: 'float-gentle 8s ease-in-out infinite 0.5s',
            }}
          />
          <div
            className="absolute bottom-[25%] right-[10%] w-20 h-20 rounded-lg opacity-[0.03] rotate-45"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(124,58,237,0.3))',
              filter: 'blur(15px)',
              transition: 'transform 0.6s ease-out',
              animation: 'float-gentle 9s ease-in-out infinite 2s',
            }}
          />
          <div
            className="absolute top-[35%] right-[30%] w-10 h-10 rounded-full opacity-[0.05]"
            style={{
              background: 'radial-gradient(circle, rgba(217,70,239,0.6), transparent)',
              filter: 'blur(10px)',
              transition: 'transform 0.6s ease-out',
              animation: 'float-gentle 5s ease-in-out infinite 1.5s',
            }}
          />
        </div>
      )}

      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Role pill — glassmorphism badge */}
        <div
          className="mb-6 md:mb-8"
          data-reveal
          style={{ transitionDelay: '0ms' }}
        >
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full dark:bg-white/[0.05] bg-violet-50/80 dark:border border-purple-500/30 border-violet-200/60 dark:text-purple-300 text-[#4c1d95] text-xs font-semibold tracking-[0.2em] uppercase ${isMobile ? '' : 'backdrop-blur-2xl dark:shadow-[0_0_20px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.1),0_4px_16px_rgba(0,0,0,0.08)]'}`}>
            <span className="h-1.5 w-1.5 rounded-full dark:bg-purple-400 bg-violet-500 animate-pulse" />
            Frontend Developer
          </span>
        </div>

         {/* Name — massive gradient text (all purple spectrum, no blue) */}
         <div
           className="mb-6"
           data-reveal
           style={{ transitionDelay: '100ms' }}
         >
           <h1
             className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-violet-400 from-[#4c1d95] via-[#5b21b6] to-[#4338ca] bg-clip-text text-transparent"
             style={{ filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.15))' }}
           >
             Galxtria
           </h1>
         </div>

        {/* Tagline */}
        <p
          className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"
          data-reveal
          style={{ transitionDelay: '200ms' }}
        >
          Engineering digital experiences with
          <span className="dark:text-zinc-200 text-slate-900 font-medium"> aesthetic precision </span>
          and seamless interaction design.
        </p>

        {/* CTA Buttons — View Projects + Download CV */}
         <div data-reveal style={{ transitionDelay: '300ms' }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <a
             href="/cv.pdf"
             onClick={(e) => {
               e.preventDefault()
               document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
             }}
               className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r dark:from-purple-600 dark:to-violet-600 from-[#4c1d95] to-[#4338ca] dark:border-purple-500/50 border-[#4c1d95]/30 text-white text-sm font-semibold dark:hover:from-purple-500 dark:hover:to-violet-500 hover:from-[#5b21b6] hover:to-[#4c1d95] dark:hover:border-purple-400 hover:border-[#5b21b6] active:scale-[0.97] transition-all duration-300 ${isMobile ? '' : 'backdrop-blur-2xl dark:shadow-[0_0_30px_rgba(168,85,247,0.3),0_8px_32px_rgba(0,0,0,0.3)] shadow-[0_0_28px_rgba(76,29,149,0.35),0_8px_32px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_40px_rgba(168,85,247,0.5),0_8px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_36px_rgba(76,29,149,0.5),0_8px_40px_rgba(0,0,0,0.4)]'}`}
           >
             View Projects
             <svg
               width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="group-hover:translate-x-0.5 transition-transform duration-200"
             >
               <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
             </svg>
           </a>

          {/* Download CV — elegant outline glassmorphism button */}
          <a
            href="/cv.pdf"
            download
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent dark:border-white/20 border-slate-300 dark:text-zinc-300 text-slate-700 text-sm font-semibold dark:hover:bg-white/10 hover:bg-slate-100 dark:hover:text-white hover:text-slate-900 dark:hover:border-white/30 hover:border-slate-400 active:scale-[0.97] transition-all duration-300 ${isMobile ? '' : 'backdrop-blur-2xl dark:dark:dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'}`}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-zinc-500" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// PROJECT MODAL — Glassmorphism popup
// ─────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme()
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 dark:bg-black/70 bg-black/40 backdrop-blur-md modal-backdrop-enter" />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-xl dark:bg-white/[0.05] bg-white backdrop-blur-2xl border dark:border-white/[0.12] border-slate-200 rounded-2xl overflow-hidden dark:shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] modal-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.04)_0%,_transparent_55%)] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full dark:bg-white/[0.06] bg-slate-100 dark:border-white/[0.1] border-slate-200 dark:text-zinc-400 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/[0.1] hover:bg-slate-200 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        {/* Project image in modal */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={!isDark && project.imgLight ? project.imgLight : project.img}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-10">
          {/* Year badge */}
          <div className="inline-block px-3 py-1 rounded-md dark:bg-violet-500/10 bg-violet-50 dark:border-violet-500/20 border-violet-200/60 text-[10px] font-semibold tracking-[0.2em] dark:text-violet-300 text-[#4c1d95] uppercase mb-5">
            {project.year}
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white text-slate-900 mb-4">
            {project.title}
          </h3>

          {/* Full description */}
          <p className="dark:text-zinc-400 text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            {project.fullDesc || project.desc}
          </p>

          {/* Tech stack */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] dark:text-zinc-500 text-slate-500 uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg dark:bg-white/[0.06] bg-slate-100 backdrop-blur-xl dark:border-white/[0.1] border-slate-200 text-[11px] font-medium dark:text-zinc-300 text-slate-700 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub button */}
          <a
            href={project.github || 'https://github.com/'}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl dark:bg-white/[0.06] bg-slate-900 backdrop-blur-xl border dark:border-white/[0.12] border-slate-800 text-white text-sm font-semibold dark:hover:bg-white/[0.1] hover:bg-slate-800 dark:hover:border-purple-500/30 hover:border-slate-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] active:scale-[0.97] transition-all duration-300"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// PROJECTS — Premium Horizontal Scroll Carousel
// ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, onSelect, index, total }) {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="project-card-hover w-[85vw] md:w-[600px] shrink-0 snap-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={`relative h-full rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 group ${
          isHovered
            ? 'border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15),0_20px_60px_rgba(0,0,0,0.4)] scale-[1.02]'
            : isDark ? 'border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : 'border-violet-200/60 shadow-[0_2px_8px_rgba(24,16,60,0.04),0_16px_40px_rgba(124,58,237,0.08)]'
        }`}
        style={{
          background: isDark
            ? isHovered ? 'linear-gradient(165deg, rgba(168,85,247,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.2) 100%)' : 'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
            : isHovered ? 'linear-gradient(165deg, rgba(255,255,255,1) 0%, rgba(249,247,255,1) 55%, rgba(243,240,255,1) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,248,255,0.92) 100%)',
        }}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.1) 0%, transparent 60%)',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Project image */}
         <div className="relative h-[220px] sm:h-[260px] overflow-hidden">
           {!imageLoaded && (
             <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] animate-pulse" />
           )}
            <img
              src={!isDark && project.imgLight ? project.imgLight : project.img}
              alt={project.title}
             loading="lazy"
             decoding="async"
             onLoad={() => setImageLoaded(true)}
             className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
               isHovered ? 'scale-110' : 'scale-100'
             }`}
           />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Year badge — floating top-right */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/40 backdrop-blur-xl border border-white/[0.1] text-[10px] font-semibold tracking-[0.2em] text-purple-300 uppercase">
            {project.year}
          </div>

          {/* View arrow indicator — bottom right */}
          <div
            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isHovered
                ? 'border-purple-500/60 bg-violet-500/20 scale-110'
                : 'border-white/[0.1] bg-white/[0.04]'
            }`}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className={`transition-all duration-500 ${
                isHovered ? 'text-purple-300 translate-x-0.5 -translate-y-0.5' : 'text-zinc-500'
              }`}
            >
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </div>
        </div>

        {/* Card content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Title */}
          <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500 ${
            isHovered ? 'dark:text-white text-slate-900' : 'dark:text-zinc-200 text-slate-800'
          }`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="dark:text-zinc-400 text-slate-600 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-500 ${
                  isHovered
                    ? 'bg-violet-500/15 border border-purple-500/25 dark:text-purple-200 text-[#4c1d95]'
                    : 'dark:bg-white/[0.05] bg-slate-100 dark:border-white/[0.08] border-slate-200 dark:text-zinc-400 text-slate-600'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const { ref: headRef, revealed: headRevealed } = useStaggerReveal(0.2)
  const { ref: carouselWrapRef, revealed: carouselRevealed } = useStaggerReveal(0.1)
  const [activeProject, setActiveProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    
    const cardWidth = window.innerWidth >= 768 ? 600 : window.innerWidth * 0.85
    const gap = 24
    const scrollPosition = el.scrollLeft
    const index = Math.round(scrollPosition / (cardWidth + gap))
    setCurrentIndex(Math.max(0, Math.min(index, PROJECTS.length - 1)))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = useCallback((direction) => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = window.innerWidth >= 768 ? 640 : window.innerWidth * 0.88
    el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }, [])

  return (
    <>
      <section id="projects" className="py-28 md:py-36 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent" />

        {/* Heading — left aligned with padding */}
        <div className="px-6 max-w-6xl mx-auto">
          <div
            ref={headRef}
            className={`mb-12 md:mb-16 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              headRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-3">Selected Work</p>
            <div className="flex items-end justify-between gap-4">
               <div>
                 <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter dark:text-white text-slate-900">
                    Projects
                  </h2>
                 <p data-reveal className="text-sm dark:text-zinc-500 text-slate-500 mt-2">
                   {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                 </p>
               </div>
               {/* Desktop navigation arrows */}
               <div data-reveal className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll(-1)}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollLeft
                      ? 'dark:border-white/[0.12] border-slate-300 dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-purple-500/40 hover:border-purple-300 dark:hover:bg-violet-500/10 hover:bg-violet-50/80 dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'dark:border-white/[0.05] border-slate-200 dark:text-zinc-700 text-slate-300 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll(1)}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollRight
                      ? 'dark:border-white/[0.12] border-slate-300 dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-purple-500/40 hover:border-purple-300 dark:hover:bg-violet-500/10 hover:bg-violet-50/80 dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'dark:border-white/[0.05] border-slate-200 dark:text-zinc-700 text-slate-300 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={carouselWrapRef}
          className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            carouselRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div
            ref={scrollRef}
            className="carousel-scroll flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pr-[max(1.5rem,calc(100vw-85vw-1.5rem))] pb-4"
          >
            {PROJECTS.map((p, i) => (
               <ProjectCard
                 key={p.title}
                 project={p}
                 onSelect={setActiveProject}
                 index={i}
                 total={PROJECTS.length}
               />
            ))}
            {/* End spacer for clean edge alignment */}
            <div className="shrink-0 w-4 md:w-0" aria-hidden="true" />
          </div>

          {/* Scroll progress indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.title}
                onClick={() => {
                  const el = scrollRef.current
                  if (!el) return
                  const cards = el.querySelectorAll('.project-card-hover')
                  if (cards[i]) {
                    cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                  }
                }}
                className="group p-1"
                aria-label={`Go to ${p.title}`}
              >
                <div className="w-8 h-1 rounded-full dark:bg-white/[0.1] bg-slate-300 group-hover:bg-violet-500/40 dark:group-hover:bg-violet-500/40 transition-all duration-300 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-400/60 transition-all duration-300 w-0 group-hover:w-full" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
// WIREFRAME GLOBE — pure CSS rotating rings (all purple, no blue)
// ─────────────────────────────────────────────────────────────────────

function WireframeGlobe() {
  return (
    <div className="relative w-48 h-48 mx-auto lg:mx-0 flex-shrink-0" style={{ perspective: '600px' }}>
      <div className="absolute inset-4 rounded-full" style={{ animation: 'globe-pulse 4s ease-in-out infinite' }} />
      <div className="absolute inset-0 rounded-full border dark:border-white/[0.06] border-slate-300/50" style={{ animation: 'wireframe-spin-x 12s linear infinite', transformStyle: 'preserve-3d' }} />
      <div className="absolute inset-3 rounded-full border dark:border-purple-500/[0.08] border-purple-400/20" style={{ animation: 'wireframe-spin-y 15s linear infinite', transformStyle: 'preserve-3d' }} />
      <div className="absolute inset-6 rounded-full border dark:border-fuchsia-400/[0.06] border-fuchsia-400/15" style={{ animation: 'wireframe-spin-z 10s linear infinite reverse', transformStyle: 'preserve-3d' }} />
      <div className="absolute inset-1 rounded-full border dark:border-violet-400/[0.05] border-violet-400/15" style={{ animation: 'wireframe-spin-y 18s linear infinite reverse', transformStyle: 'preserve-3d' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500 dark:bg-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// ABOUT — line-by-line reveal + wireframe globe
// ─────────────────────────────────────────────────────────────────────

const ABOUT_LINES = [
  { text: 'I believe great interfaces are invisible.', high: true },
  { text: "They're built with clean, component-driven code", high: false },
  { text: 'and express themselves through interactions', high: false },
  { text: 'that feel intuitive, precise, and effortless to use.', high: false },
]

const TIMELINE = [
  { year: '2021', title: 'Began RPL Journey', desc: 'Explored software engineering fundamentals and web development at SMK.' },
  { year: '2022 – 2023', title: 'Web & Graphic Design Intern', desc: 'Gained hands-on experience building responsive websites and digital design assets.' },
  { year: '2024', title: 'Graduated & Enrolled in Informatics', desc: "Completed RPL program and started pursuing a Bachelor's degree in Informatics." },
  { year: '2026 – Present', title: 'Building Multi-Platform Apps', desc: 'Building cross-platform apps and exploring AI integration.' },
]

function About() {
  const { ref: headRef, revealed: headRevealed } = useStaggerReveal(0.15)
  const { ref: bodyRef, revealed: bodyRevealed } = useStaggerReveal(0.1)

  return (
    <section id="about" className="px-6 py-28 md:py-36 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headRef}
          className={`mb-16 md:mb-20 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            headRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-3">About</p>
          <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter dark:text-white text-slate-900">
            Philosophy
          </h2>
        </div>

        {/* Typographic layout + Globe + Timeline */}
         <div
           ref={bodyRef}
           className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
             bodyRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
           }`}
         >
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
             {/* Statement — line-by-line reveal */}
             <div className="lg:col-span-3">
               <div className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-[1.4]">
                 {ABOUT_LINES.map((line, i) => (
                   <span
                     key={i}
                     data-reveal
                     className={`inline-block ${line.high ? 'dark:text-zinc-200 text-slate-900 font-semibold' : 'dark:text-zinc-500 text-slate-500'}`}
                     style={{ transitionDelay: `${i * 120}ms` }}
                   >
                     {line.text}{' '}
                   </span>
                 ))}
               </div>
             </div>

             {/* Detail column with globe */}
             <div className="lg:col-span-2 flex flex-col gap-6 pt-1">
               {/* Wireframe globe */}
               <div className="mb-4 hidden lg:block" data-reveal style={{ transitionDelay: '0ms' }}>
                 <WireframeGlobe />
               </div>

                <p data-reveal className="text-sm dark:text-zinc-400 text-slate-600 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                  Every project starts with understanding the user deeply — the flows,
                  the edge cases, and the moments that make or break an experience. From there,
                  I build interfaces that feel alive.
                </p>
                <p data-reveal className="text-sm dark:text-zinc-400 text-slate-600 leading-relaxed" style={{ transitionDelay: '300ms' }}>
                  I obsess over typography, spacing, animation timing, and component architecture,
                  always optimising for clarity, speed, and pixel-perfect craft.
                </p>
             </div>
           </div>

            {/* Timeline */}
            <div className="mt-16 pt-16 border-t dark:border-white/[0.05] border-slate-200">
              <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-8">Timeline</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {TIMELINE.map((item, i) => (
                 <div
                   key={i}
                   data-reveal
                   style={{ transitionDelay: `${i * 120}ms` }}
                   className="relative pl-6"
                 >
                   {/* Dot */}
                   <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-violet-500/60 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
                   
                   <div className="text-[11px] font-semibold tracking-[0.2em] dark:text-purple-400 text-violet-700 uppercase mb-1">
                     {item.year}
                   </div>
                    <h4 className="text-sm font-semibold dark:text-white text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs dark:text-zinc-500 text-slate-500">
                      {item.desc}
                    </p>
                 </div>
               ))}
             </div>
           </div>
         </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// CORE STACK — Terminal/IDE Window with Boot Sequence + Scanline
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// HEXAGON GRID — Tech Stack Visualization
// ─────────────────────────────────────────────────────────────────────

const TECH_ICONS = {
  'React': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><path d="M12 2C9 7 3 9 3 12s6 5 9 10c3-5 9-7 9-10S15 7 12 2z" stroke="currentColor" fill="none" strokeWidth="1.5"/></svg>,
  'Tailwind CSS': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 20h6v-6h8v6h6L12 2z"/></svg>,
  'Next.js': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 20h6v-6h8v6h6L12 2z"/></svg>,
  'Figma': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><circle cx="7" cy="7" r="3" opacity="0.5"/><circle cx="17" cy="7" r="3" opacity="0.5"/><circle cx="7" cy="17" r="3" opacity="0.5"/></svg>,
  'TypeScript': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/><text x="12" y="17" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">TS</text></svg>,
  'Node.js': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5 10 8 10 8s10-3 10-8V7L12 2z"/></svg>,
  'Java': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z"/><path d="M12 20s-3-1-3-3v-3h6v3c0 2-3 3-3 3z"/></svg>,
  'Python': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="9" r="3"/><circle cx="15" cy="9" r="3"/><path d="M12 18c-2 0-4-1-4-3v-2h8v2c0 2-2 3-4 3z"/></svg>,
  'PHP': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><text x="12" y="17" fontSize="11" fontWeight="bold" fill="currentColor" textAnchor="middle">PHP</text></svg>,
  'Dart': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 8v8l10 6 10-6V8L12 2z"/></svg>,
  'JavaScript': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/><text x="12" y="17" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">JS</text></svg>,
  'Laravel': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6v12l9 4 9-4V6L12 2z"/></svg>,
  'Flutter': () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 2,22 12,16 22,22"/></svg>,
}

function HexagonGrid() {
  const { ref, revealed } = useStaggerReveal(0.1)

  return (
    <section className="px-6 py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p data-reveal className="text-center text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-4">
            Core Technologies
          </p>
          <h2 data-reveal className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter dark:text-white text-slate-900 mb-14">
            Tech Stack
          </h2>

          {/* Honeycomb hex grid */}
           <div data-reveal className="hex-grid-wrapper" style={{ transitionDelay: '100ms' }}>
             {/* Row 1: 4 hexagons */}
             <div className="hex-row">
               {TECH_STACK.slice(0, 4).map((tech, i) => (
                 <HexItem key={tech.name} tech={tech} index={i} />
               ))}
             </div>
             {/* Row 2: 5 hexagons (offset) */}
             <div className="hex-row hex-row-offset">
               {TECH_STACK.slice(4, 9).map((tech, i) => (
                 <HexItem key={tech.name} tech={tech} index={i + 4} />
               ))}
             </div>
             {/* Row 3: 4 hexagons (offset) */}
             <div className="hex-row hex-row-offset">
               {TECH_STACK.slice(9, 13).map((tech, i) => (
                 <HexItem key={tech.name} tech={tech} index={i + 9} />
               ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  )
}

function HexItem({ tech, index }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)
  const hexRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = hexRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * 20
    const rotateX = (0.5 - y) * 20
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = hexRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    setHovered(false)
  }, [])

  return (
    <div
      className="hex-item"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        ref={hexRef}
        className="hex-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
      >
        {/* Outer hexagon SVG shape */}
        <svg viewBox="0 0 200 230" className="hex-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${tech.name.replace(/\s/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={tech.color === '#FFFFFF' && !isDark ? '#1a1a1a' : tech.color} stopOpacity={hovered ? 0.32 : isDark ? 0.08 : 0.28} />
              <stop offset="100%" stopColor={tech.color === '#FFFFFF' && !isDark ? '#1a1a1a' : tech.color} stopOpacity={hovered ? 0.14 : isDark ? 0.02 : 0.14} />
            </linearGradient>
            <filter id={`glow-${tech.name.replace(/\s/g, '-')}`}>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Shadow hex behind */}
          <polygon
            points="100,8 190,58 190,172 100,222 10,172 10,58"
            fill="none"
            stroke={tech.color === '#FFFFFF' && !isDark ? '#334155' : tech.color}
            strokeWidth={hovered ? 2 : isDark ? 1 : 1.5}
            strokeOpacity={hovered ? 0.62 : isDark ? 0.15 : 0.45}
            filter={hovered ? `url(#glow-${tech.name.replace(/\s/g, '-')})` : undefined}
            style={{ transition: 'all 0.4s ease' }}
          />
          {/* Fill hex */}
          <polygon
            points="100,8 190,58 190,172 100,222 10,172 10,58"
            fill={`url(#grad-${tech.name.replace(/\s/g, '-')})`}
            style={{ transition: 'all 0.4s ease' }}
          />
          {/* Inner highlight line */}
          <polygon
            points="100,22 178,66 178,164 100,208 22,164 22,66"
            fill="none"
            stroke={tech.color === '#FFFFFF' && !isDark ? '#334155' : tech.color}
            strokeWidth="0.5"
            strokeOpacity={hovered ? 0.32 : isDark ? 0.06 : 0.18}
            style={{ transition: 'all 0.4s ease' }}
          />
        </svg>

        {/* Content overlay */}
          <div className="hex-content">
            <div
              className="hex-icon-wrap"
              style={{ color: hovered ? (tech.color === '#FFFFFF' && !isDark ? '#0f172a' : tech.color) : isDark ? 'rgba(255,255,255,0.55)' : 'rgba(30,30,40,0.62)', transition: 'color 0.4s ease, transform 0.4s ease', transform: hovered ? 'scale(1.15)' : 'scale(1)' }}
            >
              {tech.logo ? (
                <img src={tech.logo} alt={tech.name} style={{ width: '32px', height: '32px', filter: tech.color === '#FFFFFF' && !isDark && !hovered ? 'invert(1) brightness(0.35)' : hovered ? `drop-shadow(0 0 8px ${tech.color === '#FFFFFF' ? '#64748b' : tech.color})` : 'none', transition: 'filter 0.4s ease' }} />
              ) : (
                TECH_ICONS[tech.name]?.()
              )}
            </div>
            <span
              className="hex-label"
              style={{ color: hovered ? (tech.color === '#FFFFFF' && !isDark ? '#0f172a' : tech.color) : isDark ? 'rgba(255,255,255,0.62)' : 'rgba(30,30,45,0.78)', transition: 'color 0.4s ease', textShadow: hovered ? `0 0 20px ${tech.color === '#FFFFFF' ? '#94a3b8' : tech.color}60` : 'none' }}
            >
             {tech.name}
           </span>
         </div>

        {/* Ambient glow behind on hover */}
        <div
          className="hex-glow"
          style={{
            background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// CONTACT — Premium Frosted Glassmorphism Card
// ─────────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, revealed } = useStaggerReveal(0.08)
  const [copied, setCopied] = useState(false)
  const email = 'utamapradita5@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    {
      label: 'Email',
      value: 'utamapradita5@gmail.com',
      link: 'mailto:utamapradita5@gmail.com',
      color: '#A78BFA',
      isCopyable: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'github.com/galxtria',
      link: 'https://github.com/galxtria',
      color: '#E2E8F0',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      value: '@galxtria',
      link: 'https://www.instagram.com/galxtria/',
      color: '#F472B6',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'Pradita Utama',
      link: 'https://www.linkedin.com/in/praditautama25',
      color: '#60A5FA',
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        ref={ref}
        className={`min-h-[80vh] flex flex-col items-center justify-center px-6 py-28 md:py-36 relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Heading */}
          <div data-reveal className="mb-14 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-4">Get In Touch</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight dark:text-white text-slate-900 mb-4 leading-[1.1]">
              Let's Build
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r dark:from-fuchsia-400 dark:via-purple-400 dark:to-violet-500 from-violet-700 via-indigo-700 to-violet-800 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h2>
            <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
             Got a project in mind? Let's collaborate and create something extraordinary together.
           </p>
         </div>

        {/* Social link cards — grid layout */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
           {socials.map((item, i) => (
             <div key={item.label}>
               {item.isCopyable ? (
                  <button
                    onClick={() => copyEmail()}
                    data-reveal
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                    className="contact-card group relative w-full p-5 rounded-2xl dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-300 dark:hover:border-white/[0.15] hover:border-purple-300/50 dark:hover:bg-white/[0.08] hover:bg-white dark:shadow-none shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_rgba(124,58,237,0.06)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.10),0_12px_32px_rgba(124,58,237,0.08)] transition-all duration-400 overflow-hidden cursor-none transform hover:scale-105 hover:-translate-y-1 text-left"
                  >
                   {/* Animated hover glow */}
                   <div
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{
                       background: `radial-gradient(ellipse at 50% 0%, ${item.color}20 0%, transparent 70%)`,
                     }}
                   />

                   {/* Animated background blur */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                     style={{
                       background: `linear-gradient(135deg, ${item.color}10 0%, transparent 100%)`,
                       backdropFilter: 'blur(8px)',
                     }}
                   />

                   <div className="relative z-10 flex items-center gap-4">
                     {/* Icon circle with animation */}
                     <div
                       className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
                       style={{
                         background: `${item.color}10`,
                         border: `1.5px solid ${item.color}30`,
                         color: item.color,
                       }}
                     >
                       {item.icon}
                     </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold tracking-[0.15em] dark:text-zinc-500 text-slate-500 uppercase mb-0.5">{item.label}</p>
                        <p className="text-sm dark:text-zinc-300 text-slate-800 dark:group-hover:text-white group-hover:text-slate-900 transition-colors duration-300 truncate">{item.value}</p>
                      </div>

                      {/* Copy icon with animation */}
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`flex-shrink-0 transition-all duration-300 ${copied ? 'text-emerald-400' : 'dark:text-zinc-600 text-slate-400 dark:group-hover:text-zinc-300 group-hover:text-slate-600 group-hover:translate-x-1 group-hover:-translate-y-1'}`}
                      >
                       {copied ? (
                         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                       ) : (
                         <>
                           <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                           <rect x="8" y="2" width="8" height="4" rx="1" />
                         </>
                       )}
                     </svg>
                   </div>
                 </button>
               ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    data-reveal
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                    className="contact-card group relative p-5 rounded-2xl dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-300 dark:hover:border-white/[0.15] hover:border-purple-300/50 dark:hover:bg-white/[0.08] hover:bg-white dark:shadow-none shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_rgba(124,58,237,0.06)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.10),0_12px_32px_rgba(124,58,237,0.08)] transition-all duration-400 overflow-hidden cursor-none transform hover:scale-105 hover:-translate-y-1 block"
                  >
                   {/* Animated hover glow */}
                   <div
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{
                       background: `radial-gradient(ellipse at 50% 0%, ${item.color}20 0%, transparent 70%)`,
                     }}
                   />

                   {/* Animated background blur */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                     style={{
                       background: `linear-gradient(135deg, ${item.color}10 0%, transparent 100%)`,
                       backdropFilter: 'blur(8px)',
                     }}
                   />

                   <div className="relative z-10 flex items-center gap-4">
                     {/* Icon circle with animation */}
                     <div
                       className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
                       style={{
                         background: `${item.color}10`,
                         border: `1.5px solid ${item.color}30`,
                         color: item.color,
                       }}
                     >
                       {item.icon}
                     </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-[0.15em] dark:text-zinc-500 text-slate-500 uppercase mb-0.5">{item.label}</p>
                        <p className="text-sm dark:text-zinc-300 text-slate-800 dark:group-hover:text-white group-hover:text-slate-900 transition-colors duration-300 truncate">{item.value}</p>
                      </div>

                      {/* Arrow with animation */}
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="ml-auto flex-shrink-0 dark:text-zinc-600 text-slate-400 dark:group-hover:text-zinc-300 group-hover:text-slate-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      >
                       <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                     </svg>
                   </div>
                 </a>
               )}
             </div>
           ))}
         </div>

        {/* Availability badge */}
        <div data-reveal style={{ transitionDelay: '500ms' }} className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs dark:text-zinc-400 text-slate-600 font-medium">Available for projects & collaborations</span>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div className="relative z-10 px-6 pb-8 pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <p className="text-[10px] dark:text-zinc-700 text-slate-400 font-medium tracking-[0.15em] uppercase">
            © 2026 Galxtria
          </p>
        </div>
      </div>
    </section>
  )
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-r dark:from-purple-600 dark:to-violet-600 from-[#4c1d95] to-[#4338ca] dark:border-purple-500/50 border-[#4c1d95]/30 flex items-center justify-center text-white dark:hover:from-purple-500 dark:hover:to-violet-500 hover:from-[#5b21b6] hover:to-[#4c1d95] active:scale-[0.95] transition-all duration-300 dark:shadow-[0_0_20px_rgba(168,85,247,0.3),0_8px_24px_rgba(0,0,0,0.3)] shadow-[0_0_20px_rgba(76,29,149,0.28),0_8px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(76,29,149,0.45)]"
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    )
  )
}

// ─────────────────────────────────────────────────────────────────────

function App() {
  const [loaded, setLoaded] = useState(false)
  const isMobile = useIsMobile()
  const mouseRef = useMousePosition()

  const handleSplashFinish = useCallback(() => setLoaded(true), [])

  // Set title + inject SVG favicon dynamically
  useEffect(() => {
    document.title = 'Galxtria'

    // Create a sleek purple glowing 'G' favicon as inline SVG
    const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#D946EF"/>
          <stop offset="50%" style="stop-color:#A855F7"/>
          <stop offset="100%" style="stop-color:#7C3AED"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0A0A0A"/>
      <text x="32" y="46" font-family="Inter,system-ui,sans-serif" font-size="38" font-weight="900" fill="url(#g)" text-anchor="middle" filter="url(#glow)">G</text>
    </svg>`

    const blob = new Blob([svgFavicon], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    // Remove existing favicons
    const existing = document.querySelectorAll('link[rel*="icon"]')
    existing.forEach((el) => el.remove())

    // Inject new favicon
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = url
    document.head.appendChild(link)

    return () => URL.revokeObjectURL(url)
  }, [])

  // Trigger hero stagger reveals after splash
  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => {
      const heroEl = document.getElementById('home')
      if (heroEl) {
        const children = heroEl.querySelectorAll('[data-reveal]')
        children.forEach((child, i) => {
          child.style.transitionDelay = `${400 + i * 100}ms`
          requestAnimationFrame(() => child.classList.add('revealed'))
        })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <div className="min-h-screen dark:bg-black bg-[#fcfcfe] dark:text-zinc-100 text-[#1e1b2e] font-sans relative transition-colors duration-300">
      {!loaded && <SplashScreen onFinish={handleSplashFinish} />}

      <CustomCursor />
      <Background mouseRef={mouseRef} isMobile={isMobile} />
      <Navbar visible={loaded} />
      <BackToTopButton />

      <main className={`relative z-10 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero visible={loaded} mouseRef={mouseRef} isMobile={isMobile} />
        <Projects />
        <About />
        <HexagonGrid />
        <Contact />
      </main>
    </div>
  )
}

export default App