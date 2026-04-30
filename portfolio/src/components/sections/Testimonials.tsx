'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

import { EASE_OUT, STAGGER_DELAY, TESTIMONIALS } from '@/lib/constants'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()

  return (
    <section className="section-padding py-24" id="testimonials">
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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t_) => (
            <motion.div
              key={t_.name}
              variants={card}
              className="card-glow flex flex-col gap-4 rounded-2xl p-5"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed" style={{ color: '#A3A3A3' }}>
                &ldquo;{locale === 'tr' ? t_.content_tr : t_.content_en}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: 'rgba(124,58,237,0.25)' }}
                >
                  {t_.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t_.name}</p>
                  <p className="text-xs" style={{ color: '#71717A' }}>
                    {locale === 'tr' ? t_.role_tr : t_.role_en} · {t_.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
