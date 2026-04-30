'use client'

import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/lib/i18n/navigation'

export function ContactCTA() {
  const tHero = useTranslations('hero')
  const tContact = useTranslations('contact')

  return (
    <section className="section-padding py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {tContact('subtitle')}
            </h2>
            <p className="max-w-sm text-base" style={{ color: '#71717A' }}>
              {tHero('description')}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all duration-200 hover:gap-3"
              style={{ background: '#7C3AED' }}
            >
              {tHero('cta_secondary')}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
