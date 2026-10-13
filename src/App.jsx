import { useEffect, useState } from 'react'
import { useScrollFx } from './hooks/hooks.js'
import { SectionDots, Splash } from './components/chrome.jsx'
import { NotFound } from './components/NotFound.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Hero } from './components/Hero.jsx'
import { Skills } from './components/Skills.jsx'
import { Work } from './components/Work.jsx'
import { Experience } from './components/Experience.jsx'
import { BackToTop, Contact } from './components/Contact.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [path, setPath] = useState(() => {
    try {
      return window.location.pathname
    } catch {
      return '/'
    }
  })
  useScrollFx()

  useEffect(() => {
    document.title = 'Galxtria'
  }, [])

  useEffect(() => {
    const onPop = () => {
      try {
        setPath(window.location.pathname)
      } catch { /* abaikan */ }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const isNotFound = path !== '/' && path !== '/index.html'

  return (
    <div className="cloud-sky relative min-h-screen text-[#111] dark:text-[#f4f2ed]">
      {!loaded && <Splash onFinish={() => setLoaded(true)} />}
      {isNotFound ? (
        <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <NotFound />
        </main>
      ) : (
        <>
          <Navbar loaded={loaded} />
          <main className={`relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Hero visible={loaded} />
            <Work />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <SectionDots visible={loaded} />
          <BackToTop visible={loaded} />
        </>
      )}
    </div>
  )
}
