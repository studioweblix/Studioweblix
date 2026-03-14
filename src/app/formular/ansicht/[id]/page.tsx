import Link from 'next/link'
import Image from 'next/image'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'

type SubmissionPayload = {
  companyName?: string
  companyType?: string
  address?: string
  phone?: string
  email?: string
  selectedPackage?: string
  designStyle?: string
  colorWish?: string
  desiredPages?: string
  mainText?: string
  unternehmensBeschreibung?: string
  slogan?: string
  logoUrl?: string
  photoUrls?: string[]
  fotoUrls?: string[]
  openingHours?: string
  socialFacebook?: string
  socialInstagram?: string
  socialLinkedin?: string
  domainWish?: string
  technicalNotes?: string
  needEcommerce?: boolean
  ecommerceNotes?: string
  specialWishes?: string
  sonstigeWünsche?: string
  sonderfunktionen?: string[]
  goLiveTermin?: string
  erfahrenVon?: string
  [key: string]: unknown
}

async function getSubmission(id: string): Promise<{ data: SubmissionPayload; submitted_at?: string } | null> {
  const supabase = createAdminClient()
  const { data: row, error } = await supabase
    .from('form_submissions')
    .select('data, submitted_at')
    .eq('id', id)
    .maybeSingle()
  if (error || !row) return null
  return { data: (row.data as SubmissionPayload) ?? {}, submitted_at: row.submitted_at }
}

function KeyValueList({ entries }: { entries: [string, string | undefined][] }) {
  const list = entries
    .map(([label, value]) => [label, value != null ? String(value) : ''] as [string, string])
    .filter(([, value]) => value !== '')
  return (
    <dl className="space-y-2">
      {list.map(([label, value]) => (
        <div key={label} className="flex flex-wrap gap-x-2">
          <dt className="text-white/60 text-sm shrink-0">{label}</dt>
          <dd className="text-white text-sm break-words">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function parseList(text: string | undefined): string[] {
  if (!text || !String(text).trim()) return []
  return String(text)
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export default async function FormularAnsichtPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const submission = await getSubmission(id)
  if (!submission) notFound()

  const p = submission.data
  const photoUrls = (p.photoUrls ?? p.fotoUrls ?? []) as string[]
  const sectionsList = parseList(p.desiredPages)
  const sonderfunktionen = Array.isArray(p.sonderfunktionen) ? p.sonderfunktionen : []
  const wünscheTags = [p.specialWishes, p.sonstigeWünsche].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-[#1a2f2a]">
      {/* Dunkelgrüner Header */}
      <header className="bg-[#2D4A3E] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl font-semibold text-white">
              Formular: {p.companyName || 'Unbekannt'}
            </h1>
            <Link
              href="/formular"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              ← Zurück zum Formular
            </Link>
          </div>
          {submission.submitted_at && (
            <p className="text-white/50 text-sm mt-1">
              Eingereicht am {new Date(submission.submitted_at).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Unternehmensdaten */}
        <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
          <h2 className="text-base font-semibold text-white mb-4">Unternehmensdaten</h2>
          <KeyValueList
            entries={[
              ['Firma / Name', p.companyName],
              ['Branche', p.companyType],
              ['Adresse', p.address],
              ['Telefon', p.phone],
              ['E-Mail', p.email],
            ]}
          />
        </section>

        {/* Paket */}
        {p.selectedPackage && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Gewähltes Paket</h2>
            <span className="inline-block px-4 py-2 rounded-lg bg-[#4A7C6B] text-white font-medium text-sm">
              {p.selectedPackage}
            </span>
          </section>
        )}

        {/* Design & Stil */}
        {(p.designStyle || p.colorWish) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Design & Stil</h2>
            <div className="flex flex-wrap items-center gap-4">
              {p.designStyle && (
                <p className="text-white/90 text-sm">{p.designStyle}</p>
              )}
              {p.colorWish && (
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full border-2 border-white/30 shrink-0"
                    style={{
                      backgroundColor: /^#[0-9A-Fa-f]{3,8}$/.test(String(p.colorWish).trim())
                        ? String(p.colorWish).trim()
                        : '#4A7C6B',
                    }}
                    title={String(p.colorWish)}
                  />
                  <span className="text-white/80 text-sm">{p.colorWish}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gewünschte Sections */}
        {sectionsList.length > 0 && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Gewünschte Sections</h2>
            <div className="flex flex-wrap gap-2">
              {sectionsList.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-[#4A7C6B]/80 text-white text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Texte */}
        {(p.mainText || p.unternehmensBeschreibung || p.slogan) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6 space-y-4">
            <h2 className="text-base font-semibold text-white mb-3">Texte</h2>
            {p.unternehmensBeschreibung && (
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Kurzbeschreibung</p>
                <p className="text-white/90 text-sm whitespace-pre-wrap">{p.unternehmensBeschreibung}</p>
              </div>
            )}
            {p.slogan && (
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Slogan</p>
                <p className="text-white/90 text-sm">{p.slogan}</p>
              </div>
            )}
            {p.mainText && (
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Kernbotschaft</p>
                <p className="text-white/90 text-sm whitespace-pre-wrap">{p.mainText}</p>
              </div>
            )}
          </section>
        )}

        {/* Logo */}
        {p.logoUrl && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Logo</h2>
            <div className="relative w-full max-w-xs h-32">
              <Image
                src={p.logoUrl}
                alt="Logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
          </section>
        )}

        {/* Fotos Galerie */}
        {photoUrls.length > 0 && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Fotos</h2>
            <div className="grid grid-cols-3 gap-3">
              {photoUrls.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                  <Image
                    src={url}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Öffnungszeiten */}
        {p.openingHours && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Öffnungszeiten</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/90">
                <tbody>
                  {p.openingHours
                    .split(/\n/)
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <tr key={i} className="border-b border-white/10 last:border-0">
                        <td className="py-2 pr-4 whitespace-pre-wrap">{line.trim()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Social Media */}
        {(p.socialFacebook || p.socialInstagram || p.socialLinkedin) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Social Media</h2>
            <ul className="space-y-2">
              {p.socialFacebook && (
                <li>
                  <a
                    href={p.socialFacebook.startsWith('http') ? p.socialFacebook : `https://${p.socialFacebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7dd3fc] hover:underline text-sm"
                  >
                    Facebook →
                  </a>
                </li>
              )}
              {p.socialInstagram && (
                <li>
                  <a
                    href={p.socialInstagram.startsWith('http') ? p.socialInstagram : `https://${p.socialInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7dd3fc] hover:underline text-sm"
                  >
                    Instagram →
                  </a>
                </li>
              )}
              {p.socialLinkedin && (
                <li>
                  <a
                    href={p.socialLinkedin.startsWith('http') ? p.socialLinkedin : `https://${p.socialLinkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7dd3fc] hover:underline text-sm"
                  >
                    LinkedIn →
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        {/* Domain & Technisch */}
        {(p.domainWish || p.technicalNotes) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Domain & Technisches</h2>
            <KeyValueList
              entries={[
                ['Gewünschte Domain', p.domainWish],
                ['Technische Anmerkungen', p.technicalNotes],
              ]}
            />
          </section>
        )}

        {/* E-Commerce */}
        {(p.needEcommerce || p.ecommerceNotes) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">E-Commerce</h2>
            {p.needEcommerce && (
              <span className="inline-block px-3 py-1.5 rounded-lg bg-[#4A7C6B] text-white text-sm mb-2">
                E-Commerce gewünscht
              </span>
            )}
            {p.ecommerceNotes && (
              <p className="text-white/90 text-sm whitespace-pre-wrap mt-2">{p.ecommerceNotes}</p>
            )}
          </section>
        )}

        {/* Sonderfunktionen */}
        {sonderfunktionen.length > 0 && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Sonderfunktionen</h2>
            <div className="flex flex-wrap gap-2">
              {sonderfunktionen.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-[#4A7C6B]/80 text-white text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Besondere Wünsche / Tags */}
        {wünscheTags.length > 0 && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Besondere Wünsche</h2>
            <div className="flex flex-wrap gap-2">
              {wünscheTags.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm border border-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Go-Live / Erfahren von */}
        {(p.goLiveTermin || p.erfahrenVon) && (
          <section className="rounded-xl bg-[#243d38] border border-white/10 p-6">
            <h2 className="text-base font-semibold text-white mb-3">Weitere Angaben</h2>
            <KeyValueList
              entries={[
                ['Go-Live Wunsch', p.goLiveTermin],
                ['Erfahren von', p.erfahrenVon],
              ]}
            />
          </section>
        )}
      </main>
    </div>
  )
}
