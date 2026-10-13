import { track } from '@vercel/analytics'
import { PROJECTS } from '../data/portfolio.js'

// Waktu baca: kata / 200 (EN) atau 180 (ID), minimal 1 menit.
export function readingMinutes(text, lang) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length
  const wpm = lang === 'id' ? 180 : 200
  return Math.max(1, Math.ceil(words / wpm))
}

// Easter egg: 3x copy dalam 5 detik → pesan fun.
let copyStamps = []
export function isFunCopy() {
  const now = Date.now()
  copyStamps = [...copyStamps, now].filter((ts) => now - ts < 5000)
  return copyStamps.length >= 3
}

export function safeTrack(name, props) {
  try {
    track(name, props)
  } catch {
    /* abaikan — analytics hanya jalan di prod */
  }
}

// Helper spotlight: set --mx/--my mengikuti kursor (satu gaya untuk semua section).
// Pakai via onMouseMove={spotMove} pada elemen ber-class spot-pill / spot-light / spot-dark-row.
export const spotMove = (e) => {
  const el = e.currentTarget
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// Normalisasi nama tech agar 'Tailwind CSS' cocok dengan 'Tailwind', dll.
export const normTech = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

// Cocokkan skill → tech proyek (mis. "Tailwind CSS" ↔ "Tailwind", "IndexedDB" ↔ "Dexie.js").
export function matchTech(skillName, techName) {
  const n = normTech(skillName)
  const m = normTech(techName)
  if (!n || !m) return false
  if (m.includes(n) || n.includes(m)) return true
  // Alias yang tidak tertangkap substring: IndexedDB diwujudkan via Dexie.js.
  if ((n.includes('indexeddb') && m.includes('dexie')) || (n.includes('dexie') && m.includes('indexeddb'))) return true
  return false
}

// Hitung di berapa proyek sebuah skill terbukti dipakai (data PROJECTS).
export function techUsage(name) {
  const n = normTech(name)
  if (!n) return 0
  return PROJECTS.filter((p) => p.tech.some((tech) => matchTech(name, tech))).length
}

export function matchesTechFilter(project, techFilter) {
  if (!techFilter) return true
  return project.tech.some((tech) => matchTech(techFilter, tech))
}
