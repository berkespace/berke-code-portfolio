'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

import { EASE_OUT, STATS, STAGGER_DELAY } from '@/lib/constants'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Stats() {
  const locale = useLocale()
  const t = useTranslations('stats')

  return (
    <section className="section-padding py-20">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: '#71717A' }}
        >
          {t('title')}
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-px sm:grid-cols-4"
          style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.value}
              variants={item}
              className="flex flex-col items-center justify-center gap-1 px-6 py-8"
              style={{ background: '#0A0A0A' }}
            >
              <span
                className="text-4xl font-bold tracking-tight"
                style={{ color: '#7C3AED' }}
              >
                {stat.value}
              </span>
              <span className="text-sm" style={{ color: '#71717A' }}>
                {locale === 'tr' ? stat.label_tr : stat.label_en}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
