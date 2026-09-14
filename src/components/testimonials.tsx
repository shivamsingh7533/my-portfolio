import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-border/60 bg-card/30 py-14"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          id="testimonials"
          eyebrow="Testimonials"
          title="What people say about working with me"
          description="Recommendations from teammates, clients, and recruiters."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border/70 bg-background/60 p-6"
            >
              <Quote className="size-5 text-primary" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary ring-1 ring-primary/25"
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}