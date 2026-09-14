export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "basemind-from-design-to-deploy",
    title: "How I architected BaseMind: an AI SaaS platform from design to deploy",
    description:
      "BaseMind is a full-stack AI SaaS platform I built from scratch. Here's the architecture, stack decisions, and the demo-first approach that shaped it.",
    date: "2026-07-20",
    dateLabel: "July 2026",
    readingTime: "4 min",
    tags: ["Next.js", "FastAPI", "AI SaaS", "Architecture"],
    content: [
      "BaseMind started with a simple goal: take an AI SaaS product concept and turn it into a working, clickable platform that feels real — not a mockup, not a slideshow, but a deployable app.",
      "The stack decision came down to what a modern AI product actually needs. The frontend runs on Next.js 16 with the App Router, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui because that combination gives me server components, great SEO control, and a polished design system out of the box. The backend is a FastAPI service that serves structured demo data through clean REST endpoints.",
      "The most important architecture decision was the seed-data fallback. The frontend bundles realistic seed data and falls back to it whenever the API is unreachable. That means the UI always renders — for a live demo, that's everything. A reviewer can open the dashboard, agents view, knowledge base, logs, and settings without a single environment variable being set on their machine.",
      "I kept the two systems decoupled by contract: the frontend talks to the backend through small typed endpoint functions, and the seed data mirrors the exact shape of the API responses. If the API grows later, the fallback updates in one place.",
      "The lesson: for portfolio and demo products, ship something that works headlessly first. A demo that can't run is worse than no demo at all.",
    ],
  },
  {
    slug: "shipping-llm-features-groq",
    title: "Shipping real LLM features with Groq: lessons from an AI property assistant",
    description:
      "OasisSpace ships an AI property assistant and a generative description tool. Here's what I learned integrating LLMs into a production full-stack product.",
    date: "2026-08-18",
    dateLabel: "August 2026",
    readingTime: "4 min",
    tags: ["Groq", "LLM", "AI Integration", "OasisSpace"],
    content: [
      "When I built OasisSpace, a full-stack real-estate marketplace, I wanted the AI features to be real product features — not a demo chatbot bolted on as an afterthought. Two integrations made the cut: an AI property assistant powered by Groq LLaMA 3.3 and an AI description generator built on Google Gemini.",
      "The property assistant is genuinely useful because it has context. It answers questions based on the actual listing data in the system — price, location, bedrooms, amenities — rather than generating generic real-estate fluff. That's the single biggest lesson: an LLM feature is only as good as the context you give it.",
      "Prompt engineering is where the real work happens. I wrote system prompts that define the assistant's role, constrain it to the listing dataset, and instruct it to deflect questions about unavailable data. Streaming responses and guardrails for pricing/mortgage questions made the experience feel instant and safe at the same time.",
      "The description generator is a quieter but very practical win. Sellers list properties with a few keywords, and the AI drafts polished, SEO-aware descriptions. For a marketplace, that feature alone removes a huge amount of friction for sellers.",
      "What I'd do differently next time: treat model latency and token cost as first-class product constraints from day one, and log every prompt and response for evaluation. Live LLM features need instrumentation to improve, just like any other part of the stack.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}