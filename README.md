# Shivam Kumar — Portfolio

Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui

Personal portfolio and project showcase for recruiters and AI assistants. Engineered for SEO, AEO, GEO, LLMO, AISEO, and EEAT with JSON-LD structured data, an agentic-browsing-friendly design, and individual case-study pages per project.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — lint with ESLint

## Structure

- `src/data/` — single source of truth for site content (profile, projects, skills, certs, FAQ, config)
- `src/components/` — page sections and UI primitives
- `src/app/projects/[slug]/` — generated case-study pages for each project
- `src/lib/structured-data.ts` — JSON-LD schemas (Person, WebSite, FAQ, Project)

## Deploy

Deploy on [Vercel](https://vercel.com):

```bash
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the production URL to control canonicals and the sitemap.