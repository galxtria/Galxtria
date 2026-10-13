import { useLang } from '../LanguageContext.jsx'

export function NotFound() {
  const { t } = useLang()
  const goHome = () => {
    try {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch {
      window.location.pathname = '/'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-white px-6 text-center dark:bg-[#0b0b0d]">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
        {t('notfound_eyebrow')}
      </p>
      <h1 className="mt-4 max-w-xl text-4xl md:text-6xl font-black tracking-tight leading-[1.02]">
        {t('notfound_title')}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55 dark:text-white/55">
        {t('notfound_desc')}
      </p>
      <button
        onClick={goHome}
        className="btn-shine mt-8 inline-flex items-center gap-1.5 rounded-full bg-black px-7 py-3.5 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 dark:bg-white dark:text-black"
      >
        {t('notfound_home')} <span aria-hidden>↗</span>
      </button>
    </section>
  )
}

// ── Hooks ──
