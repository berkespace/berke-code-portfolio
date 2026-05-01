import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/lib/i18n/routing'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Display font — editorial grotesque, Turkish char support, strong at large sizes
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin', 'latin-ext'],
})

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page_titles' })

  return {
    title: {
      default: t('home'),
      template: '%s',
    },
    description:
      locale === 'tr'
        ? 'React, Next.js ve modern web teknolojileriyle uygulama geliştiren Full-Stack Developer.'
        : 'Full-Stack Developer building applications with React, Next.js, and modern web technologies.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <NextIntlClientProvider>
          <LanguageSwitcher />
          <FloatingNav />
          <div className="relative z-10">
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
