import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="projects"
          eyebrow="Projects"
          title="Production-grade work, end to end"
          description="Two flagship projects — a full-stack real-estate platform and an AI SaaS product — both live on Vercel, both with real AI integrations and complete source on GitHub."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.slug}
              className="group relative flex flex-col overflow-hidden border-border/70 bg-card/50 transition-colors hover:border-primary/40"
            >
              <div
                className={`relative h-2 bg-gradient-to-r ${project.gradient}`}
                aria-hidden="true"
              />
              <div className="relative px-6 pt-6">
                <Image
                  src={project.cover}
                  alt={`${project.name} interface preview`}
                  width={1200}
                  height={750}
                  priority={false}
                  className="h-48 w-full rounded-xl border border-border/70 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <CardHeader className="pb-0 pt-5">
                <div>
                  <Badge variant="outline" className="mb-3 text-muted-foreground">
                    {project.category}
                  </Badge>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span aria-hidden="true">{project.emoji}</span>
                    {project.name}
                  </CardTitle>
                  <p className="mt-3 text-muted-foreground">{project.tagline}</p>
                </div>
              </CardHeader>

              <CardContent className="flex-1 pt-4">
                <p className="text-sm font-semibold text-primary">AI integration:</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {project.modelHighlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.stack.slice(0, 6).map((t) => (
                    <Badge key={t.name} variant="outline" className="text-xs">
                      {t.name}
                    </Badge>
                  ))}
                  <Badge variant="ghost" className="text-xs text-muted-foreground">
                    +{project.tech.stack.length - 6} more
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap items-center gap-2">
                <Button render={<Link href={`/projects/${project.slug}`} data-track={`Case study: ${project.name}`} />}>
                  Case study <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" render={<a href={project.demo} target="_blank" rel="noreferrer noopener" data-track={`Demo: ${project.name}`} />}>
                  Live demo <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" render={<a href={project.repo} target="_blank" rel="noreferrer noopener" data-track={`Repo: ${project.name}`} />}>
                  <GitHubIcon className="size-4" aria-hidden="true" />
                  Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}