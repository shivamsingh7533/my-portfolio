import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";

type TrackerPayload = {
  page?: string;
  device?: string;
  ref?: string;
  action?: string;
  key?: string;
};

const trackerKey = process.env.NEXT_PUBLIC_TRACKER_KEY;

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

  const body = (await request.json().catch(() => ({}))) as TrackerPayload;
  if (!trackerKey || body.key !== trackerKey) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const sent = await sendTelegramMessage(buildMessage(body));
  return Response.json({ ok: sent }, { status: sent ? 200 : 502 });
}