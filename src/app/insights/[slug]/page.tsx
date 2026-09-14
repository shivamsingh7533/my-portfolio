import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { getPost, posts } from "@/data/posts";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/insights/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd id={`post-${post.slug}-article`} data={articleSchema({
        title: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${siteConfig.url}/insights/${post.slug}`,
      })} />
      <JsonLd id={`post-${post.slug}-breadcrumb`} data={breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Insights", href: "/insights" },
        { name: post.title, href: `/insights/${post.slug}` },
      ])} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
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

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-8">
          <Button variant="ghost" render={<Link href="/insights" />}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            All insights
          </Button>
          <p className="text-sm text-muted-foreground">
            Written by{" "}
            <span className="font-medium text-foreground">{siteConfig.name}</span>
          </p>
        </div>
      </article>
    </>
  );
}