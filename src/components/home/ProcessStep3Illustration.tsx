'use client'

export function ProcessStep3Illustration() {
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
              @keyframes step3PanelFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              @keyframes step3RocketFly {
                0%, 100% { transform: translateY(0); opacity: 1; }
                50% { transform: translateY(-12px); opacity: 0.95; }
              }
              @keyframes step3Smoke {
                0% { opacity: 0.5; transform: scale(1); }
                100% { opacity: 0.2; transform: scale(1.2); }
              }
              .step3-float { animation: step3PanelFloat 3s ease-in-out infinite; }
              .step3-float-delay { animation: step3PanelFloat 3.3s ease-in-out 0.4s infinite; }
              .step3-rocket { animation: step3RocketFly 2.5s ease-in-out infinite; }
              .step3-smoke { animation: step3Smoke 1.5s ease-out infinite alternate; }
            `}
          </style>
          <linearGradient id="step3Teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7d7b" />
            <stop offset="100%" stopColor="#6b7d7b" />
          </linearGradient>
        </defs>

        {/* Hintergrundform */}
        <ellipse cx="200" cy="150" rx="150" ry="130" fill="#6b7d7b" fillOpacity="0.06" />

        {/* Haupt-Browser-Fenster */}
        <g className="step3-float">
          <rect x="90" y="50" width="260" height="200" rx="8" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="90" y="50" width="260" height="28" rx="8" fill="url(#step3Teal)" fillOpacity="0.3" />
          <circle cx="108" cy="64" r="3.5" fill="#6b7d7b" />
          <circle cx="120" cy="64" r="3.5" fill="#6b7d7b" fillOpacity="0.9" />
          <circle cx="132" cy="64" r="3.5" fill="#6b7d7b" fillOpacity="0.9" />
          <text x="155" y="68" fill="#6b7d7b" fontSize="9" fontWeight="600">IHR LOGO</text>
          <rect x="230" y="58" width="100" height="16" rx="4" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="242" cy="66" r="3" fill="none" stroke="#6b7d7b" strokeWidth="0.8" strokeOpacity="0.7" />
          <text x="250" y="70" fill="#64748b" fontSize="7">www.ihre-domain.de</text>
          {/* Inhalt: Platzhalter-Linien */}
          <rect x="105" y="95" width="120" height="4" rx="1" fill="#6b7d7b" fillOpacity="0.25" />
          <rect x="105" y="108" width="90" height="4" rx="1" fill="#6b7d7b" fillOpacity="0.2" />
          <rect x="105" y="121" width="110" height="4" rx="1" fill="#6b7d7b" fillOpacity="0.15" />
          {/* Bild-Platzhalter 1 */}
          <rect x="105" y="135" width="95" height="55" rx="4" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 3" />
          <path d="M118 178 L132 162 L146 175 L160 158" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <circle cx="145" cy="162" r="8" fill="#6b7d7b" fillOpacity="0.25" />
          {/* Bild-Platzhalter 2 */}
          <rect x="210" y="135" width="95" height="55" rx="4" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 3" />
          <path d="M223 178 L237 162 L251 175 L265 158" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <circle cx="250" cy="162" r="8" fill="#6b7d7b" fillOpacity="0.25" />
          {/* Video-Player */}
          <rect x="105" y="200" width="200" height="38" rx="4" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="0.8" strokeOpacity="0.5" />
          <circle cx="125" cy="219" r="12" fill="url(#step3Teal)" fillOpacity="0.6" />
          <path d="M121 213 L121 225 L129 219 Z" fill="white" fillOpacity="0.9" />
          <rect x="150" y="212" width="140" height="6" rx="2" fill="#6b7d7b" fillOpacity="0.2" />
          <rect x="150" y="212" width="70" height="6" rx="2" fill="url(#step3Teal)" fillOpacity="0.5" />
        </g>

        {/* Kleineres Checklisten-Fenster */}
        <g className="step3-float-delay" style={{ transformOrigin: '100px 170px' }}>
          <rect x="45" y="100" width="140" height="130" rx="8" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="45" y="100" width="140" height="24" rx="8" fill="url(#step3Teal)" fillOpacity="0.25" />
          <circle cx="62" cy="112" r="3" fill="#6b7d7b" fillOpacity="0.8" />
          <circle cx="72" cy="112" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          <circle cx="82" cy="112" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          {/* Checkboxen: 3 mit Haken, 1 leer */}
          <rect x="58" y="138" width="14" height="14" rx="2" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
          <path d="M61 145 L65 149 L73 140" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="95" y="138" width="14" height="14" rx="2" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
          <path d="M98 145 L102 149 L110 140" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="132" y="138" width="14" height="14" rx="2" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
          <path d="M135 145 L139 149 L147 140" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="169" y="138" width="14" height="14" rx="2" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="58" y="162" width="60" height="4" rx="1" fill="#6b7d7b" fillOpacity="0.2" />
          <rect x="58" y="172" width="45" height="4" rx="1" fill="#6b7d7b" fillOpacity="0.15" />
          {/* Bild-Platzhalter im kleinen Fenster */}
          <rect x="58" y="188" width="80" height="32" rx="3" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M68 210 L78 198 L88 207" stroke="#6b7d7b" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
        </g>

        {/* Rakete (startend) */}
        <g className="step3-rocket" style={{ transformOrigin: '320px 240px' }}>
          <ellipse cx="320" cy="248" rx="20" ry="12" fill="#6b7d7b" fillOpacity="0.2" className="step3-smoke" />
          <ellipse cx="318" cy="244" rx="12" ry="8" fill="#6b7d7b" fillOpacity="0.15" className="step3-smoke" />
          <path d="M305 205 L305 248 L315 248 L335 248 L335 205 L320 185 Z" fill="#f5f5f7" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.7" />
          <circle cx="320" cy="218" r="10" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="320" cy="218" r="5" fill="#6b7d7b" fillOpacity="0.5" />
          <path d="M305 248 L315 265 L320 258 L325 265 L335 248" fill="#6b7d7b" fillOpacity="0.8" stroke="#6b7d7b" strokeWidth="0.5" />
        </g>

        {/* Zahnrad-Icon */}
        <g className="step3-float" style={{ transformOrigin: '340px 75px' }}>
          <path d="M340 65 L342 72 L349 72 L343 77 L345 84 L340 80 L335 84 L337 77 L331 72 L338 72 Z" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.7" strokeLinejoin="round" />
          <circle cx="340" cy="74" r="4" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
        </g>

        {/* Briefumschlag-Icon */}
        <g className="step3-float-delay" style={{ transformOrigin: '130px 245px' }}>
          <rect x="110" y="232" width="40" height="28" rx="2" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M110 235 L130 248 L150 235" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.7" fill="none" />
        </g>
      </svg>
    </div>
  )
}
