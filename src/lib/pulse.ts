import "server-only";

export type PulseEvent = "view" | "click" | "section";

export type PulsePayload = {
  e: PulseEvent;
  p: string;
  a?: string;
  r?: string;
  u?: string;
  sid?: string;
  lang?: string;
  tz?: string;
  sw?: number;
  sh?: number;
  dpr?: number;
  vw?: number;
  vh?: number;
};

export type VisitEnv = {
  ua: string;
  chUa: string;
  chMobile: string;
  chPlatform: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: string;
  lon: string;
  ipTz: string;
};

export function isCrawler(ua: string): boolean {
  return /bot\b|crawl|spider|slurp|mediapartners|adsbot|preview|headless|phantom|puppeteer|playwright|selenium|lighthouse|pingdom|uptime|monitor|checker|scanner|feedly|python-requests|curl|wget|go-http-client|okhttp|httpie|java\/|axios|node-fetch|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|claude-search|anthropic-ai|perplexitybot|perplexity-user|googlebot|google-extended|googleother|google-inspector|bingbot|bingpreview|yandexbot|baiduspider|duckduckbot|applebot|ia_archiver|ccbot|bytespider|amazonbot|linkedinbot|twitterbot|facebookbot|metainspector|semrushbot|mozilaltools|mj12bot|ahrefsbot|dotbot|dataprovider|petalbot|webprosbot|scoutjet|semantic-scholar|trebleclef|img2dataset|isearch/i.test(
    ua
  );
}

const SOCIAL_HOSTS = [
  "instagram.com",
  "facebook.com",
  "fb.com",
  "linkedin.com",
  "x.com",
  "twitter.com",
  "youtube.com",
  "t.me",
  "telegram.org",
  "discord.com",
  "threads.net",
  "pinterest.com",
  "reddit.com",
  "tiktok.com",
  "snapchat.com",
  "wa.me",
];

const AI_HOSTS = [
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "bard.google.com",
  "claude.ai",
  "anthropic.com",
  "copilot.microsoft.com",
  "chat.bing.com",
  "you.com",
  "poe.com",
  "meta.ai",
  "deepseek.com",
  "grok.com",
  "x.ai",
  "aistudio.google.com",
  "character.ai",
];

const SEARCH_HOSTS = [
  "google.com",
  "google.co.in",
  "google.co.uk",
  "google.ca",
  "google.de",
  "bing.com",
  "duckduckgo.com",
  "yahoo.com",
  "search.yahoo.com",
  "yandex.com",
  "yandex.ru",
  "ecosia.org",
  "search.brave.com",
  "brave.com",
  "baidu.com",
];

const EMAIL_HOSTS = [
  "mail.google.com",
  "outlook.com",
  "live.com",
  "mail.yahoo.com",
  "protonmail.com",
  "proton.me",
];

function hostOf(ref: string): string {
  try {
    return new URL(ref).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return ref.toLowerCase().slice(0, 80);
  }
}

function matches(list: string[], host: string): boolean {
  return list.some((d) => host === d || host.endsWith(`.${d}`));
}

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function aiLabel(host: string): string {
  const map: Record<string, string> = {
    chatgpt: "ChatGPT",
    perplexity: "Perplexity",
    gemini: "Gemini",
    bard: "Gemini",
    claude: "Claude",
    anthropic: "Claude",
    copilot: "Copilot",
    chat: "Copilot",
    you: "You.com",
    poe: "Poe",
    meta: "Meta AI",
    deepseek: "DeepSeek",
    grok: "Grok",
    x: "Grok",
    aistudio: "AI Studio",
    character: "Character.AI",
    openai: "OpenAI",
  };
  const first = host.split(".")[0];
  return map[first] ?? cap(first);
}

function searchLabel(host: string): string {
  const head = host.split(".")[0];
  if (/^google|^google\./.test(host)) return "Google";
  const map: Record<string, string> = {
    bing: "Bing",
    duckduckgo: "DuckDuckGo",
    yahoo: "Yahoo",
    yandex: "Yandex",
    ecosia: "Ecosia",
    brave: "Brave",
    baidu: "Baidu",
  };
  return map[head] ?? cap(head);
}

export function inAppBrowser(ua: string): string | null {
  const rules: Array<[RegExp, string]> = [
    [/instagram/i, "Instagram"],
    [/fbav|fban|\bmessenger\b|com\.facebook/i, "Facebook"],
    [/whatsapp/i, "WhatsApp"],
    [/telegram/i, "Telegram"],
    [/twitter|twitterandroid|x-android|com\.twitter\.android/i, "X"],
    [/youtube|com\.google\.android\.youtube/i, "YouTube"],
    [/tiktok/i, "TikTok"],
    [/linkedin/i, "LinkedIn"],
    [/snapchat/i, "Snapchat"],
    [/(^|[ (;])wv([;)]|$)/i, "In-app browser"],
  ];
  for (const [re, label] of rules) {
    if (re.test(ua)) return label;
  }
  return null;
}

const UTM_PLATFORM: Record<string, string> = {
  ig: "Instagram",
  instagram: "Instagram",
  fb: "Facebook",
  facebook: "Facebook",
  meta: "Facebook",
  li: "LinkedIn",
  linkedin: "LinkedIn",
  wa: "WhatsApp",
  whatsapp: "WhatsApp",
  tw: "X",
  twitter: "X",
  x: "X",
  tg: "Telegram",
  telegram: "Telegram",
  yt: "YouTube",
  youtube: "YouTube",
  tt: "TikTok",
  tiktok: "TikTok",
  gpt: "ChatGPT",
  chatgpt: "ChatGPT",
  openai: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Gemini",
  bard: "Gemini",
  claude: "Claude",
  anthropic: "Claude",
  ggl: "Google",
  google: "Google",
  bing: "Bing",
  ddg: "DuckDuckGo",
  duckduckgo: "DuckDuckGo",
  email: "Email",
  newsletter: "Newsletter",
};

function utmPlatform(utm?: string): string | null {
  if (!utm) return null;
  const parts = utm.split(/[,;|·]/).map((p) => p.trim());
  for (const part of parts) {
    const m = /^src=(\S+)$/i.exec(part);
    if (m && UTM_PLATFORM[m[1].toLowerCase()]) {
      return UTM_PLATFORM[m[1].toLowerCase()];
    }
  }
  return null;
}

function platformKind(label: string): string {
  const socials = [
    "Instagram", "Facebook", "WhatsApp", "Telegram", "X", "YouTube",
    "TikTok", "LinkedIn", "Snapchat",
  ];
  const ais = [
    "ChatGPT", "Perplexity", "Gemini", "Claude", "Copilot", "Poe",
    "DeepSeek", "Grok",
  ];
  const searches = [
    "Google", "Bing", "DuckDuckGo", "Yahoo", "Yandex", "Ecosia",
    "Brave", "Baidu",
  ];
  if (socials.includes(label)) return "Social";
  if (ais.includes(label)) return "AI assistant";
  if (searches.includes(label)) return "Search";
  return "Campaign";
}

export function classifyProvider(
  ref: string | undefined,
  inApp: string | null,
  utm?: string
): { kind: string; label: string } {
  const utmPlat = utmPlatform(utm);

  if (inApp) {
    if (inApp === "In-app browser") {
      if (utmPlat) return { kind: `${platformKind(utmPlat)} (in-app)`, label: utmPlat };
      return { kind: "In-app", label: "In-app browser (unknown app)" };
    }
    return { kind: "Social (in-app)", label: inApp };
  }

  if (!ref) {
    if (utmPlat) return { kind: platformKind(utmPlat), label: utmPlat };
    return { kind: "Direct", label: "Typed / bookmark / viewer" };
  }

  const host = hostOf(ref);
  if (matches(AI_HOSTS, host)) return { kind: "AI assistant", label: aiLabel(host) };
  if (matches(SEARCH_HOSTS, host)) return { kind: "Search", label: searchLabel(host) };
  if (matches(SOCIAL_HOSTS, host)) return { kind: "Social (web)", label: cap(host.split(".")[0] || "") };
  if (matches(EMAIL_HOSTS, host)) return { kind: "Email", label: cap(host.split(".")[0] || "") };
  return { kind: "Other", label: host || "unknown" };
}

function detectOs(ua: string, chPlatform: string): string {
  const p = chPlatform || "";
  if (/windows/i.test(p) || /win\d*\s*nt|windows/i.test(ua)) return "Windows";
  if (/ipad|ipod/i.test(ua)) return "iPadOS";
  if (/iphone/i.test(ua) || /^ios/i.test(p)) return "iOS";
  if (/mac/i.test(p) || /macintosh|mac os x/i.test(ua)) return "macOS";
  if (/^android/i.test(p) || /android/i.test(ua)) return "Android";
  if (/linux|cros/i.test(p) || /linux|x11|cros/i.test(ua)) return "Linux";
  return "Unknown";
}

function detectDevice(ua: string, chMobile: string, os: string): string {
  const u = ua.toLowerCase();
  const isTablet =
    /ipad|tablet|playbook|silk/i.test(u) || (/android/i.test(u) && !/mobi/i.test(u));
  const isMobile =
    /iphone|ipod|mobi|android.*mobile|blackberry|windows phone/i.test(u) ||
    chMobile === "?1";
  if (isTablet) return "Tablet";
  if (isMobile) return "Mobile";
  if (/win/i.test(os)) return "PC";
  if (/mac/i.test(os)) return "Mac";
  return "Laptop";
}

function detectBrowser(ua: string, chUa: string): string {
  if (chUa) {
    if (/Microsoft Edge/i.test(chUa)) return "Edge";
    if (/Opera|OPR/i.test(chUa)) return "Opera";
    if (/SamsungBrowser/i.test(chUa)) return "Samsung Internet";
  }
  if (/edg(e|aio)?\//i.test(ua)) return "Edge";
  if (/opr\//i.test(ua)) return "Opera";
  if (/\bcrios\b/i.test(ua)) return "Chrome (iOS)";
  if (/\bfxios\b/i.test(ua)) return "Firefox (iOS)";
  if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
  if (/chrome|crmo/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Unknown";
}

function deviceModel(ua: string, cls: string): string {
  if (cls !== "Mobile" && cls !== "Tablet") return "";
  if (/iphone/i.test(ua)) return "Apple iPhone";
  if (/ipad/i.test(ua)) return "Apple iPad";
  const m = /;\s*([A-Za-z0-9][A-Za-z0-9_-]{1,32})\s+Build\//.exec(ua);
  return m ? m[1] : "";
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clock(when: Date): { time: string; date: string } {
  return {
    time: when.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    date: when.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}

export function buildViewMessage(b: PulsePayload, env: VisitEnv): string {
  const { time, date } = clock(new Date());
  const inApp = inAppBrowser(env.ua);
  const os = detectOs(env.ua, env.chPlatform);
  const cls = detectDevice(env.ua, env.chMobile, os);
  const browser = inApp ? "In-app browser" : detectBrowser(env.ua, env.chUa);
  const prov = classifyProvider(b.r, inApp, b.u);
  const model = deviceModel(env.ua, cls);
  const div = "═".repeat(28);

  const geo = [env.city, env.region, env.country].filter(Boolean).join(", ");
  const device = [cls, model].filter(Boolean).join(" · ");
  const via = `${esc(prov.label)} <i>(${esc(prov.kind)})</i>`;

  const lines: string[] = [
    div,
    `🟢 <b>NEW VISIT</b> · <code>${time}</code> · ${date}`,
    div,
    ``,
    `📍 <b>Page:</b> <code>${esc(b.p)}</code>`,
    ``,
    `🛰 <b>Via:</b> ${via}`,
    `📱 <b>Device:</b> <code>${esc(device)}</code>`,
    `🤖 <b>OS:</b> <code>${esc(os)}</code>`,
    `🌐 <b>Browser:</b> <code>${esc(browser)}</code>`,
  ];
  if (b.sw) {
    const screen = `${b.sw}×${b.sh ?? "?"} @${b.dpr ?? 1}x`;
    lines.push(`🖥 <b>Screen:</b> <code>${screen}</code>${b.vw && b.vh ? ` · Viewport <code>${b.vw}×${b.vh}</code>` : ""}`);
  }
  lines.push(``, `🌍 <b>Geo:</b> <code>${esc(geo || "Unknown")}</code>${env.city ? " <i>(city-level)</i>" : ""}`);
  if (env.lat && env.lon) {
    lines.push(`📌 <b>Coords:</b> <code>${esc(env.lat)}, ${esc(env.lon)}</code>`);
  }
  lines.push(`💾 <b>IP:</b> <code>${esc(env.ip)}</code>`);
  if (b.lang) {
    lines.push(`🔤 <b>Lang:</b> <code>${esc(b.lang)}</code>${b.tz ? ` · <b>TZ:</b> <code>${esc(b.tz)}</code>` : ""}`);
  }
  if (env.ipTz && env.ipTz !== b.tz) {
    lines.push(`🗺 <b>IP TZ:</b> <code>${esc(env.ipTz)}</code>`);
  }
  if (b.r) {
    lines.push(`🔗 <b>Ref:</b> <code>${esc(b.r.slice(0, 140))}</code>`);
  }
  if (b.u) {
    lines.push(`🧩 <b>UTM:</b> <code>${esc(b.u)}</code>`);
  }
  if (b.sid) {
    lines.push(`🏷 <b>Sess:</b> <code>${esc(b.sid.slice(0, 8))}</code>`);
  }
  lines.push(``, div);

  return lines.join("\n");
}

export function buildEventMessage(b: PulsePayload, env: VisitEnv): string {
  const { time } = clock(new Date());
  const os = detectOs(env.ua, env.chPlatform);
  const cls = detectDevice(env.ua, env.chMobile, os);
  const isSection = b.e === "section";
  const label = isSection
    ? `${cap(b.a || "")} section`.trim()
    : esc(b.a || "Action");
  const icon = isSection ? "📖" : "🎯";
  return `${icon} <b>${esc(label)}</b> — <code>${esc(b.p)}</code> · ${esc(cls)} · <code>${time}</code>`;
}