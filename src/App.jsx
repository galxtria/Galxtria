import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLang, localize, fill } from './LanguageContext.jsx'
import { burstConfetti } from './confetti.js'
import { PROJECTS, EDUCATION, WORK_EXPERIENCE, SKILLS } from './data/portfolio.js'
import { readingMinutes, isFunCopy, safeTrack, spotMove, techUsage, matchesTechFilter } from './utils/helpers.js'

// ── Refactor tahap 1: data di src/data/portfolio.js, helpers di src/utils/helpers.js ──

// ── Thumbnail memakai screenshot asli di public/shots (tanpa import) ──

import { SocialIcon } from './components/Social.jsx'

import { CvPreviewModal } from './components/CvModal.jsx'
import { NotFound } from './components/NotFound.jsx'

import { useReveal, useScrollFx } from './hooks/hooks.js'

import { SectionDots, Splash } from './components/chrome.jsx'

import { Navbar } from './components/Navbar.jsx'
import { Hero } from './components/Hero.jsx'
import { Magnetic, Thumbnail, Tilt } from './components/primitives.jsx'

function ProjectModal({ p, index, total, onClose, onZoom, onPrev, onNext, paused }) {
  const { lang, t } = useLang()
  const L = (v) => localize(lang, v)
  const scrollRef = useRef(null)
  const [copiedCmd, setCopiedCmd] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (paused) return
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    safeTrack('project_open', { project: p.short })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext, paused, p.short])

  const copyRunLocal = async () => {
    if (!p.runLocal) return
    try {
      await navigator.clipboard.writeText(p.runLocal.replace(/; /g, '\n'))
    } catch {
      /* abaikan */
    }
    safeTrack('copy_run_local', { project: p.short })
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 1500)
  }

  const sections = [
    { id: 'overview', title: t('toc_overview'), body: L(p.fullDesc) },
    { id: 'stack', title: t('toc_stack'), body: `${p.tech.join(' · ')} — ${t('role_prefix')}: ${p.role}` },
    { id: 'outcome', title: t('toc_outcome'), body: L(p.desc) },
    ...(p.highlights ? [{ id: 'highlights', title: t('toc_highlights'), list: L(p.highlights) }] : []),
    ...(p.challenge ? [{ id: 'challenge', title: t('toc_challenge'), body: L(p.challenge) }] : []),
    ...(p.learning ? [{ id: 'learning', title: t('toc_learning'), body: L(p.learning) }] : []),
  ]
  const minutes = readingMinutes(
    `${L(p.fullDesc)} ${L(p.desc)} ${(L(p.highlights) || []).join(' ')} ${p.tech.join(' ')} ${p.role}`,
    lang
  )
  const goSection = (id) => {
    const root = scrollRef.current
    if (!root) return
    const el = root.querySelector(`[data-sec="${id}"]`)
    if (el) root.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' })
  }

  return (
    <div
      className="backdrop-in fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
    >
      <div
        ref={scrollRef}
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
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">{p.year} · {L(p.tags)[0]} · {fill(t('min_read'), { n: minutes })}</span>
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">{p.title}</h3>
          <nav aria-label="TOC" className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => goSection(s.id)}
                className="shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-[12px] font-medium text-black/60 hover:border-black hover:text-black transition-colors dark:border-white/10 dark:text-white/60 dark:hover:border-white dark:hover:text-white"
              >
                {s.title}
              </button>
            ))}
          </nav>
          <div className="mt-4 space-y-5">
            {sections.map((s) => (
              <div key={s.id} data-sec={s.id} className="scroll-mt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                  {s.title}
                </p>
                {s.list ? (
                  <ul className="mt-1.5 space-y-1.5">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-2 text-sm leading-relaxed text-black/60 dark:text-white/60">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/40 dark:bg-white/40" />
                        {li}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1.5 text-sm leading-relaxed text-black/60 dark:text-white/60">{s.body}</p>
                )}
              </div>
            ))}
            {p.runLocal && (
              <div data-sec="run" className="scroll-mt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                  {t('run_local')}
                </p>
                <div className="mt-1.5 flex items-start justify-between gap-3 rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <code className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-black/70 dark:text-white/70">
                    {p.runLocal.replace(/; /g, '\n')}
                  </code>
                  <button
                    onClick={copyRunLocal}
                    className="shrink-0 rounded-full border border-black/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-black/60 hover:border-black hover:text-black transition-colors dark:border-white/15 dark:text-white/60 dark:hover:border-white dark:hover:text-white"
                  >
                    {copiedCmd ? t('copied_cmd') : t('copy_cmd')}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((tech) => {
              const href = p.stackLinks?.[tech]
              const pillCls =
                'inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75 dark:border-white/10 dark:bg-white/10 dark:text-white/80'
              const inner = (
                <>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                  {tech}
                </>
              )
              return href ? (
                <a
                  key={tech}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => safeTrack('stack_doc_click', { project: p.short, stack: tech })}
                  title={`${tech} docs`}
                  className={`${pillCls} transition-colors hover:border-black/30 dark:hover:border-white/30`}
                >
                  {inner}
                  <span aria-hidden className="text-[10px] opacity-50">↗</span>
                </a>
              ) : (
                <span key={tech} className={pillCls}>
                  {inner}
                </span>
              )
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => safeTrack('github_click', { project: p.short, source: 'modal' })}
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t('btn_github')} <span aria-hidden>↗</span>
            </a>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => safeTrack('demo_click', { project: p.short, source: 'modal' })}
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

function SkillPills({ items }) {
  const { t } = useLang()
  const goWorkWithTech = (skillName) => {
    safeTrack('skill_to_work', { skill: skillName })
    try {
      window.dispatchEvent(new CustomEvent('filter-tech', { detail: skillName }))
    } catch {
      /* abaikan */
    }
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => {
        const n = s.core ? techUsage(s.name) : 0
        const cls = `skill-pill inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all duration-300 ${
          s.core
            ? 'border-black/25 bg-zinc-100 text-black/85 hover:-translate-y-0.5 hover:border-black/40 dark:border-white/25 dark:bg-white/15 dark:text-white/90 dark:hover:border-white/40'
            : 'border-black/10 bg-zinc-50 text-black/75 hover:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/30'
        }${n > 0 ? ' cursor-pointer' : ''}`
        const body = (
          <>
            <span className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center">
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full ${
                  s.core ? 'bg-black dark:bg-white' : 'border border-black/40 bg-transparent dark:border-white/40'
                }`}
              />
              {s.icon && (
                <img
                  src={`https://skillicons.dev/icons?i=${s.icon}`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className="skill-icon absolute inset-0 h-full w-full"
                />
              )}
            </span>
            {s.name}
            {n > 0 && <span className="font-mono text-[10px] opacity-50">· {t('skills_projects', { n })}</span>}
          </>
        )
        return n > 0 ? (
          <button key={s.name} onClick={() => goWorkWithTech(s.name)} title={t('contact_cta_work')} className={cls}>
            {body}
          </button>
        ) : (
          <span key={s.name} className={cls}>
            {body}
          </span>
        )
      })}
    </div>
  )
}

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
          {t('skills_desc')}{' '}
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] opacity-70">{t('skills_hint')}</span>
        </p>

        {/* Daftar grup: nomor + nama di kiri, pills di kanan */}
        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-black/10 dark:border-white/10">
          {SKILLS.map((g, gi) => (
            <div
              key={L(g.group)}
              data-reveal
              className="group flex flex-col gap-4 border-b border-black/10 py-7 transition-colors duration-300 hover:bg-black/[0.02] md:flex-row md:gap-8 dark:border-white/10 dark:hover:bg-white/[0.03]"
            >
              <p className="flex shrink-0 items-baseline gap-3 md:w-60 md:pt-1">
                <span className="font-mono text-[11px] tracking-[0.2em] text-black/40 dark:text-white/40">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {L(g.group)}
                </span>
              </p>
              <div className="min-w-0 flex-1">
                {g.items ? (
                  <SkillPills items={g.items} />
                ) : (
                  <div className="flex flex-col gap-4">
                    {g.subs.map((sub) => (
                      <div key={L(sub.label)}>
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                          {L(sub.label)}
                        </p>
                        <SkillPills items={sub.items} />
                      </div>
                    ))}
                  </div>
                )}
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
  const [filter, setFilter] = useState('all')
  const [techFilter, setTechFilter] = useState(null)
  const total = PROJECTS.length

  useEffect(() => {
    const onTech = (e) => {
      const name = e.detail
      if (typeof name === 'string' && name) {
        setTechFilter(name)
        safeTrack('filter_tech', { tech: name, source: 'skills' })
      }
    }
    window.addEventListener('filter-tech', onTech)
    return () => window.removeEventListener('filter-tech', onTech)
  }, [])

  // Kategori unik untuk tabs filter (kunci stabil: nilai EN)
  const filters = ['all', ...new Set(PROJECTS.map((p) => p.category.en))]
  const byCategory =
    filter === 'all' ? PROJECTS.map((p, i) => ({ p, i })) : PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => p.category.en === filter)
  const visible = techFilter ? byCategory.filter(({ p }) => matchesTechFilter(p, techFilter)) : byCategory
  const filterLabel = (f) => (f === 'all' ? t('filter_all') : L(PROJECTS.find((p) => p.category.en === f).category))

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
        {/* Filter kategori: state lokal, tanpa backend */}
        <div data-reveal className="relative mt-6 flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const on = filter === f
            const count = f === 'all' ? total : PROJECTS.filter((p) => p.category.en === f).length
            return (
              <button
                key={f}
                onClick={() => {
                  setFilter(f)
                  safeTrack('filter_category', { category: f })
                }}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all duration-300 ${
                  on
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-black/10 bg-transparent text-black/55 hover:border-black/30 hover:text-black dark:border-white/10 dark:text-white/55 dark:hover:border-white/30 dark:hover:text-white'
                }`}
              >
                {filterLabel(f)}
                <span aria-hidden className={`font-mono text-[10px] ${on ? 'opacity-70' : 'opacity-40'}`}>
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
          {techFilter && (
            <span className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-4 py-1.5 text-[12px] font-medium text-white dark:border-white dark:bg-white dark:text-black">
              {fill(t('tech_filter'), { x: techFilter })}
              <button
                onClick={() => setTechFilter(null)}
                aria-label={t('clear_filter')}
                className="font-mono text-[12px] leading-none opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </span>
          )}
        </div>
        {techFilter && visible.length === 0 && (
          <p className="relative mt-4 text-sm text-black/55 dark:text-white/55">
            {fill(t('tech_filter'), { x: techFilter })} — 00.{' '}
            <button onClick={() => setTechFilter(null)} className="font-semibold underline underline-offset-4">
              {t('clear_filter')}
            </button>
          </p>
        )}

        <div className="mx-auto mt-10 md:mt-14 w-full max-w-6xl">
          {visible.map(({ p, i }) => {
            const flip = i % 2 === 1
            const [firstWord, ...restWords] = p.title.split(' ')
            return (
              <article
                key={`${filter}-${techFilter || 'all-tech'}-${p.title}`}
                data-reveal={flip ? 'right' : 'left'}
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
                  <h3 className="mt-4 text-2xl md:text-4xl font-extrabold leading-[1.05] tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    <span className="work-title-first">{firstWord}</span>{' '}
                    {restWords.join(' ')}
                    <span aria-hidden className="work-title-arrow">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-4 max-w-xl text-[13px] md:text-sm leading-relaxed text-black/55 dark:text-white/55">
                    <span className="line-clamp-2">{L(p.desc)}</span>{' '}
                    <button
                      onClick={() => setActive(i)}
                      className="font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black dark:text-white dark:decoration-white/30 dark:hover:decoration-white"
                    >
                      {t('read_case')} →
                    </button>
                  </p>

                  {/* Strip meta satu baris: tahun · platform · peran */}
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
                    {p.year}
                    <span aria-hidden className="mx-2 opacity-40">·</span>
                    {L(p.tags)[0]}
                    <span aria-hidden className="mx-2 opacity-40">·</span>
                    {p.role}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((tech) => (
                      <button
                        key={tech}
                        onClick={() => {
                          setTechFilter(tech)
                          safeTrack('filter_tech', { tech, source: 'card' })
                        }}
                        title={fill(t('tech_filter'), { x: tech })}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-4 py-1.5 text-[12px] font-medium text-black/75 transition-colors hover:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:border-white/30"
                      >
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                        {tech}
                      </button>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="inline-flex items-center rounded-full border border-dashed border-black/20 px-4 py-1.5 font-mono text-[12px] text-black/50 dark:border-white/20 dark:text-white/50">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => safeTrack('github_click', { project: p.short, source: 'card' })}
                      className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                      {t('btn_github')} <span aria-hidden>↗</span>
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => safeTrack('demo_click', { project: p.short, source: 'card' })}
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 transition-all hover:-translate-y-0.5 hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                      >
                        {t('btn_demo')} <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Klik thumbnail → buka modal detail; gambar di modal bisa di-zoom fullscreen */}
                <Tilt reveal="scale" className={`min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-zinc-100 shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.7)] ${flip ? 'md:order-1' : ''}`}>
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
                    <div className={`parallax-frame relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${p.frame === 'phone' ? (p.tint || 'from-zinc-100 to-zinc-200') : 'from-zinc-100 to-zinc-200'} dark:from-white/10 dark:to-white/5`}>
                      <span className="block h-full w-full transition-transform duration-500 group-hover/shot:scale-[1.03]">
                        <Thumbnail p={p} zoom={false} vivid={false} fill imgClass="parallax-img" fit={p.frame === 'phone' ? 'object-contain' : 'object-cover object-top'} />
                      </span>
                      <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                    </div>
                    <span aria-hidden className="work-shot-arrow">
                      ↗
                    </span>
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
  const ghost = (item.period.match(/\d{4}/g) || [])[0]?.slice(2)
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
            ? 'timeline-first bg-white dark:bg-black'
            : 'bg-[#131315] ring-1 ring-white/30 group-hover:bg-white/60 dark:bg-[#e9e6e0] dark:ring-black/30 dark:group-hover:bg-black/50'
        }`}
      />
      {ghost && (
        <span aria-hidden className="ghost-year">
          &apos;{ghost}
        </span>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{item.period}</p>
        {item.badge && (
          <span className="shrink-0 rounded-full border border-white/20 px-3.5 py-1 text-[11px] font-medium text-white/75 dark:border-black/20 dark:text-black/70">
            {L(item.badge)}
          </span>
        )}
      </div>
      <p className="mt-3 text-xl md:text-2xl font-extrabold leading-[1.1] tracking-tight">
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
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">
            {t('exp_sub')}
            <span aria-hidden className="opacity-50">
              {' '}
              — {EDUCATION.length} edu · {WORK_EXPERIENCE.length} exp
            </span>
          </p>
        </div>
        <p data-reveal className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 dark:text-black/60">
          {t('exp_desc')}
        </p>

        <div className="mx-auto mt-10 md:mt-14 grid w-full max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{t('exp_edu')}</p>
            <ul data-timeline className="relative mt-8">
              <span aria-hidden className="timeline-progress" />
              {EDUCATION.map((item, i) => (
                <TimelineItem key={item.id} item={item} first={i === 0} />
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">{t('exp_exp')}</p>
            <ul data-timeline className="relative mt-8">
              <span aria-hidden className="timeline-progress" />
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

// ── Contact: daftar index ala Skills/Work (tanpa form) ──

const CONTACT_CARDS = [
  { id: 'email', label: 'Email', value: 'utamapradita5@gmail.com', href: null, copy: 'utamapradita5@gmail.com' },
  { id: 'github', label: 'GitHub', value: 'github.com/galxtria', href: 'https://github.com/galxtria' },
  { id: 'instagram', label: 'Instagram', value: '@galxtria', href: 'https://www.instagram.com/galxtria/' },
  { id: 'linkedin', label: 'LinkedIn', value: 'Pradita Utama', href: 'https://www.linkedin.com/in/praditautama25' },
]

function ContactCard({ c, index, featured }) {
  const [copied, setCopied] = useState(false)
  const [fun, setFun] = useState(false)
  const { t } = useLang()

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
    burstConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)
    safeTrack('copy_email', { source: 'contact' })
    setFun(isFunCopy())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const body = (
    <>
      <span aria-hidden className="font-mono text-[11px] tracking-[0.2em] text-black/40 transition-colors duration-300 group-hover:text-black dark:text-white/40 dark:group-hover:text-white">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-zinc-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-black/30 group-hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-white/10 dark:group-hover:border-white/30 ${featured ? 'h-12 w-12' : 'h-10 w-10'}`}>
        <SocialIcon label={c.label} className={`${featured ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} text-black/70 dark:text-white/70`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-base md:text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
          {c.label}
          {featured && (
            <span className="rounded-full border border-black/15 px-2.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-black/50 dark:border-white/20 dark:text-white/60">
              {t('contact_preferred')}
            </span>
          )}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[12px] tracking-wide text-black/55 dark:text-white/55">
          {copied ? (fun ? t('copied_fun') : t('copied')) : c.value}
        </span>
      </span>
      <span aria-hidden className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-black/30 transition-colors duration-300 group-hover:text-black/60 sm:block dark:text-white/30 dark:group-hover:text-white/60">
        {c.href ? t('contact_open') : t('contact_copy')}
      </span>
      <span aria-hidden className="contact-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 dark:border-white/15 dark:text-white/50">
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

  const cls = `group flex w-full items-center gap-4 md:gap-6 border-b border-black/10 py-5 md:py-6 text-left transition-colors duration-300 hover:bg-black/[0.02] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black dark:border-white/10 dark:hover:bg-white/[0.03] dark:focus-visible:outline-white${featured ? ' contact-featured' : ''}`

  if (c.href) {
    return (
      <a href={c.href} target="_blank" rel="noreferrer" data-reveal className={cls}>
        {body}
      </a>
    )
  }
  return (
    <button onClick={copyEmail} title={t('copy_title')} data-reveal className={cls}>
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
  const ref = useReveal(0.08)
  const { t } = useLang()
  const [cvOpen, setCvOpen] = useState(false)

  const goWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const footNav = [
    { id: 'work', label: t('nav_work') },
    { id: 'skills', label: t('nav_skills') },
    { id: 'experience', label: t('nav_experience') },
  ]

  return (
    <section id="contact" ref={ref} className="relative w-full scroll-mt-16 overflow-hidden bg-white dark:bg-[#0b0b0d]">
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <span data-reveal="fade" aria-hidden className="watermark absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,10vw,7rem)] font-black tracking-tight text-black/[0.05] dark:text-white/[0.06]">
          CONTACT
        </span>
        <div data-reveal className="relative flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t('contact_title')}</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
            {t('contact_sub')}
          </p>
        </div>
        <p data-reveal className="relative mt-4 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55">
          {t('contact_desc')}
        </p>

        <div className="mx-auto mt-8 w-full max-w-6xl border-t border-black/10 dark:border-white/10">
          {CONTACT_CARDS.map((c, i) => (
            <ContactCard key={c.id} c={c} index={i} featured={c.id === 'email'} />
          ))}
        </div>

        <div data-reveal className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c1c20] via-[#131315] to-black text-white shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/10 dark:from-[#f4f1eb] dark:via-[#e9e6e0] dark:to-[#d8d4cc] dark:text-[#161614] dark:ring-black/10">
          <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
          <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-black/30" />
          <span aria-hidden className="pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-black/[0.07]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 left-[4%] h-72 w-72 rounded-full bg-white/[0.07] blur-3xl dark:bg-black/[0.05]" />
          <span aria-hidden className="pointer-events-none absolute bottom-2 right-8 hidden select-none text-[100px] font-black leading-none text-white/10 md:block dark:text-black/10">
            ↗
          </span>
          <div className="relative flex flex-col gap-8 p-8 sm:p-10 md:flex-row md:items-end md:justify-between md:p-14">
            <div className="min-w-0">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 dark:text-black/50">
                <span aria-hidden className="h-px w-8 bg-white/25 dark:bg-black/25" />
                {t('contact_eyebrow')}
              </p>
              <p className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
                {t('contact_cta_title')
                  .split(' ')
                  .map((w, i, arr) => (
                    <span key={i} data-reveal className="inline-block">
                      {w}
                      {i < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 dark:text-black/60">
                {t('contact_cta_desc')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <Magnetic>
                <button
                  onClick={goWork}
                  className="btn-shine inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(255,255,255,0.4)] dark:bg-black dark:text-white dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)]"
                >
                  {t('contact_cta_work')} <span aria-hidden>↗</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setCvOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white hover:text-white dark:border-black/20 dark:text-black/70 dark:hover:border-black dark:hover:text-black"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t('hero_cv')}
                </button>
              </Magnetic>
              {cvOpen && createPortal(<CvPreviewModal onClose={() => setCvOpen(false)} />, document.body)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 pb-2 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            © {new Date().getFullYear()} Galxtria
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            Denpasar, ID
          </p>
          <nav aria-label="Footer" className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 dark:text-white/30">
            {footNav.map((l) => (
              <button
                key={l.id}
                onClick={() => goSection(l.id)}
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={goTop}
              aria-label={t('back_top')}
              title={t('back_top')}
              className="transition-colors hover:text-black dark:hover:text-white"
            >
              <span aria-hidden>↑</span>
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}

// ── App ──

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [path, setPath] = useState(() => {
    try {
      return window.location.pathname
    } catch {
      return '/'
    }
  })
  useScrollFx()

  useEffect(() => {
    document.title = 'Galxtria'
  }, [])

  useEffect(() => {
    const onPop = () => {
      try {
        setPath(window.location.pathname)
      } catch { /* abaikan */ }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const isNotFound = path !== '/' && path !== '/index.html'

  return (
    <div className="cloud-sky relative min-h-screen text-[#111] dark:text-[#f4f2ed]">
      {!loaded && <Splash onFinish={() => setLoaded(true)} />}
      {isNotFound ? (
        <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <NotFound />
        </main>
      ) : (
        <>
          <Navbar loaded={loaded} />
          <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Hero visible={loaded} />
            <Work />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <SectionDots visible={loaded} />
          <BackToTop visible={loaded} />
        </>
      )}
    </div>
  )
}
