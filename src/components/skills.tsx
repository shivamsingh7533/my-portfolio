import { Cpu, Database, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";

const groupIcons = [Rocket, Cpu, Database];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border/60 bg-card/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="skills"
          eyebrow="Skills"
          title="Technology I build with"
          description="A production-oriented toolkit: full-stack engineering foundations, real AI integration experience, and the DevOps practices that ship software safely."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = groupIcons[gi] ?? Rocket;
            return (
              <div
                key={group.label}
                className="flex flex-col rounded-xl border border-border/70 bg-background/60 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{group.label}</h3>
                    <p className="text-xs text-muted-foreground">{group.blurb}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <Badge
                      key={s.name}
                      variant="outline"
                      className="border-border bg-background text-sm font-medium text-foreground"
                      title={s.note}
                    >
                      {s.name}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}