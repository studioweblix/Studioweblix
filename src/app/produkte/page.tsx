'use client'

import { useState } from 'react'

const CATEGORIES = [
  { id: 'handwerk', label: 'Handwerk' },
  { id: 'gastronomie', label: 'Gastronomie' },
  { id: 'arzt', label: 'Arzt' },
  { id: 'ecommerce', label: 'E-Commerce' },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

export default function ProduktePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('handwerk')

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kategorie-Filter (wie im Screenshot) */}
        <nav className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14" aria-label="Design-Kategorien">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#5a6d6b] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Zwei Spalten: links Beschriftung, rechts Website-Vorschau */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
          {/* Links: Beschriftung (Inhalt später von dir ergänzbar) */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {/* Platzhalter – z.B. "Websites für Handwerker" pro Kategorie */}
              {activeCategory === 'handwerk' && 'Websites für Handwerker'}
              {activeCategory === 'gastronomie' && 'Websites für Gastronomie'}
              {activeCategory === 'arzt' && 'Websites für Ärzte'}
              {activeCategory === 'ecommerce' && 'Websites für E-Commerce'}
            </h2>
            <p className="text-white/80 leading-relaxed">
              {/* Platzhalter – Beschreibung kannst du später ersetzen */}
              Beschreibung folgt. Hier kommt der Text zur jeweiligen Kategorie – z.B. was die Websites auszeichnet und für wen sie geeignet sind.
            </p>
            {/* Optional: Bereich für Testimonial (wie im Screenshot) */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm">
                Kundenstimme oder Zusatztext – Platzhalter, Inhalt fügst du später hinzu.
              </p>
            </div>
          </div>

          {/* Rechts: Bild der Website (Platzhalter, Bild fügst du später hinzu) */}
          <div className="relative rounded-xl border border-white/10 bg-[#243d38]/60 overflow-hidden aspect-[4/3] min-h-[280px] flex items-center justify-center">
            {/* Platzhalter bis du ein Bild einfügst */}
            <div className="text-center p-8">
              <svg
                className="w-16 h-16 mx-auto text-white/20 mb-4"
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
              <p className="text-white/30 text-xs mt-1">Pro Kategorie später ein Bild einfügbar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
