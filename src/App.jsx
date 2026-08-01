import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import kosthubImg from './assets/images/kosthub_web.webp'
import mymusicImg from './assets/images/mymusic_web.webp'
import expensetrackerImg from './assets/images/expensetracker_web.webp'

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
    title: 'KostHub App',
    desc: 'Boarding house management system engineered for financial efficiency and real-time room tracking across multiple properties.',
    fullDesc: 'KostHub is a comprehensive boarding house management platform designed for property owners managing multiple locations. It features real-time room occupancy tracking, automated financial reporting with income/expense analytics, tenant management with digital contracts, and push notification alerts for payment reminders. The system includes a dashboard with visual analytics for occupancy rates, revenue trends, and maintenance scheduling.',
    tech: ['Java', 'Android', 'Firebase', 'Material UI'],
    github: 'https://github.com/Praddddd/KostHub.git',
    year: '2026',
    img: kosthubImg,
  },
  {
    title: 'Expense Tracker',
    desc: 'A sleek, automated mobile application designed for seamless financial management and budget organization.',
    fullDesc: 'Expense Tracker is a comprehensive mobile financial management tool that enables users to effortlessly log, categorize, and analyze their daily transactions on the go. It features an intuitive mobile interface, real-time budget monitoring, and visual data insights tailored for a seamless smartphone experience.',
    tech: ['Laravel', 'MySQL', 'Tailwind'],
    github: 'https://github.com/Praddddd/money_manager.git',
    year: '2026',
    img: expensetrackerImg,
  },
  {
    title: 'My Music',
    desc: 'Automated music player application with intelligent playlist organization and seamless audio playback.',
    fullDesc: 'My Music is a feature-rich music player application that leverages intelligent algorithms for playlist curation and seamless audio playback. It includes auto-generated playlists based on listening habits, crossfade transitions, equalizer controls, and a sleek responsive interface. The backend handles music library indexing, metadata parsing, and user preference storage for personalized recommendations.',
    tech: ['Laravel', 'MySQL', 'Tailwind'],
    github: 'https://github.com/Praddddd/MyMusic.git',
    year: '2025',
    img: mymusicImg,
  },
]

const TECH_STACK = [
  { name: 'React', color: '#A78BFA', keyword: 'import' },
  { name: 'Tailwind CSS', color: '#C084FC', keyword: 'apply' },
  { name: 'Next.js', color: '#E9D5FF', keyword: 'export' },
  { name: 'Figma', color: '#A259FF', keyword: 'design' },
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
    // Check for touch device
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
      if (t.closest('a, button, [data-magnetic], .project-card-hover, .tech-card-spotlight')) {
        if (!expanded.current) {
          expanded.current = true
          dot.classList.add('expanded')
          ring.classList.add('expanded')
        }
      }
    }

    const onOut = (e) => {
      const t = e.relatedTarget
      if (!t || !t.closest('a, button, [data-magnetic], .project-card-hover, .tech-card-spotlight')) {
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
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15)

      const dotW = dot.offsetWidth / 2
      const ringW = ring.offsetWidth / 2

      dot.style.transform = `translate(${pos.current.x - dotW}px, ${pos.current.y - dotW}px)`
      ring.style.transform = `translate(${target.current.x - ringW}px, ${target.current.y - ringW}px)`

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
  const [phase, setPhase] = useState('loading') // loading → fade → done
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    // Rapid percentage counter
    const startTime = Date.now()
    const duration = 1200 // ms for counter to reach 100

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
    const t1 = setTimeout(() => setPhase('fade'), 1350)
    const t2 = setTimeout(() => onFinish(), 1750)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        phase === 'fade' ? 'opacity-0 scale-[1.08] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 55%)',
          opacity: phase === 'loading' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Main brand text with glow */}
        <h1
          className="text-5xl sm:text-7xl font-black tracking-tighter bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-500 bg-clip-text text-transparent"
          style={{
            filter: `drop-shadow(0 0 ${20 + percent * 0.4}px rgba(168,85,247,${0.15 + percent * 0.004}))`,
            transition: 'filter 0.1s ease',
          }}
        >
          Galxtria.
        </h1>

        {/* Percentage counter */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-500/40" />
          <span
            className="text-[13px] font-mono font-semibold tracking-[0.3em] text-purple-400/80 tabular-nums"
            style={{ minWidth: '3.5ch', textAlign: 'right' }}
          >
            {percent}%
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500/40" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// INTERACTIVE BACKGROUND — Ambient orbs with mouse tracking
// ─────────────────────────────────────────────────────────────────────

function Background({ mouseRef, isMobile }) {
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
      {/* Ambient orb 1 — simplified on mobile (no animation, static glow) */}
      <div
        ref={orb1}
        className={`absolute top-[-10%] left-[15%] rounded-full opacity-[0.07] ${isMobile ? 'w-[400px] h-[400px]' : 'w-[700px] h-[700px]'}`}
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
        className={`absolute bottom-[-15%] right-[5%] rounded-full opacity-[0.05] ${isMobile ? 'w-[350px] h-[350px]' : 'w-[600px] h-[600px]'}`}
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)',
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

  // Update active link on scroll
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
          className="text-[13px] font-bold tracking-[0.25em] text-zinc-400 uppercase hover:text-white transition-colors duration-200 cursor-none"
        >
          Galxtria.
        </button>

        {/* Desktop — with sliding pill & high-visibility scrolled state */}
        <div
          ref={navContainerRef}
          className={`hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-xl border transition-all duration-300 relative ${
            scrolled
              ? 'bg-[#050505]/90 backdrop-blur-2xl border-purple-500/30 shadow-[0_8px_30px_rgba(168,85,247,0.15)]'
              : 'bg-white/[0.02] backdrop-blur-xl border-white/[0.05]'
          }`}
        >
          {/* Sliding pill indicator */}
          <div
            className="absolute rounded-md bg-white/[0.08] shadow-[0_0_12px_rgba(168,85,247,0.1)] z-0"
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
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
        <div className="md:hidden mx-6 mb-4 p-2 rounded-xl bg-[#050505]/90 backdrop-blur-2xl border border-purple-500/30 shadow-[0_8px_30px_rgba(168,85,247,0.15)]">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                active === link ? 'text-white bg-white/[0.05]' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────
// HERO — with parallax shapes, shimmer text fix, Download CV button
// ─────────────────────────────────────────────────────────────────────

function Hero({ visible, mouseRef, isMobile }) {
  const parallaxRef = useRef(null)

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
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Hero glow behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_65%)] pointer-events-none" />

      {/* Floating parallax shapes behind text */}
      {/* Floating parallax shapes — desktop only (5 rAF-animated shapes are too heavy for mobile) */}
      {!isMobile && (
        <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-[18%] left-[12%] w-16 h-16 opacity-[0.06]"
            style={{ transition: 'transform 0.6s ease-out', animation: 'float-gentle 6s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-purple-400">
              <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
            </svg>
          </div>
          <div
            className="absolute top-[22%] right-[15%] w-14 h-14 opacity-[0.05]"
            style={{ transition: 'transform 0.6s ease-out', animation: 'float-gentle 7s ease-in-out infinite 1s' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-fuchsia-400">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
          </div>
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
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.05] border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase ${isMobile ? '' : 'backdrop-blur-2xl shadow-[0_0_20px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)]'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
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
            className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-500 bg-clip-text text-transparent hero-shimmer-text"
            style={{ filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.25))' }}
          >
            Galxtria
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"
          data-reveal
          style={{ transitionDelay: '200ms' }}
        >
          Engineering digital experiences with
          <span className="text-zinc-200 font-medium"> aesthetic precision </span>
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
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-semibold hover:bg-white/[0.1] hover:border-purple-500/30 active:scale-[0.97] transition-all duration-300 ${isMobile ? '' : 'backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)]'}`}
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
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent border border-white/20 text-zinc-300 text-sm font-semibold hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-[0.97] transition-all duration-300 ${isMobile ? '' : 'backdrop-blur-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)]'}`}
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md modal-backdrop-enter" />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] modal-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        {/* Project image in modal */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-10">
          {/* Year badge */}
          <div className="inline-block px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold tracking-[0.2em] text-purple-300 uppercase mb-5">
            {project.year}
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4">
            {project.title}
          </h3>

          {/* Full description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
            {project.fullDesc || project.desc}
          </p>

          {/* Tech stack */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-[11px] font-medium text-zinc-300 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]"
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
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] text-white text-sm font-semibold hover:bg-white/[0.1] hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] active:scale-[0.97] transition-all duration-300"
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

function ProjectCard({ project, onSelect, index }) {
  const [isHovered, setIsHovered] = useState(false)

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
            : 'border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          background: isHovered
            ? 'linear-gradient(165deg, rgba(168,85,247,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
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
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            decoding="async"
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
                ? 'border-purple-500/60 bg-purple-500/20 scale-110'
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
            isHovered ? 'text-white' : 'text-zinc-200'
          }`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-500 ${
                  isHovered
                    ? 'bg-purple-500/15 border border-purple-500/25 text-purple-200'
                    : 'bg-white/[0.05] border border-white/[0.08] text-zinc-400'
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
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
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
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        {/* Heading — left aligned with padding */}
        <div className="px-6 max-w-6xl mx-auto">
          <div
            ref={headRef}
            className={`mb-12 md:mb-16 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              headRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-3">Selected Work</p>
            <div className="flex items-end justify-between gap-4">
              <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                Projects
              </h2>
              {/* Desktop navigation arrows */}
              <div data-reveal className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll(-1)}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollLeft
                      ? 'border-white/[0.12] text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'border-white/[0.05] text-zinc-700 cursor-not-allowed'
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
                      ? 'border-white/[0.12] text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'border-white/[0.05] text-zinc-700 cursor-not-allowed'
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
            className="carousel-scroll flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-[calc((100vw-600px)/2)] pb-4"
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                onSelect={setActiveProject}
                index={i}
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
                <div className="w-8 h-1 rounded-full bg-white/[0.1] group-hover:bg-purple-500/40 transition-all duration-300 overflow-hidden">
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
      {/* Pulsing glow behind */}
      <div
        className="absolute inset-4 rounded-full"
        style={{ animation: 'globe-pulse 4s ease-in-out infinite' }}
      />
      {/* Ring 1 */}
      <div
        className="absolute inset-0 rounded-full border border-white/[0.06]"
        style={{ animation: 'wireframe-spin-x 12s linear infinite', transformStyle: 'preserve-3d' }}
      />
      {/* Ring 2 */}
      <div
        className="absolute inset-3 rounded-full border border-purple-500/[0.08]"
        style={{ animation: 'wireframe-spin-y 15s linear infinite', transformStyle: 'preserve-3d' }}
      />
      {/* Ring 3 — now purple instead of blue */}
      <div
        className="absolute inset-6 rounded-full border border-fuchsia-400/[0.06]"
        style={{ animation: 'wireframe-spin-z 10s linear infinite reverse', transformStyle: 'preserve-3d' }}
      />
      {/* Ring 4 — equatorial */}
      <div
        className="absolute inset-1 rounded-full border border-violet-400/[0.05]"
        style={{ animation: 'wireframe-spin-y 18s linear infinite reverse', transformStyle: 'preserve-3d' }}
      />
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// ABOUT — line-by-line reveal + wireframe globe
// ─────────────────────────────────────────────────────────────────────

const ABOUT_LINES = [
  { text: 'I believe great interfaces are invisible.', highlight: true },
  { text: "They're built with clean, component-driven code", highlight: false },
  { text: 'and express themselves through interactions', highlight: false },
  { text: 'that feel intuitive, precise, and effortless to use.', highlight: false },
]

function About() {
  const { ref: headRef, revealed: headRevealed } = useStaggerReveal(0.15)
  const { ref: bodyRef, revealed: bodyRevealed } = useStaggerReveal(0.1)

  return (
    <section id="about" className="px-6 py-28 md:py-36 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headRef}
          className={`mb-16 md:mb-20 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            headRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-3">About</p>
          <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
            Philosophy
          </h2>
        </div>

        {/* Typographic layout + Globe */}
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
                    className={`inline-block ${line.highlight ? 'text-zinc-200' : 'text-zinc-500'}`}
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

              <p data-reveal className="text-sm text-zinc-400 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                Every project starts with understanding the user deeply — the flows,
                the edge cases, and the moments that make or break an experience. From there,
                I build interfaces that feel alive.
              </p>
              <p data-reveal className="text-sm text-zinc-400 leading-relaxed" style={{ transitionDelay: '300ms' }}>
                I obsess over typography, spacing, animation timing, and component architecture,
                always optimising for clarity, speed, and pixel-perfect craft.
              </p>
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

function TerminalStack() {
  const { ref, revealed } = useStaggerReveal(0.1)
  const [bootLines, setBootLines] = useState(0)
  const [typedLines, setTypedLines] = useState(0)
  const bootDone = bootLines >= TERMINAL_BOOT.length

  // Boot sequence animation
  useEffect(() => {
    if (!revealed) return
    const timers = TERMINAL_BOOT.map((line, i) =>
      setTimeout(() => setBootLines(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [revealed])

  // Tech stack typing — starts after boot completes
  useEffect(() => {
    if (!bootDone) return
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedLines((prev) => {
          if (prev >= TECH_STACK.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 180)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(startDelay)
  }, [bootDone])

  return (
    <section className="px-6 py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="max-w-3xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p data-reveal className="text-center text-[11px] font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-10">
            Core Stack
          </p>

          {/* Terminal Window */}
          <div data-reveal className="rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] relative" style={{ transitionDelay: '100ms' }}>
            {/* Scanline effect overlay */}
            <div className="terminal-scanline absolute inset-0 pointer-events-none z-20" />

            {/* Title bar — macOS style */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02] relative z-10">
              <div className="flex items-center gap-[6px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57] shadow-[0_0_4px_rgba(255,95,87,0.3)]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E] shadow-[0_0_4px_rgba(254,188,46,0.3)]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28C840] shadow-[0_0_4px_rgba(40,200,64,0.3)]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[11px] font-medium text-zinc-500 tracking-wide">stack.config.ts — galxtria</span>
              </div>
              <div className="w-[52px]" /> {/* Spacer for symmetry */}
            </div>

            {/* Terminal body */}
            <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-[1.9] min-h-[340px] relative z-10">
              {/* Boot sequence */}
              <div className="mb-4 space-y-0.5">
                {TERMINAL_BOOT.map((line, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-200 ${
                      i < bootLines
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-2'
                    }`}
                  >
                    {line.text && (
                      <span className={line.status ? 'text-emerald-400/80' : 'text-zinc-500'}>
                        {line.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider between boot and code */}
              {bootDone && (
                <div className="border-t border-white/[0.04] my-3 transition-opacity duration-300" />
              )}

              {/* Comment header — appears after boot */}
              {bootDone && (
                <>
                  <div className="text-zinc-600 mb-1">
                    <span className="text-zinc-700">{'// '}</span>
                    <span className="italic">galxtria — frontend toolkit</span>
                  </div>
                  <div className="text-zinc-700 mb-4">
                    <span>{'// '}</span>
                    <span className="italic">curated technologies I build with</span>
                  </div>
                </>
              )}

              {/* Stack entries — typed in after boot */}
              {bootDone && (
                <div className="space-y-1">
                  {TECH_STACK.map((tech, i) => (
                    <div
                      key={tech.name}
                      className={`flex items-center gap-0 transition-all duration-300 ${
                        i < typedLines
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-3'
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <span className="text-zinc-600 w-6 text-right mr-4 text-xs select-none">{i + 1}</span>
                      <span className="text-purple-400">{tech.keyword}</span>
                      <span className="text-zinc-600 mx-1">{'('}</span>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
                        />
                        <span className="text-emerald-400">{`"${tech.name}"`}</span>
                      </span>
                      <span className="text-zinc-600">{')'}</span>
                      <span className="text-zinc-700">;</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Blinking cursor */}
              {bootDone && typedLines >= TECH_STACK.length && (
                <div className="flex items-center gap-0 mt-2">
                  <span className="text-zinc-600 w-6 text-right mr-4 text-xs select-none">{TECH_STACK.length + 1}</span>
                  <span className="inline-block w-[7px] h-[16px] bg-purple-400/70 terminal-cursor" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// CONTACT — Premium Frosted Glassmorphism Card
// ─────────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, revealed } = useStaggerReveal(0.08)
  const magneticRef = useMagnetic(0.25)

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Slow-pulsing purple radial gradient background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
          animation: 'contact-glow-pulse 6s ease-in-out infinite',
        }}
      />

      {/* Main content area */}
      <div
        ref={ref}
        className={`min-h-[85vh] flex flex-col items-center justify-center px-6 relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Premium Glassmorphism Card */}
        <div
          data-reveal
          className="relative w-full max-w-xl bg-white/[0.05] backdrop-blur-2xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1),0_20px_60px_rgba(0,0,0,0.4)]"
        >
          {/* Inner highlight glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(168,85,247,0.1)_0%,_transparent_50%)] pointer-events-none" />

          {/* Card content */}
          <div className="relative z-10 p-8 sm:p-12 flex flex-col items-center text-center">
            {/* Section label */}
            <p className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-8">
              Contact
            </p>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Ready to build the
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
                next big thing?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm sm:text-base font-light mb-10 max-w-sm leading-relaxed">
              Let's create something extraordinary together. I'm available for freelance work and creative collaborations.
            </p>

            {/* Email button — glowing, magnetic */}
            <div className="mb-8" data-reveal style={{ transitionDelay: '100ms' }}>
              <div
                ref={magneticRef}
                data-magnetic
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl border border-purple-500/30 text-purple-200 font-semibold text-sm sm:text-base hover:from-purple-500/30 hover:to-fuchsia-500/30 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.3),0_0_100px_rgba(168,85,247,0.1)] transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)] cursor-default"
                style={{ transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s, border-color 0.3s, box-shadow 0.3s, color 0.3s' }}
              >
                {/* Glow ring behind button */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-purple-400/80 group-hover:text-purple-300 transition-colors duration-300">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
                <span className="relative z-10">utamapradita5@gmail.com</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="relative z-10 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

            {/* Social icons — glassmorphism row */}
            <div data-reveal style={{ transitionDelay: '200ms' }} className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/Praddddd"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-zinc-500 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1 active:scale-[0.95] transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/galxtria/"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-zinc-500 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1 active:scale-[0.95] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/praditautama25"
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-zinc-500 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1 active:scale-[0.95] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright at the very bottom */}
      <div className="relative z-10 px-6 pb-8 pt-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <p className="text-[10px] text-zinc-700 font-medium tracking-[0.15em] uppercase">
            © 2026 Galxtria
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// APP — with dynamic SVG favicon injection
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
    <div className="min-h-screen bg-black text-zinc-100 font-sans relative">
      {!loaded && <SplashScreen onFinish={handleSplashFinish} />}

      <CustomCursor />
      <Background mouseRef={mouseRef} isMobile={isMobile} />
      <Navbar visible={loaded} />

      <main className={`relative z-10 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero visible={loaded} mouseRef={mouseRef} isMobile={isMobile} />
        <Projects />
        <About />
        <TerminalStack />
        <Contact />
      </main>
    </div>
  )
}

export default App