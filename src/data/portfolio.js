// Data portfolio — dipindah dari App.jsx (refactor tahap 1).
// Satu sumber kebenaran untuk projects, education, experience, socials, skills.
// Menambah 1 project/post baru = 1 commit hijau, tanpa menyentuh UI.

export const PROJECTS = [
  {
    title: 'MoneyTrackerV2 - Smart Budget Planner',
    short: 'MoneyTrackerV2',
    desc: {
      en: 'Smart budget planner with daily safe-spend limits and automatic insights.',
      id: 'Perencana anggaran cerdas dengan batas belanja harian dan wawasan otomatis.',
    },
    fullDesc: {
      en: 'MoneyTrackerV2 is a budget planner that works fully offline, built with React, TypeScript, and Tailwind. Monthly budget tracking with a daily safe-spend allowance, expense logging stored locally via Dexie.js (IndexedDB), charts with Recharts, and installable PWA support.',
      id: 'MoneyTrackerV2 adalah perencana anggaran yang bekerja sepenuhnya offline, dibangun dengan React, TypeScript, dan Tailwind. Dilengkapi pelacakan anggaran bulanan beserta batas belanja harian, pencatatan pengeluaran yang tersimpan lokal melalui Dexie.js (IndexedDB), grafik dengan Recharts, serta dukungan PWA yang dapat diinstal.',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Dexie.js', 'Recharts'],
    highlights: {
      en: [
        'Offline-first budgeting with Dexie.js (IndexedDB) persistence',
        'Daily safe-spend allowance derived from monthly budget',
        'Recharts insights plus installable PWA support',
      ],
      id: [
        'Anggaran offline-first dengan penyimpanan Dexie.js (IndexedDB)',
        'Batas belanja harian otomatis dari anggaran bulanan',
        'Wawasan Recharts plus dukungan PWA yang bisa diinstal',
      ],
    },
    challenge: {
      en: 'Modeling safe-spend edge cases (early-month overspend, empty days) with no backend to reconcile.',
      id: 'Memodelkan kasus tepi batas belanja (boros di awal bulan, hari kosong) tanpa backend pembanding.',
    },
    learning: {
      en: 'Local-first state design, IndexedDB schema versioning, and PWA caching.',
      id: 'Desain state local-first, versioning skema IndexedDB, dan caching PWA.',
    },
    runLocal: 'git clone https://github.com/galxtria/MoneyTrackerV2.git; npm i; npm run dev',
    stackLinks: {
      'Dexie.js': 'https://dexie.org',
      Recharts: 'https://recharts.org',
    },
    tags: { en: ['Mobile App', 'Personal'], id: ['Aplikasi Mobile', 'Personal'] },
    category: { en: 'Real Project', id: 'Proyek Nyata' },
    role: 'Frontend Developer',
    github: 'https://github.com/galxtria/MoneyTrackerV2.git',
    demo: 'https://moneytrackerv2-woad.vercel.app',
    year: '2026',
    shot: '/shots/moneytrackerv2_new.png',
    frame: 'phone',
    tint: 'from-[#dbe7ff] to-[#aec6f5]',
  },
  {
    title: 'KostHub Web - Property Platform',
    short: 'KostHub Web',
    desc: {
      en: 'Full-stack boarding house web app with admin and user dashboards for property and order management.',
      id: 'Aplikasi web kos full-stack dengan dasbor admin dan pengguna untuk mengelola properti serta pesanan.',
    },
    fullDesc: {
      en: 'KostHub Web is a full-stack monorepo web app: Laravel 12 REST API with Sanctum auth and SQLite storage, plus a React and Vite frontend with React Router, Zustand, Tailwind, Leaflet maps, and QR code support. Includes an admin dashboard for properties and orders, and a user portal for property discovery and bookings.',
      id: 'KostHub Web adalah aplikasi web full-stack monorepo: REST API Laravel 12 dengan autentikasi Sanctum dan penyimpanan SQLite, serta frontend React dan Vite dengan React Router, Zustand, Tailwind, peta Leaflet, dan dukungan kode QR. Dilengkapi dasbor admin untuk properti dan pesanan, serta portal pengguna untuk pencarian properti dan pemesanan.',
    },
    tech: ['Laravel', 'React', 'Tailwind', 'SQLite', 'Zustand', 'Leaflet'],
    highlights: {
      en: [
        'Laravel 12 REST API with Sanctum auth and SQLite storage',
        'React + Router + Zustand client with Leaflet maps and QR support',
        'Admin dashboard for properties/orders and user booking portal',
      ],
      id: [
        'REST API Laravel 12 dengan auth Sanctum dan penyimpanan SQLite',
        'Klien React + Router + Zustand dengan peta Leaflet dan QR',
        'Dasbor admin properti/pesanan dan portal pemesanan pengguna',
      ],
    },
    challenge: {
      en: 'Keeping Laravel API contracts in sync with the React client across auth, bookings, and QR flows.',
      id: 'Menjaga kontrak API Laravel tetap sinkron dengan klien React untuk auth, pemesanan, dan alur QR.',
    },
    learning: {
      en: 'Full-stack monorepo auth, SQLite seeding, and map-based UX.',
      id: 'Auth full-stack monorepo, seeding SQLite, dan UX berbasis peta.',
    },
    runLocal: 'git clone https://github.com/galxtria/KostHub_Web.git; composer install; npm i; npm run dev',
    stackLinks: {
      Laravel: 'https://laravel.com',
      Leaflet: 'https://leafletjs.com',
      Zustand: 'https://zustand.docs.pmnd.rs',
    },
    tags: { en: ['Web App', 'KostHub'], id: ['Web App', 'KostHub'] },
    category: { en: 'Exploration', id: 'Eksplorasi' },
    role: 'Full-Stack Developer',
    github: 'https://github.com/galxtria/KostHub_Web.git',
    year: '2026',
    shot: '/shots/kosthub-web.jpg',
    frame: 'browser',
  },
  // NOTE: Kartu "KostHub App" disembunyikan sementara — link
  // https://github.com/galxtria/KostHub mengembalikan 404 dan stack-nya
  // (Java/Android/Firebase) tidak terverifikasi. Tampilkan lagi setelah
  // repo dipublikasikan / link diperbaiki.
  {
    title: 'My Music - Automated Music Player',
    short: 'My Music',
    desc: {
      en: 'Automated music player with intelligent playlist organization and seamless audio playback.',
      id: 'Pemutar musik otomatis dengan pengelolaan playlist cerdas dan pemutaran yang mulus.',
    },
    fullDesc: {
      en: 'My Music is a Laravel 12 and React music library app with Bootstrap and Tailwind styling, React Router navigation, and SQLite storage. The backend handles library indexing, metadata parsing, and preference storage with a Vite build setup.',
      id: 'My Music adalah aplikasi pustaka musik Laravel 12 dan React dengan gaya Bootstrap dan Tailwind, navigasi React Router, serta penyimpanan SQLite. Backend-nya menangani pengindeksan pustaka, penguraian metadata, dan penyimpanan preferensi, dibangun dengan konfigurasi Vite.',
    },
    tech: ['Laravel', 'React', 'Bootstrap', 'Tailwind', 'SQLite'],
    highlights: {
      en: [
        'Laravel 12 library indexing with metadata parsing',
        'React Router library UI with Bootstrap + Tailwind styling',
        'SQLite-backed preferences with Vite build setup',
      ],
      id: [
        'Pengindeksan pustaka Laravel 12 dengan penguraian metadata',
        'UI pustaka React Router dengan gaya Bootstrap + Tailwind',
        'Preferensi berbasis SQLite dengan setup build Vite',
      ],
    },
    challenge: {
      en: 'Indexing a large local library fast while normalizing inconsistent audio metadata.',
      id: 'Mengindeks pustaka lokal besar dengan cepat sambil menormalkan metadata audio yang tidak konsisten.',
    },
    learning: {
      en: 'Background indexing, preference persistence, and build tuning.',
      id: 'Pengindeksan latar, penyimpanan preferensi, dan tuning build.',
    },
    runLocal: 'git clone https://github.com/galxtria/MyMusic.git; composer install; npm i; npm run dev',
    stackLinks: {
      Laravel: 'https://laravel.com',
    },
    tags: { en: ['Web App', 'Kumpin Studio'], id: ['Web App', 'Kumpin Studio'] },
    category: { en: 'Real Project', id: 'Proyek Nyata' },
    role: 'Full-Stack Developer',
    github: 'https://github.com/galxtria/MyMusic.git',
    year: '2025',
    shot: '/shots/mymusic.jpg',
    frame: 'browser',
  },
]

export const EDUCATION = [
  {
    id: 'instiki',
    period: '2024 — Present',
    badge: { en: 'Undergraduate', id: 'Mahasiswa' },
    place: 'Institut Bisnis dan Teknologi Indonesia',
    role: { en: 'S1 · Informatics', id: 'S1 · Informatika' },
    desc: {
      en: 'Focused on frontend development, multi-platform apps, and AI integration.',
      id: 'Berfokus pada pengembangan frontend, aplikasi lintas platform, dan integrasi AI.',
    },
  },
  {
    id: 'smkn1',
    period: '2021 — 2024',
    badge: null,
    place: 'SMK Negeri 1 Denpasar',
    role: 'Rekayasa Perangkat Lunak (RPL)',
    desc: {
      en: 'Vocational foundation in software engineering, covering programming fundamentals and web basics.',
      id: 'Dasar rekayasa perangkat lunak dari SMK, meliputi fundamental pemrograman dan web.',
    },
  },
]

export const WORK_EXPERIENCE = [
  {
    id: 'arcom',
    period: 'Okt 2026 — Present',
    badge: { en: 'Internship', id: 'Magang' },
    place: 'PT Teknologi Arcom Mediaksa',
    role: 'Frontend Developer',
    desc: {
      en: 'Building and maintaining responsive frontend interfaces, collaborating with the team to ship clean and usable web experiences.',
      id: 'Membangun dan memelihara antarmuka frontend yang responsif, berkolaborasi dengan tim untuk menghadirkan pengalaman web yang bersih dan mudah digunakan.',
    },
  },
  {
    id: 'benlaris',
    period: 'Des 2022 – Feb 2023 • Jun 2023 – Sep 2023',
    badge: { en: 'Internship', id: 'Magang' },
    place: 'PT Benlaris Sahabat Dewata',
    role: { en: 'Web & Graphic Design Intern', id: 'Magang Web & Desain Grafis' },
    desc: {
      en: "Supported the company's web presence and visual design, covering responsive web pages and graphic design assets.",
      id: 'Mendukung website dan desain visual perusahaan, mulai dari halaman web responsif hingga aset grafis.',
    },
  },
]

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/galxtria' },
  { label: 'Instagram', href: 'https://www.instagram.com/galxtria/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/praditautama25' },
  { label: 'Email', href: 'mailto:utamapradita5@gmail.com' },
]

// ── Skills: ringkasan stack yang dipakai di repo GitHub ──
// core = senjata utama (dot solid + border tegas + hitungan bukti proyek)
// Tanpa core = familiar (dot hollow). icon = slug skillicons.dev (null = dot saja).
export const SKILLS = [
  {
    group: { en: 'Frontend', id: 'Frontend' },
    items: [
      { name: 'React', icon: 'react', core: true },
      { name: 'TypeScript', icon: 'ts', core: true },
      { name: 'JavaScript', icon: 'js', core: false },
      { name: 'Tailwind CSS', icon: 'tailwind', core: true },
      { name: 'Bootstrap', icon: 'bootstrap', core: false },
      { name: 'Sass', icon: 'sass', core: false },
    ],
  },
  {
    group: { en: 'Backend & Data', id: 'Backend & Data' },
    items: [
      { name: 'Laravel', icon: 'laravel', core: true },
      { name: 'PHP', icon: 'php', core: true },
      { name: 'REST API', icon: null, core: false },
      { name: 'Sanctum Auth', icon: null, core: false },
      { name: 'SQLite', icon: 'sqlite', core: true },
      { name: 'IndexedDB', icon: null, core: false },
    ],
  },
  {
    group: { en: 'Tools & Platform', id: 'Tools & Platform' },
    subs: [
      {
        label: { en: 'Platform', id: 'Platform' },
        items: [
          { name: 'Vite', icon: 'vite', core: true },
          { name: 'Git & GitHub', icon: 'git', core: true },
          { name: 'Vercel', icon: 'vercel', core: true },
          { name: 'Figma', icon: 'figma', core: false },
          { name: 'VS Code', icon: 'vscode', core: false },
        ],
      },
      {
        label: { en: 'Libraries & Workflow', id: 'Pustaka & Alur Kerja' },
        items: [
          { name: 'PWA', icon: null, core: false },
          { name: 'Recharts', icon: null, core: true },
          { name: 'Leaflet', icon: null, core: false },
          { name: 'Zustand', icon: null, core: false },
          { name: 'npm', icon: 'npm', core: false },
          { name: 'Chrome DevTools', icon: null, core: false },
        ],
      },
    ],
  },
]
