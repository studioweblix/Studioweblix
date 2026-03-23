'use client'

import Link from 'next/link'

export function BuchMeetingButton() {
  return (
    <Link
      href="/formular"
      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#5a6d6b] text-white font-semibold hover:bg-[#4A5D5B] transition-all hover:scale-105 uppercase tracking-wide"
    >
      Buch dein Meeting für deine Website
    </Link>
  )
}
