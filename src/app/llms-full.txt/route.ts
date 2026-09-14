import { siteConfig } from "@/data/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certs, experience } from "@/data/certs";

export function GET() {
  const lines = [
    `# ${siteConfig.name} — ${siteConfig.headline}`,
    "",
    `- **Location:** ${siteConfig.location}`,
    `- **Email:** ${siteConfig.email}`,
    `- **LinkedIn:** ${siteConfig.linkedin}`,
    `- **GitHub:** ${siteConfig.github}`,
    "- **Status:** Available for Full-Stack Developer and AI Integration roles",
    "",
    "Shivam Kumar is a Full-Stack Developer (MERN + Next.js) and AI Integration Engineer specializing in LLM-powered products, intelligent chat experiences, and end-to-end web platforms. He is pursuing B.Tech in Computer Science & Engineering at Jagannath University, Jaipur.",
    "",
    "## What I build",
    "",
    ...profile.whatIDoBest.map((w) => `- **${w.title}:** ${w.detail}`),
    "",
    "## Skills",
    "",
    ...skillGroups.flatMap((g) => [
      `### ${g.label}`,
      "",
      ...g.skills.map((s) => `- ${s.name}${s.note ? ` — ${s.note}` : ""}`),
      "",
    ]),
    "## Projects",
    "",
    ...projects.flatMap((p) => [
      `### ${p.name} — ${p.category}`,
      `- **Status:** ${p.status}`,
      `- **Summary:** ${p.summary}`,
      `- **Tagline:** ${p.tagline}`,
      `- **Demo:** ${p.demo}`,
      `- **Source code:** ${p.repo}`,
      `- **Year:** ${p.year}`,
      `- **Tech:** ${p.tech.stack.map((t) => t.name).join(", ")}`,
      `- **Problem:** ${p.problem.join(" ")}`,
      `- **Solution:** ${p.solution.join(" ")}`,
      `- **Key features:** ${p.features.map((f) => f.title).join(", ")}`,
      `- **AI integrations:** ${p.aiFeatures.map((f) => f.title).join(", ")}`,
      "",
    ]),
    "## Experience",
    "",
    ...experience.map((e) => [
      `### ${e.role}`,
      `- **Organization:** ${e.org}`,
      `- **Period:** ${e.period}`,
      `- **Summary:** ${e.summary}`,
      `- **Proof:** ${e.proofUrl}`,
      "",
    ]),
    "## Certifications",
    "",
    ...certs.map((c) => `- **${c.title}** (${c.org}) — ${c.description} — ${c.url}`),
    "",
    "## Internal links",
    "",
    `- Home: ${siteConfig.url}`,
    ...projects.map(
      (p) => `- ${p.name} case study: ${siteConfig.url}/projects/${p.slug}`
    ),
    `- Insights: ${siteConfig.url}/insights`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}