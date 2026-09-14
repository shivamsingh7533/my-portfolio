export type Tech = { name: string; blurb?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: "Full-Stack Web Platform" | "AI SaaS Platform";
  emoji: string;
  gradient: string;
  repo: string;
  demo: string;
  status: string;
  summary: string;
  problem: string[];
  solution: string[];
  features: { title: string; detail: string }[];
  aiFeatures: { title: string; detail: string }[];
  tech: { area: string; stack: Tech[] };
  architecture: string[];
  role: string[];
  impact: string[];
  modelHighlights: string[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "oasis-space",
    name: "OasisSpace",
    tagline:
      "Premium full-stack real-estate platform with AI chatbot, payments, and role-based access control",
    category: "Full-Stack Web Platform",
    emoji: "🏡",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    repo: "https://github.com/shivamsingh7533/oasis-space",
    demo: "https://oasis-space.vercel.app",
    status: "Live — deployed on Vercel",
    summary:
      "A modern real-estate marketplace where users discover, list, buy, rent, and sell properties. It ships an AI-powered property assistant (Groq LLaMA 3.3), an AI description generator (Google Gemini), Razorpay payments with EMI/mortgage calculator, OTP + Google authentication, and a four-role permission system with admin analytics.",
    problem: [
      "Real-estate marketplaces typically bury critical information — price transparency, verified listings, and instant support — behind heavy, slow UIs.",
      "Buyers and renters spend hours comparing properties without a helper that can answer questions in real time.",
      "Sellers and admins had no clear approval workflow, so trust and listing quality suffered.",
    ],
    solution: [
      "Built an end-to-end MERN platform with React 19 + Vite on the frontend and a Node.js/Express + MongoDB API on the backend, with JWT session security and cookies.",
      "Embedded an always-available AI chatbot (Groq LLaMA 3.3) that recommends properties and answers buyer questions instantly from the listing data.",
      "Introduced a strict role-based workflow — User, Seller, Approved Seller, Admin — with feature/approval gates, protected routes, and an analytics dashboard.",
      "Integrated Razorpay for secure bookings, complete order history, and an EMI/mortgage calculator inside listing pages.",
    ],
    features: [
      {
        title: "Property Management",
        detail:
          "Create, edit, and delete listings with multi-image upload (room/area labels), sale & rent types, featured/VIP highlighting, and status tracking (Available, Sold, Rented).",
      },
      {
        title: "Advanced Search & Filters",
        detail:
          "Search by location, price range, bedrooms, amenities, property type, and sort options — a fast, filter-driven discovery experience.",
      },
      {
        title: "Payments & Transactions",
        detail:
          "Razorpay checkout for secure property bookings with a full order-history and transaction-tracking panel.",
      },
      {
        title: "Authentication & Security",
        detail:
          "Email/password signup with OTP verification via Brevo, Google OAuth via Firebase, JWT-based sessions, and hashed passwords with bcryptjs.",
      },
      {
        title: "Role-Based Access Control",
        detail:
          "User, Seller, Approved Seller, and Admin roles with distinct capabilities — approving sellers, featuring listings, and managing the marketplace.",
      },
      {
        title: "Email Notifications",
        detail:
          "Welcome emails, OTP emails, seller approval/rejection notices, and a direct contact-landlord flow.",
      },
      {
        title: "PWA & Offline-Ready",
        detail:
          "Installable on mobile with service workers and an app-like experience.",
      },
      {
        title: "Interactive Maps & Charts",
        detail:
          "Leaflet-powered property maps and Recharts analytics for the admin dashboard.",
      },
    ],
    aiFeatures: [
      {
        title: "Jarvis AI Chatbot",
        detail:
          "A real-time property assistant powered by Groq LLaMA 3.3 that recommends properties, answers pricing and availability questions, and guides visitors through the platform.",
      },
      {
        title: "AI Description Generator",
        detail:
          "Google Gemini auto-generates SEO-friendly property descriptions from structured listing data, cutting listing-creation time dramatically.",
      },
    ],
    tech: {
      area: "Full-stack, production application",
      stack: [
        { name: "React 19", blurb: "UI framework" },
        { name: "Vite 7", blurb: "Build tool & dev server" },
        { name: "Tailwind CSS 4", blurb: "Styling" },
        { name: "Redux Toolkit", blurb: "State management & persistence" },
        { name: "Node.js + Express", blurb: "REST API" },
        { name: "MongoDB + Mongoose", blurb: "Database & ODM" },
        { name: "JWT + bcryptjs", blurb: "Authentication" },
        { name: "Groq SDK (LLaMA 3.3)", blurb: "AI chatbot" },
        { name: "Google Generative AI (Gemini)", blurb: "AI copy generation" },
        { name: "Razorpay", blurb: "Payments" },
        { name: "Brevo", blurb: "Transactional email" },
        { name: "Firebase", blurb: "Google OAuth" },
        { name: "Supabase", blurb: "Image storage" },
        { name: "Framer Motion + Swiper", blurb: "Animations & carousels" },
        { name: "Leaflet / Recharts", blurb: "Maps & analytics" },
      ],
    },
    architecture: [
      "Frontend: React + Vite SPA with Redux (persisted) for global state, protected route groups, and lazy-loaded feature modules.",
      "Backend: Express API with layered controllers and Mongoose models; JWT middleware guards sessions and authorisation for every role.",
      "AI: a chat controller proxies conversation context to the Groq LLaMA 3.3 endpoint, while a separate AI-description route calls Google Gemini with structured listing fields.",
      "Payments: server-side Razorpay order creation and signature verification, with the client rendering the Razorpay checkout modal.",
      "Deployment: frontend on Vercel, backend on Render/Railway with environment-scoped secrets.",
    ],
    role: [
      "Designed and built the full-stack architecture from database schema to UI.",
      "Implemented the AI chatbot pipeline and the Gemini-powered description generator inside the product.",
      "Engineered role-based access control, protected routes, JWT auth, and the seller-approval workflow.",
      "Integrated Razorpay payments end-to-end, including order verification and transaction history.",
    ],
    impact: [
      "A single platform where buyers, sellers, and admins complete the full real-estate workflow without leaving the app.",
      "AI assistance is embedded where users actually need help — search, listing creation, and buyer questions — with an 80% time saving on property descriptions.",
      "Production-grade security (OTP, OAuth, JWT, hashed passwords) and a PWA experience on mobile.",
    ],
    modelHighlights: [
      "Groq LLaMA 3.3 — real-time AI property assistant (Jarvis)",
      "Google Gemini — generative, SEO-friendly property descriptions",
    ],
    year: "2025",
  },
  {
    slug: "base-mind",
    name: "BaseMind",
    tagline:
      "AI SaaS platform — agent management, knowledge ingestion, and conversational analytics",
    category: "AI SaaS Platform",
    emoji: "🧠",
    gradient: "from-emerald-500/15 via-cyan-500/10 to-transparent",
    repo: "https://github.com/shivamsingh7533/BaseMind",
    demo: "https://base-mind-lac.vercel.app",
    status: "Live — deployed on Vercel",
    summary:
      "An AI SaaS platform that makes deploying and managing AI agents simple. It includes a marketing landing page, a full product dashboard for deployed agents, a knowledge-base for RAG-ready documents, conversation transcripts, and a settings console — powered by a FastAPI backend with a resilient seed-data fallback.",
    problem: [
      "Teams adopting AI agents struggle to see what their agents are doing — which bots are deployed, what knowledge they can access, and what users are actually asking.",
      "AI agent platforms are usually closed black boxes, forcing teams to stitch together dashboards and logs across multiple tools.",
    ],
    solution: [
      "Built a complete AI SaaS product experience: a high-converting landing page plus a functional dashboard covering agents, knowledge sources, conversations, logs, and settings.",
      "Used Next.js 16 (App Router) + TypeScript + React 19 + Tailwind CSS v4 + shadcn/ui on the frontend and a FastAPI backend serving structured mock/demo data.",
      "Added a resilient data layer — the UI renders bundled seed data whenever the API is unreachable, so the product pages always work.",
    ],
    features: [
      {
        title: "Agent Management",
        detail:
          "View deployed bots, their status, channel configuration, and performance at a glance.",
      },
      {
        title: "Knowledge Base",
        detail:
          "Browse documents and sources your agents can retrieve from — the foundation for RAG and grounded answers.",
      },
      {
        title: "Conversation History",
        detail:
          "Read full chat transcripts per session to understand what users ask and how agents respond.",
      },
      {
        title: "Analytics Dashboard",
        detail:
          "Stats, recent activity, and operational metrics for the whole agent fleet.",
      },
      {
        title: "Landing + Product Pages",
        detail:
          "A polished marketing site at `/` and a complete application experience at `/dashboard`, all responsive.",
      },
      {
        title: "FastAPI Backend with Fallback",
        detail:
          "A Python FastAPI service with `/api/health`, `/api/dashboard`, `/api/agents`, `/api/documents`, and `/api/conversations`, with automatic client-side fallback to seed data.",
      },
    ],
    aiFeatures: [
      {
        title: "AI-Agent-First Product Design",
        detail:
          "Every screen is built around how AI agents operate — deploying agents, pointing them at knowledge, and reviewing their conversations.",
      },
      {
        title: "RAG-Ready Knowledge Architecture",
        detail:
          "Knowledge sources are modelled as a first-class domain so agents can be grounded in real document content.",
      },
    ],
    tech: {
      area: "AI SaaS — Next.js frontend + FastAPI backend",
      stack: [
        { name: "Next.js 16", blurb: "App Router, RSC" },
        { name: "TypeScript", blurb: "Typed codebase" },
        { name: "React 19", blurb: "UI runtime" },
        { name: "Tailwind CSS v4", blurb: "Styling" },
        { name: "shadcn/ui", blurb: "Component system" },
        { name: "Python FastAPI", blurb: "Backend API" },
        { name: "CI/CD (GitHub Actions)", blurb: "Automated workflows" },
        { name: "Seed-data fallback", blurb: "Resilient rendering" },
      ],
    },
    architecture: [
      "Frontend: Next.js 16 App Router with a server-rendered landing page and a client-driven product area under /dashboard.",
      "Backend: FastAPI serves structured JSON for dashboard, agents, documents, and conversations, with automatic fallback to bundled seed data in the frontend.",
      "Routing: `/` (marketing) and `/dashboard` (product) as clearly separated experiences over one codebase.",
      "DevOps: GitHub Actions CI with a pre-commit config to keep the repository clean and deployable.",
    ],
    role: [
      "Built the full product experience — landing page, dashboard, agents, knowledge, conversations, and settings.",
      "Designed the FastAPI backend contract and wired the resilient seed-data fallback in the frontend.",
      "Established the monorepo structure (frontend / backend / mcp / docs) and CI pipeline.",
    ],
    impact: [
      "A demo-ready AI SaaS product recruiters and stakeholders can open, click through, and understand in under a minute.",
      "A pattern for agent observability — turning 'what is my AI doing?' into a visible dashboard.",
      "Production conventions such as API contracts, seed data, CI, and documentation from day one.",
    ],
    modelHighlights: [
      "Agent-first information architecture built for AI-product teams",
      "RAG-ready knowledge base structure and conversational analytics",
    ],
    year: "2025",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}