import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b1210 0%, #0f1f1a 55%, #123027 100%)",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#5eead4",
            fontSize: 28,
          }}
        >
          <span style={{ opacity: 0.9 }}>{project?.emoji ?? "🚀"}</span>
          <span style={{ letterSpacing: "0.35em", textTransform: "uppercase" }}>
            {project?.category ?? "Case study"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#f0fdf5",
              display: "-webkit-flex",
            }}
          >
            {project?.name ?? "Project"}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              color: "#a7c4b5",
              maxWidth: 760,
              lineHeight: 1.3,
            }}
          >
            {project?.tagline ?? siteConfig.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#7dab98",
            fontSize: 24,
          }}
        >
          <span>{siteConfig.name} — Full-Stack Developer & AI Integration Engineer</span>
          <span>{siteConfig.url}</span>
        </div>
      </div>
    ),
    size
  );
}