import { useRef, cloneElement } from 'react'

export function Magnetic({ children, max = 6 }) {
  const ref = useRef(null)
  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(hover: none)').matches) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const x = Math.max(-max, Math.min(max, dx * 0.25))
    const y = Math.max(-max, Math.min(max, dy * 0.25))
    el.style.transition = 'transform 0.12s ease-out'
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  }
  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
    el.style.transform = 'translate(0px, 0px)'
  }
  return cloneElement(children, { ref, onPointerMove, onPointerLeave })
}

// ── Dots navigasi section (desktop only) ──

export function Thumbnail({ p, zoom = true, vivid = false, fill = false, fit = 'object-cover object-top', imgClass = '' }) {
  const motion = zoom ? 'transition-all duration-500 group-hover:scale-[1.04]' : vivid ? 'transition-all duration-500 group-hover:scale-[1.02]' : ''
  // Di kartu grid: hitam-putih, berwarna saat hover. Di modal/spotlight: selalu berwarna.
  const tone = zoom && !vivid ? 'grayscale group-hover:grayscale-0' : ''
  // fill = mengisi parent ber-height tetap agar semua thumbnail SAMA ukurannya.
  // Tanpa fill = pakai aspect ratio.
  const box = fill ? 'h-full w-full' : 'aspect-[16/9] w-full'
  return (
    <img src={p.shot} alt={p.short} loading="lazy" decoding="async" className={`${box} ${fit} ${tone} ${motion} ${imgClass}`} />
  )
}

// ── Efek 3D tilt mengikuti kursor untuk preview project (pengganti zoom) ──

export function Tilt({ className = '', max = 7, reveal, children }) {
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
