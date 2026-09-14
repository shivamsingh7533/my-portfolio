export type Cert = {
  kind: "internship" | "certificate";
  title: string;
  org: string;
  period: string;
  description: string;
  url: string;
  skills: string[];
};

export const experience: {
  kind: "internship";
  role: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  proofUrl: string;
}[] = [
  {
    kind: "internship",
    role: "Full-Stack Development Intern",
    org: "Full-Stack Development Program",
    period: "Internship",
    summary:
      "Hands-on internship focused on building production-grade full-stack applications with modern web technologies.",
    bullets: [
      "Built full-stack features across the MERN stack and Next.js with TypeScript.",
      "Worked on authentication, databases, REST APIs, and production UI development.",
      "Delivered working, deployable end-to-end applications as part of the program.",
    ],
    proofUrl:
      "https://drive.google.com/file/d/1rEUZiPdOwVDqMB0yxlf_2o2_PigRpiEP/view?usp=sharing",
  },
];

export const certs: Cert[] = [
  {
    kind: "certificate",
    title: "4-Week Internship Certificate",
    org: "Internship Program",
    period: "4 weeks",
    description:
      "Completed a dedicated 4-week internship program, demonstrating consistent delivery of assigned development tasks.",
    url: "https://drive.google.com/file/d/18k_6tRVKchi5loxWZ7PddnQXfJ67fb1F/view?usp=sharing",
    skills: ["Web Development", "Delivery & Deadlines", "Practical Engineering"],
  },
  {
    kind: "certificate",
    title: "Full-Stack Development Internship Certificate",
    org: "Full-Stack Development Program",
    period: "Internship",
    description:
      "Verified proof of completing the full-stack development internship — covering frontend, backend, databases, and deployment.",
    url: "https://drive.google.com/file/d/1rEUZiPdOwVDqMB0yxlf_2o2_PigRpiEP/view?usp=sharing",
    skills: ["MERN Stack", "REST APIs", "Authentication", "Deployment"],
  },
];