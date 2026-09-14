import { Briefcase, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experience } from "@/data/certs";

const trustSignals = [
  { label: "2 verified certificates", note: "Linked & downloadable" },
  { label: "2 production projects", note: "Live on Vercel" },
  { label: "Real AI integrations", note: "Groq, Gemini, FastAPI" },
  { label: "Open-source work", note: "Public repos on GitHub" },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="experience"
          eyebrow="Experience"
          title="Professional experience & proof of work"
          description="Hands-on internship experience with verifiable certificates, alongside production projects you can open and use today."
        />

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {experience.map((e) => (
              <Card key={e.role} className="border-border/70 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Briefcase className="size-4 text-primary" aria-hidden="true" />
                        {e.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {e.org}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      {e.period}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{e.summary}</p>
                  <ul className="mt-3 space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={e.proofUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <ShieldCheck className="size-4" aria-hidden="true" />
                    View certificate
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <div className="rounded-xl border border-border/70 bg-card/50 p-6">
              <h3 className="mb-4 text-sm font-semibold">Why you can trust this profile</h3>
              <ul className="space-y-4">
                {trustSignals.map((s) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}