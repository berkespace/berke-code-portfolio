'use client'

import {
  IconBriefcase,
  IconFolderOpen,
  IconHome,
  IconMail,
  IconPencil,
  IconTool,
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { FloatingDock } from '@/components/ui/floating-dock'

const NAV_CONFIG = [
  { key: 'home', path: '/', Icon: IconHome },
  { key: 'projects', path: '/projects', Icon: IconFolderOpen },
  { key: 'services', path: '/services', Icon: IconTool },
  { key: 'experience', path: '/experience', Icon: IconBriefcase },
  { key: 'blog', path: '/blog', Icon: IconPencil },
  { key: 'contact', path: '/contact', Icon: IconMail },
] as const

export function FloatingNav() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  const isActive = (path: string) => {
    if (path === '/') return /^\/[a-z]{2}(\/)?$/.test(pathname)
    return pathname.includes(path)
  }

  const links = NAV_CONFIG.map(({ key, path, Icon }) => {
    const active = isActive(path)
    return {
      title: t(key),
      href: path === '/' ? `/${locale}` : `/${locale}${path}`,
      icon: (
        <div
          className="relative flex h-full w-full items-center justify-center"
        >
          {/* Active background ring */}
          {active && (
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: '#7C3AED' }}
            />
          )}
          <Icon
            className="relative h-[72%] w-[72%]"
            style={{ color: active ? '#fff' : 'rgba(255,255,255,0.5)' }}
          />
        </div>
      ),
    }
  })

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true)
      setIsVisible(false)

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false)
        setIsVisible(true)
      }, 420)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      } ${isScrolling ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <FloatingDock items={links} />
    </div>
  )
}
