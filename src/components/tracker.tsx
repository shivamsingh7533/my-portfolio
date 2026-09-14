"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TRACKER_ENABLED = process.env.NEXT_PUBLIC_TRACKER_ENABLED === "1";
const TRACKER_KEY = process.env.NEXT_PUBLIC_TRACKER_KEY ?? "";

const REFERRER_KEY = "shivam-tracker-ref";

const lastFired = new Map<string, number>();

function sendBeacon(payload: Record<string, string>) {
  const dedupeKey = JSON.stringify(payload);
  const now = Date.now();
  const previous = lastFired.get(dedupeKey);
  if (previous && now - previous < 2000) return;
  lastFired.set(dedupeKey, now);
  if (lastFired.size > 64) lastFired.clear();

  const body = JSON.stringify({ ...payload, key: TRACKER_KEY });
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
    if (!TRACKER_ENABLED || !pathname) return;

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

    sendBeacon({ page: pathname, device, ...(ref ? { ref } : {}) });
  }, [pathname]);

  useEffect(() => {
    if (!TRACKER_ENABLED) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest?.("[data-track]") as HTMLElement | null;
      if (!tracked) return;
      const action = tracked.getAttribute("data-track");
      if (!action || !TRACKER_KEY) return;
      sendBeacon({ action, page: window.location.pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}