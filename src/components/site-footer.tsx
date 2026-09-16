import Link from "next/link";
import { siteConfig } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">{siteConfig.name}</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {siteConfig.headline} · {siteConfig.location}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Open to Full-Stack Developer & AI Integration roles.
            </p>
          </div>

          <div className="flex items-center gap-2" aria-label="Social links">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer noopener"
              data-track="GitHub"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub — shivamsingh7533"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              data-track="LinkedIn"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn — Shivam Kumar"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              data-track="Email"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Email — sk9529973@gmail.com"
            >
              <MailIcon className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            TypeScript, Tailwind CSS & shadcn/ui.
          </p>
          <p>Engineered for SEO · AEO · GEO · LLMO · AISEO · EEAT.</p>
        </div>
        <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/insights" className="hover:text-foreground">
            Insights
          </Link>
          <Link href="/projects/oasis-space" className="hover:text-foreground">
            OasisSpace
          </Link>
          <Link href="/projects/base-mind" className="hover:text-foreground">
            BaseMind
          </Link>
          <Link href={siteConfig.resumeUrl} className="hover:text-foreground">
            Resume
          </Link>
        </nav>
      </div>
    </footer>
  );
}