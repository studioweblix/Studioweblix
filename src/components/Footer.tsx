import Link from 'next/link'
import { StudioWeblixLogo } from './StudioWeblixLogo'
import type { Settings } from '@/lib/types'

interface FooterProps {
  settings: Settings | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Footer({ settings }: FooterProps) {
  return (
    <footer className="relative bg-[#4A5D5B] overflow-hidden">
      {/* Dezente diagonale Textur */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(0,0,0,0.08) 20px,
            rgba(0,0,0,0.08) 40px
          )`,
        }}
      />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          <Link
            href="/#so-funktionierts"
            className="text-white/90 hover:text-white transition-colors"
          >
            So funktioniert&apos;s
          </Link>
          <Link
            href="/preis"
            className="text-white/90 hover:text-white transition-colors"
          >
            Angebot
          </Link>
          <Link
            href="/kontakt"
            className="text-white/90 hover:text-white transition-colors"
          >
            Kontakt
          </Link>
        </nav>

        {/* Logo (Mitte) */}
        <Link
          href="/"
          className="flex items-center justify-center shrink-0 order-first md:order-none"
        >
          <span className="block [&_svg]:brightness-0 [&_svg]:invert">
            <StudioWeblixLogo className="h-10 w-auto" />
          </span>
        </Link>

        {/* Rechts: Impressum, Datenschutz, AGB */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/impressum"
            className="text-white/90 hover:text-white transition-colors"
          >
            Impressum
          </Link>
          <span className="text-white/50">|</span>
          <Link
            href="/datenschutz"
            className="text-white/90 hover:text-white transition-colors"
          >
            Datenschutz
          </Link>
          <span className="text-white/50">|</span>
          <Link
            href="/agb"
            className="text-white/90 hover:text-white transition-colors"
          >
            AGB
          </Link>
        </nav>
      </div>
    </footer>
  )
}
