'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  SiDrizzle,
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { useLocale, useTranslations } from 'next-intl'

import { Link, useRouter } from '@/lib/i18n/navigation'
import { EASE_OUT, GITHUB_URL, EMAIL, STATS, STAGGER_DELAY } from '@/lib/constants'
import DarkVeil from '@/components/ui/DarkVeil'
import LogoLoop, { type LogoItem } from '@/components/ui/LogoLoop'
import ProfileCard from '@/components/ui/ProfileCard'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_DELAY, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

const TECH_LOGOS: LogoItem[] = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev', ariaLabel: 'React' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org', ariaLabel: 'Next.js' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org', ariaLabel: 'TypeScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', ariaLabel: 'Tailwind CSS' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org', ariaLabel: 'Node.js' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org', ariaLabel: 'PostgreSQL' },
  { node: <SiDrizzle />, title: 'Drizzle ORM', href: 'https://orm.drizzle.team', ariaLabel: 'Drizzle ORM' },
  { node: <SiFramer />, title: 'Framer Motion', href: 'https://www.framer.com/motion', ariaLabel: 'Framer Motion' },
]

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const router = useRouter()

  return (
    <section className="section-padding relative isolate min-h-screen overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 z-0">
        <DarkVeil
          hueShift={248}
          speed={0.35}
          warpAmount={0.22}
          noiseIntensity={0.03}
          resolutionScale={0.8}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 15%, rgba(124,58,237,0.18), transparent 40%), rgba(5,5,5,0.7)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14">

          {/* ── Left: Profile Card ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            className="w-full shrink-0 lg:w-72"
          >
            <ProfileCard
              name="Berke"
              title="Full-Stack Developer"
              handle="berkespace"
              status={locale === 'tr' ? 'Uygun' : 'Available'}
              contactText={locale === 'tr' ? 'Konuşalım' : 'Contact Me'}
              avatarUrl="/profile-picture/profile.jpeg"
              miniAvatarUrl="/profile-picture/profile.jpeg"
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              onContactClick={() => router.push('/contact')}
              behindGlowEnabled
              behindGlowColor="rgba(139, 92, 246, 0.42)"
              innerGradient="linear-gradient(145deg, rgba(24,17,44,0.78) 0%, rgba(74,46,142,0.32) 100%)"
            />
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col gap-8"
          >
            {/* Headline */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h1 data-gsap-reveal className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]">
                {locale === 'tr' ? (
                  <>
                    Fikirlerinizi<br />
                    <span style={{ color: '#8B5CF6' }}>Gerçeğe</span> Dönüştürüyorum
                  </>
                ) : (
                  <>
                    Transforming Your<br />
                    Ideas into{' '}
                    <span style={{ color: '#8B5CF6' }}>Reality</span>
                  </>
                )}
              </h1>
              <p data-gsap-reveal className="max-w-lg text-base leading-relaxed sm:text-lg" style={{ color: '#B0B0CC' }}>
                {t('description')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-8 sm:gap-12">
              {STATS.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-0.5">
                  <span
                    className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                    style={{ color: '#F5F5F5' }}
                  >
                    +{stat.value.replace('+', '')}
                  </span>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: '#9EA0C6' }}
                  >
                    {locale === 'tr' ? stat.label_tr : stat.label_en}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#8B5CF6' }}
              >
                {locale === 'tr' ? "Konuşalım" : "Let's Talk"}
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
                style={{ color: '#C0C3E8' }}
              >
                {locale === 'tr' ? "Çalışmalarım" : "My Work"}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Tech stack loop */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <p className="text-xs font-medium" style={{ color: '#8A8DB2' }}>
                {locale === 'tr'
                  ? 'Kullandığım teknolojiler'
                  : 'Technologies I use'}
              </p>
              <div
                className="relative w-full max-w-[620px] overflow-hidden rounded-2xl px-3 py-2"
                style={{
                  background: 'transparent',
                }}
              >
                <LogoLoop
                  logos={TECH_LOGOS}
                  speed={52}
                  direction="left"
                  logoHeight={28}
                  gap={30}
                  hoverSpeed={22}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#0D0B14"
                  ariaLabel={locale === 'tr' ? 'Kullandığım teknolojiler' : 'Technologies I use'}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
