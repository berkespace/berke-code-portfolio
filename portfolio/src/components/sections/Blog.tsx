'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/lib/i18n/navigation'
import { BLOG_POSTS, EASE_OUT, STAGGER_DELAY } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Blog() {
  const t = useTranslations('blog')
  const locale = useLocale()

  return (
    <section className="section-padding py-24" id="blog">
      <div className="mx-auto max-w-5xl">
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
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium transition-colors hover:text-white sm:inline-flex"
            style={{ color: '#71717A' }}
          >
            {t('view_all')} <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article key={post.slug} variants={card}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div
                  className="card-glow group flex h-full flex-col gap-3 rounded-2xl p-5 transition-all"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                        style={{
                          background: 'rgba(124,58,237,0.1)',
                          border: '1px solid rgba(124,58,237,0.2)',
                          color: '#A78BFA',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="flex-1 font-semibold leading-snug transition-colors group-hover:text-violet-400">
                    {locale === 'tr' ? post.title_tr : post.title_en}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                    {locale === 'tr' ? post.excerpt_tr : post.excerpt_en}
                  </p>

                  {/* Meta */}
                  <div
                    className="flex items-center justify-between border-t pt-3 text-xs"
                    style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#71717A' }}
                  >
                    <span>{formatDate(post.date, locale)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime} {t('min_read')}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
