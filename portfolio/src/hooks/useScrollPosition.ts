'use client'

import { useEffect, useState } from 'react'
import { SCROLL_THRESHOLD } from '@/lib/constants'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsPastThreshold(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, isPastThreshold }
}
