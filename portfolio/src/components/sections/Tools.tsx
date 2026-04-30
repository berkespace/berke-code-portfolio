'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { EASE_OUT, STAGGER_DELAY, TOOLS } from '@/lib/constants'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY * 0.5 } },
}

const chip = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
}

const CATEGORY_COLORS: Record<string, string> = {
  Language: '#60A5FA',
  Frontend: '#34D399',
  Backend: '#F59E0B',
  Database: '#F472B6',
  Deploy: '#A78BFA',
  Tool: '#71717A',
  Design: '#FB923C',
}

export function Tools() {
  const t = useTranslations('tools')

  return (
    <section className="section-padding py-24" id="tools">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p data-gsap-reveal className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#7C3AED' }}>
            {t('subtitle')}
          </p>
          <h2 data-gsap-reveal className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.name}
              variants={chip}
              whileHover={{ y: -2, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E5E5E5',
              }}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: CATEGORY_COLORS[tool.category] ?? '#71717A' }}
              />
              {tool.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
