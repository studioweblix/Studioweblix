'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'vorteile', label: 'Vorteile' },
  { id: 'unsere-arbeiten', label: 'Arbeiten' },
  { id: 'so-funktionierts', label: 'Ablauf' },
  { id: 'kontakt', label: 'Kontakt' },
]

export function ScrollNav() {
  const [activeId, setActiveId] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0"
      aria-label="Abschnitt-Navigation"
    >
          {SECTIONS.map((section, i) => (
            <div key={section.id} className="flex flex-col items-center">
              {/* Vertikale Linie vor dem Punkt (außer dem ersten) */}
              {i > 0 && (
                <div className="w-px h-5 bg-white/30" />
              )}
              {/* Raute / Diamond */}
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className="group relative flex items-center justify-center p-1.5"
                aria-label={section.label}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`w-2.5 h-2.5 rotate-45 border transition-all duration-300 ${
                      activeId === section.id
                        ? 'bg-white border-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                        : 'bg-transparent border-white/50 group-hover:border-white group-hover:bg-white/20'
                    }`}
                  />
                </motion.div>
                {/* Tooltip links */}
                <span className="absolute right-full mr-3 px-2 py-1 rounded bg-white/10 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {section.label}
                </span>
              </button>
            </div>
          ))}
    </motion.nav>
  )
}
