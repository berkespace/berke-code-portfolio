import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageTransition } from '@/components/layout/PageTransition'
import { Experience } from '@/components/sections/Experience'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })
  return { title: t('experience') }
}

export default function ExperiencePage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <Experience experiences={[]} />
      </main>
    </PageTransition>
  )
}
