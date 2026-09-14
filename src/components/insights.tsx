import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/data/posts";

export function Insights() {
  return (
    <section
      id="insights"
      className="scroll-mt-20 border-t border-border/60 py-14"
      aria-labelledby="insights-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="insights"
            eyebrow="Insights"
            title="Notes from shipping real products"
            description="A few write-ups on architecture decisions, LLM integrations, and lessons from projects that are live."
          />
          <Link
            href="/insights"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            All insights <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card/50 p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {post.dateLabel}
                </span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold tracking-tight">
                <Link
                  href={`/insights/${post.slug}`}
                  className="transition-colors group-hover:text-primary"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}