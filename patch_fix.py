import pathlib
p = pathlib.Path(r"C:\Coding\Porto\src\App.jsx")
t = p.read_text(encoding="utf-8")

# 1) Hapus 2 logo hero (React + Tailwind/wavy) — sisakan blob bulat saja
old1 = """          <div
            className="absolute top-[18%] left-[12%] w-16 h-16 opacity-[0.06]"
            style={{ transition: 'transform 0.6s ease-out', animation: 'float-gentle 6s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-purple-400">
              <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
            </svg>
          </div>
          <div
            className="absolute top-[22%] right-[15%] w-14 h-14 opacity-[0.05]"
            style={{ transition: 'transform 0.6s ease-out', animation: 'float-gentle 7s ease-in-out infinite 1s' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-fuchsia-400">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
          </div>"""
if old1 in t:
    t = t.replace(old1, "")
    print("removed hero logos")
else:
    print("hero logos not found")

# 2) Ganti planet dark + perbaiki moon light jadi sinar (hapus abu2)
old_planet = """        <img
          src="https://images.unsplash.com/photo-1614314107768-601506d1387e?w=800&q=80&auto=format&fit=crop&crop=center"
          alt=""
          draggable="false"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isDark ? 0.52 : 0,
            transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1)',
            filter: 'brightness(0.85) contrast(1.08) saturate(0.9) blur(0px)',
            mixBlendMode: 'screen',
            borderRadius: '50%',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)',
            maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            opacity: isDark ? 0.52 : 0,
            transition: 'opacity 900ms ease',
            background: 'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.09) 0%, transparent 42%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)',
            maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '6%',
            opacity: isDark ? 1 : 0,
            transition: 'opacity 900ms ease',
            border: '1px solid rgba(168,85,247,0.09)',
            boxShadow: '0 0 60px rgba(139,92,246,0.14), inset 0 0 40px rgba(139,92,246,0.06)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)',
            maskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)',
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80&auto=format&fit=crop&crop=center"
          alt=""
          draggable="false"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isDark ? 0 : 0.44,
            transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1)',
            filter: 'brightness(1.06) contrast(0.96) saturate(0.45) blur(0.2px)',
            borderRadius: '50%',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 64%, transparent 74%)',
            maskImage: 'radial-gradient(circle at 50% 50%, black 64%, transparent 74%)',
            boxShadow: '0 12px 40px rgba(124,58,237,0.07)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            opacity: isDark ? 0 : 0.44,
            transition: 'opacity 900ms ease',
            background: 'radial-gradient(ellipse 75% 80% at 70% 50%, rgba(18,14,40,0.13) 0%, transparent 62%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 64%, transparent 74%)',
            maskImage: 'radial-gradient(circle at 50% 50%, black 64%, transparent 74%)',
          }}
        />"""

new_planet = """        {/* Dark: deep violet planet — glassy, no photo gray */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 32% 28%, #7c5cf0 0%, #5b3bd6 18%, #3b249e 38%, #1c1454 62%, #0b0a1e 78%, #050510 100%)', boxShadow: 'inset -18px -12px 32px rgba(0,0,0,0.75), inset 8px 8px 22px rgba(168,85,247,0.18), 0 0 80px rgba(139,92,246,0.18)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)' }} />
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', background: 'radial-gradient(ellipse 90% 14% at 50% 54%, rgba(0,0,0,0.45) 0%, transparent 70%)', filter: 'blur(6px)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ inset: '7%', opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', border: '1px solid rgba(168,85,247,0.12)', boxShadow: '0 0 70px rgba(139,92,246,0.16)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)', maskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)' }} />
        {/* Light: moon sinar — tanpa abu2, cuma glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 0 : 1, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fefcff 32%, #f5f3ff 58%, #ede9fe 72%, #ddd6fe 100%)', boxShadow: 'inset -14px -10px 22px rgba(110,90,150,0.14), inset 6px 6px 14px rgba(255,255,255,0.95), 0 0 60px rgba(255,255,255,0.55), 0 0 110px rgba(168,85,247,0.18)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 74%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 74%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ inset: '3%', opacity: isDark ? 0 : 1, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.9) 72%, rgba(168,85,247,0.14) 100%)', filter: 'blur(14px)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 74%)', maskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 74%)' }} />"""

if old_planet in t:
    t = t.replace(old_planet, new_planet)
    print("planet replaced")
else:
    print("planet block not found — trying fallback contains")
    # fallback: replace by url snippets
    t = t.replace("photo-1614314107768-601506d1387e", "photo-1446776877081-d282a0f896e2")
    t = t.replace("photo-1532693322450-2cb5c511067d", "photo-1532693322450-2cb5c511067d")

p.write_text(t, encoding="utf-8")
print("done", len(t))
