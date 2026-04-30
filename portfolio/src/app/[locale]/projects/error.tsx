'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p style={{ color: '#71717A' }}>Projeler yüklenemedi.</p>
      <button
        onClick={reset}
        className="rounded-full px-5 py-2 text-sm font-medium text-white"
        style={{ background: '#7C3AED' }}
      >
        Tekrar Dene
      </button>
    </div>
  )
}
