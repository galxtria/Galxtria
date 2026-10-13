import { useEffect } from 'react'
import { useLang } from '../LanguageContext.jsx'
import { safeTrack } from '../utils/helpers.js'

// ── Modal pratinjau CV: lihat dulu, baru unduh ──

export function CvPreviewModal({ onClose }) {
  const { t } = useLang()
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    safeTrack('cv_preview')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="backdrop-in fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('cv_preview_title')}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-in relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141416]"
      >
        <div className="flex items-start justify-between gap-4 p-6 md:p-8 pb-0">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t('cv_preview_title')}</h3>
            <p className="mt-1 text-sm text-black/55 dark:text-white/55">{t('cv_preview_desc')}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={t('modal_close_details')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black/70 shadow-lg hover:border-black hover:text-black transition-colors dark:border-white/15 dark:bg-black/60 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="p-6 md:p-8 pt-4">
          <div className="hidden sm:block overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <iframe
              src="/cv.pdf"
              title={t('cv_preview_title')}
              className="h-[60vh] w-full bg-zinc-50 dark:bg-white/5"
              loading="lazy"
            />
          </div>
          <p className="sm:hidden rounded-2xl border border-dashed border-black/20 px-4 py-3 text-[13px] text-black/60 dark:border-white/20 dark:text-white/60">
            {t('cv_preview_no_preview')}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/cv.pdf"
              download="Galxtria-CV.pdf"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t('cv_preview_download')}
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 hover:border-black hover:text-black transition-colors dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
            >
              {t('cv_preview_open_new')} <span aria-hidden>↗</span>
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[12px] font-semibold text-black/70 hover:border-black hover:text-black transition-colors dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
            >
              {t('modal_close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Halaman 404 gaya portofolio (untuk route SPA tak dikenal) ──
