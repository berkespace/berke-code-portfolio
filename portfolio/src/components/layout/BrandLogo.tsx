'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

import { Link } from '@/lib/i18n/navigation'

const LOGO_PATH =
  'M 827 31 L 344 30 L 289 119 L 550 119 L 554 123 L 269 335 L 236 335 L 235 366 L 469 366 L 471 370 L 221 558 L 30 707 L 33 710 L 264 581 L 536 421 L 756 287 L 755 285 L 489 285 L 488 282 Z'

export function BrandLogo() {
  const locale = useLocale()
  const pathname = usePathname()
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const strokeRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const firstMountRef = useRef(true)

  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false
      return
    }
    setShouldAnimate(true)
  }, [pathname])

  useEffect(() => {
    if (!shouldAnimate) return
    if (!strokeRef.current || !fillRef.current) return

    const pathLength = strokeRef.current.getTotalLength()
    gsap.set(strokeRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 1,
    })
    gsap.set(fillRef.current, { opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        setShouldAnimate(false)
      },
    })

    tl.to(strokeRef.current, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power3.inOut',
    }).to(
      fillRef.current,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.15'
    )

    return () => {
      tl.kill()
    }
  }, [shouldAnimate, pathname])

  return (
    <div className="fixed left-9 top-5 z-50 md:left-12">
      <Link
        href={`/${locale}`}
        aria-label="Ana sayfa"
        className="flex h-16 w-16 items-center justify-center"
      >
        <svg viewBox="0 0 858 741" className="h-13 w-13" aria-hidden>
          <defs>
            <linearGradient id="brand-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" />
              <stop offset="45%" stopColor="#B38BFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <path
            ref={fillRef}
            d={LOGO_PATH}
            fill="url(#brand-logo-gradient)"
            opacity={shouldAnimate ? 0 : 1}
            transform="translate(2, 10) scale(0.96)"
          />
          {shouldAnimate && (
            <path
              ref={strokeRef}
              d={LOGO_PATH}
              fill="none"
              stroke="url(#brand-logo-gradient)"
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(2, 10) scale(0.96)"
            />
          )}
        </svg>
      </Link>
    </div>
  )
}
