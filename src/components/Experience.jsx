import { useLang, localize } from '../LanguageContext.jsx'
import { EDUCATION, WORK_EXPERIENCE } from '../data/portfolio.js'
import { useReveal } from '../hooks/hooks.js'

export function TimelineItem({ item, first }) {
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

export function Experience() {
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
