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
  {
    slug: "system-prompts-guardrails-chatbots",
    title: "System prompts and guardrails: shipping a safe production chatbot",
    description:
      "The difference between a toy chatbot and a production AI feature is context and guardrails. Here's the exact framework I use to prompt and gate LLM features.",
    date: "2026-09-05",
    dateLabel: "September 2026",
    readingTime: "5 min",
    tags: ["Prompt Engineering", "Guardrails", "LLM", "AI Integration"],
    content: [
      "Every LLM feature I ship is built around one idea: the system prompt is the product. Model choice matters, but how the model is constrained decides whether a user experience feels sharp or sloppy.",
      "My guardrail framework has four layers. First, role and boundaries: the prompt states exactly what the assistant is, what it handles, and what it refuses. Second, context grounding: the model only answers from the data it's given, and says it doesn't know when it doesn't. Third, output shaping: response length, tone, formatting, and when to stream vs. wait. Fourth, topic blocks: hard rules for anything with legal, pricing, or safety implications.",
      "A practical example from OasisSpace: the property assistant is confined to the listing dataset. If a user asks about a listing that isn't in the data, the model says so instead of inventing details. That single rule eliminates most hallucination risk while keeping conversations useful.",
      "Guardrails belong in both the prompt and the code. The prompt sets behavior; the application enforces it — validating inputs, limiting context size, capping output tokens, and refusing to send unsafe content to the model in the first place.",
      "Instrumentation is the part most teams skip. Log prompts, responses, and latency, then review them. Live LLM features drift and improve in small iterations, and without logs you're flying blind.",
    ],
  },
  {
    slug: "choosing-llm-provider-production",
    title: "Choosing an LLM provider for production: Groq vs Gemini vs OpenAI",
    description:
      "Latency, cost, throughput and ecosystem — a practical comparison of the LLM providers I evaluate when shipping real AI features for web products.",
    date: "2026-09-12",
    dateLabel: "September 2026",
    readingTime: "5 min",
    tags: ["Groq", "Gemini", "OpenAI", "LLM Providers"],
    content: [
      "Picking an LLM provider for a production feature is a tradeoff between latency, cost, throughput, and ecosystem — and the right answer depends on the interaction you're shipping.",
      "Groq is my first choice for chat-heavy, synchronous features where responsiveness is the whole experience. Extremely fast inference and predictable token throughput make streaming assistants feel instant. In OasisSpace, the property assistant runs on Groq for exactly this reason.",
      "Google Gemini shines when you need strong reasoning, broad context, and multimodal input, or when you're already on Google Cloud. Its generous context windows make it strong for generation tasks that need to absorb a lot of material — I use it for content and description generation.",
      "OpenAI is the default when you need the largest ecosystem: function calling maturity, tooling, enterprise support, and the widest choice of models. It's rarely the cheapest, but its reliability and documentation reduce integration risk on serious products.",
      "The practical takeaway: don't standardize on one provider. Structure your code around a thin LLM client so the model swap is a configuration change, run the cheapest adequate model for each job, and measure latency and cost per request in production before you scale.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}