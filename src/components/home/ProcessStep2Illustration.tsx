'use client'

export function ProcessStep2Illustration() {
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
              @keyframes step2PanelFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              @keyframes step2CursorClick {
                0%, 90%, 100% { transform: scale(1); }
                92% { transform: scale(0.85); }
                94% { transform: scale(1.05); }
                96% { transform: scale(0.95); }
              }
              @keyframes step2IconFloat {
                0%, 100% { transform: translateY(0); opacity: 1; }
                50% { transform: translateY(-5px); opacity: 0.95; }
              }
              .step2-float { animation: step2PanelFloat 3s ease-in-out infinite; }
              .step2-float-delay { animation: step2PanelFloat 3.4s ease-in-out 0.5s infinite; }
              .step2-click { animation: step2CursorClick 2.5s ease-in-out infinite; }
              .step2-icon { animation: step2IconFloat 2.6s ease-in-out infinite; }
            `}
          </style>
          <linearGradient id="step2Teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7d7b" />
            <stop offset="100%" stopColor="#6b7d7b" />
          </linearGradient>
        </defs>

        {/* Leichte Hintergrundform */}
        <ellipse cx="220" cy="150" rx="140" ry="120" fill="#6b7d7b" fillOpacity="0.06" />

        {/* Browser-Titelleiste mit Traffic Lights */}
        <g className="step2-float">
          <rect x="55" y="25" width="290" height="48" rx="8" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="55" y="25" width="290" height="20" rx="8" fill="url(#step2Teal)" fillOpacity="0.3" />
          <circle cx="72" cy="35" r="4" fill="#6b7d7b" />
          <circle cx="84" cy="35" r="4" fill="#6b7d7b" fillOpacity="0.8" />
          <circle cx="96" cy="35" r="4" fill="#6b7d7b" fillOpacity="0.9" />
          {/* Tabs */}
          <rect x="115" y="38" width="42" height="10" rx="2" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="0.5" strokeOpacity="0.6" />
          <text x="127" y="46" fill="#6b7d7b" fontSize="8" textAnchor="middle">&lt;/&gt;</text>
          <rect x="160" y="38" width="32" height="10" rx="2" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="165" y1="41" x2="165" y2="46" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="172" y1="41" x2="172" y2="46" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          {/* Suchleiste */}
          <rect x="210" y="42" width="120" height="24" rx="6" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="222" cy="54" r="4" fill="none" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="220" y1="54" x2="226" y2="54" stroke="#6b7d7b" strokeOpacity="0.6" strokeWidth="1" />
          <path d="M218 56 L224 50" stroke="#6b7d7b" strokeOpacity="0.6" strokeWidth="0.8" />
        </g>

        {/* Code-Editor-Fenster */}
        <g className="step2-float-delay" style={{ transformOrigin: '130px 145px' }}>
          <rect x="45" y="82" width="175" height="155" rx="6" fill="#0c0c0f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="45" y="82" width="175" height="22" rx="6" fill="url(#step2Teal)" fillOpacity="0.15" />
          <circle cx="60" cy="93" r="3" fill="#6b7d7b" fillOpacity="0.7" />
          <circle cx="70" cy="93" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          <circle cx="80" cy="93" r="3" fill="#6b7d7b" fillOpacity="0.5" />
          <text x="58" y="112" fill="#6b7d7b" fontSize="7" fontFamily="ui-monospace, monospace">1  (function (ko, datacontext) {"{"}</text>
          <text x="58" y="125" fill="#94a3b8" fontSize="7" fontFamily="ui-monospace, monospace">2  {"<"}div style=background-image:url</text>
          <text x="58" y="138" fill="#64748b" fontSize="7" fontFamily="ui-monospace, monospace">3    background, text-todoitem;</text>
          <text x="58" y="151" fill="#94a3b8" fontSize="7" fontFamily="ui-monospace, monospace">4    height: 200px;</text>
          <text x="58" y="164" fill="#6b7d7b" fontSize="7" fontFamily="ui-monospace, monospace">5  {"<"}p{">"}The image can be tiled</text>
          <text x="58" y="177" fill="#64748b" fontSize="7" fontFamily="ui-monospace, monospace">6  // persisted properties</text>
          <text x="58" y="190" fill="#94a3b8" fontSize="7" fontFamily="ui-monospace, monospace">7  font-weight:bold; HTML</text>
          <text x="58" y="203" fill="#64748b" fontSize="7" fontFamily="ui-monospace, monospace">8  background-color: yellow</text>
        </g>

        {/* CSS-Label */}
        <g className="step2-float" style={{ transformOrigin: '268px 128px' }}>
          <rect x="240" y="105" width="58" height="32" rx="6" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.6" />
          <text x="269" y="126" fill="#6b7d7b" fontSize="13" fontWeight="700" textAnchor="middle">CSS</text>
        </g>

        {/* Bild-Platzhalter (gestrichelt + Landschaft) */}
        <g className="step2-icon" style={{ transformOrigin: '295px 155px' }}>
          <rect x="248" y="148" width="110" height="75" rx="6" fill="#0c0c0f" fillOpacity="0.5" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="8 5" />
          {/* Berge */}
          <path d="M260 205 L280 175 L300 195 L320 165 L340 195" stroke="#6b7d7b" strokeWidth="2" strokeOpacity="0.5" fill="none" />
          <path d="M270 205 L290 180 L310 200" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          {/* Sonne */}
          <circle cx="315" cy="172" r="14" fill="#6b7d7b" fillOpacity="0.35" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.6" />
        </g>

        {/* HTML-Label */}
        <g className="step2-float-delay" style={{ transformOrigin: '305px 248px' }}>
          <rect x="268" y="235" width="74" height="28" rx="6" fill="url(#step2Teal)" fillOpacity="0.95" />
          <text x="305" y="253" fill="white" fontSize="12" fontWeight="700" textAnchor="middle">HTML</text>
        </g>

        {/* Unteres Fenster (Profil + Upload) */}
        <g className="step2-float" style={{ transformOrigin: '115px 268px' }}>
          <rect x="50" y="255" width="130" height="38" rx="6" fill="#1a1a1f" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="85" cy="274" r="11" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="85" cy="272" r="3.5" fill="#6b7d7b" fillOpacity="0.9" />
          <path d="M81 278 Q85 283 89 278" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.9" fill="none" />
          <line x1="105" y1="262" x2="105" y2="286" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="120" y1="270" x2="155" y2="270" stroke="#6b7d7b" strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="120" y1="278" x2="140" y2="278" stroke="#6b7d7b" strokeOpacity="0.3" strokeWidth="0.8" />
          <path d="M162 268 L162 282 L157 277 L162 282 L167 277 Z" fill="none" stroke="#6b7d7b" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* Cursor mit Klick-Effekt */}
        <g className="step2-click" style={{ transformOrigin: '328px 58px' }}>
          <path d="M318 43 L318 72 L321 69 L324 76 L327 72 L331 76 L334 70 L331 66 L334 62 L328 62 Z" fill="#f5f5f7" stroke="#6b7d7b" strokeWidth="1" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  )
}
