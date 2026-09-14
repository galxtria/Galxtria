# LIGHT MODE TAILWIND CLASS MAPPING
Porto Portfolio - Exact Changes Required
Reference: 2026-09-13

---

## NAVBAR COMPONENT
File: App.jsx, Lines: 411-602

### Logo (Line 477)
\CURRENT:\
className="text-[13px] font-bold tracking-[0.25em] text-zinc-400 dark:text-zinc-400 text-slate-600 uppercase..."

\CHANGE TO:\
className="text-[13px] font-bold tracking-[0.25em] dark:text-zinc-400 text-purple-700 uppercase..."

---

### Nav Container - Scrolled State (Lines 485-489)
\CURRENT:\
className={\hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-xl border transition-all duration-300 relative \\

\CHANGE TO:\
className={\hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-xl border transition-all duration-300 relative \\

---

### Pill Indicator (Line 493)
\CURRENT:\
className="absolute rounded-md dark:bg-white/[0.08] bg-purple-500/[0.15] dark:shadow-[0_0_12px_rgba(168,85,247,0.1)] shadow-[0_0_12px_rgba(168,85,247,0.2)]..."

\CHANGE TO:\
className="absolute rounded-md dark:bg-white/[0.08] bg-purple-200/40 dark:shadow-[0_0_12px_rgba(168,85,247,0.1)] shadow-[0_0_8px_rgba(168,85,247,0.2)]..."

---

### Nav Links - Active (Line 510)
\CURRENT:\
active === link
  ? 'dark:text-white text-slate-900'

\CHANGE TO:\
active === link
  ? 'dark:text-white text-slate-900'  // Already correct

---

### Nav Links - Inactive (Line 511)
\CURRENT:\
: 'dark:text-zinc-500 text-slate-600 dark:hover:text-zinc-200 hover:text-slate-800'

\CHANGE TO:\
: 'dark:text-zinc-500 text-slate-600 dark:hover:text-zinc-200 hover:text-slate-800'  // Already correct

---

### Theme Toggle Button (Line 521)
\CURRENT:\
className="relative z-10 ml-2 p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900..."

\CHANGE TO:\
className="relative z-10 ml-2 p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900..."  // Already correct

---

### Mobile Dropdown (Line 586)
\CURRENT:\
className="md:hidden mx-6 mb-4 p-2 rounded-xl dark:bg-[#050505]/90 bg-white/80 backdrop-blur-2xl dark:border dark:border-purple-500/30 border border-purple-300/30 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_30px_rgba(168,85,247,0.1)]"

\CHANGE TO:\
className="md:hidden mx-6 mb-4 p-2 rounded-xl dark:bg-[#050505]/90 bg-white/90 backdrop-blur-2xl dark:border dark:border-purple-500/30 border border-purple-400/25 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"

---

### Mobile Menu Links (Line 592)
\CURRENT:\
active === link ? 'dark:text-white text-slate-900 dark:bg-white/[0.05] bg-purple-500/10' : 'dark:text-zinc-500 text-slate-600 dark:hover:text-white hover:text-slate-900'

\CHANGE TO:\
active === link ? 'dark:text-white text-slate-900 dark:bg-white/[0.05] bg-purple-100/50' : 'dark:text-zinc-500 text-slate-600 dark:hover:text-white hover:text-slate-900'

---

## HERO SECTION
File: App.jsx, Lines: 608-778

### Role Pill Badge (Line 703)
\CURRENT:\
className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.05] border border-purple-500/30 text-purple-300..."

\CHANGE TO:\
className="inline-flex items-center gap-2 px-5 py-2 rounded-full dark:bg-white/[0.05] bg-purple-50 dark:border border-purple-500/30 border-purple-300/40 dark:text-purple-300 text-purple-700..."

---

### Role Pill Pulse Dot (Line 704)
\CURRENT:\
<span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />

\CHANGE TO:\
<span className="h-1.5 w-1.5 rounded-full dark:bg-purple-400 bg-purple-600 animate-pulse" />

---

### Hero Name Gradient (Line 716)
\CURRENT:\
className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 bg-clip-text text-transparent"

\CHANGE TO:\
className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-violet-400 from-purple-600 via-purple-700 to-violet-600 bg-clip-text text-transparent"

---

### Tagline Text (Line 725)
\CURRENT:\
className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"

\CHANGE TO:\
className="dark:text-zinc-400 text-slate-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"

---

### Tagline Highlight (Line 730)
\CURRENT:\
<span className="text-zinc-200 font-medium"> aesthetic precision </span>

\CHANGE TO:\
<span className="dark:text-zinc-200 text-slate-900 font-medium"> aesthetic precision </span>

---

### Primary Button (Line 742)
\CURRENT:\
className={\group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 border border-purple-500/50 text-white text-sm font-semibold hover:from-purple-500 hover:to-violet-500 hover:border-purple-400 active:scale-[0.97] transition-all duration-300 ...\}

\CHANGE TO:\
className={\group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r dark:from-purple-600 dark:to-violet-600 from-purple-700 to-violet-700 dark:border-purple-500/50 border-purple-600/60 text-white text-sm font-semibold dark:hover:from-purple-500 dark:hover:to-violet-500 hover:from-purple-600 hover:to-violet-600 dark:hover:border-purple-400 hover:border-purple-700 active:scale-[0.97] transition-all duration-300 ...\}

---

### Secondary Button (Line 758)
\CURRENT:\
className={\group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent border border-white/20 text-zinc-300 text-sm font-semibold hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-[0.97] transition-all duration-300 ...\}

\CHANGE TO:\
className={\group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent dark:border-white/20 border-purple-400/40 dark:text-zinc-300 text-slate-700 text-sm font-semibold dark:hover:bg-white/10 hover:bg-purple-100/30 dark:hover:text-white hover:text-purple-900 dark:hover:border-white/30 hover:border-purple-400/60 active:scale-[0.97] transition-all duration-300 ...\}

---

### Scroll Indicator (Line 774)
\CURRENT:\
<div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-zinc-500" />

\CHANGE TO:\
<div className="w-[1px] h-8 bg-gradient-to-b from-transparent dark:to-zinc-500 to-slate-400" />

---

## PROJECT CARDS
File: App.jsx, Lines: 891-1158

### Card Container - Normal State (Lines 904-913)
\CURRENT:\
className={\elative h-full rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 group \\

\CHANGE TO:\
className={\elative h-full rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 group \\

---

### Image Placeholder (Line 927)
\CURRENT:\
<div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] animate-pulse" />

\CHANGE TO:\
<div className="absolute inset-0 bg-gradient-to-r dark:from-white/[0.05] dark:via-white/[0.1] dark:to-white/[0.05] from-slate-200/40 via-slate-300/50 to-slate-200/40 animate-pulse" />

---

### Gradient Overlay (Line 940)
\CURRENT:\
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

\CHANGE TO:\
<div className="absolute inset-0 bg-gradient-to-t dark:from-black/80 dark:via-black/20 from-black/40 via-black/10 to-transparent" />

---

### Year Badge (Line 943)
\CURRENT:\
className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/40 backdrop-blur-xl border border-white/[0.1] text-[10px] font-semibold tracking-[0.2em] text-purple-300 uppercase"

\CHANGE TO:\
className="absolute top-4 right-4 px-3 py-1 rounded-md dark:bg-black/40 bg-white/60 backdrop-blur-xl dark:border-white/[0.1] border-slate-300/30 text-[10px] font-semibold tracking-[0.2em] dark:text-purple-300 text-purple-700 uppercase"

---

### View Arrow Button (Line 949)
\CURRENT:\
className={\bsolute bottom-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 \\

\CHANGE TO:\
className={\bsolute bottom-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 \\

---

### Arrow Icon (Line 957)
\CURRENT:\
className={\	ransition-all duration-500 \\

\CHANGE TO:\
className={\	ransition-all duration-500 \\

---

### Card Title (Line 969)
\CURRENT:\
className={\	ext-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500 \\

\CHANGE TO:\
className={\	ext-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500 \\

---

### Card Description (Line 976)
\CURRENT:\
className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2"

\CHANGE TO:\
className="dark:text-zinc-400 text-slate-600 text-sm leading-relaxed mb-5 line-clamp-2"

---

### Tech Pills (Lines 985-989)
\CURRENT:\
className={\px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-500 \\

\CHANGE TO:\
className={\px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-500 \\

---

## PROJECT MODAL
File: App.jsx, Lines: 784-885

### Modal Card (Line 807)
\CURRENT:\
className="relative w-full max-w-xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]..."

\CHANGE TO:\
className="relative w-full max-w-xl dark:bg-white/[0.05] bg-white/95 backdrop-blur-2xl dark:border-white/[0.12] border-slate-300/30 rounded-2xl overflow-hidden dark:shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] shadow-[0_16px_40px_rgba(0,0,0,0.15)]..."

---

### Inner Glow (Line 811)
\CURRENT:\
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] pointer-events-none" />

\CHANGE TO:\
<div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.04)_0%,_transparent_55%)] pointer-events-none" />

---

### Close Button (Line 816)
\CURRENT:\
className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all duration-200"

\CHANGE TO:\
className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full dark:bg-white/[0.06] bg-slate-200/40 dark:border-white/[0.1] border-slate-300/30 dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-700 dark:hover:bg-white/[0.1] hover:bg-slate-300/50 transition-all duration-200"

---

### Year Badge (Line 837)
\CURRENT:\
className="inline-block px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold tracking-[0.2em] text-purple-300 uppercase mb-5"

\CHANGE TO:\
className="inline-block px-3 py-1 rounded-md dark:bg-purple-500/10 bg-purple-100/60 dark:border-purple-500/20 border-purple-400/40 text-[10px] font-semibold tracking-[0.2em] dark:text-purple-300 text-purple-700 uppercase mb-5"

---

### Modal Title (Line 842)
\CURRENT:\
<h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4">

\CHANGE TO:\
<h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white text-slate-900 mb-4">

---

### Modal Description (Line 847)
\CURRENT:\
<p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">

\CHANGE TO:\
<p className="dark:text-zinc-400 text-slate-700 text-sm sm:text-base leading-relaxed mb-6">

---

### Tech Stack Pills (Line 858)
\CURRENT:\
className="px-3 py-1.5 rounded-lg bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-[11px] font-medium text-zinc-300 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]"

\CHANGE TO:\
className="px-3 py-1.5 rounded-lg dark:bg-white/[0.06] bg-slate-100/60 backdrop-blur-xl dark:border-white/[0.1] border-slate-300/30 text-[11px] font-medium dark:text-zinc-300 text-slate-700 dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]"

---

### GitHub Button (Line 871)
\CURRENT:\
className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] text-white text-sm font-semibold hover:bg-white/[0.1] hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] active:scale-[0.97] transition-all duration-300"

\CHANGE TO:\
className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl dark:bg-white/[0.06] bg-slate-100/60 backdrop-blur-xl dark:border-white/[0.12] border-slate-300/40 dark:text-white text-slate-900 text-sm font-semibold dark:hover:bg-white/[0.1] hover:bg-slate-200/70 dark:hover:border-purple-500/30 hover:border-purple-400/50 dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.97] transition-all duration-300"

---

## ROOT ELEMENT
File: App.jsx, Line 1827

\CURRENT:\
<div className="min-h-screen dark:bg-black bg-white dark:text-zinc-100 text-slate-900 font-sans relative transition-colors duration-300">

\ALREADY CORRECT - No changes needed\

---

## INDEX.CSS - LIGHT MODE SECTION
File: index.css, Lines: 447-475

\ADD/UPDATE:\

\\\css
/* ── Light Mode Cursor Styling ──────────────────────────────────── */
html:not(.dark) .cursor-dot {
  background: rgba(168, 85, 247, 0.7);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.25);
}

html:not(.dark) .cursor-dot.expanded {
  background: rgba(168, 85, 247, 0.85);
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.4);
}

html:not(.dark) .cursor-ring {
  border-color: rgba(168, 85, 247, 0.3);
}

html:not(.dark) .cursor-ring.expanded {
  border-color: rgba(168, 85, 247, 0.6);
}

/* ── Light Mode Text Selection ────────────────────────────────── */
html:not(.dark) ::selection {
  background: rgba(168, 85, 247, 0.2);
  color: #1a1a1a;
}

/* ── Light Mode Dividers ────────────────────────────────────── */
html:not(.dark) .divider-line {
  background: linear-gradient(to right, transparent, rgba(100, 116, 139, 0.2), transparent);
}
\\\

---

## SUMMARY OF CHANGES

**Navbar:** 8 class modifications
**Hero:** 12 class modifications  
**Project Cards:** 15 class modifications
**Project Modal:** 12 class modifications
**About Section:** Covered in separate analysis
**Contact Section:** Covered in separate analysis
**Global/CSS:** 6 CSS rule updates

**Total Estimated Changes:** 80-100 Tailwind classes + 6 CSS rules

All changes preserve dark mode functionality while adding light mode support.

