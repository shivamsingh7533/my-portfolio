"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25"
            aria-hidden="true"
          >
            {siteConfig.initials}
          </span>
          <span className="hidden sm:block">{siteConfig.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Button size="sm" className="ml-2" render={<a href="#contact" />}>
            Hire me
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-border/60 transition-all duration-200 lg:hidden",
          open ? "max-h-96 border-t" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile" className="px-4 py-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
<Button className="w-full" render={<a href="#contact" onClick={() => setOpen(false)} />}>
              Hire me
            </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}