'use client'

import { useState } from 'react'
import { BookingModal } from './BookingModal'

export function ProjektStartenCTA() {
  const [bookingOpen, setBookingOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setBookingOpen(true)}
        className="inline-block px-10 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:border-white/30 hover:bg-white/15 transition-colors"
      >
        Projekt starten
      </button>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
