import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const {
    slug,
    title,
    tagline,
    summary,
    stack,
    status,
    caseStudy,
    liveUrl,
    exampleUrl,
    underHood,
    metrics,
    cover,
  } = project;
  const href = caseStudy ? `/projects/${slug}` : liveUrl ?? exampleUrl;
  const isInternal = Boolean(caseStudy);
  const interactive = Boolean(href);

  const cta = caseStudy ? (
    <span className="text-accent">Read case study →</span>
  ) : liveUrl ? (
    <span className="text-accent">View live →</span>
  ) : (
    <span className="text-fg-muted">Coming soon</span>
  );

  // ── Large spotlight variant: the centrepiece. Two columns on wide screens —
  //    a branded visual panel beside the narrative + a metric strip. ──
  if (large) {
    const inner = (
      <div
        className={`group grid h-full gap-6 rounded-lg border border-border bg-surface p-6 transition-all sm:p-8 lg:grid-cols-2 lg:items-center ${
          interactive ? "hover:border-green-brand/50 hover:shadow-glow" : "opacity-80"
        }`}
      >
        {/* Visual */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-bg">
          {cover ? (
            <Image
              src={cover}
              alt={`${title} — preview`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-brand/15 to-transparent">
              <Image src="/brand/logo-mark.svg" alt="" width={56} height={56} className="opacity-80" />
            </div>
          )}
        </div>

        {/* Copy */}
        <div className="flex flex-col">
          <div className="mb-3 flex items-center gap-3">
            <p className="eyebrow">Flagship build</p>
            <StatusBadge status={status} />
          </div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
          <p className="mt-2 text-accent">{tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{summary}</p>

          {metrics && (
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-md border border-border bg-bg px-3 py-2">
                  <dd className="font-display text-lg font-bold tracking-tight text-fg">{m.value}</dd>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

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

          <div className="mt-5 font-mono text-xs">{cta}</div>
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

  // ── Standard card ──
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

      {/* Technical layer — labelled so non-technical readers know they can skip it. */}
      <div className="mt-5 border-t border-border pt-4">
        {underHood && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Under the hood
            </p>
            <ul className="mt-2 space-y-1.5">
              {underHood.map((point) => (
                <li key={point} className="flex gap-2 text-[13px] leading-snug text-fg-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <ul className={`flex flex-wrap gap-1.5 ${underHood ? "mt-3" : ""}`}>
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 font-mono text-xs">{cta}</div>
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
