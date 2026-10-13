import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang, localize, fill } from '../LanguageContext.jsx'
import { PROJECTS } from '../data/portfolio.js'
import { matchesTechFilter, safeTrack } from '../utils/helpers.js'
import { useReveal } from '../hooks/hooks.js'
import { Thumbnail, Tilt } from './primitives.jsx'
import { ProjectModal, Lightbox } from './ProjectModal.jsx'

export function Work() {
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
