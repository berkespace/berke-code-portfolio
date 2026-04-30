import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageTransition } from '@/components/layout/PageTransition'
import { Services } from '@/components/sections/Services'
import { Tools } from '@/components/sections/Tools'
import { ContactCTA } from '@/components/sections/ContactCTA'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })
  return { title: t('services') }
}

export default function ServicesPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <Services />
        <Tools />
        <ContactCTA />
      </main>
    </PageTransition>
  )
}
