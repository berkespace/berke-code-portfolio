'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { EASE_OUT, FAQ_ITEMS, STAGGER_DELAY } from '@/lib/constants'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY * 0.7 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
}

export function FAQ() {
  const t = useTranslations('faq')
  const locale = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding py-24" id="faq">
      <div className="mx-auto max-w-2xl">
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
          className="flex flex-col gap-2"
        >
          {FAQ_ITEMS.map((faq, i) => (
            <motion.div
              key={i}
              variants={itemAnim}
              className="overflow-hidden rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium">
                  {locale === 'tr' ? faq.question_tr : faq.question_en}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown size={16} style={{ color: '#71717A' }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <p
                      className="px-5 pb-4 text-sm leading-relaxed"
                      style={{ color: '#71717A' }}
                    >
                      {locale === 'tr' ? faq.answer_tr : faq.answer_en}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
