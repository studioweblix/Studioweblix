'use client'

export function ProcessIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Animations */}
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
              @keyframes rocketFly {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 1; }
                25% { transform: translateY(-8px) translateX(2px); opacity: 0.95; }
                50% { transform: translateY(-4px) translateX(-1px); opacity: 1; }
                75% { transform: translateY(-12px) translateX(1px); opacity: 0.9; }
              }
              .animate-panel-float { animation: panelFloat 3s ease-in-out infinite; }
              .animate-panel-float-delay { animation: panelFloat 3.5s ease-in-out 0.5s infinite; }
              .animate-cursor-click { animation: cursorClick 2.5s ease-in-out infinite; }
              .animate-rocket-1 { animation: rocketFly 2.5s ease-in-out infinite; }
              .animate-rocket-2 { animation: rocketFly 2.5s ease-in-out 0.4s infinite; }
              .animate-rocket-3 { animation: rocketFly 2.5s ease-in-out 0.8s infinite; }
            `}
          </style>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a6d6b" />
            <stop offset="100%" stopColor="#5a6d6b" />
          </linearGradient>
        </defs>

        {/* Main browser window - base */}
        <g className="animate-panel-float">
          <rect
            x="40"
            y="20"
            width="320"
            height="200"
            rx="8"
            fill="#1a1a1f"
            stroke="#5a6d6b"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          {/* Browser header bar */}
          <rect x="40" y="20" width="320" height="28" rx="8" fill="url(#tealGrad)" fillOpacity="0.3" />
          <rect x="40" y="48" width="320" height="12" fill="#5a6d6b" fillOpacity="0.2" />
          <circle cx="55" cy="34" r="4" fill="#5a6d6b" fillOpacity="0.8" />
          <circle cx="68" cy="34" r="4" fill="#5a6d6b" fillOpacity="0.5" />
          <circle cx="81" cy="34" r="4" fill="#5a6d6b" fillOpacity="0.5" />
          <rect x="100" y="70" width="120" height="6" rx="2" fill="#5a6d6b" fillOpacity="0.4" />
          <rect x="100" y="85" width="80" height="6" rx="2" fill="#5a6d6b" fillOpacity="0.25" />
          <rect x="100" y="100" width="100" height="6" rx="2" fill="#5a6d6b" fillOpacity="0.2" />
        </g>

        {/* Left panel - review card */}
        <g className="animate-panel-float-delay" style={{ transformOrigin: '80px 150px' }}>
          <rect
            x="55"
            y="90"
            width="120"
            height="95"
            rx="6"
            fill="#0c0c0f"
            stroke="#5a6d6b"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <circle cx="95" cy="115" r="12" fill="none" stroke="#5a6d6b" strokeWidth="1.5" strokeOpacity="0.8" />
          <circle cx="95" cy="112" r="4" fill="#5a6d6b" fillOpacity="0.8" />
          <path d="M88 120 Q95 125 102 120" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.8" fill="none" />
          {/* 5 stars */}
          {[82, 92, 102, 112, 122].map((x, i) => (
            <path
              key={i}
              d={`M${x} 132 l2 4 4 0-3 2.5 1 4-3.5-2.5-3.5 2.5 1-4-3-2.5 4 0z`}
              fill="#5a6d6b"
              fillOpacity="0.9"
            />
          ))}
          {/* Rockets with flying effect */}
          <g className="animate-rocket-1" style={{ transformOrigin: '75px 165px' }}>
            <ellipse cx="70" cy="162" rx="8" ry="12" fill="#5a6d6b" fillOpacity="0.3" />
            <path d="M62 155 L78 155 L80 168 L76 175 L72 175 L70 168 Z" fill="#f5f5f7" stroke="#5a6d6b" strokeWidth="1" />
            <circle cx="70" cy="162" r="3" fill="#5a6d6b" />
            <path d="M68 175 L70 182 L72 175" fill="#5a6d6b" fillOpacity="0.8" />
          </g>
          <g className="animate-rocket-2" style={{ transformOrigin: '85px 170px' }}>
            <ellipse cx="82" cy="168" rx="6" ry="10" fill="#5a6d6b" fillOpacity="0.25" />
            <path d="M76 162 L88 162 L89 173 L86 178 L83 178 L82 173 Z" fill="#f5f5f7" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.9" />
            <circle cx="82" cy="168" r="2" fill="#5a6d6b" />
            <path d="M80 178 L82 183 L84 178" fill="#5a6d6b" fillOpacity="0.7" />
          </g>
          <g className="animate-rocket-3" style={{ transformOrigin: "95px 175px" }}>
            <ellipse cx="92" cy="173" rx="5" ry="8" fill="#5a6d6b" fillOpacity="0.2" />
            <path d="M87 168 L97 168 L98 177 L95 181 L92 181 L91 177 Z" fill="#f5f5f7" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.8" />
            <circle cx="92" cy="173" r="2" fill="#5a6d6b" />
            <path d="M90 181 L92 185 L94 181" fill="#5a6d6b" fillOpacity="0.6" />
          </g>
        </g>

        {/* Right panel */}
        <g className="animate-panel-float" style={{ transformOrigin: '280px 140px' }}>
          <rect
            x="225"
            y="75"
            width="120"
            height="100"
            rx="6"
            fill="#0c0c0f"
            stroke="#5a6d6b"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <rect x="225" y="75" width="120" height="20" rx="6" fill="url(#tealGrad)" fillOpacity="0.2" />
          <circle cx="240" cy="85" r="3" fill="#5a6d6b" fillOpacity="0.7" />
          <circle cx="250" cy="85" r="3" fill="#5a6d6b" fillOpacity="0.5" />
          <circle cx="260" cy="85" r="3" fill="#5a6d6b" fillOpacity="0.5" />
          <circle cx="255" cy="115" r="15" fill="none" stroke="#5a6d6b" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="255" cy="112" r="5" fill="#5a6d6b" fillOpacity="0.6" />
          <path d="M248 122 Q255 128 262 122" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.6" fill="none" />
          <circle cx="315" cy="115" r="12" fill="none" stroke="#5a6d6b" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="315" cy="112" r="4" fill="#5a6d6b" fillOpacity="0.5" />
          <rect x="240" y="140" width="60" height="4" rx="1" fill="#5a6d6b" fillOpacity="0.3" />
          <rect x="250" y="150" width="40" height="4" rx="1" fill="#5a6d6b" fillOpacity="0.2" />
        </g>

        {/* CTA Button */}
        <g className="animate-panel-float-delay" style={{ transformOrigin: '200px 250px' }}>
          <rect
            x="100"
            y="230"
            width="200"
            height="36"
            rx="8"
            fill="url(#tealGrad)"
            fillOpacity="0.9"
          />
          <text
            x="200"
            y="253"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="600"
            letterSpacing="0.5"
          >
            BERATUNG BUCHEN
          </text>
        </g>

        {/* Cursor mit Klick-Effekt – zentriert auf dem Button */}
        <g className="animate-cursor-click" style={{ transformOrigin: '200px 248px', transform: 'translate(55, 6)' }}>
          <path
            d="M125 228 L125 255 L128 255 L131 248 L135 252 L138 246 L142 250 L145 242 L142 238 L138 238 Z"
            fill="#f5f5f7"
            stroke="#5a6d6b"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
        </g>

        {/* Phone icon */}
        <g>
          <path
            d="M315 248 L315 258 L318 262 L322 262 L325 258 L325 248 L322 244 L318 244 Z"
            fill="none"
            stroke="#5a6d6b"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <path d="M319 247 L319 251 M317 249 L321 249" stroke="#5a6d6b" strokeWidth="0.8" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  )
}
