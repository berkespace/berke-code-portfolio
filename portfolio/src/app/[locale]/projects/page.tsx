import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageTransition } from '@/components/layout/PageTransition'
import { Projects } from '@/components/sections/Projects'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })
  return { title: t('projects') }
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <Projects showViewAll={false} projects={[]} />
      </main>
    </PageTransition>
  )
}
