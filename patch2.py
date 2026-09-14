import pathlib
p = pathlib.Path('C:/Coding/Porto/src/App.jsx')
t = p.read_text(encoding='utf-8')

# Hero glow
t = t.replace(
    'className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_65%)] pointer-events-none"',
    'className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[400px] dark:bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_65%)] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.06)_0%,_transparent_65%)] pointer-events-none"'
)
# Role pill
t = t.replace(
    'className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.05] border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase ${isMobile ? \'\' : \'backdrop-blur-2xl shadow-[0_0_20px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)]\'}`}',
    'className={`inline-flex items-center gap-2 px-5 py-2 rounded-full dark:bg-white/[0.05] bg-purple-50 dark:border border-purple-500/30 border-purple-300/40 dark:text-purple-300 text-purple-700 text-xs font-semibold tracking-[0.2em] uppercase ${isMobile ? \'\' : \'backdrop-blur-2xl dark:shadow-[0_0_20px_rgba(168,85,247,0.15),0_8px_32px_rgba(0,0,0,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.1),0_4px_16px_rgba(0,0,0,0.08)]\'}`}'
)
t = t.replace(
    '<span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />',
    '<span className="h-1.5 w-1.5 rounded-full dark:bg-purple-400 bg-purple-500 animate-pulse" />'
)
# Download CV
t = t.replace(
    'className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent border border-white/20 text-zinc-300 text-sm font-semibold hover:bg-white/10 hover:text-white hover:border-white/30',
    'className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-transparent dark:border-white/20 border-slate-300 dark:text-zinc-300 text-slate-700 text-sm font-semibold dark:hover:bg-white/10 hover:bg-slate-100 dark:hover:text-white hover:text-slate-900 dark:hover:border-white/30 hover:border-slate-400'
)
t = t.replace(
    "hover:shadow-[0_0_20px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)]",
    "dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
)
# ProjectModal - backdrop
t = t.replace(
    'className="absolute inset-0 bg-black/70 backdrop-blur-md modal-backdrop-enter"',
    'className="absolute inset-0 dark:bg-black/70 bg-black/40 backdrop-blur-md modal-backdrop-enter"'
)
t = t.replace(
    'className="relative w-full max-w-xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] modal-card-enter"',
    'className="relative w-full max-w-xl dark:bg-white/[0.05] bg-white backdrop-blur-2xl border dark:border-white/[0.12] border-slate-200 rounded-2xl overflow-hidden dark:shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] modal-card-enter"'
)
t = t.replace(
    'className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] pointer-events-none"',
    'className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_55%)] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.04)_0%,_transparent_55%)] pointer-events-none"'
)
t = t.replace(
    'className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.1]',
    'className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full dark:bg-white/[0.06] bg-slate-100 dark:border-white/[0.1] border-slate-200 dark:text-zinc-400 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/[0.1] hover:bg-slate-200'
)
t = t.replace(
    'className="inline-block px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold tracking-[0.2em] text-purple-300 uppercase mb-5"',
    'className="inline-block px-3 py-1 rounded-md dark:bg-purple-500/10 bg-purple-100 dark:border-purple-500/20 border-purple-300/40 text-[10px] font-semibold tracking-[0.2em] dark:text-purple-300 text-purple-700 uppercase mb-5"'
)
t = t.replace(
    'className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4"',
    'className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white text-slate-900 mb-4"'
)
t = t.replace(
    'className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6"',
    'className="dark:text-zinc-400 text-slate-600 text-sm sm:text-base leading-relaxed mb-6"'
)
t = t.replace(
    'className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-3">Tech Stack',
    'className="text-[10px] font-semibold tracking-[0.2em] dark:text-zinc-500 text-slate-500 uppercase mb-3">Tech Stack'
)
t = t.replace(
    'className="px-3 py-1.5 rounded-lg bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-[11px] font-medium text-zinc-300',
    'className="px-3 py-1.5 rounded-lg dark:bg-white/[0.06] bg-slate-100 backdrop-blur-xl dark:border-white/[0.1] border-slate-200 text-[11px] font-medium dark:text-zinc-300 text-slate-700'
)
t = t.replace(
    'className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] text-white text-sm font-semibold hover:bg-white/[0.1] hover:border-purple-500/30',
    'className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl dark:bg-white/[0.06] bg-slate-900 backdrop-blur-xl border dark:border-white/[0.12] border-slate-800 text-white text-sm font-semibold dark:hover:bg-white/[0.1] hover:bg-slate-800 dark:hover:border-purple-500/30 hover:border-slate-700'
)
# ProjectCard
t = t.replace(
    'function ProjectCard({ project, onSelect, index, total }) {\n  const [isHovered, setIsHovered] = useState(false)',
    'function ProjectCard({ project, onSelect, index, total }) {\n  const { isDark } = useTheme()\n  const [isHovered, setIsHovered] = useState(false)'
)
t = t.replace(
    "            ? 'border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15),0_20px_60px_rgba(0,0,0,0.4)] scale-[1.02]'\n            : 'border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'",
    "            ? 'border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15),0_20px_60px_rgba(0,0,0,0.4)] scale-[1.02]'\n            : isDark ? 'border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : 'border-purple-200/40 shadow-[0_2px_8px_rgba(24,16,60,0.04),0_16px_40px_rgba(124,58,237,0.08)]'"
)
t = t.replace(
    "          background: isHovered\n            ? 'linear-gradient(165deg, rgba(168,85,247,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.2) 100%)'\n            : 'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',",
    "          background: isDark\n            ? isHovered ? 'linear-gradient(165deg, rgba(168,85,247,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.2) 100%)' : 'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'\n            : isHovered ? 'linear-gradient(165deg, rgba(255,255,255,1) 0%, rgba(249,247,255,1) 55%, rgba(243,240,255,1) 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(250,248,255,0.92) 100%)',"
)
t = t.replace(
    "          <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500 ${\n            isHovered ? 'text-white' : 'text-zinc-200'",
    "          <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-500 ${\n            isHovered ? 'dark:text-white text-slate-900' : 'dark:text-zinc-200 text-slate-800'"
)
t = t.replace(
    '          <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">',
    '          <p className="dark:text-zinc-400 text-slate-600 text-sm leading-relaxed mb-5 line-clamp-2">'
)
t = t.replace(
    "                  isHovered\n                    ? 'bg-purple-500/15 border border-purple-500/25 text-purple-200'\n                    : 'bg-white/[0.05] border border-white/[0.08] text-zinc-400'",
    "                  isHovered\n                    ? 'bg-purple-500/15 border border-purple-500/25 dark:text-purple-200 text-purple-700'\n                    : 'dark:bg-white/[0.05] bg-slate-100 dark:border-white/[0.08] border-slate-200 dark:text-zinc-400 text-slate-600'"
)

# Projects heading
t = t.replace(
    '<p data-reveal className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-3">Selected Work',
    '<p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-3">Selected Work'
)
t = t.replace(
    '<h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">\n                    Projects',
    '<h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter dark:text-white text-slate-900">\n                    Projects'
)
t = t.replace(
    '<p data-reveal className="text-sm text-zinc-500 mt-2">',
    '<p data-reveal className="text-sm dark:text-zinc-500 text-slate-500 mt-2">'
)
t = t.replace(
    "                      ? 'border-white/[0.12] text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'\n                      : 'border-white/[0.05] text-zinc-700 cursor-not-allowed'",
    "                      ? 'dark:border-white/[0.12] border-slate-300 dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:border-purple-500/40 hover:border-purple-300 dark:hover:bg-purple-500/10 hover:bg-purple-50 dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'\n                      : 'dark:border-white/[0.05] border-slate-200 dark:text-zinc-700 text-slate-300 cursor-not-allowed'"
)

# About
t = t.replace(
    '          <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-3">About',
    '          <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-3">About'
)
t = t.replace(
    '            <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">\n            Philosophy',
    '            <h2 data-reveal className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter dark:text-white text-slate-900">\n            Philosophy'
)
# ABOUT_LINES mapping fix: line.highlight -> line.high handled earlier? but keep dark variants
t = t.replace(
    "className={`inline-block ${line.highlight ? 'text-zinc-200' : 'text-zinc-500'}`}",
    "className={`inline-block ${line.high ? 'dark:text-zinc-200 text-slate-900 font-semibold' : 'dark:text-zinc-500 text-slate-500'}`}"
)
t = t.replace(
    '                <p data-reveal className="text-sm text-zinc-400 leading-relaxed" style={{ transitionDelay: \'200ms\' }}>',
    '                <p data-reveal className="text-sm dark:text-zinc-400 text-slate-600 leading-relaxed" style={{ transitionDelay: \'200ms\' }}>'
)
t = t.replace(
    '                <p data-reveal className="text-sm text-zinc-400 leading-relaxed" style={{ transitionDelay: \'300ms\' }}>',
    '                <p data-reveal className="text-sm dark:text-zinc-400 text-slate-600 leading-relaxed" style={{ transitionDelay: \'300ms\' }}>'
)
t = t.replace(
    '            <div className="mt-16 pt-16 border-t border-white/[0.05]">',
    '            <div className="mt-16 pt-16 border-t dark:border-white/[0.05] border-slate-200">'
)
t = t.replace(
    '              <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-8">Timeline',
    '              <p data-reveal className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-8">Timeline'
)
t = t.replace(
    '                    <h4 className="text-sm font-semibold text-white mb-1">',
    '                    <h4 className="text-sm font-semibold dark:text-white text-slate-900 mb-1">'
)
t = t.replace(
    '                    <p className="text-xs text-zinc-500">',
    '                    <p className="text-xs dark:text-zinc-500 text-slate-500">'
)
# HexagonGrid
t = t.replace(
    '          <p data-reveal className="text-center text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-4">',
    '          <p data-reveal className="text-center text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-4">'
)
t = t.replace(
    '          <h2 data-reveal className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter text-white mb-14">',
    '          <h2 data-reveal className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter dark:text-white text-slate-900 mb-14">'
)
t = t.replace(
    'function HexItem({ tech, index }) {\n  const [hovered, setHovered] = useState(false)',
    'function HexItem({ tech, index }) {\n  const { isDark } = useTheme()\n  const [hovered, setHovered] = useState(false)'
)
t = t.replace(
    "style={{ color: hovered ? tech.color : 'rgba(255,255,255,0.5)'",
    "style={{ color: hovered ? tech.color : isDark ? 'rgba(255,255,255,0.5)' : 'rgba(30,30,35,0.55)'"
)
t = t.replace(
    "style={{ color: hovered ? tech.color : 'rgba(255,255,255,0.6)'",
    "style={{ color: hovered ? tech.color : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(30,30,40,0.7)'"
)
# Contact
t = t.replace(
    '            <p className="text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase mb-4">Get In Touch',
    '            <p className="text-[11px] font-semibold tracking-[0.3em] dark:text-zinc-500 text-slate-500 uppercase mb-4">Get In Touch'
)
t = t.replace(
    '            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-[1.1]">',
    '            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight dark:text-white text-slate-900 mb-4 leading-[1.1]">'
)
t = t.replace(
    '            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">',
    '            <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">'
)
t = t.replace(
    '                    className="contact-card group relative w-full p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.08]',
    '                    className="contact-card group relative w-full p-5 rounded-2xl dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-200 dark:hover:border-white/[0.15] hover:border-slate-300 dark:hover:bg-white/[0.08] hover:bg-slate-50 dark:shadow-none shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
)
t = t.replace(
    '                    className="contact-card group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.08]',
    '                    className="contact-card group relative p-5 rounded-2xl dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-200 dark:hover:border-white/[0.15] hover:border-slate-300 dark:hover:bg-white/[0.08] hover:bg-slate-50 dark:shadow-none shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
)
t = t.replace(
    '                        <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase mb-0.5">{item.label}</p>\n                        <p className="text-sm text-zinc-300 group-hover:text-white',
    '                        <p className="text-xs font-semibold tracking-[0.15em] dark:text-zinc-500 text-slate-500 uppercase mb-0.5">{item.label}</p>\n                        <p className="text-sm dark:text-zinc-300 text-slate-700 dark:group-hover:text-white group-hover:text-slate-900'
)
t = t.replace(
    "className={`flex-shrink-0 transition-all duration-300 ${copied ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-zinc-300",
    "className={`flex-shrink-0 transition-all duration-300 ${copied ? 'text-emerald-400' : 'dark:text-zinc-600 text-slate-400 dark:group-hover:text-zinc-300 group-hover:text-slate-600"
)
# second occurrence for contact cards without copy
# need to handle the <p> pair for non-copyable cards (duplicate but second replace already done, however the <p> pair appears twice, the above replace covers both via first match? Do second manually)
# Ensure the second card text colors
if 'dark:text-zinc-300 text-slate-700 dark:group-hover:text-white group-hover:text-slate-900' in t:
    pass
else:
    t = t.replace(
        '                        <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500',
        '                        <p className="text-xs font-semibold tracking-[0.15em] dark:text-zinc-500 text-slate-500'
    )
t = t.replace(
    'className="ml-auto flex-shrink-0 text-zinc-600 group-hover:text-zinc-300',
    'className="ml-auto flex-shrink-0 dark:text-zinc-600 text-slate-400 dark:group-hover:text-zinc-300 group-hover:text-slate-600'
)
t = t.replace(
    '          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">',
    '          <div className="flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/[0.03] bg-white dark:border-white/[0.06] border-slate-200 shadow-sm">'
)
t = t.replace(
    '            <span className="text-xs text-zinc-400 font-medium">Available for projects & collaborations</span>',
    '            <span className="text-xs dark:text-zinc-400 text-slate-600 font-medium">Available for projects & collaborations</span>'
)
t = t.replace(
    '          <p className="text-[10px] text-zinc-700 font-medium tracking-[0.15em] uppercase">',
    '          <p className="text-[10px] dark:text-zinc-700 text-slate-400 font-medium tracking-[0.15em] uppercase">'
)

p.write_text(t, encoding='utf-8')
print("patched2 len", len(t))
print("missing ProjectCard isDark?", "ProjectCard" in t and "isDark" in t)
