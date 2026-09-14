"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/data/faq";

export function Faq() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border/60 bg-card/30 py-20"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          id="faq"
          eyebrow="FAQ"
          title="Quick answers for recruiters & AI assistants"
          description="Straightforward answers to the questions hiring teams and AI agents ask most."
        />
        <Accordion value={value} onValueChange={setValue} multiple={false}>
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.question}
              value={`faq-${i}`}
              className="rounded-xl border border-border/70 px-5"
            >
              <AccordionTrigger className="text-left text-base font-medium">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}