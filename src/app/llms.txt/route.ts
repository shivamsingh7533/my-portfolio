import { siteConfig } from "@/data/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export function GET() {
  const now = new Date().toISOString();
  const lines = [
    "# Shivam Kumar",
    "",
    `> ${siteConfig.headline} — based in ${siteConfig.location}.`,
    `> ${siteConfig.shortDescription}`,
    "",
    "## Contact",
    "",
    `- Email: ${siteConfig.email}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- GitHub: ${siteConfig.github}`,
    "- Location: Jaipur, Rajasthan, India (open to remote/hybrid/on-site roles)",
    "",
    "## About",
    "",
    profile.about.join(" "),
    "",
    "## Skills",
    "",
    ...skillGroups.flatMap((g) => [
      `### ${g.label}`,
      "",
      `- ${g.skills.map((s) => s.name).join(", ")}`,
      "",
    ]),
    "## Projects",
    "",
    ...projects.flatMap((p) => [
      `### ${p.name}`,
      `- Summary: ${p.summary}`,
      `- Demo: ${p.demo}`,
      `- Source: ${p.repo}`,
      "",
    ]),
    "## Pages",
    "",
    `- Home: ${siteConfig.url}`,
    ...projects.map(
      (p) => `- ${p.name}: ${siteConfig.url}/projects/${p.slug}`
    ),
    "- Insights: ${siteConfig.url}/insights",
    "",
    `> Generated ${now}. Full markdown profile available at /llms-full.txt.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}