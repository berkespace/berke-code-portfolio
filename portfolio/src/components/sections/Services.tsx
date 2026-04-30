'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Layout, Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { EASE_OUT, STAGGER_DELAY } from '@/lib/constants'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Services() {
  const t = useTranslations('services')

  const items = [
    { icon: Code2, key: 'web_dev', color: '#60A5FA' },
    { icon: Database, key: 'backend', color: '#34D399' },
    { icon: Layout, key: 'mobile', color: '#F472B6' },
    { icon: Lightbulb, key: 'consulting', color: '#F59E0B' },
  ] as const

  return (
    <section className="section-padding py-24" id="services">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#7C3AED' }}>
            {t('subtitle')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {items.map(({ icon: Icon, key, color }) => (
            <motion.div
              key={key}
              variants={card}
              className="card-glow group flex gap-4 rounded-2xl p-6"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${color}15`, border: `1px solid ${color}20` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{t(key)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                  {t(`${key}_desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
