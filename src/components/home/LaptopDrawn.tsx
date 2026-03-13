'use client'

/**
 * Gezeichnetes Laptop-Motiv für die Hero-Section (Line-Art, Theme-Farben).
 */
export function LaptopDrawn() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-full max-w-[280px] md:max-w-[340px] lg:max-w-[400px] mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="laptopStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(90,109,107,0.5)" />
          <stop offset="100%" stopColor="rgba(212,226,222,0.4)" />
        </linearGradient>
      </defs>
      {/* Laptop-Basis (Tastatur/Unterteil) */}
      <path
        d="M40 120 L40 185 Q40 200 60 200 L260 200 Q280 200 280 185 L280 120 L40 120 Z"
        stroke="url(#laptopStroke)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Tastatur-Andeutung */}
      <path
        d="M70 140 L250 140 M70 155 L240 155 M70 170 L250 170"
        stroke="url(#laptopStroke)"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      {/* Scharnier */}
      <path
        d="M50 120 L270 120"
        stroke="url(#laptopStroke)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Bildschirm-Rahmen */}
      <path
        d="M30 30 L30 118 L290 118 L290 30 Q290 15 260 15 L60 15 Q30 15 30 30 Z"
        stroke="url(#laptopStroke)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Bildschirm-Inhalt (einfache Linien wie Code/Website) */}
      <path
        d="M50 45 L120 45 M50 60 L180 60 M50 75 L140 75 M50 90 L220 90 M50 105 L100 105"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect
        x="55"
        y="115"
        width="210"
        height="65"
        rx="4"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
