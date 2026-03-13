'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Settings } from '@/lib/types'

type Props = {
  children: React.ReactNode
  settings: Settings | null
}

export function ConditionalSiteLayout({ children, settings }: Props) {
  const pathname = usePathname()
  const isFormular = pathname === '/formular'

  if (isFormular) {
    return <>{children}</>
  }

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
