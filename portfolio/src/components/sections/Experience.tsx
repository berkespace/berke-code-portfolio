'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

import { EASE_OUT, STAGGER_DELAY } from '@/lib/constants'
import type { Experience as ExperienceType } from '@/types'

interface ExperienceProps {
  experiences: ExperienceType[]
}

const PLACEHOLDER_EXPERIENCES: ExperienceType[] = [
  {
    id: 1,
    company: 'Freelance',
    role_tr: 'Full-Stack Developer',
    role_en: 'Full-Stack Developer',
    start_date: '2023-01',
    end_date: null,
    description_tr: 'Çeşitli müşteriler için React, Next.js ve Node.js kullanarak modern web uygulamaları geliştirdim. E-ticaret, SaaS ve kurumsal projeler üzerinde çalıştım.',
    description_en: 'Developed modern web applications using React, Next.js, and Node.js for various clients. Worked on e-commerce, SaaS, and enterprise projects.',
    order: 0,
  },
  {
    id: 2,
    company: 'TechStartup A.Ş.',
    role_tr: 'Frontend Developer',
    role_en: 'Frontend Developer',
    start_date: '2022-03',
    end_date: '2022-12',
    description_tr: 'React ve TypeScript ile şirketin ana ürünü olan web uygulamasını geliştirdim. Performans optimizasyonu ve kullanıcı deneyimi iyileştirmeleri üzerinde çalıştım.',
    description_en: 'Developed the company\'s main web application using React and TypeScript. Worked on performance optimization and UX improvements.',
    order: 1,
  },
  {
    id: 3,
    company: 'Digital Agency',
    role_tr: 'Junior Web Developer',
    role_en: 'Junior Web Developer',
    start_date: '2021-06',
    end_date: '2022-02',
    description_tr: 'Müşteri projelerinde HTML, CSS, JavaScript ve WordPress ile web siteleri geliştirdim. Responsive tasarım ve SEO optimizasyonu konularında deneyim kazandım.',
    description_en: 'Built websites using HTML, CSS, JavaScript, and WordPress for client projects. Gained experience in responsive design and SEO optimization.',
    order: 2,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const itemAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Experience({ experiences = PLACEHOLDER_EXPERIENCES }: ExperienceProps) {
  const t = useTranslations('experience')
  const locale = useLocale()

  const displayExp = experiences.length > 0 ? experiences : PLACEHOLDER_EXPERIENCES

  return (
    <section className="section-padding py-24" id="experience">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
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
          viewport={{ once: true, amount: 0.1 }}
          className="relative flex flex-col gap-0"
        >
          {/* Timeline line */}
          <div
            className="absolute left-[7px] top-3 h-[calc(100%-24px)] w-px"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />

          {displayExp.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemAnim}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Dot */}
              <div className="relative z-10 mt-1 shrink-0">
                <div
                  className="size-3.5 rounded-full border-2"
                  style={{
                    borderColor: '#7C3AED',
                    background: exp.end_date === null ? '#7C3AED' : '#0A0A0A',
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1 pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">
                      {locale === 'tr' ? exp.role_tr : exp.role_en}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: '#7C3AED' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-md px-2.5 py-1 font-mono text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#71717A',
                    }}
                  >
                    {exp.start_date.slice(0, 7)} — {exp.end_date ? exp.end_date.slice(0, 7) : t('present')}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: '#71717A' }}>
                  {locale === 'tr' ? exp.description_tr : exp.description_en}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
