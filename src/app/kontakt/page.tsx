import { safeGetSettings } from '@/lib/safe-data'
import { BackToTop } from '@/components/BackToTop'
import { ContactFormTemplate } from '@/components/ContactFormTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Nehmen Sie Kontakt mit uns auf. Wir freuen uns auf Ihre Anfrage und beraten Sie gerne.',
}

const KONTAKT_DEFAULT = {
  address: 'Brodkorbweg 62',
  phone: '017645865595',
  email: 'studioweblix@gmail.com',
}

const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/studioweblix',
  twitter: 'https://twitter.com/studioweblix',
  linkedin: 'https://linkedin.com/company/studioweblix',
}

export default async function KontaktPage() {
  const settings = await safeGetSettings()
  const address = settings?.address ?? KONTAKT_DEFAULT.address
  const phone = settings?.phone ?? KONTAKT_DEFAULT.phone
  const email = settings?.email ?? KONTAKT_DEFAULT.email

  return (
    <div className="relative min-h-screen bg-[#1a1f1e] overflow-hidden">
      {/* Diagonale weiße Form oben links */}
      <div
        className="absolute top-0 left-0 w-full h-64 md:h-80 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide mb-3">
            Kontakt
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Wir freuen uns auf Ihre Nachricht und melden uns zeitnah bei Ihnen.
          </p>
        </header>

        {/* Zwei Spalten: Adresse + Formular */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Linke Spalte – Adresse & Kontakt */}
          <div>
            <div className="flex items-center gap-3 text-white mb-6">
              <span className="text-white/80" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium uppercase tracking-wider">Adresse</span>
            </div>
            <div className="text-white/60 text-sm leading-relaxed space-y-1 mb-10">
              <p className="whitespace-pre-line">{address}</p>
            </div>
            <div className="flex items-center gap-3 text-white mb-2">
              <span className="text-white/80" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium uppercase tracking-wider">Telefon</span>
            </div>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-white/60 text-sm hover:text-white transition-colors block mb-10"
            >
              {phone}
            </a>
            <div className="flex items-center gap-3 text-white mb-2">
              <span className="text-white/80" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium uppercase tracking-wider">E-Mail</span>
            </div>
            <a
              href={`mailto:${email}`}
              className="text-white/60 text-sm hover:text-white transition-colors block mb-10"
            >
              {email}
            </a>
            {/* Social – Instagram, Twitter, LinkedIn */}
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Studio Weblix auf Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Studio Weblix auf Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Studio Weblix auf LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Rechte Spalte – Formular */}
          <div>
            <h2 className="text-xl font-semibold text-white uppercase tracking-wide mb-6">
              Nachricht senden
            </h2>
            <ContactFormTemplate />
          </div>
        </div>

        {/* Footer der Kontakt-Sektion */}
        <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © Studio Weblix. Alle Rechte vorbehalten. {new Date().getFullYear()}
          </p>
          <BackToTop />
        </footer>
      </div>
    </div>
  )
}
