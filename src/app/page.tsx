import type { Metadata } from 'next'
import { safeGetPageContent, safeGetSettings } from '@/lib/safe-data'
import { HeroSection } from '@/components/home/HeroSection'
import { VorteileSection } from '@/components/home/VorteileSection'
import { ArbeitenSection } from '@/components/home/ArbeitenSection'
import { CTASection } from '@/components/home/CTASection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { ScrollNav } from '@/components/ScrollNav'

export async function generateMetadata(): Promise<Metadata> {
  const [pageContent, settings] = await Promise.all([
    safeGetPageContent('home'),
    safeGetSettings(),
  ])
  const storeName = settings?.store_name ?? 'Studio Weblix'
  return {
    title: pageContent?.title ?? storeName,
    description:
      (pageContent as { meta_description?: string })?.meta_description ??
      'Professionelle Webentwicklung und digitale Lösungen für Ihr Unternehmen.',
  }
}

export default async function HomePage() {
  const [pageContent, settings] = await Promise.all([
    safeGetPageContent('home'),
    safeGetSettings(),
  ])

  return (
    <>
      <ScrollNav />
      <HeroSection pageContent={pageContent} settings={settings} />
      <VorteileSection pageContent={pageContent} />
      <ArbeitenSection />
      <ProcessSection pageContent={pageContent} />
      <CTASection />
    </>
  )
}
