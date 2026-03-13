'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { StudioWeblixLogo } from './StudioWeblixLogo'

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? ''

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const WOCHENTAGE_LANG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function endZeit(start: string): string {
  const [h, m] = start.split(':').map(Number)
  const endMin = h * 60 + m + 30
  const eh = Math.floor(endMin / 60)
  const em = endMin % 60
  return `${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`
}

function formatTerminDatum(d: Date): string {
  const wochentag = WOCHENTAGE_LANG[d.getDay()]
  return `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}`
}

function getKalenderTage(year: number, month: number): (Date | null)[] {
  const erster = new Date(year, month, 1)
  const letzter = new Date(year, month + 1, 0)
  const startWo = (erster.getDay() + 6) % 7
  const tage: (Date | null)[] = []
  for (let i = 0; i < startWo; i++) tage.push(null)
  for (let d = 1; d <= letzter.getDate(); d++) tage.push(new Date(year, month, d))
  return tage
}

function isGleicherTag(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isVergangen(d: Date): boolean {
  const heute = new Date()
  heute.setHours(0, 0, 0, 0)
  return d < heute
}

function zeitslots(): string[] {
  const slots: string[] = []
  for (let h = 9; h <= 17; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    if (h < 17) slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  return slots
}

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

interface BookingDetailsFormProps {
  selectedDate: Date
  selectedTime: string
  onClose: () => void
}

function BookingDetailsForm({ selectedDate, selectedTime, onClose }: BookingDetailsFormProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#2C4B44] overflow-auto">
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Geben Sie Details an</h3>
        <form
          action="/kontakt"
          method="get"
          className="space-y-4"
          onSubmit={() => onClose()}
        >
          <input type="hidden" name="datum" value={selectedDate.toISOString().slice(0, 10)} />
          <input type="hidden" name="zeit" value={selectedTime} />
          <div>
            <label htmlFor="booking-name" className="block text-white/90 text-sm font-medium mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="booking-name"
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent"
              placeholder="Ihr Name"
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="block text-white/90 text-sm font-medium mb-1.5">
              E-Mail-Adresse <span className="text-red-400">*</span>
            </label>
            <input
              id="booking-email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent"
              placeholder="ihre@email.de"
            />
          </div>
          <div>
            <label htmlFor="booking-phone" className="block text-white/90 text-sm font-medium mb-1.5">
              Ihre Telefonnummer <span className="text-red-400">*</span>
            </label>
            <div className="flex rounded-xl overflow-hidden border border-white/20 bg-white/10 focus-within:ring-2 focus-within:ring-[#5a6d6b]">
              <span className="flex items-center gap-1.5 px-4 py-3 text-white/80 text-sm border-r border-white/20 bg-white/5">
                <span className="text-base">🇩🇪</span> +49
              </span>
              <input
                id="booking-phone"
                type="tel"
                name="telefon"
                required
                className="flex-1 min-w-0 px-4 py-3 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
                placeholder="123 456789"
              />
            </div>
          </div>
          <div>
            <label htmlFor="booking-wish" className="block text-white/90 text-sm font-medium mb-1.5">
              Einblick in Ihr Unternehmen für eine Demo-Website
            </label>
            <textarea
              id="booking-wish"
              name="nachricht"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:border-transparent resize-none"
              placeholder="Erzählen Sie uns kurz von Ihrem Projekt …"
            />
          </div>
          <p className="text-white/60 text-xs leading-relaxed">
            Indem Sie fortfahren, bestätigen Sie, dass Sie die{' '}
            <Link href="/datenschutz" onClick={onClose} className="text-[#5a6d6b] hover:text-white underline">
              Datenschutzerklärung
            </Link>
            {' '}gelesen und akzeptiert haben.
          </p>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#5a6d6b] text-white text-sm font-semibold hover:bg-[#4A5D5B] transition-colors"
          >
            Termin buchen
          </button>
          <p className="text-white/50 text-xs text-center">
            Sie werden zur Kontaktseite weitergeleitet.
          </p>
        </form>
      </div>
    </div>
  )
}

type Step = 'calendar' | 'details'

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('calendar')
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStep('calendar')
      setSelectedDate(null)
      setSelectedTime(null)
    }
  }, [open])

  const kalenderTage = useMemo(
    () => getKalenderTage(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  )
  const slots = useMemo(() => zeitslots(), [])

  const prevMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1))
  const nextMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1))

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center p-4 overflow-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Ablauf buchen"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C4B44]/95"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      {/* Modal: mittig zentriert, zwei Spalten */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] my-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row bg-[#243d38] shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {!bookingUrl && step === 'details' && selectedDate && selectedTime ? (
          <>
            {/* Schritt 2: Linke Spalte – Zusammenfassung + Zurück */}
            <div className="w-full md:w-[42%] flex flex-col p-6 md:p-8 bg-[#243d38] border-b md:border-b-0 md:border-r border-white/10 overflow-auto">
              <button
                type="button"
                onClick={() => setStep('calendar')}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors -ml-1"
                aria-label="Zurück zur Terminauswahl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
              </button>
              <div className="flex justify-center md:justify-start mb-6">
                <StudioWeblixLogo className="h-9 w-auto text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Ablauf</h2>
              <p className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                20 min
              </p>
              <p className="flex items-center gap-2 text-white/90 text-sm mb-1">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedTime} – {endZeit(selectedTime)}, {WOCHENTAGE_LANG[selectedDate.getDay()]}, {formatTerminDatum(selectedDate)}
              </p>
              <p className="flex items-center gap-2 text-white/70 text-sm mb-6">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 0010.5-4.065M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mitteleuropäische Zeit
              </p>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Nach Ihrer Buchung erhalten Sie automatisch eine E-Mail mit einem Google Meet Link zu Ihrem persönlichen Beratungsgespräch. Im Call lernen wir uns kennen, besprechen Ihre Wünsche und Anforderungen und zeigen Ihnen eine Demo-Website, damit Sie sich ein klares Bild davon machen können, wie Ihr neuer Webauftritt aussehen wird. Anschließend klären wir alle offenen Fragen zu Ablauf, Zeitplan und Leistungen – transparent und unverbindlich.
              </p>
              <div className="mt-auto pt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link href="/datenschutz" onClick={onClose} className="text-[#5a6d6b] hover:text-white transition-colors underline">
                  Cookie-Einstellungen
                </Link>
                <Link href="/datenschutz" onClick={onClose} className="text-[#5a6d6b] hover:text-white transition-colors underline">
                  Datenschutzerklärung
                </Link>
              </div>
            </div>

            {/* Rechte Spalte – Formular "Geben Sie Details an" */}
            <BookingDetailsForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onClose={onClose}
            />
          </>
        ) : (
          <>
            {/* Linke Spalte – Infos (Website-Farben) */}
            <div className="w-full md:w-[42%] flex flex-col p-6 md:p-8 bg-[#243d38] border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex justify-center md:justify-start mb-6">
                <StudioWeblixLogo className="h-9 w-auto text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                Ablauf
              </h2>
              <p className="flex items-center gap-2 text-white/70 text-sm mb-6">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                20 min
              </p>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Nach Ihrer Buchung erhalten Sie automatisch eine E-Mail mit einem Google Meet Link zu Ihrem persönlichen Beratungsgespräch. Im Call lernen wir uns kennen, besprechen Ihre Wünsche und Anforderungen und zeigen Ihnen eine Demo-Website, damit Sie sich ein klares Bild davon machen können, wie Ihr neuer Webauftritt aussehen wird. Anschließend klären wir alle offenen Fragen zu Ablauf, Zeitplan und Leistungen – transparent und unverbindlich.
              </p>
              <div className="mt-auto pt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link href="/datenschutz" onClick={onClose} className="text-[#5a6d6b] hover:text-white transition-colors underline">
                  Cookie-Einstellungen
                </Link>
                <Link href="/datenschutz" onClick={onClose} className="text-[#5a6d6b] hover:text-white transition-colors underline">
                  Datenschutzerklärung
                </Link>
              </div>
            </div>

            {/* Rechte Spalte – Datum & Uhrzeit / iframe */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#2C4B44]">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Datum & Uhrzeit wählen</h3>
              </div>
              <div className="flex-1 min-h-[50vh] md:min-h-[65vh]">
                {bookingUrl ? (
                  <iframe
                    src={bookingUrl}
                    title="Termin buchen"
                    className="w-full h-full min-h-[50vh] border-0"
                    allow="camera; microphone; fullscreen"
                  />
                ) : (
                  <div className="flex flex-col md:flex-row h-full min-h-[50vh]">
                    <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Vorheriger Monat"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-white font-medium">
                          {MONATE[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Nächster Monat"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {WOCHENTAGE.map((tag) => (
                          <div key={tag} className="text-center text-white/60 text-xs font-medium py-1">
                            {tag}
                          </div>
                        ))}
                        {kalenderTage.map((tag, i) => (
                          <button
                            key={tag ? tag.toISOString() : i}
                            type="button"
                            disabled={!tag || isVergangen(tag)}
                            onClick={() => tag && !isVergangen(tag) && setSelectedDate(tag)}
                            className={`
                              aspect-square rounded-lg text-sm font-medium transition-colors
                              ${!tag ? 'invisible' : ''}
                              ${tag && isVergangen(tag) ? 'text-white/30 cursor-not-allowed' : 'text-white hover:bg-white/15'}
                              ${tag && selectedDate && isGleicherTag(tag, selectedDate) ? 'bg-[#5a6d6b] text-white ring-2 ring-white/30' : ''}
                            `}
                          >
                            {tag ? tag.getDate() : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-56 lg:w-64 p-4 md:p-6 flex flex-col bg-[#243d38]/80">
                      <p className="text-white/80 text-sm mb-3">
                        {selectedDate
                          ? `${selectedDate.getDate()}. ${MONATE[selectedDate.getMonth()]} – Uhrzeit wählen`
                          : 'Bitte zuerst ein Datum wählen'}
                      </p>
                      <div className="grid grid-cols-2 gap-2 overflow-auto flex-1 min-h-0">
                        {selectedDate
                          ? slots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                className={`
                                  py-2 px-3 rounded-lg text-sm font-medium transition-colors
                                  ${selectedTime === slot ? 'bg-[#5a6d6b] text-white' : 'bg-white/10 text-white hover:bg-white/20'}
                                `}
                              >
                                {slot}
                              </button>
                            ))
                          : null}
                      </div>
                      {(selectedDate && selectedTime) && (
                        <button
                          type="button"
                          onClick={() => setStep('details')}
                          className="mt-4 w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#5a6d6b] text-white text-sm font-semibold hover:bg-[#4A5D5B] transition-colors"
                        >
                          Termin am {selectedDate.getDate()}. {MONATE[selectedDate.getMonth()]} um {selectedTime} – Call buchen
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Schließen-Button oben rechts */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
          aria-label="Schließen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
