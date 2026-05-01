# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured. There is no `test` script.

## Architecture

### Routing & i18n

The app uses **next-intl v4** with `[locale]` dynamic segment. All pages live under `src/app/[locale]/`. The root `src/app/page.tsx` is a redirect shim. Supported locales: `tr` (default) and `en`, defined in `src/lib/i18n/routing.ts`. The `middleware.ts` handles locale detection and redirects for every non-static route.

Locale-aware navigation uses the re-exports from `src/lib/i18n/navigation.ts` (`Link`, `useRouter`, `usePathname`, `redirect`) — **not** the standard Next.js ones.

Translation strings live in `src/messages/{locale}.json`. Server components use `getTranslations`, client components use `useTranslations`.

### Scroll & animation

`SmoothScrollProvider` wraps the entire page tree in `#smooth-wrapper / #smooth-content` and initialises **GSAP ScrollSmoother**. Any element with `data-gsap-reveal` gets a scroll-driven fade+blur-in animation automatically. Sections on the home page use `data-speed` props for parallax. Do **not** add a second `ScrollSmoother.create` call anywhere; there can only be one instance.

### Styling

Tailwind v4 (CSS-first config, no `tailwind.config.js`). Design tokens are CSS custom properties in `src/app/globals.css`. Key utilities defined there: `.glass`, `.gradient-text`, `.noise-bg`, `.card-glow`. Primary accent is `--accent-violet: #7C3AED` / `oklch(0.52 0.22 293)`. The app is dark-only; `color-scheme: dark` is set globally.

shadcn/ui components are in `src/components/ui/`. Add new shadcn components with `npx shadcn add <component>`.

### Database

Neon serverless Postgres via **Drizzle ORM**. Schema: `src/lib/db/schema.ts` (tables: `projects`, `experiences`, `messages`). DB client: `src/lib/db/index.ts`. The contact API (`src/app/api/contact/route.ts`) only writes to the DB when `DATABASE_URL` is set, so the app runs without a database in dev.

Migrations: `npx drizzle-kit generate` / `npx drizzle-kit migrate`. Requires `DATABASE_URL` in `.env.local`.

### Content

Static content (stats, tools, testimonials, FAQ, blog posts) is defined as `const` arrays in `src/lib/constants.ts` — not fetched from a DB. Projects and experiences sections are intended to be DB-backed (schema exists) but currently render with placeholder/empty data.

### Component layout

- `src/components/layout/` — `FloatingNav`, `LanguageSwitcher`, `PageTransition` (global chrome, rendered in locale layout)
- `src/components/sections/` — full-page section components composed on each route's `page.tsx`
- `src/components/ui/` — shadcn primitives plus custom atoms (`DarkVeil`, `LogoLoop`, `ProfileCard`, `floating-dock`)
- `src/components/providers/` — `SmoothScrollProvider`

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Optional | Neon Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL for metadata |
