"use client";

import { ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing to do
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card/60 to-card/40 p-8 sm:p-12">
          <SectionHeading
            id="contact"
            eyebrow="Contact"
            title="Let's build something intelligent together"
            description="Open to full-stack developer and AI integration roles — remote, hybrid, or on-site. I reply fast."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Button size="lg" variant="secondary" render={<a href={`mailto:${siteConfig.email}?subject=Opportunity%20for%20Shivam%20Kumar`} data-track="Email" />}>
              <MailIcon className="size-4" aria-hidden="true" />
              {siteConfig.email}
            </Button>

            <Button size="lg" variant="outline" render={<a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" data-track="LinkedIn" />}>
              <LinkedInIcon className="size-4" aria-hidden="true" />
              LinkedIn
            </Button>

            <Button size="lg" variant="outline" render={<a href={siteConfig.github} target="_blank" rel="noreferrer noopener" data-track="GitHub" />}>
              <GitHubIcon className="size-4" aria-hidden="true" />
              GitHub
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Prefer to copy the email address?
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" aria-hidden="true" />
                  {siteConfig.email}
                </>
              )}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span>
              📍 {siteConfig.location} · Originally from {siteConfig.origin}
            </span>
            <ArrowRight className="hidden size-4 sm:block" aria-hidden="true" />
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary hover:underline">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}