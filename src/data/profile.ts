import { siteConfig } from "./site";

export const profile = {
  name: siteConfig.name,
  role: siteConfig.role,
  roleSecondary: siteConfig.roleSecondary,
  tagline:
    "Shipping AI-integrated full-stack products that feel fast, look polished, and stay production-ready.",
  about: [
    "I am a Full-Stack Developer and AI Integration Engineer from Nawada, Bihar, currently based in Jaipur, Rajasthan, pursuing B.Tech in Computer Science & Engineering at Jagannath University, Jaipur.",
    "I specialise in building end-to-end web platforms with the MERN stack and Next.js, and I regularly ship real AI integrations — LLM-powered chatbots, generative content tools, and intelligent product features — on top of production systems.",
    "I care about clean architecture, typed codebases, secure authentication, scalable APIs, and interfaces that communicate clearly. My projects are live on Vercel with source code on GitHub, and every feature I build is designed to be used, measured, and improved.",
  ],
  education: {
    university: "Jagannath University, Jaipur",
    degree: "B.Tech — Computer Science and Engineering",
    status: "Pursuing",
    location: "Jaipur, Rajasthan, India",
  },
  journey: [
    {
      title: "Origin — Nawada, Bihar",
      detail:
        "Born and raised in Nawada, Bihar. This is where my curiosity for how software works first started.",
    },
    {
      title: "Now — Jaipur, Rajasthan",
      detail:
        "Based in Jaipur for my B.Tech CSE at Jagannath University, building full-stack and AI-integrated products full-time.",
    },
  ],
  whatIDoBest: [
    {
      title: "Full-Stack Product Engineering",
      detail:
        "React, Next.js, Node.js, Express, MongoDB, and TypeScript — from database schema to polished UI.",
    },
    {
      title: "AI Integration",
      detail:
        "LLM APIs (Groq LLaMA, Google Gemini), prompt engineering, AI chatbots, RAG-ready knowledge systems, and generative workflows inside real apps.",
    },
    {
      title: "Developer Experience & SEO",
      detail:
        "Performance budgets, semantic HTML, structured data (JSON-LD), and platforms optimised for SEO, AEO, GEO, and LLM-friendly answer engines.",
    },
  ],
};

export type Profile = typeof profile;