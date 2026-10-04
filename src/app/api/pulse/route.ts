import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";
import {
  buildEventMessage,
  buildViewMessage,
  isCrawler,
  type PulsePayload,
  type VisitEnv,
} from "@/lib/pulse";

const IP_PER_MINUTE = 90;
const SESSION_PER_MINUTE = 24;

const ipLog = new Map<string, number[]>();
const sidLog = new Map<string, number[]>();

function mark(
  log: Map<string, number[]>,
  key: string,
  windowMs: number,
  limit: number
): boolean {
  const now = Date.now();
  const recent = (log.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    log.set(key, recent);
    return true;
  }
  recent.push(now);
  log.set(key, recent);
  if (log.size > 500) {
    for (const [k, stamps] of log) {
      if (stamps.every((t) => now - t >= windowMs)) log.delete(k);
    }
  }
  return false;
}

function envOf(req: Request): VisitEnv {
  const h = (n: string) => req.headers.get(n) ?? "";
  const forwarded =
    h("x-vercel-forwarded-for") || h("x-forwarded-for") || "local";
  return {
    ua: h("user-agent"),
    chUa: h("sec-ch-ua"),
    chMobile: h("sec-ch-ua-mobile"),
    chPlatform: h("sec-ch-ua-platform"),
    ip: forwarded.split(",")[0].trim().slice(0, 45) || "local",
    country: h("x-vercel-ip-country"),
    region: h("x-vercel-ip-country-region"),
    city: h("x-vercel-ip-city"),
    lat: h("x-vercel-ip-latitude"),
    lon: h("x-vercel-ip-longitude"),
    ipTz: h("x-vercel-ip-timezone"),
  };
}

function isValid(b: unknown): b is PulsePayload {
  if (!b || typeof b !== "object") return false;
  const x = b as Record<string, unknown>;
  if (typeof x.p !== "string" || !x.p.startsWith("/") || x.p.length > 200)
    return false;
  if (x.e !== "view" && x.e !== "click" && x.e !== "section") return false;

  const str = (v: unknown, max: number) =>
    v === undefined || (typeof v === "string" && v.length <= max);
  const num = (v: unknown) =>
    v === undefined || (typeof v === "number" && Number.isFinite(v));

  return (
    str(x.a, 80) &&
    str(x.r, 500) &&
    str(x.u, 200) &&
    str(x.sid, 64) &&
    str(x.lang, 40) &&
    str(x.tz, 48) &&
    num(x.sw) &&
    num(x.sh) &&
    num(x.dpr) &&
    num(x.vw) &&
    num(x.vh)
  );
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return Response.json({ ok: false }, { status: 503 });
  }

  const env = envOf(request);
  if (!env.ua || isCrawler(env.ua)) {
    return Response.json({ ok: true, skip: "crawler" }, { status: 200 });
  }

  if (mark(ipLog, env.ip, 60_000, IP_PER_MINUTE)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as PulsePayload | null;
  if (!isValid(body)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (body.sid && mark(sidLog, body.sid, 60_000, SESSION_PER_MINUTE)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const text =
    body.e === "view"
      ? buildViewMessage(body, env)
      : buildEventMessage(body, env);

  const sent = await sendTelegramMessage(text);
  return Response.json({ ok: sent }, { status: sent ? 200 : 502 });
}