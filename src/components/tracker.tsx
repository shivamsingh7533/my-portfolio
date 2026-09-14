"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TRACK_IN_PRODUCTION = true;

const REFERRER_KEY = "shivam-tracker-ref";

const lastFired = new Map<string, number>();

function sendBeacon(payload: Record<string, string>) {
  const dedupeKey = JSON.stringify(payload);
  const now = Date.now();
  const previous = lastFired.get(dedupeKey);
  if (previous && now - previous < 2000) return;
  lastFired.set(dedupeKey, now);
  if (lastFired.size > 64) lastFired.clear();

  const body = JSON.stringify(payload);
  try {
    navigator.sendBeacon("/api/telegram", new Blob([body], { type: "application/json" }));
  } catch {
    void fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TRACK_IN_PRODUCTION || process.env.NODE_ENV !== "production") return;
    if (!pathname) return;

    let ref: string | undefined;
    try {
      const stored = sessionStorage.getItem(REFERRER_KEY);
      if (stored) {
        ref = stored;
      } else {
        const referrer = document.referrer;
        if (referrer) {
          const host = new URL(referrer).hostname;
          if (host !== window.location.hostname) {
            ref = host;
            sessionStorage.setItem(REFERRER_KEY, host);
          }
        }
      }
    } catch {
      // ignore privacy-mode storage errors
    }

    const device = /iPad|iPhone|Android|Mobile/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop";

    sendBeacon({
      page: pathname,
      device,
      ...(ref ? { ref } : {}),
    });
  }, [pathname]);

  useEffect(() => {
    if (!TRACK_IN_PRODUCTION || process.env.NODE_ENV !== "production") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest?.("[data-track]") as HTMLElement | null;
      if (!tracked) return;
      const action = tracked.getAttribute("data-track");
      if (!action) return;
      sendBeacon({ action, page: window.location.pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}