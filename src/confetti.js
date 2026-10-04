// Confetti minimalis tanpa dependensi — semburan kotak kecil dari titik klik.
// Hormat prefers-reduced-motion: tidak jalan sama sekali bila user mematikannya.
export function burstConfetti(x, y, opts = {}) {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  } catch { /* abaikan */ }
  const count = opts.count ?? 26
  const canvas = document.createElement('canvas')
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.style.cssText =
    'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:120;'
  canvas.width = Math.floor(window.innerWidth * dpr)
  canvas.height = Math.floor(window.innerHeight * dpr)
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const dark = document.documentElement.classList.contains('dark')
  const palette = dark
    ? ['#f4f2ed', '#ffffff', '#a1a1aa', '#52525b']
    : ['#111111', '#3f3f46', '#a1a1aa', '#d4d4d8']
  const parts = Array.from({ length: count }, () => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 9,
    vy: -Math.random() * 8 - 2,
    s: 4 + Math.random() * 5,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
    decay: 0.016 + Math.random() * 0.014,
    color: palette[Math.floor(Math.random() * palette.length)],
  }))

  let frames = 0
  const tick = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const p of parts) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.32
      p.vx *= 0.985
      p.r += p.vr
      p.life -= p.decay
      if (p.life <= 0) continue
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.life)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.7)
      ctx.restore()
    }
    frames += 1
    if (frames < 55) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}
