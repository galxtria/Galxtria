import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

// Kamus UI. EN formal standar portofolio, ID santai secukupnya (tidak kaku).
const STRINGS = {
  en: {
    nav_work: 'Work',
    nav_skills: 'Skills',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_talk: "Let's Talk",
    nav_menu: 'Menu',
    lang_label: 'Language',
    hero_role: 'Frontend Developer',
    hero_tagline: 'Designing digital products that are clear, usable, and conversion focused.',
    hero_cv: 'Download CV',
    copy_title: 'Click to copy email',
    copied: 'Copied!',
    photo_na: 'Photo not available',
    work_title: '/SELECTED WORK',
    work_meta: 'projects · 2025 / 26',
    work_sub: 'Showcase of selected work with previews, stacks, and sources.',
    lbl_year: 'Year',
    lbl_platform: 'Platform',
    lbl_role: 'Role',
    role_prefix: 'Role',
    btn_github: 'View on GitHub',
    btn_demo: 'Live Demo',
    view_details: 'View details of {x}',
    view_details_short: 'View details',
    work_foot: 'Selected 2025 / 26 · preview & source',
    modal_enlarge: 'Enlarge',
    modal_enlarge_title: 'Click to enlarge image',
    modal_close_details: 'Close details',
    modal_close: 'Close',
    modal_prev: 'Prev',
    modal_next: 'Next',
    modal_prev_aria: 'Previous project',
    modal_next_aria: 'Next project',
    lightbox_of: 'Enlarged view of {x}',
    lightbox_hint: 'click anywhere or press ESC to close',
    skills_title: '/SKILLS',
    skills_sub: 'Stacks & tools I use',
    skills_desc: 'Tech taken from real projects, matching the source on GitHub.',
    skills_count: '{n} groups · {m} stacks',
    stacks_unit: 'stacks',
    exp_title: '/BACKGROUND',
    exp_sub: 'Education & Experience',
    exp_desc: 'Schooling & roles, presented as a two column index.',
    exp_edu: 'Education',
    exp_exp: 'Experience',
    contact_eyebrow: 'Get in touch',
    contact_hl_1: "Let's",
    contact_hl_2: 'Build',
    contact_hl_3: 'Something',
    contact_hl_4: 'Amazing',
    contact_desc: "Got a project in mind? Let's collaborate and create something extraordinary together.",
    back_top: 'Back to top',
  },
  id: {
    nav_work: 'Proyek',
    nav_skills: 'Keahlian',
    nav_experience: 'Pengalaman',
    nav_contact: 'Kontak',
    nav_talk: 'Hubungi Saya',
    nav_menu: 'Menu',
    lang_label: 'Bahasa',
    hero_role: 'Frontend Developer',
    hero_tagline: 'Merancang produk digital yang jelas, mudah digunakan, dan berorientasi pada konversi.',
    hero_cv: 'Unduh CV',
    copy_title: 'Klik untuk menyalin email',
    copied: 'Tersalin!',
    photo_na: 'Foto tidak tersedia',
    work_title: '/PROYEK PILIHAN',
    work_meta: 'proyek · 2025 / 26',
    work_sub: 'Kumpulan karya pilihan, lengkap dengan pratinjau, teknologi, dan sumbernya.',
    lbl_year: 'Tahun',
    lbl_platform: 'Platform',
    lbl_role: 'Peran',
    role_prefix: 'Peran',
    btn_github: 'Lihat di GitHub',
    btn_demo: 'Lihat Demo',
    view_details: 'Lihat detail {x}',
    view_details_short: 'Lihat detail',
    work_foot: 'Pilihan 2025 / 26 · pratinjau & sumber',
    modal_enlarge: 'Perbesar',
    modal_enlarge_title: 'Klik untuk memperbesar gambar',
    modal_close_details: 'Tutup detail',
    modal_close: 'Tutup',
    modal_prev: 'Sebelumnya',
    modal_next: 'Berikutnya',
    modal_prev_aria: 'Proyek sebelumnya',
    modal_next_aria: 'Proyek berikutnya',
    lightbox_of: 'Tampilan besar {x}',
    lightbox_hint: 'klik di mana saja atau tekan ESC untuk menutup',
    skills_title: '/SKILLS',
    skills_sub: 'Teknologi & perkakas yang saya gunakan',
    skills_desc: 'Teknologi yang digunakan pada proyek nyata, sesuai dengan kode sumber di GitHub.',
    skills_count: '{n} grup · {m} stack',
    stacks_unit: 'stack',
    exp_title: '/RIWAYAT',
    exp_sub: 'Pendidikan & Pengalaman',
    exp_desc: 'Riwayat pendidikan dan pekerjaan, disusun dalam dua kolom.',
    exp_edu: 'Pendidikan',
    exp_exp: 'Pengalaman',
    contact_eyebrow: 'Mari terhubung',
    contact_hl_1: 'Mari',
    contact_hl_2: 'Buat',
    contact_hl_3: 'Sesuatu',
    contact_hl_4: 'yang Hebat',
    contact_desc: 'Punya ide proyek? Mari berkolaborasi dan wujudkan sesuatu yang luar biasa bersama.',
    back_top: 'Kembali ke atas',
  },
}

// Ambil string ber-template {x}/{n}/{m} dan field data {en, id}.
export function fill(template, vars = {}) {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replace(`{${k}}`, v),
    template ?? ''
  )
}

export function localize(lang, value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en
  }
  return value
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') === 'id' ? 'id' : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* abaikan */
    }
    document.documentElement.lang = lang
  }, [lang])

  const t = (key, vars) => fill(STRINGS[lang][key] ?? STRINGS.en[key] ?? key, vars)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
