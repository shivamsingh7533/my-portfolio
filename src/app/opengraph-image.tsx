import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — Full-Stack Developer & AI Integration Engineer`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f0d",
          color: "#e6f0ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "rgba(16,185,129,0.18)",
            border: "1px solid rgba(16,185,129,0.45)",
            color: "#34d399",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          SK
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 32 }}>
          Shivam Kumar
        </div>
        <div style={{ fontSize: 30, color: "#34d399", marginTop: 12, textAlign: "center", padding: "0 64px" }}>
          Full-Stack Developer &amp; AI Integration Engineer
        </div>
        <div style={{ fontSize: 22, color: "#9cb6aa", marginTop: 28, textAlign: "center", padding: "0 96px" }}>
          Next.js · React · Node.js · MongoDB · Groq · Gemini — Jaipur, India
        </div>
      </div>
    ),
    { ...size }
  );
}