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
    inLanguage: "en",
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

export function projectListSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Shivam Kumar",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: `${siteConfig.url}/projects/${project.slug}`,
      description: project.tagline,
    })),
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

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

type Article = {
  title: string;
  description: string;
  datePublished: string;
  url: string;
};

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}