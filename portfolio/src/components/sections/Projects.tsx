'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/lib/i18n/navigation'
import { EASE_OUT, STAGGER_DELAY } from '@/lib/constants'
import type { Project } from '@/types'

interface ProjectsProps {
  projects?: Project[]
  showViewAll?: boolean
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 1,
    title_tr: 'AI Finans Asistanı',
    title_en: 'AI Finance Assistant',
    description_tr: 'Kişisel finans yönetimi için yapay zeka destekli bir web uygulaması. Harcama takibi, bütçe planlaması ve akıllı öneriler sunar.',
    description_en: 'An AI-powered web app for personal finance management. Offers expense tracking, budget planning, and smart recommendations.',
    image_url: null,
    tags: ['Next.js', 'TypeScript', 'AI', 'PostgreSQL'],
    github_url: 'https://github.com/berkespace',
    demo_url: '#',
    featured: true,
    created_at: new Date(),
  },
  {
    id: 2,
    title_tr: 'SaaS Dashboard',
    title_en: 'SaaS Dashboard',
    description_tr: 'Gerçek zamanlı veri görselleştirme ve analitik sunan modern bir SaaS kontrol paneli.',
    description_en: 'A modern SaaS control panel with real-time data visualization and analytics.',
    image_url: null,
    tags: ['React', 'Tailwind', 'Charts', 'Neon'],
    github_url: 'https://github.com/berkespace',
    demo_url: '#',
    featured: true,
    created_at: new Date(),
  },
  {
    id: 3,
    title_tr: 'E-Ticaret Platformu',
    title_en: 'E-Commerce Platform',
    description_tr: 'Çok dilli ve çok para birimli destekli tam kapsamlı bir e-ticaret çözümü.',
    description_en: 'A full-featured e-commerce solution with multi-language and multi-currency support.',
    image_url: null,
    tags: ['Next.js', 'Stripe', 'i18n', 'Drizzle'],
    github_url: 'https://github.com/berkespace',
    demo_url: '#',
    featured: false,
    created_at: new Date(),
  },
]

function TagChip({ tag }: { tag: string }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[11px] font-medium"
      style={{
        background: 'rgba(124,58,237,0.1)',
        border: '1px solid rgba(124,58,237,0.2)',
        color: '#A78BFA',
      }}
    >
      {tag}
    </span>
  )
}

export function Projects({ projects = PLACEHOLDER_PROJECTS, showViewAll = true }: ProjectsProps) {
  const t = useTranslations('projects')
  const locale = useLocale()

  const displayProjects = projects.length > 0 ? projects : PLACEHOLDER_PROJECTS

  return (
    <section className="section-padding py-24" id="projects">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#7C3AED' }}>
              {t('subtitle')}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          </div>
          {showViewAll && (
            <Link
              href="/projects"
              className="hidden text-sm font-medium transition-colors hover:text-white sm:inline-flex"
              style={{ color: '#71717A' }}
            >
              {t('view_all')} →
            </Link>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={card}
              className="card-glow group flex flex-col gap-4 rounded-2xl p-5"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Image placeholder */}
              <div
                className="flex aspect-video items-center justify-center overflow-hidden rounded-xl"
                style={{ background: 'rgba(124,58,237,0.08)' }}
              >
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image_url}
                    alt={locale === 'tr' ? project.title_tr : project.title_en}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-3xl" style={{ color: 'rgba(124,58,237,0.3)' }}>
                    {'{ }'}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">
                    {locale === 'tr' ? project.title_tr : project.title_en}
                  </h3>
                  {project.featured && (
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA' }}
                    >
                      {t('featured')}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                  {locale === 'tr' ? project.description_tr : project.description_en}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                    style={{ color: '#71717A' }}
                  >
                    <IconBrandGithub size={13} />
                    {t('view_code')}
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                    style={{ color: '#71717A' }}
                  >
                    <ExternalLink size={13} />
                    {t('view_demo')}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
