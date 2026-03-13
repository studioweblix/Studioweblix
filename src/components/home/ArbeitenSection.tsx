'use client'

import { useState } from 'react'

const CATEGORIES = [
  'Handwerk',
  'Gastronomie',
  'Arzt',
  'Ecommerce',
]

export function ArbeitenSection() {
  const [activeCategory, setActiveCategory] = useState('Handwerk')

  return (
    <section id="unsere-arbeiten" className="py-16 md:py-24 bg-[#2C4B44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Unsere Arbeiten
          </h2>
          <p className="text-lg text-white/80 mb-6">
            Verkaufsstarke Websites, die Ihre Kunden überzeugen.
          </p>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Studio Weblix hat bereits für über 1.000 Kunden aus allen Branchen eine
            beeindruckende Website erstellt. Klicken Sie sich gerne durch die
            unten aufgeführte Auswahl und erleben Sie, wie die speziellen
            Anforderungen einer jeden Branche kraftvoll und intelligent umgesetzt
            wurden.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-[#5a6d6b] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Zwei Spalten: links Text-Template, rechts Bild-Template */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
          {/* Links: Text-Template (Inhalt später ergänzbar) */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {activeCategory === 'Handwerk' && 'Websites für Handwerker'}
              {activeCategory === 'Gastronomie' && 'Websites für Gastronomie'}
              {activeCategory === 'Arzt' && 'Websites für Ärzte'}
              {activeCategory === 'Ecommerce' && 'Websites für E-Commerce'}
            </h3>
            <p className="text-white/80 leading-relaxed">
              Beschreibung folgt. Hier kannst du später den Text zur Kategorie „{activeCategory}“ einfügen – z.B. was die Websites auszeichnet und für wen sie geeignet sind.
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm">
                Kundenstimme oder Zusatztext – Platzhalter, Inhalt fügst du später hinzu.
              </p>
            </div>
          </div>

          {/* Rechts: Bild-Template (Bild später ergänzbar) */}
          <div className="relative rounded-xl border border-white/10 bg-[#243d38]/60 overflow-hidden aspect-[4/3] min-h-[260px] flex items-center justify-center">
            <div className="text-center p-8">
              <svg
                className="w-14 h-14 mx-auto text-white/20 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-white/40 text-sm">Website-Vorschau – Bild folgt</p>
              <p className="text-white/30 text-xs mt-1">Kategorie: {activeCategory}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
