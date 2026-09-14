import pathlib, re
p = pathlib.Path('C:/Coding/Porto/src/App.jsx')
t = p.read_text(encoding='utf-8')
orig = t

repls = [
    # logo
    ('text-purple-700', 'text-[#4c1d95]'),
    ('hover:text-purple-900', 'hover:text-[#2e1065]'),
    # navbar pill & borders
    ('border-purple-300/25', 'border-violet-200/60'),
    ('border-purple-200/30', 'border-violet-200/40'),
    ('border-purple-200/40', 'border-violet-200/60'),
    ('bg-purple-200/40', 'bg-violet-100'),
    ('bg-purple-100/50', 'bg-violet-50'),
    ('bg-purple-50', 'bg-violet-50/80'),
    ('border-purple-300/40', 'border-violet-200/60'),
    ('text-purple-700', 'text-violet-800'),
    # hero name gradient
    ('from-[#6b21e6] via-[#7c3aed] to-[#c026d3]', 'from-[#4c1d95] via-[#5b21b6] to-[#4338ca]'),
    # dot
    ('bg-purple-500 animate-pulse', 'bg-violet-700 animate-pulse'),
    ('dark:bg-purple-400 bg-purple-500', 'dark:bg-purple-400 bg-violet-700'),
    # timeline / badge
    ('bg-purple-100 ', 'bg-violet-50 '),
    ('border-purple-300/40', 'border-violet-200/60'),
    # Something Amazing gradient - make elegant for both modes
    ('from-fuchsia-400 via-purple-500 to-violet-600', 'from-violet-600 via-indigo-600 to-violet-700'),
    # keep dark variant elegant too? override dark gradient via second pass handled by conditional not exists; leave as is but the universal one now elegant
]

for a,b in repls:
    if a in t:
        t = t.replace(a,b)

# Fix Something Amazing to be dark: + light: distinct elegant
t = t.replace(
    'from-violet-600 via-indigo-600 to-violet-700 bg-clip-text',
    'dark:from-fuchsia-400 dark:via-purple-400 dark:to-violet-500 from-violet-700 via-indigo-700 to-violet-800 bg-clip-text'
)

# Navbar/timeline purple dots - make light more muted indigo
t = t.replace('text-purple-400 uppercase mb-1', 'dark:text-purple-400 text-violet-700 uppercase mb-1')
# but undo double dark: replacement if already
t = t.replace('dark:text-purple-400 text-violet-700 dark:text-purple-400', 'dark:text-purple-400 text-violet-700')

# Contact headings already fixed; ensure pill indicator uses violet
# Fix duplicate violet mapping if over-replaced
# Ensure bg-violet-50/80 not double slash
p.write_text(t, encoding='utf-8')
print(f"patched {len(orig)} -> {len(t)} diff {len(t)-len(orig)}")
# quick sanity
import subprocess
print("remaining purple count", t.count("purple-"))
print("violet count", t.count("violet-"))
