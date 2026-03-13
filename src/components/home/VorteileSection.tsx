import type { PageContent } from '@/lib/types'
import { BuchMeetingButton } from '@/components/BuchMeetingButton'

interface BenefitItem {
  title: string
  description: string
  icon?: string
}

const DEFAULT_BENEFITS: BenefitItem[] = [
  {
    title: 'Effizienz',
    description:
      'Ein festes Team aus Profis mit Erfahrung, das Ihre Website schnell und zuverlässig innerhalb einer Woche umsetzt.',
    icon: 'rocket',
  },
  {
    title: 'Top Service',
    description:
      'Wir sind rund um die Uhr für Sie erreichbar und kümmern uns um alle technischen Anliegen. Sie lehnen sich zurück, wir machen den Rest.',
    icon: 'badge',
  },
  {
    title: 'Ausgezeichnetes Design',
    description:
      'Unser Design ist modern, wirksam – mit einer unvorstellbaren Ästhetik. Websites, die überzeugen und Kunden gewinnen.',
    icon: 'pc',
  },
  {
    title: 'Volle website kontrolle',
    description:
      'Über unser intuitives Dashboard können Sie Ihre Website jederzeit selbst bearbeiten. Ob Bilder, Texte, Produkte oder Öffnungszeiten – Änderungen lassen sich schnell und unkompliziert selbst vornehmen.',
    icon: 'design',
  },
]

const icons: Record<string, React.ReactNode> = {
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L12 22M12 22L6 16M12 22L18 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C8 6 6 10 6 14C6 16 7 18 9 20" strokeLinecap="round" />
      <path d="M12 2C16 6 18 10 18 14C18 16 17 18 15 20" strokeLinecap="round" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" strokeLinecap="round" />
      <circle cx="12" cy="12" r="10" strokeDasharray="2 2" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M3 9H21M9 3V21" strokeLinecap="round" />
    </svg>
  ),
  pc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      <rect x="6" y="17" width="12" height="2" rx="0.5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

interface VorteileSectionProps {
  pageContent: PageContent | null
}

export function VorteileSection({ pageContent }: VorteileSectionProps) {
  const sections = (pageContent?.sections ?? []) as Array<{
    type?: string
    title?: string
    subtitle?: string
    items?: BenefitItem[]
  }>
  const benefitsSection = sections.find((s) => s.type === 'benefits')
  const title = benefitsSection?.title ?? 'Das spricht für uns'
  const subtitle =
    benefitsSection?.subtitle ??
    'Warum sie sich für uns entscheiden sollten und welche Vorteile sie genießen würden'
  const items = benefitsSection?.items ?? DEFAULT_BENEFITS

  return (
    <section id="vorteile" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {items.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="text-center lg:text-left opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-white/60 text-white mb-5 [&>svg]:w-7 [&>svg]:h-7">
                {icons[item.icon ?? 'rocket'] ?? icons.rocket}
              </div>
              <h3 className="font-semibold text-lg text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <BuchMeetingButton />
        </div>
      </div>
    </section>
  )
}
