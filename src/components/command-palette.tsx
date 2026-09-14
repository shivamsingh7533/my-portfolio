"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowRight, Home, Search, Sparkles, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

const sections = [
  { label: "Home", href: "/#top", icon: Home },
  { label: "About", href: "/#about", icon: Sparkles },
  { label: "Skills", href: "/#skills", icon: Sparkles },
  { label: "Projects", href: "/#projects", icon: FolderGit2 },
  { label: "Contact", href: "/#contact", icon: ArrowRight },
];

export function CommandPalette({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const run = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={className}
        aria-label="Open command palette (Ctrl+K)"
        onClick={() => setOpen((v) => !v)}
      >
        <Search className="size-4" aria-hidden="true" />
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <Command
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border/70 px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <Command.Input
                ref={inputRef}
                placeholder="Jump to a section or page…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-72 overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Sections" className="px-0">
                {sections.map((s) => (
                  <Command.Item
                    key={s.href}
                    value={`section ${s.label}`}
                    onSelect={() => run(s.href)}
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <s.icon className="size-4 text-primary" aria-hidden="true" />
                    {s.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects" className="px-0">
                {projects.map((p) => (
                  <Command.Item
                    key={p.slug}
                    value={`project ${p.slug}`}
                    onSelect={() => run(`/projects/${p.slug}`)}
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <span aria-hidden="true">{p.emoji}</span>
                    {p.name}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Insights" className="px-0">
                <Command.Item
                  value="insights index"
                  onSelect={() => run("/insights")}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <Sparkles className="size-4 text-primary" aria-hidden="true" />
                  All insights
                </Command.Item>
                {posts.map((post) => (
                  <Command.Item
                    key={post.slug}
                    value={`post ${post.slug}`}
                    onSelect={() => run(`/insights/${post.slug}`)}
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                    {post.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Links" className="px-0">
                <Command.Item
                  value="github"
                  onSelect={() => window.open(siteConfig.github, "_blank")}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <FolderGit2 className="size-4 text-primary" aria-hidden="true" />
                  GitHub — {siteConfig.github}
                </Command.Item>
                <Command.Item
                  value="linkedin"
                  onSelect={() => window.open(siteConfig.linkedin, "_blank")}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                  LinkedIn
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}