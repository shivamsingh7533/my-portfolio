import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_20%,rgba(16,185,129,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          This page took a wrong turn
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist — but {siteConfig.name}&apos;s
          projects, insights, and contact details are all one click away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button render={<Link href="/" />}>
            <Home className="size-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button variant="outline" render={<Link href="/#projects" />}>
            <Search className="size-4" aria-hidden="true" />
            Browse projects
          </Button>
          <Button variant="ghost" render={<Link href="/insights" />}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Read insights
          </Button>
        </div>
      </div>
    </div>
  );
}