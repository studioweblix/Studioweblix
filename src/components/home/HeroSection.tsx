'use client'

import { useState, useEffect } from 'react'
import { BookingModal } from '@/components/BookingModal'
import { LaptopDrawn } from '@/components/home/LaptopDrawn'
import { TypingEffect } from '@/components/home/TypingEffect'
import type { PageContent, Settings } from '@/lib/types'

interface HeroSectionProps {
  pageContent: PageContent | null
  settings: Settings | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HeroSection({ pageContent, settings }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroTitle =
    pageContent?.hero_title ?? (
      <>
        <span className="block">Websiten</span>
        <span className="block font-semibold text-white tracking-tight whitespace-nowrap">die Kunden überzeugen</span>
      </>
    )
  const heroSubtitle =
    pageContent?.hero_subtitle ??
    'Ihre neue Website in nur einer Woche. Mit persönlicher Betreuung, zuverlässigem Service und professionellem Design.'

  const parallaxOffset = scrollY * 0.12

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col overflow-hidden -mt-16 md:-mt-20 pt-28 sm:pt-32 md:pt-40">
      {/* Hintergrund: Dunkel–heller Verlauf (links dunkel, rechts hell) – wie Screenshot */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(90deg, #1e3834 0%, #2C4B44 35%, #3d5a52 55%, #5a7a6e 75%, #8fa896 90%, #c5ddd4 100%)',
        }}
        aria-hidden
      />
      {/* Dunkleres Viereck rechts – von oben bis unten */}
      <div
        className="absolute top-0 bottom-0 z-[1] w-[28%] min-w-[140px] max-w-[320px] bg-[#1a2f2b] right-12 md:right-20 lg:right-28"
      >
        {/* Typing-Effekt – vertikal oben-mittig */}
        <div className="absolute inset-x-0 top-[22%] flex items-start justify-center">
          <TypingEffect />
        </div>
        {/* Drei Web-Icons – fest unten positioniert */}
        <div className="absolute inset-x-0 bottom-10 md:bottom-14 flex flex-col items-center gap-6 md:gap-8">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="9" x2="22" y2="9" />
            <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
            <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
          </svg>
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
          </svg>
        </div>
      </div>
      {/* Dezenter Lichtakzent rechts (wie Lens-Flare im Screenshot) */}
      <div
        className="absolute z-0 right-0 top-1/2 -translate-y-1/2 w-[60%] h-[80%] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 85% 50%, rgba(212,226,222,0.5) 0%, rgba(158,201,192,0.2) 40%, transparent 70%)',
        }}
        aria-hidden
      />
      {/* Diagonale Linien für Tiefe (wie im Screenshot) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(105deg, rgba(255,255,255,0.15) 0%, transparent 50%),
            linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.08) 100%)
          `,
          backgroundSize: '120px 120px',
        }}
        aria-hidden
      />
      {/* Gezeichnetes Laptop im Hintergrund rechts */}
      <div
        className="absolute right-0 bottom-0 z-0 w-[45%] max-w-[420px] h-[50%] max-h-[320px] flex items-end justify-center pr-4 lg:pr-8 pb-8 lg:pb-12 opacity-70"
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
        aria-hidden
      >
        <LaptopDrawn />
      </div>

      {/* Inhalt: links ausgerichtet – Label, Titel, Untertitel, CTA */}
      <div
        className="relative z-10 flex flex-col justify-center flex-1 w-full min-h-0 px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 pb-16"
        style={{
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="max-w-4xl w-full">
          {/* Label (wie „программа тренинга“ / PRO_TEAM im Screenshot) */}
          <div className="inline-block border border-white/25 rounded px-4 py-2 mb-4">
            <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
              Webentwicklung & Design
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-6 animate-fade-in leading-tight max-w-2xl">
            {heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-xl mb-8 animate-fade-in animate-delay-100 leading-relaxed">
            {heroSubtitle}
          </p>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold hover:bg-white/25 transition-all hover:scale-[1.02] shadow-lg animate-fade-in animate-delay-200 uppercase tracking-wide"
          >
            Call buchen
          </button>
        </div>
      </div>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
