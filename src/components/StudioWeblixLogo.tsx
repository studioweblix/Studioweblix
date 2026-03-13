type StudioWeblixLogoProps = { className?: string; variant?: 'light' | 'dark' }

export function StudioWeblixLogo({ className = 'h-12', variant = 'light' }: StudioWeblixLogoProps) {
  const fill = variant === 'dark' ? '#2C4B44' : '#f5f5f7'

  return (
    <svg
      viewBox="0 0 200 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Links: vertikal gestapelt WEB / DES / IGN, nah an Studio Weblix */}
      <text
        x="12"
        y="18"
        fill={fill}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.2em"
      >
        WEB
      </text>
      <text
        x="12"
        y="32"
        fill={fill}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.2em"
      >
        DES
      </text>
      <text
        x="12"
        y="46"
        fill={fill}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.2em"
      >
        IGN
      </text>

      {/* Oben: STUDIO (groß, bold, wie „sumi“) */}
      <text
        x="36"
        y="28"
        fill={fill}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        Studio
      </text>

      {/* Darunter, leicht eingerückt: Weblix (kursiv, schlicht wie „studio“) */}
      <text
        x="34"
        y="48"
        fill={fill}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontStyle="italic"
        fontWeight="400"
      >
        Weblix
      </text>
    </svg>
  )
}
