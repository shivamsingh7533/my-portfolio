import { Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  CSS: "#663399",
  HTML: "#e34c26",
  "Jupyter Notebook": "#DA5B0B",
};

async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/shivamsingh7533/repos?sort=updated&per_page=5`,
      {
        next: { revalidate: 3600 },
        headers: { accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return [];
    const all = (await res.json()) as Repo[];
    return all.filter((r) => r.name !== "my-portfolio").slice(0, 4);
  } catch {
    return [];
  }
}

export async function GithubStrip() {
  const repos = await fetchRepos();
  if (repos.length === 0) return null;

  return (
    <section
      id="github"
      className="border-t border-border/60 py-20"
      aria-labelledby="github-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="github"
            eyebrow="GitHub"
            title="Latest open-source work"
            description="Public repositories, freshly updated. Every project is open to inspect."
          />
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer noopener"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <GitHubIcon className="size-4" aria-hidden="true" />
            View all repos
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col rounded-2xl border border-border/70 bg-card/50 p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                <GitHubIcon className="size-4 text-primary" aria-hidden="true" />
                <span className="font-mono text-sm font-semibold group-hover:text-primary">
                  {repo.name}
                </span>
              </div>
              {repo.description ? (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
              ) : (
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  Public repository
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {repo.language ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{
                        background:
                          languageColors[repo.language] ?? "#8b8b8b",
                      }}
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Open source
                  </Badge>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" aria-hidden="true" />
                  {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" aria-hidden="true" />
                  {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}