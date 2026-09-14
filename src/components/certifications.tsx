import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { certs } from "@/data/certs";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-20 border-t border-border/60 bg-card/30 py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="certifications"
          eyebrow="Certifications"
          title="Certifications that back the work"
          description="Verified certificates for my full-stack development internship and a dedicated 4-week internship program."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certs.map((c) => (
            <Card key={c.title} className="flex flex-col border-border/70 bg-background/60">
              <CardHeader>
                <CardTitle className="flex items-start gap-3 text-lg">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25">
                    <Award className="size-4.5" aria-hidden="true" />
                  </span>
                  {c.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{c.org}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
<Button variant="outline" render={<a href={c.url} target="_blank" rel="noreferrer noopener" />}>
                  View certificate <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}