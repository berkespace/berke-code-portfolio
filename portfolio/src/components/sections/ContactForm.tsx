'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { EMAIL, GITHUB_URL } from '@/lib/constants'

interface FormState {
  name: string
  email: string
  message: string
}

const INITIAL_STATE: FormState = { name: '', email: '', message: '' }

export function ContactForm() {
  const t = useTranslations('contact')
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm(INITIAL_STATE)
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#3f3f46]'
  const inputStyle = {
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#F5F5F5',
  } as const

  return (
    <section className="section-padding py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#7C3AED' }}>
            {t('subtitle')}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: '#71717A' }}>
                  {t('name')}
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('name_placeholder')}
                  required
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: '#71717A' }}>
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('email_placeholder')}
                  required
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#71717A' }}>
                {t('message')}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('message_placeholder')}
                required
                rows={6}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            {status === 'success' && (
              <p className="text-sm font-medium" style={{ color: '#34D399' }}>
                {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium" style={{ color: '#F87171' }}>
                {t('error')}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ background: '#7C3AED' }}
            >
              <Send size={14} />
              {status === 'loading' ? t('sending') : t('send')}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div
              className="flex flex-col gap-4 rounded-2xl p-6"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-sm" style={{ color: '#71717A' }}>
                {t('or_email')}
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ background: 'rgba(124,58,237,0.15)' }}
                >
                  <Mail size={16} style={{ color: '#A78BFA' }} />
                </div>
                <span className="text-sm font-medium">{EMAIL}</span>
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <IconBrandGithub size={16} style={{ color: '#E5E5E5' }} />
                </div>
                <span className="text-sm font-medium">github.com/berkespace</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
