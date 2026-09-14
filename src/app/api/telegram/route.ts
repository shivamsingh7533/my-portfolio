import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";

type TrackerPayload = {
  page?: string;
  device?: string;
  ref?: string;
  action?: string;
};

const EXACT_ACTIONS = new Set([
  "GitHub",
  "LinkedIn",
  "Email",
  "Hire me",
  "Contact",
  "View work",
  "Certificate",
]);

const ACTION_PREFIXES = ["Demo: ", "Repo: ", "Case study: "];

const RATE_PER_MINUTE = 30;
const requestLog = new Map<string, number[]>();

function isValidPage(page: unknown): page is string {
  return typeof page === "string" && page.startsWith("/") && page.length <= 120;
}

function isValidDevice(device: unknown): boolean {
  return device === undefined || device === "mobile" || device === "desktop";
}

function isValidRef(ref: unknown): boolean {
  if (ref === undefined) return true;
  return (
    typeof ref === "string" &&
    ref.length <= 60 &&
    /^[a-z0-9.-]+$/i.test(ref)
  );
}

function isValidAction(action: unknown): boolean {
  if (action === undefined || action === null) return true;
  if (typeof action !== "string" || action.length > 40) return false;
  return (
    EXACT_ACTIONS.has(action) ||
    ACTION_PREFIXES.some((prefix) => action.startsWith(prefix))
  );
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "local"
  )
    .split(",")[0]
    .trim();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const hits = (requestLog.get(ip) ?? []).filter((t) => t > windowStart);
  if (hits.length >= RATE_PER_MINUTE) {
    requestLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  requestLog.set(ip, hits);
  if (requestLog.size > 500) {
    for (const [key, stamps] of requestLog) {
      if (stamps.every((t) => t <= windowStart)) requestLog.delete(key);
    }
  }
  return false;
}

function deviceLabel(payload: TrackerPayload) {
  return payload.device === "mobile" ? "Mobile" : "Desktop";
}

function buildMessage(payload: TrackerPayload) {
  const page = payload.page || "/";

  if (payload.action) {
    return `🎯 ${payload.action} clicked — ${page}`;
  }

  const ref = payload.ref ? ` · via ${payload.ref}` : "";
  return `🌐 New visit — ${page} · ${deviceLabel(payload)}${ref}`;
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return Response.json({ ok: false }, { status: 503 });
  }

  if (isRateLimited(clientIp(request))) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as TrackerPayload;
  if (
    !isValidPage(body.page) ||
    !isValidDevice(body.device) ||
    !isValidRef(body.ref) ||
    !isValidAction(body.action)
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const sent = await sendTelegramMessage(buildMessage(body));
  return Response.json({ ok: sent }, { status: sent ? 200 : 502 });
}