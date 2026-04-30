export interface Project {
  id: number
  title_tr: string
  title_en: string
  description_tr: string
  description_en: string
  image_url: string | null
  tags: string[]
  github_url: string | null
  demo_url: string | null
  featured: boolean
  created_at: Date
}

export interface Experience {
  id: number
  company: string
  role_tr: string
  role_en: string
  start_date: string
  end_date: string | null
  description_tr: string
  description_en: string
  order: number
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  created_at: Date
}

export interface NavItem {
  label: string
  href: string
  icon: string
}

export interface Stat {
  value: string
  label_tr: string
  label_en: string
}

export interface Tool {
  name: string
  category: string
}

export interface Testimonial {
  name: string
  role_tr: string
  role_en: string
  company: string
  content_tr: string
  content_en: string
}

export interface FaqItem {
  question_tr: string
  question_en: string
  answer_tr: string
  answer_en: string
}

export interface BlogPost {
  slug: string
  title_tr: string
  title_en: string
  excerpt_tr: string
  excerpt_en: string
  date: string
  readTime: number
  tags: string[]
}

export type Locale = 'tr' | 'en'
