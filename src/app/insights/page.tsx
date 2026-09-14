import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/data/posts";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Insights — Engineering notes from live projects",
  description:
    "Engineering notes from Shivam Kumar's full-stack and AI projects: architecture decisions, LLM integrations, and lessons shipped in production demos.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — Engineering notes from live projects",
    description:
      "Architecture, LLM integrations, and lessons shipped in production-grade demos by Shivam Kumar.",
    type: "website",
  },
};

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        id="insights-breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
        ])}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          id="insights"
          eyebrow="Insights"
          title="Notes from shipping real products"
          description="Architecture decisions, LLM integrations, and lessons from projects that are live and in production."
        />

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-border/70 bg-card/50 p-6 transition-colors hover:border-primary/30 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {post.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {post.readingTime}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                <Link
                  href={`/insights/${post.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-muted-foreground">{post.description}</p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary"
                  render={<Link href={`/insights/${post.slug}`} />}
                >
                  Read post <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Want the source? My projects are public at{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline-offset-4 hover:underline"
          >
            github.com/shivamsingh7533
          </a>
          .
        </p>
      </section>
    </>
  );
}