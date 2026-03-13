import Link from 'next/link'
import type { Metadata } from 'next'
import { ProjektStartenCTA } from '@/components/ProjektStartenCTA'

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Lernen Sie Studio Weblix kennen. Unser Team und unsere Mission – professionelle Webentwicklung für Ihr Unternehmen.',
}

const anspruchItems = ['Webdesign', 'Webentwicklung', 'Hosting']

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#5a6d6b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const stats = [
  { value: '1', label: 'Jahr Erfahrung' },
  { value: '4', label: 'Projekte abgeschlossen' },
  { value: '4', label: 'Zufriedene Kunden' },
  { value: '20+', label: 'Website-Templates' },
]

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero: Verlauf wie Vorlage (Grün → Creme), Körnung, zentrierter Text „über uns“ */}
      <section
        className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #2d4a3e 0%, #3d5a4c 25%, #5a7a68 50%, #8fa896 75%, #e8e6e1 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-wide mb-4 text-center"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}
          >
            über uns
          </h1>
          <p className="text-white/95 text-sm md:text-base" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {' / '}
            <span className="text-white/95">Über uns</span>
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-[#2C4B44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
              <p className="text-[#5a6d6b] font-semibold text-sm uppercase tracking-wider mb-2">
                Über uns
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Wir geben immer unser Bestes
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Bei Studio Weblix glauben wir, dass jedes Unternehmen eine starke
                Online-Präsenz verdient. Unsere Mission ist es, moderne, schnelle
                und professionelle Websites zu erstellen, die nicht nur gut
                aussehen, sondern auch Ergebnisse liefern.
              </p>
              <Link
                href="/kontakt"
                className="inline-block px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:border-white/30 hover:bg-white/15 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
          </div>
        </div>
      </section>

      {/* Skills & Statistics Section */}
      <section className="py-16 md:py-24 bg-[#2C4B44] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Our Skills */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Anspruch</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Bei Studio Weblix stehen Qualität, Zuverlässigkeit und
                langfristige Zusammenarbeit im Mittelpunkt. Wir bauen nicht nur
                Websites – wir bauen digitale Grundlagen für nachhaltiges
                Wachstum.
              </p>
              <ul className="space-y-3">
                {anspruchItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-medium">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Statistics */}
            <div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl bg-[#243d38] border border-white/10"
                  >
                    <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#243d38]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(94, 234, 212, 0.05) 0%, transparent 50%, rgba(94, 234, 212, 0.03) 100%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#5a6d6b] font-semibold text-sm uppercase tracking-wider mb-4">
            Jetzt starten
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto">
            Wir sind bereit, Ihr perfektes Webprojekt umzusetzen
          </h2>
          <ProjektStartenCTA />
        </div>
      </section>
    </>
  )
}
