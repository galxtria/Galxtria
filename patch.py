import pathlib
p = pathlib.Path('C:/Coding/Porto/src/App.jsx')
t = p.read_text(encoding='utf-8')

# 1 import useTheme
if 'useTheme' not in t:
    t = t.replace(
        "import kosthubImg from './assets/images/kosthub_web.webp'",
        "import { useTheme } from './ThemeContext'\nimport kosthubImg from './assets/images/kosthub_web.webp'"
    )

# 2 Background isDark
t = t.replace(
    "function Background({ mouseRef, isMobile }) {\n  const orb1 = useRef(null)\n  const orb2 = useRef(null)",
    "function Background({ mouseRef, isMobile }) {\n  const { isDark } = useTheme()\n  const orb1 = useRef(null)\n  const orb2 = useRef(null)"
)

# 3 orb opacities light boost
t = t.replace(
    'className={`absolute top-[-10%] left-[15%] rounded-full opacity-[0.07]',
    'className={`absolute top-[-10%] left-[15%] rounded-full ${isDark ? \'opacity-[0.07]\' : \'opacity-[0.14]\'}'
)
t = t.replace(
    'className={`absolute bottom-[-15%] right-[5%] rounded-full opacity-[0.05]',
    'className={`absolute bottom-[-15%] right-[5%] rounded-full ${isDark ? \'opacity-[0.05]\' : \'opacity-[0.10]\'}'
)
# orb2 background variant pinkish light
t = t.replace(
    "background: 'radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)',\n          filter: isMobile ? 'blur(50px)' : 'blur(100px)',\n          animation: isMobile ? 'none' : 'orb-drift-2",
    "background: isDark ? 'radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(236,72,153,1) 0%, transparent 70%)',\n          filter: isMobile ? 'blur(50px)' : 'blur(100px)',\n          animation: isMobile ? 'none' : 'orb-drift-2",
    # only first occurrence after bottom orb - use count 1
)
# fix duplicate if replaced twice, ensure only one
t = t.replace(
    "className={`absolute top-[35%] left-[55%] w-[500px] h-[500px] rounded-full opacity-[0.04]",
    "className={`absolute top-[35%] left-[55%] w-[500px] h-[500px] rounded-full ${isDark ? 'opacity-[0.04]' : 'opacity-[0.07]'}"
)

# 4 Navbar
t = t.replace(
    "  const itemRefs = useRef({})",
    "  const itemRefs = useRef({})\n  const { isDark, toggleTheme } = useTheme()"
)

t = t.replace(
    'className="text-[13px] font-bold tracking-[0.25em] text-zinc-400 uppercase hover:text-white',
    'className="text-[13px] font-bold tracking-[0.25em] dark:text-zinc-400 text-purple-700 uppercase dark:hover:text-white hover:text-purple-900'
)

t = t.replace(
    "'bg-[#050505]/90 backdrop-blur-2xl border-purple-500/30 shadow-[0_8px_30px_rgba(168,85,247,0.15)]'\n              : 'bg-white/[0.02] backdrop-blur-xl border-white/[0.05]'",
    "'dark:bg-[#050505]/90 bg-white/90 backdrop-blur-2xl dark:border-purple-500/30 border-purple-300/25 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]'\n              : 'dark:bg-white/[0.02] bg-white/60 backdrop-blur-xl dark:border-white/[0.05] border-purple-200/30'"
)

t = t.replace(
    'className="absolute rounded-md bg-white/[0.08] shadow-[0_0_12px_rgba(168,85,247,0.1)]',
    'className="absolute rounded-md dark:bg-white/[0.08] bg-purple-200/40 dark:shadow-[0_0_12px_rgba(168,85,247,0.1)] shadow-[0_0_8px_rgba(168,85,247,0.2)]'
)

t = t.replace(
    "? 'text-white'\n                  : 'text-zinc-500 hover:text-zinc-200'",
    "? 'dark:text-white text-slate-900'\n                  : 'dark:text-zinc-500 text-slate-600 dark:hover:text-zinc-200 hover:text-slate-800'"
)

# add theme toggle button after NAV_LINKS map (desktop)
t = t.replace(
    "            ))}\n        </div>\n\n        {/* Mobile toggle */}",
    "            ))}\n            {/* Theme toggle button */}\n            <button onClick={toggleTheme} className=\"relative z-10 ml-2 p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors duration-200 cursor-none\" aria-label=\"Toggle theme\">{isDark ? (<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"5\" /><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\" /><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\" /><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\" /><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\" /><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\" /><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\" /><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\" /><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\" /></svg>) : (<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\" /></svg>)}</button>\n        </div>\n\n        {/* Mobile toggle */}"
)

# mobile theme toggle before mobile menu toggle
t = t.replace(
    '        {/* Mobile toggle */}\n        <button\n          onClick={() => setMobileOpen',
    '        <button onClick={toggleTheme} className="md:hidden p-2 rounded-md dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors cursor-pointer" aria-label="Toggle theme">{isDark ? (<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"5\" /><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\" /><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\" /><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\" /><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\" /><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\" /><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\" /><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\" /><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\" /></svg>) : (<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\" /></svg>)}</button>\n        {/* Mobile toggle */}\n        <button\n          onClick={() => setMobileOpen'
)

t = t.replace(
    'className="md:hidden mx-6 mb-4 p-2 rounded-xl bg-[#050505]/90 backdrop-blur-2xl border border-purple-500/30 shadow-[0_8px_30px_rgba(168,85,247,0.15)]"',
    'className="md:hidden mx-6 mb-4 p-2 rounded-xl dark:bg-[#050505]/90 bg-white/90 backdrop-blur-2xl dark:border dark:border-purple-500/30 border border-purple-400/25 dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"'
)
t = t.replace(
    "active === link ? 'text-white bg-white/[0.05]' : 'text-zinc-500 hover:text-white'",
    "active === link ? 'dark:text-white text-slate-900 dark:bg-white/[0.05] bg-purple-100/50' : 'dark:text-zinc-500 text-slate-600 dark:hover:text-white hover:text-slate-900'"
)

# Hero divider + glow + tagline + name
t = t.replace(
    'className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"',
    'className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/[0.04] via-purple-200/40 to-transparent"',
    # only first hero one - will replace all but ok
)
# revert extra replaces for other sections by keeping same value (idempotent)
# Hero name gradient for light
t = t.replace(
    'className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 bg-clip-text text-transparent"',
    'className="text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-violet-400 from-[#6b21e6] via-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent"'
)
t = t.replace(
    'className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"',
    'className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"'
)
t = t.replace(
    '<span className="text-zinc-200 font-medium"> aesthetic precision </span>',
    '<span className="dark:text-zinc-200 text-slate-900 font-medium"> aesthetic precision </span>'
)

# Fix config for light name duplicate if double replaced
# App wrapper
t = t.replace(
    '  return (\n    <div className="min-h-screen bg-black text-zinc-100 font-sans relative">',
    '  return (\n    <div className="min-h-screen dark:bg-black bg-[#fcfcfe] dark:text-zinc-100 text-[#1e1b2e] font-sans relative transition-colors duration-300">'
)

# Fix duplicate count for divider (Projects, About etc will also need)
# Already replaced via first replace which replaces all occurrences (python replace replaces all)

p.write_text(t, encoding='utf-8')
print("patched", len(t))
print("has useTheme", "useTheme" in t)
print("has isDark toggle", "toggleTheme" in t)
