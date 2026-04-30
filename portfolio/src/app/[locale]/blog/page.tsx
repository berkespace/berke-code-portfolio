import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageTransition } from '@/components/layout/PageTransition'
import { Blog } from '@/components/sections/Blog'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })
  return { title: t('blog') }
}

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <Blog />
      </main>
    </PageTransition>
  )
}
