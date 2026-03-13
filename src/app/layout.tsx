import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConditionalSiteLayout } from '@/components/ConditionalSiteLayout'
import { safeGetSettings } from '@/lib/safe-data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studioweblix.de'),
  title: {
    default: 'Studio Weblix – Webentwicklung & Digitale Lösungen',
    template: '%s | Studio Weblix',
  },
  description:
    'Professionelle Webentwicklung, moderne Websites und digitale Lösungen für Ihr Unternehmen.',
  openGraph: {
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#2C4B44',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await safeGetSettings()

  return (
    <html lang="de" className="bg-[#2C4B44] text-[#f5f5f7]" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#2C4B44] text-[#f5f5f7]`}>
        <ConditionalSiteLayout settings={settings}>{children}</ConditionalSiteLayout>
      </body>
    </html>
  )
}
