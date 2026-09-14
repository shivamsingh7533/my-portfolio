export type SkillGroup = {
  label: string;
  blurb: string;
  skills: { name: string; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Full-Stack Development",
    blurb: "End-to-end product building — from database schema to production UI.",
    skills: [
      { name: "React 19", note: "Hooks, context, high-performance UI" },
      { name: "Next.js", note: "App Router, RSC, SSR/SSG, metadata & SEO" },
      { name: "TypeScript", note: "Typed, maintainable codebases" },
      { name: "Node.js & Express", note: "REST APIs, middleware, auth" },
      { name: "MongoDB & Mongoose", note: "Schema design, aggregation" },
      { name: "Tailwind CSS", note: "v3 & v4, design systems" },
      { name: "Redux Toolkit", note: "Predictable global state" },
      { name: "REST API Design", note: "Contracts, validation, pagination" },
    ],
  },
  {
    label: "AI Integration",
    blurb: "Shipping real LLM features inside production applications.",
    skills: [
      { name: "Groq / LLaMA 3.3", note: "Real-time AI assistants & chatbots" },
      { name: "Google Gemini", note: "Generative content & descriptions" },
      { name: "Prompt Engineering", note: "System prompts, context windows, guardrails" },
      { name: "AI Chatbot Systems", note: "Conversational UX, streaming, tool use" },
      { name: "Generative Workflows", note: "AI-copilot features inside products" },
      { name: "Agent Architecture", note: "Agents, knowledge bases, RAG-ready design" },
    ],
  },
  {
    label: "Tools, Security & DevOps",
    blurb: "The engineering practices that keep products fast and safe.",
    skills: [
      { name: "Git & GitHub", note: "Branching, PRs, CI readiness" },
      { name: "JWT & OAuth", note: "Secure session management" },
      { name: "Razorpay Payments", note: "Order creation & verification" },
      { name: "Firebase & Supabase", note: "Auth, storage, serverless" },
      { name: "Vercel & Render", note: "Zero-config deployments" },
      { name: "Performance & SEO", note: "Core Web Vitals, JSON-LD" },
      { name: "PWA", note: "Installable, offline-capable apps" },
    ],
  },
];

export const allSkillLabels = skillGroups.flatMap((g) => g.skills.map((s) => s.name));