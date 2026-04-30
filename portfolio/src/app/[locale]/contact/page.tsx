import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageTransition } from '@/components/layout/PageTransition'
import { ContactForm } from '@/components/sections/ContactForm'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })
  return { title: t('contact') }
}

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <ContactForm />
      </main>
    </PageTransition>
  )
}
