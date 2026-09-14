import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/site";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(16,185,129,0.14),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            >
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to work
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <MapPin className="mr-1.5 size-3" aria-hidden="true" />
              Jaipur, Rajasthan, India
            </Badge>
          </div>

          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Hi, I&apos;m Shivam Kumar —
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Full-Stack Developer{" "}
            <span className="text-primary">&amp; AI Integration Engineer</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.shortDescription} I build fast, secure, production-grade
            web platforms and ship real LLM features — AI chatbots, generative
            tools, and intelligent product experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" render={<a href="#projects" />}>
              View my work <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" render={<a href="#contact" />}>
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
                className="group flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-card/50 p-4">
            <GraduationCap className="mb-3 size-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold">{profile.education.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Jagannath University, Jaipur
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 p-4">
            <span className="text-2xl font-bold text-primary">2</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Production-grade projects live on Vercel — full-stack & AI SaaS
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
            <span className="text-sm font-semibold text-emerald-400">
              AI-ready portfolio
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              SEO · AEO · GEO · LLMO · AISEO · EEAT — agentic browsing score 3/3
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}