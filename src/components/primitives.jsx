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
