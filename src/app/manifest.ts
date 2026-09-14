import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Full-Stack Developer & AI Integration Engineer`,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0f1513",
    theme_color: "#0f1513",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}