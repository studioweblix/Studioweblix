import type { PageContent } from '@/lib/types'
import { ProcessIllustration } from './ProcessIllustration'
import { ProcessStep2Illustration } from './ProcessStep2Illustration'
import { ProcessStep3Illustration } from './ProcessStep3Illustration'
import { ProcessStep4Illustration } from './ProcessStep4Illustration'

interface ProcessItem {
  step: number
  title: string
  description: string
  bullets?: string[]
}

const DEFAULT_PROCESS: ProcessItem[] = [
  {
    step: 1,
    title: 'Call Buchen',
    description:
      'Buchen Sie ein kurzes Beratungsgespräch mit uns. Gemeinsam besprechen wir Ihre Wünsche und erstellen anschließend eine Demo-Website, damit Sie sehen können, wie Ihr Webauftritt aussehen wird – bevor Sie etwas bezahlen.',
    bullets: [
      'Kostenfrei',
      'Einblick in Ihre Website',
      'Professionelle Ansprechpartner',
    ],
  },
  {
    step: 2,
    title: 'Website Bauen lassen',
    description:
      'Nach unserem Gespräch erstellt Ihr persönlicher Webdesigner Ihre neue Website – individuell gestaltet und in der Regel innerhalb einer Woche für Sie umgesetzt.',
    bullets: [
      'Erstellt innerhalb einer Woche',
      'Website nach Ihren Wünschen',
      'Individuelle Unterstützung',
    ],
  },
  {
    step: 3,
    title: 'Launch Ihrer Website',
    description:
      'Wir kümmern uns um den kompletten Launch Ihrer Website. Von der integrierten Datenbank über Hosting bis zur passenden Domain – alles ist für Sie eingerichtet. Lehnen Sie sich einfach zurück.',
    bullets: [
      'Hosting, Domain, Datenbank',
      'Echtzeit Website Analytics',
      'Technische Betreuung',
    ],
  },
  {
    step: 4,
    title: 'Ihr eigenes Dashboard',
    description:
      'Ihr eigenes Dashboard inklusive. Texte, Bilder, Preise und Öffnungszeiten können Sie jederzeit selbst ändern – ohne technische Kenntnisse, ohne Wartezeit. Einfach einloggen, anpassen, fertig.',
    bullets: [
      'Einfache Inhaltsverwaltung',
      'Einfache Bedienung',
      'Alles an einem Ort',
    ],
  },
]

interface ProcessSectionProps {
  pageContent: PageContent | null
}

export function ProcessSection({ pageContent }: ProcessSectionProps) {
  const sections = (pageContent?.sections ?? []) as Array<{
    type?: string
    title?: string
    subtitle?: string
    items?: ProcessItem[]
  }>
  const processSection = sections.find((s) => s.type === 'process')
  const title = processSection?.title ?? 'Der Ablauf'
  const subtitle =
    processSection?.subtitle ??
    'In wenigen Schritten zu Ihrer neuen Firmenwebsite.'
  const items = processSection?.items ?? DEFAULT_PROCESS

  return (
    <section id="so-funktionierts" className="py-16 md:py-24 bg-[#243d38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="space-y-20 md:space-y-24">
          {items.map((item, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={item.step}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Illustration rechts bei Schritt 1, sonst wechselnd */}
                <div
                  className={`order-2 ${
                    item.step === 1
                      ? 'lg:order-2'
                      : isEven
                        ? 'lg:order-2'
                        : 'lg:order-1'
                  }`}
                >
                  {/* Illustration: Schritt 2 = Web-Dev, 3 = Onlinestellung, 4 = Dashboard, sonst Beratung */}
                  <div className="w-full">
                    <div className="aspect-[4/3] md:aspect-[5/4] flex items-center justify-center max-w-sm md:max-w-md mx-auto">
                      {item.step === 2 ? (
                        <ProcessStep2Illustration />
                      ) : item.step === 3 ? (
                        <ProcessStep3Illustration />
                      ) : item.step === 4 ? (
                        <ProcessStep4Illustration />
                      ) : (
                        <ProcessIllustration />
                      )}
                    </div>
                  </div>
                </div>
                {/* Text: links bei Schritt 1, sonst wechselnd */}
                <div
                  className={`order-1 ${
                    item.step === 1
                      ? 'lg:order-1'
                      : isEven
                        ? 'lg:order-1'
                        : 'lg:order-2'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-[#5a6d6b] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <svg
                            className="w-5 h-5 text-[#5a6d6b] shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
