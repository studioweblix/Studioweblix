'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitForm } from '@/app/formular/actions'

const STEPS = [
  'Datum & Uhrzeit wählen',
  'Unternehmensdaten',
  'Design & Stil',
  'Texte & Medien',
  'Öffnungszeiten',
  'Social Media',
  'Wünsche & Absenden',
]

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-[#243d38] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5a6d6b]'
const labelClass = 'block text-sm font-medium text-white/80 mb-2'

const WEEKDAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] as const
const WEEKDAY_SHORT = ['MO.', 'DI.', 'MI.', 'DO.', 'FR.', 'SA.', 'SO.'] as const
const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function getCalendarDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const daysInMonth = last.getDate()
  const startWeekday = (first.getDay() + 6) % 7
  const result: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) result.push(null)
  for (let d = 1; d <= daysInMonth; d++) result.push(d)
  return result
}

function toISODate(year: number, month: number, day: number): string {
  const y = year.toString()
  const m = (month + 1).toString().padStart(2, '0')
  const d = day.toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

const TIME_OPTIONS: string[] = []
for (let h = 6; h <= 23; h++) {
  for (const m of ['00', '30']) {
    TIME_OPTIONS.push(`${h.toString().padStart(2, '0')}:${m}`)
  }
}

// Uhrzeit-Optionen für Terminauswahl: 9:00 bis 17:00 in 30-Min-Schritten
const SLOT_TIME_OPTIONS: string[] = []
for (let h = 9; h <= 17; h++) {
  for (const m of ['00', '30']) {
    if (h === 17 && m === '30') break
    SLOT_TIME_OPTIONS.push(`${h.toString().padStart(2, '0')}:${m}`)
  }
}

type OpeningHoursTime = { open: string; close: string }
type OpeningHoursDay = { day: string; closed: boolean; times: OpeningHoursTime[] }

function defaultOpeningHours(): OpeningHoursDay[] {
  return WEEKDAYS.map((day) => ({
    day,
    closed: false,
    times: [{ open: '09:00', close: '18:00' }],
  }))
}

type BookedSlot = { date: string; time: string }

interface FormularPageClientProps {
  initialBookedSlots?: BookedSlot[]
}

export function FormularPageClient({ initialBookedSlots = [] }: FormularPageClientProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0) // 1 = forward, -1 = back
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Schritt 1: Unternehmensdaten
  const [companyName, setCompanyName] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  // Schritt 2: Design
  const [designStyle, setDesignStyle] = useState('')
  const [colorWish, setColorWish] = useState('')

  // Schritt 3: Texte & Medien
  const [mainText, setMainText] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])

  // Schritt 4: Öffnungszeiten (pro Tag: closed, times[])
  const [openingHoursData, setOpeningHoursData] = useState<OpeningHoursDay[]>(defaultOpeningHours())

  // Schritt 5: Social Media
  const [socialFacebook, setSocialFacebook] = useState('')
  const [socialInstagram, setSocialInstagram] = useState('')
  const [socialLinkedin, setSocialLinkedin] = useState('')

  // Schritt 1: Datum & Uhrzeit (Slots = Datum + Uhrzeit pro Klick)
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [selectedSlots, setSelectedSlots] = useState<{ date: string; time: string }[]>([])
  const [pendingDate, setPendingDate] = useState<string | null>(null)

  // Schritt 7: Wünsche
  const [specialWishes, setSpecialWishes] = useState('')

  function goNext() {
    setDirection(1)
    setStep((s) => Math.min(s + 1, 7))
  }
  function goBack() {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const logo = null as { name: string; data: string } | null
    const fotos = await Promise.all(
      imageFiles.map(async (file) => ({
        name: file.name,
        data: await fileToDataUrl(file),
      }))
    )
    const payload: Record<string, unknown> = {
      companyName,
      companyType,
      address,
      phone,
      designStyle,
      colorWish,
      mainText,
      openingHours: openingHoursData,
      socialFacebook,
      socialInstagram,
      socialLinkedin,
      preferredSlots: selectedSlots,
      specialWishes,
      logo,
      fotos,
    }
    const result = await submitForm(payload)
    setSubmitting(false)
    if (result.success) setSubmitted(true)
    else setError(result.error ?? 'Speichern fehlgeschlagen.')
  }

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result as string)
      r.onerror = reject
      r.readAsDataURL(file)
    })
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 24 : -24, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -24 : 24, opacity: 0 }),
  }

  const STUDIO_EMAIL = 'studioweblix@gmail.com'
  const STUDIO_PHONE = '017645865595'
  const ansprechpartner = companyName?.trim() || 'Ihre Angaben'

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-20 min-h-[70vh]">
        <div className="text-center max-w-lg mx-auto space-y-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#4A7C6B] text-white"
            aria-hidden
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2C4B44]">
              Vielen Dank, {ansprechpartner}!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Wir haben Ihre Angaben erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#2C4B44] font-medium">
            <a href={`mailto:${STUDIO_EMAIL}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] rounded">
              {STUDIO_EMAIL}
            </a>
            <a href={`tel:${STUDIO_PHONE.replace(/\s/g, '')}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] rounded">
              {STUDIO_PHONE}
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            Sie können dieses Fenster jetzt schließen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#2C4B44] px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Fortschritt: Kreise/Punkte */}
          <div className="mb-10 md:mb-14">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i + 1 > step ? 1 : -1)
                    setStep(i + 1)
                  }}
                  className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5a6d6b] focus:ring-offset-2 focus:ring-offset-[#2C4B44] ${
                    i + 1 === step
                      ? 'bg-[#5a6d6b] scale-125 ring-2 ring-white/30'
                      : i + 1 < step
                        ? 'bg-[#5a6d6b]/60'
                        : 'bg-white/20 hover:bg-white/30'
                  }`}
                  title={STEPS[i]}
                  aria-label={`Schritt ${i + 1}: ${STEPS[i]}`}
                />
              ))}
            </div>
            <p className="text-white/80 text-sm text-center mt-3">Schritt {step} von 7 · {STEPS[step - 1]}</p>
          </div>

          <form onSubmit={step === 7 ? handleSubmit : (e) => { e.preventDefault(); goNext(); }} className="relative overflow-hidden min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* Schritt 1: Datum & Uhrzeit wählen */}
                {step === 1 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Datum & Uhrzeit wählen</h2>
                    <div className="rounded-xl bg-[#243d38] border border-white/10 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">
                          {MONTH_NAMES[calendarMonth.month]} {calendarMonth.year}
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCalendarMonth((prev) =>
                                prev.month === 0
                                  ? { year: prev.year - 1, month: 11 }
                                  : { year: prev.year, month: prev.month - 1 }
                              )
                            }
                            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                            aria-label="Vorheriger Monat"
                          >
                            <span className="sr-only">Vorheriger Monat</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCalendarMonth((prev) =>
                                prev.month === 11
                                  ? { year: prev.year + 1, month: 0 }
                                  : { year: prev.year, month: prev.month + 1 }
                              )
                            }
                            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                            aria-label="Nächster Monat"
                          >
                            <span className="sr-only">Nächster Monat</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {WEEKDAY_SHORT.map((wd) => (
                          <span key={wd} className="text-white/60 text-xs font-medium py-1">
                            {wd}
                          </span>
                        ))}
                        {getCalendarDays(calendarMonth.year, calendarMonth.month).map((day, i) => {
                          const iso = day === null ? '' : toISODate(calendarMonth.year, calendarMonth.month, day)
                          const isSelected = iso && selectedSlots.some((s) => s.date === iso)
                          const isPending = iso && pendingDate === iso
                          const isMarked = isSelected || isPending
                          return day === null ? (
                            <span key={`e-${i}`} className="py-2" />
                          ) : (
                            <button
                              key={day}
                              type="button"
                              onClick={() => setPendingDate(iso)}
                              className={`py-2 rounded-full text-sm font-medium transition-colors ${
                                isMarked
                                  ? 'bg-[#1e4a3e] text-white ring-2 ring-[#2d6b5a] ring-inset'
                                  : 'text-white/80 hover:bg-white/10'
                              }`}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    {pendingDate && (
                      <div className="rounded-xl bg-[#243d38] border border-white/10 p-4 space-y-3">
                        <p className="text-sm font-medium text-white">
                          Uhrzeit für {new Date(pendingDate + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })} wählen
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SLOT_TIME_OPTIONS.map((t) => {
                            const isBooked = initialBookedSlots.some((s) => s.date === pendingDate && s.time === t)
                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={isBooked}
                                title={isBooked ? 'Dieser Termin ist bereits gebucht' : undefined}
                                onClick={() => {
                                  if (isBooked) return
                                  const existing = selectedSlots.findIndex((s) => s.date === pendingDate)
                                  const newSlots =
                                    existing >= 0
                                      ? selectedSlots.map((s) => (s.date === pendingDate ? { date: pendingDate, time: t } : s))
                                      : [...selectedSlots, { date: pendingDate, time: t }].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                                  setSelectedSlots(newSlots)
                                  setPendingDate(null)
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  isBooked
                                    ? 'bg-white/5 text-white/40 cursor-not-allowed line-through'
                                    : 'bg-white/10 text-white hover:bg-[#5a9fd4]'
                                }`}
                              >
                                {t}{isBooked ? ' (belegt)' : ''}
                              </button>
                            )
                          })}
                        </div>
                        {selectedSlots.some((s) => s.date === pendingDate) && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSlots((prev) => prev.filter((s) => s.date !== pendingDate))
                              setPendingDate(null)
                            }}
                            className="text-sm text-white/70 hover:text-white underline"
                          >
                            Termin entfernen
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setPendingDate(null)}
                          className="text-sm text-white/60 hover:text-white/80"
                        >
                          Abbrechen
                        </button>
                      </div>
                    )}
                    {selectedSlots.length > 0 && !pendingDate && (
                      <div className="space-y-2">
                        <p className="text-white/90 text-sm font-medium">Ihre gewählten Termine</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSlots.map((s) => (
                            <div
                              key={`${s.date}-${s.time}`}
                              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1e4a3e] border border-[#2d6b5a] text-white"
                            >
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2d6b5a] text-white" aria-hidden>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="font-medium">
                                {new Date(s.date + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
                              </span>
                              <span className="text-white/90 font-semibold tabular-nums">{s.time} Uhr</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Schritt 2: Unternehmensdaten */}
                {step === 2 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Unternehmensdaten</h2>
                    <div>
                      <label htmlFor="companyName" className={labelClass}>Firmenname / Name</label>
                      <input id="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} placeholder="z. B. Muster GmbH" />
                    </div>
                    <div>
                      <label htmlFor="companyType" className={labelClass}>Branche / Art des Unternehmens</label>
                      <input id="companyType" type="text" value={companyType} onChange={(e) => setCompanyType(e.target.value)} className={inputClass} placeholder="z. B. Handwerk, Gastronomie" />
                    </div>
                    <div>
                      <label htmlFor="address" className={labelClass}>Adresse</label>
                      <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} placeholder="Straße, PLZ Ort" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Telefon</label>
                      <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="Ihre Telefonnummer" />
                    </div>
                  </>
                )}

                {/* Schritt 3: Design & Stil */}
                {step === 3 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Design & Stil</h2>
                    <div>
                      <label htmlFor="designStyle" className={labelClass}>Gewünschter Stil</label>
                      <input id="designStyle" type="text" value={designStyle} onChange={(e) => setDesignStyle(e.target.value)} className={inputClass} placeholder="z. B. modern, minimalistisch, warm" />
                    </div>
                    <div>
                      <label htmlFor="colorWish" className={labelClass}>Farbwünsche</label>
                      <input id="colorWish" type="text" value={colorWish} onChange={(e) => setColorWish(e.target.value)} className={inputClass} placeholder="z. B. Blau/Weiß, Firmenfarben" />
                    </div>
                  </>
                )}

                {/* Schritt 4: Texte & Medien (mit Bild-Upload) */}
                {step === 4 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Texte & Medien</h2>
                    <div>
                      <label htmlFor="mainText" className={labelClass}>Kernbotschaft / Texte (optional hier einfügen)</label>
                      <textarea id="mainText" value={mainText} onChange={(e) => setMainText(e.target.value)} rows={4} className={inputClass + ' resize-y'} placeholder="Wichtige Texte für Ihre Seite …" />
                    </div>
                    <div>
                      <label className={labelClass}>Bilder hochladen (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(e.target.files ? Array.from(e.target.files) : [])}
                        className={inputClass + ' file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#5a6d6b] file:text-white text-white/70 text-sm file:text-sm'}
                      />
                      {imageFiles.length > 0 && <p className="text-white/50 text-xs mt-1">{imageFiles.length} Datei(en) ausgewählt</p>}
                    </div>
                  </>
                )}

                {/* Schritt 5: Öffnungszeiten */}
                {step === 5 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Öffnungszeiten</h2>
                    <p className="text-white/70 text-sm mb-4">Pro Tag angeben, wann geöffnet ist. Bei „Geschlossen“ die Zeiten ignorieren.</p>
                    <div className="space-y-4">
                      {openingHoursData.map((row, dayIndex) => (
                        <div
                          key={row.day}
                          className="rounded-xl bg-[#243d38] border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap"
                        >
                          <div className="w-full sm:w-24 shrink-0">
                            <span className="font-bold text-white">{row.day}</span>
                          </div>
                          <label className="flex items-center gap-2 shrink-0">
                            <input
                              type="checkbox"
                              checked={row.closed}
                              onChange={() => {
                                setOpeningHoursData((prev) =>
                                  prev.map((r, i) =>
                                    i === dayIndex ? { ...r, closed: !r.closed } : r
                                  )
                                )
                              }}
                              className="rounded text-[#5a6d6b]"
                            />
                            <span className="text-white/90 text-sm">Geschlossen</span>
                          </label>
                          <div className="flex-1 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                            {row.times.map((slot, slotIndex) => (
                              <div
                                key={slotIndex}
                                className="flex flex-wrap items-center gap-2"
                              >
                                <select
                                  value={slot.open}
                                  disabled={row.closed}
                                  onChange={(e) => {
                                    setOpeningHoursData((prev) =>
                                      prev.map((r, i) => {
                                        if (i !== dayIndex) return r
                                        const newTimes = r.times.map((t, j) =>
                                          j === slotIndex ? { ...t, open: e.target.value } : t
                                        )
                                        return { ...r, times: newTimes }
                                      })
                                    )
                                  }}
                                  className={`px-3 py-2 rounded-lg bg-[#243d38] border border-white/10 text-white text-sm focus:ring-2 focus:ring-[#5a6d6b] ${row.closed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {TIME_OPTIONS.map((t) => (
                                    <option key={t} value={t} className="bg-[#243d38]">
                                      {t}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-white/60 text-sm">bis</span>
                                <select
                                  value={slot.close}
                                  disabled={row.closed}
                                  onChange={(e) => {
                                    setOpeningHoursData((prev) =>
                                      prev.map((r, i) => {
                                        if (i !== dayIndex) return r
                                        const newTimes = r.times.map((t, j) =>
                                          j === slotIndex ? { ...t, close: e.target.value } : t
                                        )
                                        return { ...r, times: newTimes }
                                      })
                                    )
                                  }}
                                  className={`px-3 py-2 rounded-lg bg-[#243d38] border border-white/10 text-white text-sm focus:ring-2 focus:ring-[#5a6d6b] ${row.closed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {TIME_OPTIONS.map((t) => (
                                    <option key={t} value={t} className="bg-[#243d38]">
                                      {t}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                setOpeningHoursData((prev) =>
                                  prev.map((r, i) => {
                                    if (i !== dayIndex) return r
                                    return {
                                      ...r,
                                      times: [...r.times, { open: '09:00', close: '18:00' }],
                                    }
                                  })
                                )
                              }}
                              disabled={row.closed}
                              className="shrink-0 w-8 h-8 rounded-lg bg-[#4A7C6B] text-white flex items-center justify-center text-lg font-bold hover:bg-[#3d6b5c] disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Weitere Zeitspanne (z. B. Mittagspause)"
                              aria-label="Weitere Zeitspanne hinzufügen"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Schritt 6: Social Media */}
                {step === 6 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Social Media</h2>
                    <p className="text-white/70 text-sm">Links zu Ihren Profilen (optional)</p>
                    <div>
                      <label htmlFor="socialFacebook" className={labelClass}>Facebook</label>
                      <input id="socialFacebook" type="url" value={socialFacebook} onChange={(e) => setSocialFacebook(e.target.value)} className={inputClass} placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                      <label htmlFor="socialInstagram" className={labelClass}>Instagram</label>
                      <input id="socialInstagram" type="url" value={socialInstagram} onChange={(e) => setSocialInstagram(e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                      <label htmlFor="socialLinkedin" className={labelClass}>LinkedIn</label>
                      <input id="socialLinkedin" type="url" value={socialLinkedin} onChange={(e) => setSocialLinkedin(e.target.value)} className={inputClass} placeholder="https://linkedin.com/..." />
                    </div>
                  </>
                )}

                {/* Schritt 7: Besondere Wünsche & Absenden */}
                {step === 7 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Besondere Wünsche & Absenden</h2>
                    <div>
                      <label htmlFor="specialWishes" className={labelClass}>Besondere Wünsche / Sonstiges</label>
                      <textarea id="specialWishes" value={specialWishes} onChange={(e) => setSpecialWishes(e.target.value)} rows={4} className={inputClass + ' resize-y'} placeholder="Alles, was wir noch wissen sollten …" />
                    </div>
                    <div className="rounded-xl bg-[#243d38] border border-white/10 p-4 text-white/80 text-sm space-y-1">
                      {companyName && <p><strong className="text-white">Unternehmen:</strong> {companyName}</p>}
                      {phone && <p><strong className="text-white">Telefon:</strong> {phone}</p>}
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 pt-8 mt-8 border-t border-white/10">
              {step > 1 && (
                <button type="button" onClick={goBack} className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
                  Zurück
                </button>
              )}
              {step === 6 && (
                <button type="button" onClick={goNext} className="px-6 py-3 rounded-lg bg-white/15 text-white font-medium hover:bg-white/25 transition-colors">
                  Überspringen
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-lg bg-[#5a6d6b] text-white font-medium hover:bg-[#4A5D5B] transition-colors disabled:opacity-50 ml-auto"
              >
                {step < 7 ? 'Weiter' : submitting ? 'Wird gesendet …' : 'Absenden'}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}
