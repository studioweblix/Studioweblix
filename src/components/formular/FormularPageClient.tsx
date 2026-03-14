'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitForm } from '@/app/formular/actions'

const STEPS = [
  'Unternehmensdaten',
  'Paket-Auswahl',
  'Design & Stil',
  'Seiten/Sections',
  'Texte & Medien',
  'Öffnungszeiten',
  'Social Media',
  'Domain & Technisches',
  'E-Commerce',
  'Wünsche & Absenden',
]

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-[#243d38] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5a6d6b]'
const labelClass = 'block text-sm font-medium text-white/80 mb-2'

export function FormularPageClient() {
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

  // Schritt 2: Paket
  const [selectedPackage, setSelectedPackage] = useState('')

  // Schritt 3: Design
  const [designStyle, setDesignStyle] = useState('')
  const [colorWish, setColorWish] = useState('')

  // Schritt 4: Seiten
  const [desiredPages, setDesiredPages] = useState('')

  // Schritt 5: Texte & Medien
  const [mainText, setMainText] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])

  // Schritt 6: Öffnungszeiten
  const [openingHours, setOpeningHours] = useState('')

  // Schritt 7: Social Media
  const [socialFacebook, setSocialFacebook] = useState('')
  const [socialInstagram, setSocialInstagram] = useState('')
  const [socialLinkedin, setSocialLinkedin] = useState('')

  // Schritt 8: Domain
  const [domainWish, setDomainWish] = useState('')
  const [technicalNotes, setTechnicalNotes] = useState('')

  // Schritt 9: E-Commerce
  const [needEcommerce, setNeedEcommerce] = useState(false)
  const [ecommerceNotes, setEcommerceNotes] = useState('')

  // Schritt 10: Wünsche
  const [specialWishes, setSpecialWishes] = useState('')

  function goNext() {
    setDirection(1)
    setStep((s) => Math.min(s + 1, 10))
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
      selectedPackage,
      designStyle,
      colorWish,
      desiredPages,
      mainText,
      openingHours,
      socialFacebook,
      socialInstagram,
      socialLinkedin,
      domainWish,
      technicalNotes,
      needEcommerce,
      ecommerceNotes,
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
            <p className="text-white/80 text-sm text-center mt-3">Schritt {step} von 10 · {STEPS[step - 1]}</p>
          </div>

          <form onSubmit={step === 10 ? handleSubmit : (e) => { e.preventDefault(); goNext(); }} className="relative overflow-hidden min-h-[320px]">
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
                {/* Schritt 1: Unternehmensdaten */}
                {step === 1 && (
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

                {/* Schritt 2: Paket-Auswahl */}
                {step === 2 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Paket-Auswahl</h2>
                    <p className="text-white/70 text-sm">Wählen Sie das passende Angebot.</p>
                    <div className="space-y-3">
                      {['Monatlich (99€/Monat)', 'Einmalzahlung (899€)', 'E-Commerce Store (250€/Monat)'].map((pkg) => (
                        <label key={pkg} className="flex items-center gap-3 p-4 rounded-lg bg-[#243d38] border border-white/10 cursor-pointer hover:border-[#5a6d6b]/50">
                          <input type="radio" name="package" value={pkg} checked={selectedPackage === pkg} onChange={() => setSelectedPackage(pkg)} className="text-[#5a6d6b]" />
                          <span className="text-white">{pkg}</span>
                        </label>
                      ))}
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

                {/* Schritt 4: Gewünschte Seiten/Sections */}
                {step === 4 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Gewünschte Seiten / Sections</h2>
                    <div>
                      <label htmlFor="desiredPages" className={labelClass}>Welche Seiten oder Bereiche sollen auf die Website?</label>
                      <textarea id="desiredPages" value={desiredPages} onChange={(e) => setDesiredPages(e.target.value)} rows={5} className={inputClass + ' resize-y'} placeholder="z. B. Start, Leistungen, Über uns, Galerie, Kontakt …" />
                    </div>
                  </>
                )}

                {/* Schritt 5: Texte & Medien (mit Bild-Upload) */}
                {step === 5 && (
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

                {/* Schritt 6: Öffnungszeiten */}
                {step === 6 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Öffnungszeiten</h2>
                    <div>
                      <label htmlFor="openingHours" className={labelClass}>Öffnungszeiten</label>
                      <textarea id="openingHours" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} rows={5} className={inputClass + ' resize-y'} placeholder="z. B. Mo–Fr 8–18 Uhr, Sa 9–13 Uhr" />
                    </div>
                  </>
                )}

                {/* Schritt 7: Social Media */}
                {step === 7 && (
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

                {/* Schritt 8: Domain & Technisches */}
                {step === 8 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Domain & Technisches</h2>
                    <div>
                      <label htmlFor="domainWish" className={labelClass}>Gewünschte Domain</label>
                      <input id="domainWish" type="text" value={domainWish} onChange={(e) => setDomainWish(e.target.value)} className={inputClass} placeholder="z. B. meine-firma.de" />
                    </div>
                    <div>
                      <label htmlFor="technicalNotes" className={labelClass}>Technische Wünsche / Anmerkungen</label>
                      <textarea id="technicalNotes" value={technicalNotes} onChange={(e) => setTechnicalNotes(e.target.value)} rows={3} className={inputClass + ' resize-y'} placeholder="z. B. Newsletter, Formulare, Anbindungen …" />
                    </div>
                  </>
                )}

                {/* Schritt 9: E-Commerce (optional) */}
                {step === 9 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">E-Commerce</h2>
                    <p className="text-white/70 text-sm">Benötigen Sie einen Online-Shop? Dieser Schritt kann übersprungen werden.</p>
                    <label className="flex items-center gap-3 p-4 rounded-lg bg-[#243d38] border border-white/10 cursor-pointer mb-4">
                      <input type="checkbox" checked={needEcommerce} onChange={(e) => setNeedEcommerce(e.target.checked)} className="rounded text-[#5a6d6b]" />
                      <span className="text-white">Ja, ich brauche einen E-Commerce / Online-Shop</span>
                    </label>
                    {needEcommerce && (
                      <div>
                        <label htmlFor="ecommerceNotes" className={labelClass}>Anmerkungen zum Shop</label>
                        <textarea id="ecommerceNotes" value={ecommerceNotes} onChange={(e) => setEcommerceNotes(e.target.value)} rows={3} className={inputClass + ' resize-y'} placeholder="Produktanzahl, Zahlungsanbieter, etc." />
                      </div>
                    )}
                  </>
                )}

                {/* Schritt 10: Besondere Wünsche & Absenden */}
                {step === 10 && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Besondere Wünsche & Absenden</h2>
                    <div>
                      <label htmlFor="specialWishes" className={labelClass}>Besondere Wünsche / Sonstiges</label>
                      <textarea id="specialWishes" value={specialWishes} onChange={(e) => setSpecialWishes(e.target.value)} rows={4} className={inputClass + ' resize-y'} placeholder="Alles, was wir noch wissen sollten …" />
                    </div>
                    <div className="rounded-xl bg-[#243d38] border border-white/10 p-4 text-white/80 text-sm space-y-1">
                      {companyName && <p><strong className="text-white">Unternehmen:</strong> {companyName}</p>}
                      {phone && <p><strong className="text-white">Telefon:</strong> {phone}</p>}
                      {selectedPackage && <p><strong className="text-white">Paket:</strong> {selectedPackage}</p>}
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
              {step === 9 && (
                <button type="button" onClick={goNext} className="px-6 py-3 rounded-lg bg-white/15 text-white font-medium hover:bg-white/25 transition-colors">
                  Überspringen
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-lg bg-[#5a6d6b] text-white font-medium hover:bg-[#4A5D5B] transition-colors disabled:opacity-50 ml-auto"
              >
                {step < 10 ? 'Weiter' : submitting ? 'Wird gesendet …' : 'Absenden'}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}
