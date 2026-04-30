export const SITE_NAME = 'Berke'
export const SITE_FULL_NAME = 'Berke — Full-Stack Developer'
export const SITE_DESCRIPTION = 'Full-Stack Developer specializing in React, Next.js, and modern web technologies.'
export const GITHUB_URL = 'https://github.com/berkespace'
export const EMAIL = 'stelberke@gmail.com'
export const TWITTER_URL = 'https://twitter.com/berkespace'

export const LOCALES = ['tr', 'en'] as const
export const DEFAULT_LOCALE = 'tr' as const

export const SCROLL_THRESHOLD = 100
export const ANIMATION_DURATION = 0.5
export const STAGGER_DELAY = 0.1
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const NAV_ITEMS = [
  { label: 'home', href: '/' },
  { label: 'projects', href: '/projects' },
  { label: 'services', href: '/services' },
  { label: 'experience', href: '/experience' },
  { label: 'blog', href: '/blog' },
  { label: 'contact', href: '/contact' },
] as const

export const STATS = [
  { value: '20+', label_tr: 'Proje', label_en: 'Projects' },
  { value: '3+', label_tr: 'Yıl Deneyim', label_en: 'Years Exp.' },
  { value: '15+', label_tr: 'Mutlu Müşteri', label_en: 'Happy Clients' },
  { value: '500+', label_tr: 'Fincan Kahve', label_en: 'Cups of Coffee' },
] as const

export const TOOLS = [
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Drizzle ORM', category: 'Database' },
  { name: 'Neon', category: 'Database' },
  { name: 'Vercel', category: 'Deploy' },
  { name: 'Git', category: 'Tool' },
  { name: 'Figma', category: 'Design' },
] as const

export const TESTIMONIALS = [
  {
    name: 'Ahmet Yılmaz',
    role_tr: 'Kurucu',
    role_en: 'Founder',
    company: 'TechStart',
    content_tr: 'Berke ile çalışmak gerçekten harikaydı. Projeyi zamanında ve beklentilerin üzerinde teslim etti.',
    content_en: 'Working with Berke was truly amazing. He delivered the project on time and above expectations.',
  },
  {
    name: 'Selin Kaya',
    role_tr: 'Ürün Müdürü',
    role_en: 'Product Manager',
    company: 'DigitalScale',
    content_tr: 'Teknik uzmanlığı ve iletişim becerisi mükemmel. Her sorunu hızlıca çözüyor.',
    content_en: 'His technical expertise and communication skills are excellent. He solves every problem quickly.',
  },
  {
    name: 'Murat Demir',
    role_tr: 'CEO',
    role_en: 'CEO',
    company: 'WebVenture',
    content_tr: 'Modern ve performanslı bir web uygulaması geliştirdi. Çok memnunduk.',
    content_en: 'He built a modern and performant web application. We were very satisfied.',
  },
] as const

export const FAQ_ITEMS = [
  {
    question_tr: 'Proje süreleri ne kadar?',
    question_en: 'How long do projects take?',
    answer_tr: 'Proje kapsamına göre değişir. Küçük projeler 1-2 hafta, orta ölçekli projeler 1-2 ay sürebilir.',
    answer_en: 'It depends on the project scope. Small projects take 1-2 weeks, medium-scale projects 1-2 months.',
  },
  {
    question_tr: 'Freelance çalışıyor musunuz?',
    question_en: 'Do you work freelance?',
    answer_tr: 'Evet, freelance projeler için müsaitim. Proje detaylarını görüşmek için iletişime geçin.',
    answer_en: 'Yes, I am available for freelance projects. Contact me to discuss project details.',
  },
  {
    question_tr: 'Hangi teknolojilerle çalışıyorsunuz?',
    question_en: 'What technologies do you work with?',
    answer_tr: 'Ağırlıklı olarak React, Next.js, TypeScript, Node.js ve PostgreSQL kullanıyorum.',
    answer_en: 'I mainly work with React, Next.js, TypeScript, Node.js, and PostgreSQL.',
  },
  {
    question_tr: 'Bakım ve destek sağlıyor musunuz?',
    question_en: 'Do you provide maintenance and support?',
    answer_tr: 'Evet, teslim edilen projeler için bakım ve destek hizmeti sunuyorum.',
    answer_en: 'Yes, I provide maintenance and support for delivered projects.',
  },
] as const

export const BLOG_POSTS = [
  {
    slug: 'nextjs-15-yenilikler',
    title_tr: "Next.js 15'in Getirdiği Yenilikler",
    title_en: "What's New in Next.js 15",
    excerpt_tr: "Next.js 15 ile gelen React 19 desteği, Turbopack kararlılığı ve yeni cache davranışlarını inceliyoruz.",
    excerpt_en: "We explore React 19 support, Turbopack stability, and new cache behaviors that came with Next.js 15.",
    date: '2025-03-15',
    readTime: 5,
    tags: ['Next.js', 'React', 'Web Dev'],
  },
  {
    slug: 'tailwind-v4-css-first',
    title_tr: "Tailwind CSS v4: CSS-First Yaklaşımı",
    title_en: "Tailwind CSS v4: The CSS-First Approach",
    excerpt_tr: "Tailwind v4'ün getirdiği CSS-first konfigürasyon yaklaşımını ve migration sürecini ele alıyoruz.",
    excerpt_en: "We discuss the CSS-first configuration approach introduced by Tailwind v4 and the migration process.",
    date: '2025-02-20',
    readTime: 4,
    tags: ['Tailwind', 'CSS', 'Frontend'],
  },
  {
    slug: 'drizzle-orm-neon-postgres',
    title_tr: "Drizzle ORM + Neon ile Serverless Postgres",
    title_en: "Serverless Postgres with Drizzle ORM + Neon",
    excerpt_tr: "Neon serverless Postgres ve Drizzle ORM kullanarak type-safe, edge-uyumlu bir veritabanı katmanı oluşturuyoruz.",
    excerpt_en: "We build a type-safe, edge-compatible database layer using Neon serverless Postgres and Drizzle ORM.",
    date: '2025-01-10',
    readTime: 6,
    tags: ['Database', 'Drizzle', 'Neon'],
  },
] as const
