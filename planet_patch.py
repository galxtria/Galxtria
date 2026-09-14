import pathlib
p = pathlib.Path(r"C:\Coding\Porto\src\App.jsx")
t = p.read_text(encoding="utf-8")

old = """        {/* Dark: deep violet planet — glassy, no photo gray */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 32% 28%, #7c5cf0 0%, #5b3bd6 18%, #3b249e 38%, #1c1454 62%, #0b0a1e 78%, #050510 100%)', boxShadow: 'inset -18px -12px 32px rgba(0,0,0,0.75), inset 8px 8px 22px rgba(168,85,247,0.18), 0 0 80px rgba(139,92,246,0.18)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)' }} />
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', background: 'radial-gradient(ellipse 90% 14% at 50% 54%, rgba(0,0,0,0.45) 0%, transparent 70%)', filter: 'blur(6px)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 73%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ inset: '7%', opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease', border: '1px solid rgba(168,85,247,0.12)', boxShadow: '0 0 70px rgba(139,92,246,0.16)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)', maskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 73%)' }} />
        {/* Light: moon sinar — tanpa abu2, cuma glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ opacity: isDark ? 0 : 1, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fefcff 32%, #f5f3ff 58%, #ede9fe 72%, #ddd6fe 100%)', boxShadow: 'inset -14px -10px 22px rgba(110,90,150,0.14), inset 6px 6px 14px rgba(255,255,255,0.95), 0 0 60px rgba(255,255,255,0.55), 0 0 110px rgba(168,85,247,0.18)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 74%)', maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 74%)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ inset: '3%', opacity: isDark ? 0 : 1, transition: 'opacity 900ms ease', background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.9) 72%, rgba(168,85,247,0.14) 100%)', filter: 'blur(14px)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 74%)', maskImage: 'radial-gradient(circle at 50% 50%, transparent 62%, black 74%)' }} />"""

new = """        {/* Dark: Saturn premium — single cohesive element */}
        <div className="absolute inset-0" style={{ opacity: isDark ? 1 : 0, transition: 'opacity 900ms ease' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="satB" cx="30%" cy="28%" r="75%"><stop offset="0%" stopColor="#b8a3ff"/><stop offset="18%" stopColor="#7f5af0"/><stop offset="38%" stopColor="#4a2fb8"/><stop offset="62%" stopColor="#1e1452"/><stop offset="82%" stopColor="#0a0a18"/><stop offset="100%" stopColor="#020208"/></radialGradient>
              <linearGradient id="ringG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa" stopOpacity="0"/><stop offset="22%" stopColor="#c4b5fd" stopOpacity="0.32"/><stop offset="38%" stopColor="#ddd6fe" stopOpacity="0.5"/><stop offset="52%" stopColor="#a78bfa" stopOpacity="0.24"/><stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/></linearGradient>
              <radialGradient id="satSh" cx="72%" cy="52%" r="70%"><stop offset="0%" stopColor="transparent" stopOpacity="0"/><stop offset="50%" stopColor="transparent" stopOpacity="0"/><stop offset="100%" stopColor="#010208" stopOpacity="0.78"/></radialGradient>
              <clipPath id="satClip2"><circle cx="200" cy="200" r="90"/></clipPath>
            </defs>
            <circle cx="200" cy="200" r="118" fill="none" stroke="rgba(139,92,246,0.09)" strokeWidth="30" style={{filter:'blur(22px)'}}/>
            <g opacity="0.62"><ellipse cx="200" cy="200" rx="182" ry="40" fill="none" stroke="url(#ringG)" strokeWidth="15" transform="rotate(-18 200 200)" strokeLinecap="round"/></g>
            <circle cx="200" cy="200" r="90" fill="url(#satB)"/>
            <g clipPath="url(#satClip2)" opacity="0.35"><ellipse cx="200" cy="186" rx="86" ry="3.5" fill="#c4b5fd"/><ellipse cx="200" cy="210" rx="84" ry="2.8" fill="#9a7dff"/><ellipse cx="200" cy="202" rx="88" ry="12" fill="#020208" opacity="0.28" transform="rotate(-18 200 202)" style={{filter:'blur(4px)'}}/></g>
            <ellipse cx="168" cy="162" rx="26" ry="16" fill="white" opacity="0.05" style={{filter:'blur(7px)'}}/>
            <circle cx="200" cy="200" r="90" fill="url(#satSh)"/>
            <g opacity="1"><path d="M 48 172 A 182 40 0 0 0 352 228" fill="none" stroke="url(#ringG)" strokeWidth="15" strokeLinecap="round" transform="rotate(-18 200 200)" style={{filter:'drop-shadow(0 3px 8px rgba(0,0,0,0.4))'}}/><path d="M 52 173 A 182 40 0 0 0 348 227" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" transform="rotate(-18 200 200)"/></g>
            <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(168,85,247,0.13)" strokeWidth="1"/>
          </svg>
        </div>
        {/* Light: Moon sinar — single cohesive, no gray, pure glow */}
        <div className="absolute inset-0" style={{ opacity: isDark ? 0 : 1, transition: 'opacity 900ms ease' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="moonB2" cx="30%" cy="28%" r="78%"><stop offset="0%" stopColor="#ffffff"/><stop offset="28%" stopColor="#fefcff"/><stop offset="55%" stopColor="#f2eeff"/><stop offset="100%" stopColor="#d9d0f5"/></radialGradient>
              <radialGradient id="moonSh2" cx="70%" cy="50%" r="70%"><stop offset="0%" stopColor="transparent" stopOpacity="0"/><stop offset="55%" stopColor="transparent" stopOpacity="0"/><stop offset="100%" stopColor="rgba(30,20,60,0.16)" stopOpacity="1"/></radialGradient>
            </defs>
            <circle cx="200" cy="200" r="122" fill="none" stroke="white" strokeWidth="28" opacity="0.06" style={{filter:'blur(24px)'}}/>
            <circle cx="200" cy="200" r="94" fill="url(#moonB2)" style={{filter:'drop-shadow(0 0 40px rgba(255,255,255,0.45)) drop-shadow(0 0 80px rgba(168,85,247,0.12))'}}/>
            <g opacity="0.9"><circle cx="172" cy="164" r="22" fill="#ede7ff" stroke="rgba(0,0,0,0.04)" strokeWidth="0.7"/><circle cx="172" cy="164" r="13" fill="rgba(0,0,0,0.02)" style={{filter:'blur(1px)'}}/><circle cx="236" cy="214" r="16" fill="#ece7ff" stroke="rgba(0,0,0,0.03)" strokeWidth="0.6"/><circle cx="196" cy="250" r="11" fill="#ece6ff" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/><circle cx="258" cy="172" r="7.5" fill="#f0ebff"/><circle cx="140" cy="208" r="5.5" fill="#eee8ff"/></g>
            <circle cx="200" cy="200" r="94" fill="url(#moonSh2)"/>
            <circle cx="200" cy="200" r="94" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <circle cx="200" cy="200" r="94" fill="none" stroke="rgba(168,85,247,0.09)" strokeWidth="1"/>
          </svg>
        </div>"""

if old in t:
    t = t.replace(old, new)
    p.write_text(t, encoding="utf-8")
    print("replaced ok", len(t))
else:
    print("not found")
    # debug find
    idx = t.find("Dark: deep violet")
    print(t[idx-200:idx+200])
