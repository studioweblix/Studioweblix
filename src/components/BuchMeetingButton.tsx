'use client'

import { useState } from 'react'
import { BookingModal } from './BookingModal'

export function BuchMeetingButton() {
  const [bookingOpen, setBookingOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setBookingOpen(true)}
        className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#5a6d6b] text-white font-semibold hover:bg-[#4A5D5B] transition-all hover:scale-105 uppercase tracking-wide"
      >
        Buch dein Meeting für deine Website
      </button>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
