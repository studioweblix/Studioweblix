import type { Metadata } from 'next'
import { ZahlButton } from '@/components/preis/ZahlButton'

const monatsVorteile = [
  'Keine Startkosten',
  'Technischer Support inklusive',
  'Eigene Domain',
  'Professionelles Webdesign',
  'Hosting inklusive',
  'Wartung & Updates inklusive',
  'Persönliches Dashboard',
  'Änderungen jederzeit inklusive',
  'Monatlich kündbar',
  'Sofort startklar',
]

const einmalzahlungVorteile = [
  'Professionelles Webdesign',
  'Eigene Domain',
  'Hosting inklusive',
  'Persönliches Dashboard',
  '29 €/Monat laufende Kosten',
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#5a6d6b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Preise',
  description:
    'Transparente Preise für Ihre professionelle Website. Wählen Sie das passende Angebot für Ihr Unternehmen.',
}

export default function PreisPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Unsere Angebote
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Wählen Sie das passende Paket für Ihre Website aus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Monatliches Paket */}
          <div className="relative rounded-2xl bg-[#243d38] border border-white/10 overflow-hidden transition-all hover:border-[#5a6d6b]/30 hover:shadow-lg hover:shadow-[#5a6d6b]/5 flex flex-col">
            <div className="p-8 flex flex-col flex-1 min-h-0">
              <h3 className="text-xl font-semibold text-white mb-6">Monatliches Paket</h3>
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-bold text-white">99€</span>
                <span className="text-xl md:text-2xl font-normal text-white/60">/Monat</span>
                <p className="text-white/50 text-sm mt-1">Flexibel kündbar</p>
                <p className="text-white/50 text-sm mt-0.5">Ihre Landing page</p>
              </div>
              <div className="flex-1 min-h-0 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {monatsVorteile.map((v) => (
                    <li key={v} className="flex items-center gap-3 text-white/80 text-sm">
                      <CheckIcon />
                      {v}
                    </li>
                  ))}
                </ul>
                <ZahlButton
                  productId="monthly"
                  className="block w-full py-4 text-center mt-6 shrink-0"
                  fullWidth
                />
              </div>
            </div>
          </div>

          {/* Einmalzahlung */}
          <div className="relative rounded-2xl bg-[#243d38] border border-[#5a6d6b]/30 overflow-hidden transition-all hover:border-[#5a6d6b]/50 hover:shadow-lg hover:shadow-[#5a6d6b]/10 flex flex-col">
            <div className="p-8 flex flex-col flex-1 min-h-0">
              <h3 className="text-xl font-semibold text-white mb-6">Einmalzahlung</h3>
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-bold text-white">899€</span>
                <span className="block text-white/60 text-sm mt-0.5">einmalig</span>
                <p className="text-white/50 text-sm mt-1">Ihre Landing page</p>
              </div>
              <div className="flex-1 min-h-0 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {einmalzahlungVorteile.map((v) => (
                    <li key={v} className="flex items-center gap-3 text-white/80 text-sm">
                      <CheckIcon />
                      {v}
                    </li>
                  ))}
                </ul>
                <ZahlButton
                  productId="once"
                  className="block w-full py-4 text-center mt-6 shrink-0"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        {/* E-COM STORE: Breite Box unter den anderen Angeboten */}
        <div className="mt-8 md:mt-10">
          <div className="relative rounded-2xl bg-[#243d38] border border-white/10 overflow-hidden transition-all hover:border-[#5a6d6b]/30 hover:shadow-lg hover:shadow-[#5a6d6b]/5">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  E-COM STORE
                </h3>
                <p className="text-white/60 text-sm">
                  Professioneller Online-Shop für Ihr E-Commerce-Geschäft
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-white">250€</p>
                  <p className="text-white/60 text-sm">/Monat</p>
                </div>
                <ZahlButton
                  productId="ecommerce"
                  className="py-3 px-6 whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo erstellen: Breite Box unter E-COM STORE */}
        <div className="mt-6">
          <div className="relative rounded-2xl bg-[#243d38] border border-white/10 overflow-hidden transition-all hover:border-[#5a6d6b]/30 hover:shadow-lg hover:shadow-[#5a6d6b]/5">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Logo erstellen
                </h3>
                <p className="text-white/60 text-sm">
                  Professionelles Logo für Ihr Unternehmen – individuell und markenprägend
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-3xl md:text-4xl font-bold text-white">149€</p>
                <ZahlButton
                  productId="logo"
                  className="py-3 px-6 whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
