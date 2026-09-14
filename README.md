# Shivam Kumar — Portfolio

Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Base UI

Personal portfolio and project showcase for recruiters and AI assistants. Engineered for SEO, AEO, GEO, LLMO, AISEO, and EEAT with JSON-LD structured data, light/dark themes, an AI-friendly `llms.txt`, and individual case-study pages per project.

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

- `src/data/` — single source of truth for site content (profile, projects, skills, certs, posts, testimonials, FAQ, config)
- `src/components/` — page sections, UI primitives, command palette, theme toggle, reveal animations
- `src/app/projects/[slug]/` — generated case-study pages for each project (incl. per-project OG image)
- `src/app/insights/` — engineering write-ups (index + `[slug]` pages with Article JSON-LD)
- `src/app/llms.txt` & `src/app/llms-full.txt` — AI-crawler-friendly text profiles at `/llms.txt`
- `src/lib/structured-data.ts` — JSON-LD schemas (Person, WebSite, FAQ, Project, Article, BreadcrumbList)

## Features

- Recruiter-first: hero stats, projects, experience, certifications, testimonials (fill them in)
- AI/SEO ready: JSON-LD, sitemap, robots, OG images, `llms.txt`, agentic-browsing-friendly copy
- UX polish: light/dark theme toggle, ⌘K command palette, scroll-reveal animations, back-to-top, custom 404
- Platform: Vercel Analytics + Speed Insights, PWA manifest

## Deploy

Deploy on [Vercel](https://vercel.com):

```bash
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the production URL to control canonicals and the sitemap.

## SEO / Google ranking checklist

Anything marked **(you)** requires your action in browser tools.

1. **(you)** Deploy and open the production URL (e.g. `https://shivam-kumar-portfolio.vercel.app` or custom domain).
2. Set `NEXT_PUBLIC_SITE_URL` to that exact URL in Vercel → Project → Settings → Environment Variables, then redeploy. Canonicals, sitemap, OG images, and JSON-LD all read it.
3. **(you)** Google Search Console → add the URL-prefix property → verify via **HTML tag**, copy the token into `GOOGLE_SITE_VERIFICATION`.
4. **(you)** In GSC → Sitemaps → submit `https://<your-domain>/sitemap.xml`. Then use **URL Inspection → Request indexing** for `/`, `/insights`, and both `/projects/*` pages.
5. **(you)** Create a Google Analytics (GA4) property and connect it, or keep Vercel Analytics (already installed) — Vercel Analytics + Speed Insights are active.
6. Backlinks: add the portfolio URL to your LinkedIn headline/bio, GitHub profile, resume, and any community/college profiles. Google ranks domains it trusts; new domains need citations.
7. Freshness: keep adding `/insights` posts; each one is a new indexed page targeting a keyword (Next.js, LLM integration, etc.).
8. Verify with **Rich Results Test**: the site ships Person, WebSite, ItemList, FAQ, Project, Article, and BreadcrumbList JSON-LD.