import { Bot, ScanSearch, Sparkles, Blocks, Gauge } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

const optimizations = [
  {
    key: "SEO",
    name: "Search Engine Optimization",
    detail:
      "Semantic HTML, one H1 per page, descriptive metadata, alt text, internal links, and a machine-readable sitemap.",
    Icon: ScanSearch,
  },
  {
    key: "AEO",
    name: "Answer Engine Optimization",
    detail:
      "Direct, self-contained answers formatted so answer engines can quote me cleanly.",
    Icon: Bot,
  },
  {
    key: "GEO",
    name: "Generative Engine Optimization",
    detail:
      "Structured JSON-LD and clear facts make this profile highly citable by generative engines.",
    Icon: Sparkles,
  },
  {
    key: "LLMO",
    name: "Large Language Model Optimization",
    detail:
      "Clean, unambiguous copy and typed content so LLMs can extract and reuse my details accurately.",
    Icon: Blocks,
  },
  {
    key: "AISEO",
    name: "AI Search Optimization",
    detail:
      "Built for AI-powered search — concise answers, rich entities, and zero fluff.",
    Icon: Gauge,
  },
  {
    key: "EEAT",
    name: "Experience · Expertise · Authority · Trust",
    detail:
      "First-hand project work, verified certificates, real links, and a clear professional narrative.",
    Icon: Badge,
  },
];

export function AIReadiness() {
  return (
    <section
      id="ai-readiness"
      className="scroll-mt-20 border-t border-border/60 py-14"
      aria-labelledby="ai-readiness-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="ai-readiness"
          eyebrow="AI-ready engineering"
          title="Optimized for search engines and AI assistants"
          description="This portfolio was engineered — not just written — to rank, be understood, and be extracted accurately by every modern discovery system."
        />

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-5 py-3">
            <span className="text-2xl font-bold text-primary">3/3</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Agentic browsing score</p>
              <p className="text-xs text-muted-foreground">
                Self-audited with AI browsing agents — identity, links, and skills extracted 3/3
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 px-5 py-3 text-sm text-muted-foreground">
            Structured data · sitemap · robots rules · instant-load pages
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {optimizations.map(({ key, name, detail, Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-border/70 bg-card/50 p-5 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <Badge variant="outline" className="font-semibold">
                  {key}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}