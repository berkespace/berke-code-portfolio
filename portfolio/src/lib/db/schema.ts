import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title_tr: text('title_tr').notNull(),
  title_en: text('title_en').notNull(),
  description_tr: text('description_tr').notNull(),
  description_en: text('description_en').notNull(),
  image_url: text('image_url'),
  tags: text('tags').array().notNull().default([]),
  github_url: text('github_url'),
  demo_url: text('demo_url'),
  featured: boolean('featured').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
})

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  role_tr: text('role_tr').notNull(),
  role_en: text('role_en').notNull(),
  start_date: text('start_date').notNull(),
  end_date: text('end_date'),
  description_tr: text('description_tr').notNull(),
  description_en: text('description_en').notNull(),
  order: integer('order').notNull().default(0),
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
})
