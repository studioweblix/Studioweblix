'use client'

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto aspect-[4/3] flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              @keyframes panelFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              @keyframes cursorClick {
                0%, 90%, 100% { transform: scale(1); }
                92% { transform: scale(0.85); }
                94% { transform: scale(1.05); }
                96% { transform: scale(0.95); }
              }
              @keyframes iconFloat {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 1; }
                50% { transform: translateY(-6px) translateX(2px); opacity: 0.9; }
              }
              .animate-panel-float { animation: panelFloat 3s ease-in-out infinite; }
              .animate-panel-float-delay { animation: panelFloat 3.5s ease-in-out 0.5s infinite; }
              .animate-cursor-click { animation: cursorClick 2.5s ease-in-out infinite; }
              .animate-icon-float { animation: iconFloat 2.8s ease-in-out infinite; }
              .animate-icon-float-delay { animation: iconFloat 2.8s ease-in-out 0.7s infinite; }
            `}
          </style>
          <linearGradient id="heroTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a6d6b" />
            <stop offset="100%" stopColor="#5a6d6b" />
          </linearGradient>
        </defs>

        {/* Hintergrund-Form (helle blaue/teal Form) */}
        <ellipse cx="240" cy="160" rx="160" ry="140" fill="#6b7d7b" fillOpacity="0.08" />

        {/* Oberes Browser-Fenster */}
        <g className="animate-panel-float">
          <rect x="60" y="30" width="280" height="50" rx="6" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="60" y="30" width="280" height="22" rx="6" fill="url(#heroTealGrad)" fillOpacity="0.25" />
          <circle cx="75" cy="41" r="3" fill="#6b7d7b" fillOpacity="0.7" />
          <circle cx="85" cy="41" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          <circle cx="95" cy="41" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          <rect x="320" y="34" width="12" height="12" rx="2" fill="#6b7d7b" fillOpacity="0.4" />
          <circle cx="326" cy="40" r="2.5" fill="#6b7d7b" fillOpacity="0.6" />
          <rect x="115" y="55" width="100" height="6" rx="1" fill="#6b7d7b" fillOpacity="0.3" />
          <rect x="70" cy="55" width="20" height="6" rx="1" fill="#6b7d7b" fillOpacity="0.4" />
          <text x="200" y="63" fill="#6b7d7b" fontSize="10" fontWeight="600">&lt;/&gt;</text>
        </g>

        {/* Code-Editor-Fenster */}
        <g className="animate-panel-float-delay" style={{ transformOrigin: '140px 160px' }}>
          <rect x="50" y="95" width="180" height="140" rx="6" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="50" y="95" width="180" height="24" rx="6" fill="url(#heroTealGrad)" fillOpacity="0.2" />
          <circle cx="65" cy="107" r="3" fill="#6b7d7b" fillOpacity="0.6" />
          <circle cx="75" cy="107" r="3" fill="#6b7d7b" fillOpacity="0.4" />
          <circle cx="85" cy="107" r="3" fill="#6b7d7b" fillOpacity="0.4" />
          <text x="65" y="125" fill="#6b7d7b" fontSize="8" fontFamily="monospace">1  function (ko, datacontext) {"{"}</text>
          <text x="65" y="138" fill="#94a3b8" fontSize="8" fontFamily="monospace">2  {"<"}div style=background-image</text>
          <text x="65" y="151" fill="#64748b" fontSize="8" fontFamily="monospace">3    background, text-todoitem;</text>
          <text x="65" y="164" fill="#94a3b8" fontSize="8" fontFamily="monospace">4    height: 200px;</text>
          <text x="65" y="177" fill="#6b7d7b" fontSize="8" fontFamily="monospace">5  {"<"}p{">"}The image can be tiled</text>
          <text x="65" y="190" fill="#64748b" fontSize="8" fontFamily="monospace">6  // persisted properties</text>
          <text x="65" y="203" fill="#94a3b8" fontSize="8" fontFamily="monospace">7  font-weight:bold; HTML</text>
          <text x="65" y="216" fill="#64748b" fontSize="8" fontFamily="monospace">8  background-color: yellow</text>
        </g>

        {/* CSS-Label */}
        <g className="animate-panel-float" style={{ transformOrigin: '270px 150px' }}>
          <rect x="245" y="110" width="55" height="28" rx="4" fill="#334155" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <text x="261" y="129" fill="#94a3b8" fontSize="12" fontWeight="700">CSS</text>
        </g>

        {/* Bild-Platzhalter (gestrichelter Rahmen + Landschaft) */}
        <g className="animate-icon-float" style={{ transformOrigin: '310px 130px' }}>
          <rect x="250" y="150" width="100" height="70" rx="4" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="6 4" />
          <path d="M265 195 L280 175 L295 190 L310 165 L325 185 L340 170" stroke="#6b7d7b" strokeWidth="2" strokeOpacity="0.5" fill="none" />
          <circle cx="305" cy="168" r="12" fill="#6b7d7b" fillOpacity="0.4" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
        </g>

        {/* HTML-Label */}
        <g className="animate-panel-float-delay" style={{ transformOrigin: '300px 245px' }}>
          <rect x="265" y="232" width="70" height="24" rx="4" fill="url(#heroTealGrad)" fillOpacity="0.9" />
          <text x="285" y="249" fill="white" fontSize="11" fontWeight="700">HTML</text>
        </g>

        {/* Unteres UI-Fenster (Profile + Upload) */}
        <g className="animate-panel-float" style={{ transformOrigin: '120px 265px' }}>
          <rect x="55" y="248" width="120" height="40" rx="6" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="90" cy="268" r="12" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="90" cy="266" r="4" fill="#6b7d7b" fillOpacity="0.8" />
          <path d="M85 273 Q90 278 95 273" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" fill="none" />
          <path d="M150 260 L150 276 L145 271 L150 276 L155 271 Z" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.7" />
        </g>

        {/* Cursor mit Klick-Effekt (auf Suchleiste) */}
        <g className="animate-cursor-click" style={{ transformOrigin: '300px 45px' }}>
          <path d="M295 30 L295 58 L298 55 L301 62 L304 58 L308 62 L311 56 L308 52 L311 48 L305 48 Z" fill="#f5f5f7" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  )
}
