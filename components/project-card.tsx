import Link from "next/link";
import type { Project } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";

export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, tagline, summary, stack, status, caseStudy, liveUrl, exampleUrl } = project;
  const href = caseStudy ? `/projects/${slug}` : liveUrl ?? exampleUrl;
  const isInternal = Boolean(caseStudy);
  const interactive = Boolean(href);

  const inner = (
    <div
      className={`group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all ${
        interactive ? "hover:border-green-brand/50 hover:shadow-glow" : "opacity-80"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <StatusBadge status={status} />
        {interactive && (
          <span className="text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
            →
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-accent">{tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 font-mono text-xs">
        {caseStudy ? (
          <span className="text-accent">Read case study →</span>
        ) : liveUrl ? (
          <span className="text-accent">View live →</span>
        ) : (
          <span className="text-fg-muted">Coming soon</span>
        )}
      </div>
    </div>
  );

  if (!interactive) return inner;

  return isInternal ? (
    <Link href={href!} className="block h-full focus-visible:outline-none">
      {inner}
    </Link>
  ) : (
    <a href={href!} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  );
}
