import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { certs } from "@/data/certs";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_86%),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="border-primary/30 bg-primary/10 text-primary">
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" aria-hidden="true" />
              Open to work
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <MapPin className="mr-1.5 size-3" aria-hidden="true" />
              Jaipur, Rajasthan, India
            </Badge>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 text-lg font-medium sm:text-xl text-primary">
            {siteConfig.headline}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.shortDescription} I build fast, secure, production-grade
            web platforms and ship real LLM features — AI chatbots, generative
            tools, and intelligent product experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" render={<a href="#projects" data-track="View work" />}>
              View my work <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" render={<a href="#contact" data-track="Contact" />}>
              Contact me
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { href: siteConfig.github, label: "GitHub", Icon: GitHubIcon },
              { href: siteConfig.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              { href: `mailto:${siteConfig.email}`, label: "Email", Icon: MailIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                data-track={label}
                className="group flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/70 bg-card/50 p-4">
            <GraduationCap className="mb-3 size-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold">{profile.education.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Jagannath University, Jaipur
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 p-4">
            <span className="text-2xl font-bold text-primary">{projects.length}</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Production-grade projects live on Vercel — full-stack & AI SaaS
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 p-4">
            <span className="text-2xl font-bold text-primary">{certs.length}</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Verified internship & development certificates
            </p>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
            <span className="text-sm font-semibold text-primary">
              {siteConfig.available ? "Available" : "Taking a pause"}
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Open to full-stack and AI integration roles — since 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}