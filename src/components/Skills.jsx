import { useLang, localize } from '../LanguageContext.jsx'
import { SKILLS } from '../data/portfolio.js'
import { safeTrack, techUsage } from '../utils/helpers.js'
import { useReveal } from '../hooks/hooks.js'

export function SkillPills({ items }) {
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

export function Skills() {
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
