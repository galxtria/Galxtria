import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.12) {
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

// ── Efek scroll global: watermark parallax + parallax gambar + garis timeline ──
// Semua properti transform/translate saja (60fps), mati total saat reduced-motion.

export function useScrollFx() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('js-parallax')
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const mobile = window.innerWidth < 768
      document.querySelectorAll('.watermark').forEach((el) => {
        if (mobile) {
          if (el.style.translate) el.style.translate = ''
          return
        }
        const r = el.getBoundingClientRect()
        const off = (r.top + r.height / 2 - vh / 2) / vh
        el.style.translate = `calc(-50% + ${(-off * 60).toFixed(1)}px) 0px`
      })
      if (!mobile) {
        document.querySelectorAll('.parallax-img').forEach((el) => {
          const frame = el.closest('.parallax-frame') || el
          const r = frame.getBoundingClientRect()
          if (r.bottom < -100 || r.top > vh + 100) return
          const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)
          const c = Math.max(-1, Math.min(1, p))
          el.style.transform = `translateY(${(c * -6).toFixed(2)}%)`
        })
      }
      document.querySelectorAll('[data-timeline]').forEach((col) => {
        const bar = col.querySelector('.timeline-progress')
        if (!bar) return
        const r = col.getBoundingClientRect()
        const p = (vh * 0.8 - r.top) / (r.height || 1)
        bar.style.transform = `scaleY(${Math.max(0, Math.min(1, p)).toFixed(3)})`
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.classList.remove('js-parallax')
    }
  }, [])
}

// ── Magnetic: tombol tertarik ringan ke kursor (max 6px), kembali springy ──
