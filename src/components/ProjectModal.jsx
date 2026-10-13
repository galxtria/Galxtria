import { useEffect, useRef, useState } from 'react'
import { useLang, localize, fill } from '../LanguageContext.jsx'
import { readingMinutes, safeTrack } from '../utils/helpers.js'
import { Thumbnail } from './primitives.jsx'

export function ProjectModal({ p, index, total, onClose, onZoom, onPrev, onNext, paused }) {
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

export function Lightbox({ p, onClose }) {
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
