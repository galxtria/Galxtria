import pathlib, re
p = pathlib.Path(r"C:\Coding\Porto\src\App.jsx")
t = p.read_text(encoding='utf-8')
t = t.replace('const { isDark, toggleTheme } = useTheme()\n  const { isDark, toggleTheme } = useTheme()', 'const { isDark, toggleTheme } = useTheme()')
t = t.replace('const { isDark } = useTheme()\n  const { isDark } = useTheme()', 'const { isDark } = useTheme()')
# remove duplicate import
t = re.sub(r"(import \{ useTheme \} from '\./ThemeContext'[^\n]*\n)(\1)+", r"\1", t)
p.write_text(t, encoding='utf-8')
print('dedup done', t.count('toggleTheme'))
print('import count', t.count("useTheme"))
