import { siteConfig } from "@/data/site";

export function GET() {
  const body = [
    `# ${siteConfig.name}`,
    "# Full-Stack Developer & AI Integration Engineer",
    `# ${siteConfig.location}`,
    "",
    `> ${siteConfig.url}`,
    "",
    "## Contact",
    `Email: ${siteConfig.email}`,
    `GitHub: ${siteConfig.github}`,
    `LinkedIn: ${siteConfig.linkedin}`,
    "",
    "## Resume",
    `${siteConfig.url}${siteConfig.resumeUrl}`,
    "",
    "## Profile photo",
    `${siteConfig.url}${siteConfig.profileImage}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}