'use client'

import Link from 'next/link'

export function ProjektStartenCTA() {
  return (
    <Link
      href="/formular"
      className="inline-block px-10 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:border-white/30 hover:bg-white/15 transition-colors"
    >
      Projekt starten
    </Link>
  )
}
