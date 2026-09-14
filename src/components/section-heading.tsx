import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  id: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}