import type { Metadata } from 'next'
import Link from 'next/link'
import { StudioWeblixLogo } from '@/components/StudioWeblixLogo'

export const metadata: Metadata = {
  title: 'Formular',
  description: 'Ihr persönliches Formular – Studio Weblix',
  robots: { index: false, follow: false },
}

export default function FormularLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex justify-center pt-8 pb-6">
        <Link
          href="/"
          className="inline-block focus:outline-none focus:ring-2 focus:ring-[#4A7C6B] focus:ring-offset-2 rounded"
          aria-label="Studio Weblix – Startseite"
        >
          <StudioWeblixLogo className="h-10" variant="dark" />
        </Link>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  )
}
