'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/lib/i18n/navigation'
import type { Project } from '@/types'

interface ProjectsProps {
  projects?: Project[]
  showViewAll?: boolean
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 1,
    title_tr: 'AI Finans Asistanı',
    title_en: 'AI Finance Assistant',
    description_tr: 'Kişisel finans yönetimi için yapay zeka destekli bir web uygulaması. Harcama takibi ve akıllı öneriler sunar.',
    description_en: 'AI-powered web app for personal finance. Expense tracking, budget planning, smart recommendations.',
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
    description_tr: 'Gerçek zamanlı veri görselleştirme ve analitik sunan modern bir kontrol paneli.',
    description_en: 'Modern control panel with real-time data visualization and analytics.',
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
    description_en: 'Full-featured e-commerce with multi-language and multi-currency support.',
    image_url: null,
    tags: ['Next.js', 'Stripe', 'i18n', 'Drizzle'],
    github_url: 'https://github.com/berkespace',
    demo_url: '#',
    featured: false,
    created_at: new Date(),
  },
  {
    id: 4,
    title_tr: 'Portfolyo Sitesi',
    title_en: 'Portfolio Website',
    description_tr: 'GSAP animasyonları ve çoklu dil desteğiyle geliştirilmiş modern bir portfolyo sitesi.',
    description_en: 'Modern portfolio with GSAP scroll animations and multi-language support.',
    image_url: null,
    tags: ['Next.js', 'GSAP', 'next-intl'],
    github_url: 'https://github.com/berkespace',
    demo_url: '#',
    featured: true,
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

// Char-level masked reveal — each char slides up from its own overflow:hidden parent.
// `center` prop adds justify-center so the text reads as centered on screen.
function MaskedText({
  text,
  charClass,
  center = false,
  style,
}: {
  text: string
  charClass: string
  center?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`flex flex-wrap ${center ? 'justify-center' : ''}`}
      style={style}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <span className={charClass} style={{ display: 'inline-block' }}>
            {char === ' ' ? ' ' : char}
          </span>
        </span>
      ))}
    </div>
  )
}

export function Projects({ projects, showViewAll = true }: ProjectsProps) {
  const t = useTranslations('projects')
  const locale = useLocale()

  const sectionRef        = useRef<HTMLElement>(null)
  const sloganOverlayRef  = useRef<HTMLDivElement>(null)
  const cardsRef          = useRef<HTMLDivElement>(null)
  const labelRef          = useRef<HTMLParagraphElement>(null)

  const displayProjects = projects && projects.length > 0 ? projects : PLACEHOLDER_PROJECTS
  const homeProjects    = displayProjects.slice(0, 4)

  const slogans =
    locale === 'tr'
      ? ['Hızlı.', 'Güvenli.', 'Yenilikçi.']
      : ['Fast.', 'Reliable.', 'Innovative.']

  const line1 = locale === 'tr' ? 'Öne Çıkan' : 'Selected'
  const line2 = locale === 'tr' ? 'Projeler'  : 'Work'

  // Bricolage Grotesque — loaded via CSS variable from layout
  const displayFont = 'var(--font-display)'

  useEffect(() => {
    if (!showViewAll) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const section       = sectionRef.current
    const sloganOverlay = sloganOverlayRef.current
    if (!section || !sloganOverlay) return

    // Slogan words live inside the overlay
    const sl0 = sloganOverlay.querySelector<HTMLElement>('.js-sl-0')
    const sl1 = sloganOverlay.querySelector<HTMLElement>('.js-sl-1')
    const sl2 = sloganOverlay.querySelector<HTMLElement>('.js-sl-2')
    const logoFill = sloganOverlay.querySelector<SVGPathElement>('.js-logo-fill')
    const logoStroke = sloganOverlay.querySelector<SVGPathElement>('.js-logo-stroke')

    // Main content elements
    const chars1    = section.querySelectorAll<HTMLElement>('.js-c1')
    const chars2    = section.querySelectorAll<HTMLElement>('.js-c2')
    const cards     = section.querySelectorAll<HTMLElement>('.js-card')
    const viewAllEl = section.querySelector<HTMLElement>('.js-view-all')
    const label     = labelRef.current

    if (!sl0 || !sl1 || !sl2 || !logoFill || !logoStroke) return

    // ── Initial hidden states ─────────────────────────────────────────────────
    // Slogan words: first one enters from below, others wait with blur/fade
    const offscreenY = Math.round(window.innerHeight * 1.1)
    gsap.set([sl0, sl1, sl2], { y: 0, opacity: 0, filter: 'blur(14px)', scale: 0.96 })
    gsap.set(sl0, { y: offscreenY, opacity: 1, filter: 'blur(0px)', scale: 1 })
    const logoLength = logoStroke.getTotalLength()
    gsap.set(logoFill, { opacity: 0, scale: 0.88, transformOrigin: '50% 50%' })
    gsap.set(logoStroke, {
      opacity: 0,
      strokeDasharray: logoLength,
      strokeDashoffset: logoLength,
      scale: 0.88,
      transformOrigin: '50% 50%',
    })
    // Main content starts invisible (behind the overlay)
    gsap.set([chars1, chars2], { yPercent: 115 })
    gsap.set(cards, { opacity: 0, y: 40 })
    if (viewAllEl) gsap.set(viewAllEl, { opacity: 0, y: 10 })
    if (label)     gsap.set(label,     { opacity: 0, y: 10 })

    const mm = gsap.matchMedia()

    // ── Desktop: pinned scrubbed timeline ─────────────────────────────────────
    mm.add('(min-width: 1024px)', () => {
      const offscreenY = Math.round(window.innerHeight * 1.1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=4800',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      tl
        // ── Phase 1: Sequential full-screen slogans ──────────────────────────
        .addLabel('slogan-1-in')
        .to(sl0, { y: 0, duration: 1.2, ease: 'power3.out' })
        .to({}, { duration: 1.05 })

        .addLabel('slogan-1-out-2-in')
        .to(sl0, {
          opacity: 0,
          filter: 'blur(18px)',
          scale: 1.08,
          duration: 1.12,
          ease: 'power2.inOut',
        })
        .to(
          sl1,
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.18,
            ease: 'power3.out',
          },
          '<0.18'
        )
        .to({}, { duration: 1.05 })

        .addLabel('slogan-2-out-3-in')
        .to(sl1, {
          opacity: 0,
          filter: 'blur(18px)',
          scale: 1.08,
          duration: 1.12,
          ease: 'power2.inOut',
        })
        .to(
          sl2,
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.18,
            ease: 'power3.out',
          },
          '<0.18'
        )
        .to({}, { duration: 1.05 })

        .addLabel('slogan-3-out')
        .to(sl2, {
          opacity: 0,
          filter: 'blur(18px)',
          scale: 1.08,
          duration: 1.16,
          ease: 'power2.inOut',
        })

        // ── Phase 1.5: Fullscreen logo finale ────────────────────────────────
        .addLabel('logo-finale')
        .to(logoStroke, {
          opacity: 1,
          duration: 0.18,
          ease: 'power1.out',
        })
        .to(logoStroke, {
          strokeDashoffset: 0,
          scale: 1,
          duration: 1.15,
          ease: 'power3.inOut',
        })
        .to(
          logoFill,
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          [logoFill, logoStroke],
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '+=0.35'
        )

        // ── Phase 2: Overlay lifts off, revealing main content ───────────────
        // Overlay slides up — main content underneath is already rendered
        .addLabel('overlay-out')
        .to(sloganOverlay, { yPercent: -100, duration: 0.6, ease: 'power2.in' }, '-=0.05')

        // ── Phase 3: Main content entrance ───────────────────────────────────
        .to(label,  { opacity: 1, y: 0, duration: 0.2 }, '-=0.15')
        .to(chars1, { yPercent: 0, duration: 0.85, stagger: 0.026, ease: 'power3.out' }, '-=0.1')
        .to(chars2, { yPercent: 0, duration: 0.85, stagger: 0.022, ease: 'power3.out' }, '-=0.65')
        .to(cards,  { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.2')
        .to(viewAllEl, { opacity: 1, y: 0, duration: 0.28 }, '-=0.05')
        .to({}, { duration: 0.4 })

      return () => { tl.scrollTrigger?.kill(); tl.kill() }
    })

    // ── Mobile / tablet: no overlay, no pin ──────────────────────────────────
    // Slogans are hidden; just reveal title + cards on scroll
    mm.add('(max-width: 1023px)', () => {
      const once = { toggleActions: 'play none none none' as const }

      if (label) {
        gsap.to(label, {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', ...once },
        })
      }
      const titleBlock = section.querySelector('.js-title-block')
      if (titleBlock) {
        gsap.to([chars1, chars2], {
          yPercent: 0, duration: 0.7, stagger: 0.02, ease: 'power3.out',
          scrollTrigger: { trigger: titleBlock, start: 'top 82%', ...once },
        })
      }
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 86%', ...once },
      })
      if (viewAllEl) {
        gsap.to(viewAllEl, {
          opacity: 1, y: 0, duration: 0.35,
          scrollTrigger: { trigger: viewAllEl, start: 'top 92%', ...once },
        })
      }
    })

    return () => mm.revert()
  }, [showViewAll, locale])

  // ── Projects page: standard grid ──────────────────────────────────────────
  if (!showViewAll) {
    return (
      <section className="section-padding py-24" id="projects">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#7C3AED' }}>
              {t('subtitle')}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: displayFont }}
            >
              {t('title')}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <article
                key={project.id}
                className="card-glow group flex flex-col overflow-hidden rounded-2xl"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Screenshot-ready image — aspect-video */}
                <div
                  className="flex aspect-video w-full items-center justify-center overflow-hidden"
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

                <div className="flex flex-1 flex-col gap-3 p-5">
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
                    {project.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
                  </div>
                  <div className="mt-auto flex items-center gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                        style={{ color: '#71717A' }}>
                        <IconBrandGithub size={13} />{t('view_code')}
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                        style={{ color: '#71717A' }}>
                        <ExternalLink size={13} />{t('view_demo')}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Home page: scroll-driven pinned experience ─────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id="projects"
      style={{ minHeight: '100vh', background: '#050505' }}
    >

      {/*
       * ── Slogan overlay (desktop only) ──────────────────────────────────────
       * position:absolute covers the main content entirely.
       * As each word animates in/out, the overlay eventually slides up
       * revealing the main content beneath.
       * Hidden on mobile (lg:block).
       */}
      <div
        ref={sloganOverlayRef}
        className="projects-slogan-overlay pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          background: '#050505',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 858 741"
            style={{
              width: 'min(94vw, 1280px)',
              height: 'min(94vh, 1080px)',
              overflow: 'visible',
            }}
            aria-hidden
          >
            <defs>
              <linearGradient id="projects-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F5F5" />
                <stop offset="45%" stopColor="#B38BFF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <path
              className="js-logo-fill"
              d="M 827 31 L 344 30 L 289 119 L 550 119 L 554 123 L 269 335 L 236 335 L 235 366 L 469 366 L 471 370 L 221 558 L 30 707 L 33 710 L 264 581 L 536 421 L 756 287 L 755 285 L 489 285 L 488 282 Z"
              fill="url(#projects-logo-gradient)"
            />
            <path
              className="js-logo-stroke"
              d="M 827 31 L 344 30 L 289 119 L 550 119 L 554 123 L 269 335 L 236 335 L 235 366 L 469 366 L 471 370 L 221 558 L 30 707 L 33 710 L 264 581 L 536 421 L 756 287 L 755 285 L 489 285 L 488 282 Z"
              fill="none"
              stroke="url(#projects-logo-gradient)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {slogans.map((slogan, i) => (
          /*
           * Each word gets its own overflow:hidden wrapper that fills the overlay.
           * The inner div (.js-sl-i) is centered and animated via y.
           * overflow:hidden clips the word when y > wrapper bounds.
           */
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className={`js-sl-${i}`}
              style={{
                fontFamily: displayFont,
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                color: i === slogans.length - 1 ? '#8B5CF6' : '#F5F5F5',
              }}
            >
              {slogan}
            </div>
          </div>
        ))}
      </div>

      {/*
       * ── Main content ────────────────────────────────────────────────────────
       * z-index:10 (behind the overlay at z:20).
       * Overlay slides away → this becomes visible.
       * Centered horizontally and vertically.
       */}
      <div
        className="section-padding relative z-10 flex flex-col items-center justify-center py-24"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-full max-w-6xl">

          {/* Eyebrow label */}
          <p
            ref={labelRef}
            className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#7C3AED' }}
          >
            {t('subtitle')}
          </p>

          {/* ── Centered char-reveal title ─────────────────────────────────── */}
          <div className="js-title-block mb-12 select-none">
            <MaskedText
              text={line1}
              charClass="js-c1"
              center
              style={{
                fontFamily: displayFont,
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#F5F5F5',
              }}
            />
            <MaskedText
              text={line2}
              charClass="js-c2"
              center
              style={{
                fontFamily: displayFont,
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#8B5CF6',
              }}
            />
          </div>

          {/*
           * ── 4 medium cards ──────────────────────────────────────────────────
           * overflow:hidden on article → image sits flush at top.
           * aspect-video image placeholder → website screenshots fit perfectly.
           * 4 columns on lg+, 2 on smaller.
           */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {homeProjects.map((project, index) => (
              <article
                key={project.id}
                className="js-card card-glow group flex flex-col overflow-hidden rounded-2xl"
                style={{
                  background: '#0E0E0E',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Screenshot-ready image — aspect-video */}
                <div
                  className="flex aspect-video w-full items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(124,58,237,${0.12 + index * 0.02}) 0%, rgba(10,10,10,1) 100%)`,
                  }}
                >
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image_url}
                      alt={locale === 'tr' ? project.title_tr : project.title_en}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-base" style={{ color: 'rgba(124,58,237,0.28)' }}>
                      {'{ }'}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(139,92,246,0.55)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    {locale === 'tr' ? project.title_tr : project.title_en}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => <TagChip key={tag} tag={tag} />)}
                  </div>
                  <div
                    className="mt-auto flex items-center gap-3 border-t pt-2.5"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-white"
                        style={{ color: '#52525B' }}>
                        <IconBrandGithub size={12} />{t('view_code')}
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs transition-colors hover:text-white"
                        style={{ color: '#52525B' }}>
                        <ExternalLink size={12} />{t('view_demo')}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View all */}
          <div className="js-view-all mt-8 flex justify-center">
            <Link
              href="/projects"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: '#52525B' }}
            >
              {t('view_all')} →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
