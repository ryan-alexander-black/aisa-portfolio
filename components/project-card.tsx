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

  // ── Standard card — image-led, light on text. The card sells the click;
  //    the full story (summary, the under-the-hood detail) lives on the
  //    case-study page it links to. ──
  const inner = (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all ${
        interactive ? "hover:border-green-brand/50 hover:shadow-glow" : "opacity-80"
      }`}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg">
        {cover ? (
          <Image
            src={cover}
            alt={`${title} — preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-brand/15 to-transparent">
            <Image src="/brand/logo-mark.svg" alt="" width={48} height={48} className="opacity-70" />
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-md bg-bg/70 px-0.5 backdrop-blur-sm">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Copy — kept deliberately short */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
          {interactive && (
            <span className="mt-1 shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
              →
            </span>
          )}
        </div>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-accent">{tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 font-mono text-xs">{cta}</div>
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
