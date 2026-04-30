'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggle = () => {
    const next = locale === 'tr' ? 'en' : 'tr'
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label="Switch language"
      className="fixed right-5 top-5 z-50 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest transition-opacity disabled:opacity-40"
      style={{
        background: 'rgba(14,14,14,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#E5E5E5',
      }}
    >
      <span style={{ color: locale === 'tr' ? '#7C3AED' : 'rgba(255,255,255,0.4)' }}>TR</span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
      <span style={{ color: locale === 'en' ? '#7C3AED' : 'rgba(255,255,255,0.4)' }}>EN</span>
    </button>
  )
}
