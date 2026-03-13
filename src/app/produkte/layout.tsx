import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsere Designs',
  description:
    'Websites, die Studio Weblix für Kunden umgesetzt hat. Handwerk, Gastronomie, Arzt, E-Commerce.',
}

export default function ProdukteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
