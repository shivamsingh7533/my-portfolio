import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

const profilePhotoSrc = `data:image/png;base64,${readFileSync(
  path.join(process.cwd(), "public/images/shivam-kumar-full-stack-developer.png")
).toString("base64")}`;

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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          padding: "0 64px",
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
            width: 240,
            height: 240,
            borderRadius: "9999px",
            overflow: "hidden",
            border: "4px solid rgba(16,185,129,0.6)",
            boxShadow: "0 0 60px rgba(16,185,129,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profilePhotoSrc}
            alt=""
            width={1024}
            height={1536}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: 560,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700 }}>Shivam Kumar</div>
          <div style={{ fontSize: 30, color: "#34d399", marginTop: 12 }}>
            Full-Stack Developer &amp; AI Integration Engineer
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9cb6aa",
              marginTop: 24,
              lineHeight: 1.5,
            }}
          >
            Next.js · React · Node.js · MongoDB · Groq · Gemini
          </div>
          <div style={{ fontSize: 22, color: "#9cb6aa", marginTop: 10 }}>
            Jaipur, India
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}