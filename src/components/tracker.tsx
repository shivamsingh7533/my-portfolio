"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = "/api/pulse";
const SID_KEY = "_sid";
const REF_KEY = "_ref";
const MIN_GAP = 1200;
const SECTIONS = [
  "about",
  "skills",
  "projects",
  "experience",
  "certifications",
  "ai-readiness",
  "insights",
  "github",
  "faq",
  "contact",
];

const lastFired = new Map<string, number>();
const reportedSections = new Set<string>();

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

function savedReferrer(): string {
  try {
    const stored = sessionStorage.getItem(REF_KEY);
    if (stored !== null) return stored;
    const r = document.referrer || "";
    if (r) sessionStorage.setItem(REF_KEY, r);
    return r;
  } catch {
    return document.referrer || "";
  }
}

function utm(): string {
  try {
    const q = new URLSearchParams(window.location.search);
    const parts: string[] = [];
    const s = q.get("utm_source");
    const m = q.get("utm_medium");
    const c = q.get("utm_campaign");
    if (s) parts.push(`src=${s}`);
    if (m) parts.push(`med=${m}`);
    if (c) parts.push(`camp=${c}`);
    return parts.join(" · ");
  } catch {
    return "";
  }
}

function context() {
  let sw = 0;
  let sh = 0;
  let dpr = 1;
  let vw = 0;
  let vh = 0;
  try {
    sw = window.screen.width;
    sh = window.screen.height;
    dpr = window.devicePixelRatio || 1;
    vw = window.innerWidth;
    vh = window.innerHeight;
  } catch {
    // ignore
  }
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    // ignore
  }
  return {
    sw,
    sh,
    dpr,
    vw,
    vh,
    lang: (navigator.language || "").slice(0, 20),
    tz: tz.slice(0, 32),
  };
}

function send(e: "view" | "click" | "section", a?: string, withRef = false) {
  if (process.env.NODE_ENV !== "production") return;
  const p = window.location.pathname + window.location.search + window.location.hash;
  const key = `${e}|${a || ""}|${p}`;
  const now = Date.now();
  const prev = lastFired.get(key);
  if (prev && now - prev < MIN_GAP) return;
  lastFired.set(key, now);
  if (lastFired.size > 160) lastFired.clear();

  const body: Record<string, unknown> = {
    e,
    a,
    p,
    sid: sessionId(),
    ...context(),
  };
  if (withRef) body.r = savedReferrer();
  const u = utm();
  if (u) body.u = u;

  const json = JSON.stringify(body);
  const sendBeacon = () =>
    navigator.sendBeacon(ENDPOINT, new Blob([json], { type: "application/json" }));
  const fallback = () =>
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => undefined);

  try {
    if (!sendBeacon()) fallback();
  } catch {
    fallback();
  }
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const fire = () => window.setTimeout(() => send("view", undefined, true), 60);
    fire();

    const origPush = window.history.pushState.bind(window.history);
    const origReplace = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args: Parameters<typeof history.pushState>) => {
      const result: unknown = origPush(...args);
      fire();
      return result as void;
    };
    window.history.replaceState = (...args: Parameters<typeof history.replaceState>) => {
      const result: unknown = origReplace(...args);
      fire();
      return result as void;
    };

    const onPop = () => fire();
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      const el = target?.closest?.("a,button") as HTMLElement | null;
      if (!el) return;
      let href = "";
      if (el instanceof HTMLAnchorElement) href = el.href || "";
      const text = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
      let action = text || href.slice(0, 80);
      if (href) {
        if (/resume\.pdf/i.test(href)) action = "View resume";
        else if (/^mailto:/i.test(href)) action = "Email";
        else if (/linkedin\.com/i.test(href)) action = "LinkedIn";
        else if (/github\.com/i.test(href)) action = "GitHub";
        else action = text || action;
      }
      send("click", action);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (!id || !SECTIONS.includes(id) || reportedSections.has(id)) continue;
          reportedSections.add(id);
          send("section", id);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}