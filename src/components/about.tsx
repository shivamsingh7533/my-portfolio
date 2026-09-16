import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="about"
          eyebrow="About me"
          title="A full-stack engineer who ships AI — not just demos"
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>{profile.about[0]}</p>
            <p>{profile.about[1]}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-card/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                Education
              </h3>
              <p className="font-medium">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.education.university}
              </p>
              <Badge className="mt-3">{profile.education.status}</Badge>
            </div>

            <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
              <h3 className="mb-2 text-sm font-semibold text-primary">
                Hiring status
              </h3>
              <p className="text-sm text-muted-foreground">
                Actively open to full-stack developer and AI integration roles —
                remote, hybrid, or on-site in India.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}