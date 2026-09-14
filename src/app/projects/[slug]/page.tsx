import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Target,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { GitHubIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";
import { projectSchema } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.category} | Shivam Kumar`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.category}`,
      description: project.tagline,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd id={`project-${project.slug}-schema`} data={projectSchema(project)} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/#projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div
          className={`mb-6 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}
          aria-hidden="true"
        />
        <Badge variant="outline" className="mb-4 text-muted-foreground">
          {project.category} · {project.status}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          <span aria-hidden="true">{project.emoji} </span>
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button render={<a href={project.demo} target="_blank" rel="noreferrer noopener" />}>
            Live demo <ExternalLink className="size-4" aria-hidden="true" />
          </Button>
          <Button variant="outline" render={<a href={project.repo} target="_blank" rel="noreferrer noopener" />}>
            <GitHubIcon className="size-4" aria-hidden="true" />
            Source code
          </Button>
        </div>

        <div className="mt-8 rounded-xl border border-border/70 bg-card/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Lightbulb className="size-4 text-primary" aria-hidden="true" />
            Overview
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>
        </div>

        <section className="mt-10 grid gap-6 sm:grid-cols-2" aria-labelledby="problem-title">
          <div className="rounded-xl border border-border/70 bg-card/50 p-6">
            <h2 id="problem-title" className="flex items-center gap-2 text-lg font-semibold">
              <Target className="size-4 text-primary" aria-hidden="true" />
              The problem
            </h2>
            <ul className="mt-4 space-y-3">
              {project.problem.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive/70" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
              The solution
            </h2>
            <ul className="mt-4 space-y-3">
              {project.solution.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="features-title">
          <h2 id="features-title" className="text-xl font-bold">
            Key features
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border/70 bg-card/50 p-5">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="ai-title">
          <h2 id="ai-title" className="flex items-center gap-2 text-xl font-bold">
            ⚡ AI integrations
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.aiFeatures.map((f) => (
              <div key={f.title} className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                <h3 className="font-semibold text-emerald-400">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="tech-title">
          <h2 id="tech-title" className="flex items-center gap-2 text-xl font-bold">
            <Wrench className="size-5 text-primary" aria-hidden="true" />
            Technology stack
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{project.tech.area}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.stack.map((t) => (
              <Badge key={t.name} variant="outline" className="py-1.5">
                {t.name}
                {t.blurb ? (
                  <span className="sr-only"> — {t.blurb}</span>
                ) : null}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        <section aria-labelledby="architecture-title">
          <h2 id="architecture-title" className="text-xl font-bold">Architecture & engineering decisions</h2>
          <ul className="mt-5 space-y-3">
            {project.architecture.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/50 p-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="role-title">
          <h2 id="role-title" className="text-xl font-bold">My role</h2>
          <ul className="mt-5 space-y-3">
            {project.role.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/50 p-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="impact-title">
          <h2 id="impact-title" className="text-xl font-bold">Impact</h2>
          <ul className="mt-5 space-y-3">
            {project.impact.map((i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-8">
          <Button variant="ghost" render={<Link href="/#projects" />}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Button>
          <span className="text-sm text-muted-foreground">
            Built by <span className="font-medium text-foreground">{siteConfig.name}</span> · {project.year}
          </span>
        </div>
      </div>
    </>
  );
}