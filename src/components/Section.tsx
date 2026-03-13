interface SectionProps {
  title?: string | null
  subtitle?: string | null
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ title, subtitle, children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/70 text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
