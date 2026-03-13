'use client'

export function ProcessStep4Illustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              @keyframes step4PanelFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              @keyframes step4BarPulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .step4-float { animation: step4PanelFloat 3s ease-in-out infinite; }
              .step4-float-delay { animation: step4PanelFloat 3.2s ease-in-out 0.3s infinite; }
              .step4-pulse { animation: step4BarPulse 2s ease-in-out infinite; }
            `}
          </style>
          <linearGradient id="step4Teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a6d6b" />
            <stop offset="100%" stopColor="#5a6d6b" />
          </linearGradient>
        </defs>

        {/* Hintergrundform */}
        <ellipse cx="200" cy="150" rx="150" ry="130" fill="#5a6d6b" fillOpacity="0.06" />

        {/* Dashboard-Fenster */}
        <g className="step4-float">
          <rect x="50" y="35" width="300" height="230" rx="8" fill="#0c0c0f" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
          {/* Header */}
          <rect x="50" y="35" width="300" height="36" rx="8" fill="url(#step4Teal)" fillOpacity="0.25" />
          <circle cx="70" cy="53" r="3" fill="#5a6d6b" fillOpacity="0.9" />
          <circle cx="80" cy="53" r="3" fill="#5a6d6b" fillOpacity="0.6" />
          <circle cx="90" cy="53" r="3" fill="#5a6d6b" fillOpacity="0.6" />
          <text x="115" y="57" fill="#5a6d6b" fontSize="10" fontWeight="600">Dashboard</text>
          <rect x="260" y="45" width="70" height="14" rx="3" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="272" cy="52" r="2.5" fill="none" stroke="#5a6d6b" strokeWidth="0.6" strokeOpacity="0.6" />
          <circle cx="330" cy="53" r="8" fill="none" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="330" cy="51" r="3" fill="#5a6d6b" fillOpacity="0.8" />
          <path d="M327 56 Q330 59 333 56" stroke="#5a6d6b" strokeWidth="0.8" strokeOpacity="0.8" fill="none" />

          {/* Sidebar */}
          <rect x="50" y="71" width="52" height="194" rx="0 0 0 8" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="58" y="88" width="36" height="28" rx="4" fill="url(#step4Teal)" fillOpacity="0.2" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M70 98 L76 104 L86 92" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="58" y="125" width="36" height="28" rx="4" fill="none" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.4" />
          <rect x="64" y="132" width="12" height="3" rx="1" fill="#5a6d6b" fillOpacity="0.4" />
          <rect x="64" y="138" width="20" height="3" rx="1" fill="#5a6d6b" fillOpacity="0.3" />
          <rect x="58" y="162" width="36" height="28" rx="4" fill="none" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="76" cy="176" r="6" fill="none" stroke="#5a6d6b" strokeWidth="0.8" strokeOpacity="0.5" />
          <rect x="58" y="199" width="36" height="28" rx="4" fill="none" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M70 210 L74 214 L82 204" stroke="#5a6d6b" strokeWidth="0.8" strokeOpacity="0.5" fill="none" strokeLinecap="round" />

          {/* Hauptbereich – Karten */}
          {/* Karte: Texte */}
          <g className="step4-float-delay">
            <rect x="115" y="82" width="105" height="70" rx="6" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
            <text x="128" y="102" fill="#5a6d6b" fontSize="9" fontWeight="600">Texte</text>
            <rect x="128" y="112" width="75" height="4" rx="1" fill="#5a6d6b" fillOpacity="0.25" />
            <rect x="128" y="122" width="55" height="4" rx="1" fill="#5a6d6b" fillOpacity="0.2" />
            <rect x="128" y="132" width="65" height="4" rx="1" fill="#5a6d6b" fillOpacity="0.15" />
          </g>
          {/* Karte: Bilder */}
          <g className="step4-float-delay">
            <rect x="232" y="82" width="105" height="70" rx="6" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
            <text x="262" y="102" fill="#5a6d6b" fontSize="9" fontWeight="600">Bilder</text>
            <rect x="248" y="115" width="72" height="28" rx="4" fill="#0c0c0f" stroke="#5a6d6b" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3 2" />
            <path d="M258 132 L268 122 L278 131" stroke="#5a6d6b" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
          </g>
          {/* Karte: Preise */}
          <g className="step4-float-delay">
            <rect x="115" y="165" width="105" height="65" rx="6" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
            <text x="135" y="185" fill="#5a6d6b" fontSize="9" fontWeight="600">Preise</text>
            <text x="150" y="215" fill="#5a6d6b" fontSize="14" fontWeight="700">€ 0,00</text>
          </g>
          {/* Karte: Öffnungszeiten */}
          <g className="step4-float-delay">
            <rect x="232" y="165" width="105" height="65" rx="6" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
            <text x="245" y="185" fill="#5a6d6b" fontSize="9" fontWeight="600">Öffnungszeiten</text>
            <rect x="248" y="198" width="80" height="5" rx="1" fill="#5a6d6b" fillOpacity="0.3" />
            <rect x="248" y="208" width="60" height="5" rx="1" fill="#5a6d6b" fillOpacity="0.2" />
          </g>
          {/* Mini-Chart (Balkendiagramm) */}
          <g className="step4-pulse">
            <rect x="115" y="242" width="222" height="20" rx="4" fill="#1a1a1f" stroke="#5a6d6b" strokeWidth="0.5" strokeOpacity="0.3" />
            <rect x="125" y="248" width="25" height="8" rx="2" fill="url(#step4Teal)" fillOpacity="0.7" />
            <rect x="158" y="248" width="40" height="8" rx="2" fill="url(#step4Teal)" fillOpacity="0.5" />
            <rect x="206" y="248" width="30" height="8" rx="2" fill="url(#step4Teal)" fillOpacity="0.6" />
            <rect x="244" y="248" width="50" height="8" rx="2" fill="url(#step4Teal)" fillOpacity="0.4" />
          </g>
        </g>
      </svg>
    </div>
  )
}
