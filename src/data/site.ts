export const siteConfig = {
  name: "Shivam Kumar",
  firstName: "Shivam",
  lastName: "Kumar",
  initials: "SK",
  role: "Full-Stack Developer",
  roleSecondary: "AI Integration Engineer",
  headline:
    "Full-Stack Developer & AI Integration Engineer",
  shortDescription:
    "Full-Stack Developer (MERN + Next.js) and AI Integration Engineer specializing in LLM-powered products, intelligent chat experiences, and end-to-end web platforms.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivam-kumar.vercel.app",
  email: "sk9529973@gmail.com",
  location: "Jaipur, Rajasthan, India",
  origin: "Nawada, Bihar, India",
  linkedin: "https://www.linkedin.com/in/shivam-kumar-b61784293/",
  github: "https://github.com/shivamsingh7533",
  available: true,
  introSentence:
    "I build fast, secure, production-grade web applications — pairing modern full-stack engineering with real AI integrations (LLMs, chatbots, generative features).",
} as const;

export const socials = [
  { label: "GitHub", href: siteConfig.github, handle: "shivamsingh7533" },
  { label: "LinkedIn", href: siteConfig.linkedin, handle: "in/shivam-kumar-b61784293" },
  { label: "Email", href: `mailto:${siteConfig.email}`, handle: siteConfig.email },
] as const;

/** SEO / AEO / GEO / LLMO keywords used across metadata and copy. */
export const seoTags = [
  "Full-Stack Developer India",
  "AI Integration Engineer",
  "Next.js Developer Jaipur",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "AI Chatbot Developer",
  "LLM Integration Developer",
  "Shivam Kumar Jaipur",
  "B.Tech Computer Science Jagannath University",
  "Hire Full Stack Developer",
  "AI-powered web application developer",
] as const;