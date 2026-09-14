import type { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { faqs } from "@/data/faq";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full-Stack Developer & AI Integration Engineer",
    description: siteConfig.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Jagannath University, Jaipur",
    },
    knowsAbout: [
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "AI Integration",
      "LLM Chatbots",
      "Groq",
      "Google Gemini",
      "Prompt Engineering",
    ],
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} — Portfolio`,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    about: personSchema(),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: `${siteConfig.url}/projects/${project.slug}`,
    description: project.summary,
    datePublished: project.year,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    sameAs: [project.demo, project.repo],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}