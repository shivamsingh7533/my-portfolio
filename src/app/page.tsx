import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { AIReadiness } from "@/components/ai-readiness";
import { Insights } from "@/components/insights";
import { Experience } from "@/components/experience";
import { Certifications } from "@/components/certifications";
import { Testimonials } from "@/components/testimonials";
import { GithubStrip } from "@/components/github-strip";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import {
  faqSchema,
  personSchema,
  projectListSchema,
  websiteSchema,
} from "@/lib/structured-data";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <JsonLd id="person-schema" data={personSchema()} />
      <JsonLd id="website-schema" data={websiteSchema()} />
      <JsonLd id="project-list-schema" data={projectListSchema(projects)} />
      <JsonLd id="faq-schema" data={faqSchema()} />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <AIReadiness />
      <Insights />
      <GithubStrip />
      <Experience />
      <Certifications />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}