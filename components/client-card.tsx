import Image from "next/image";
import Link from "next/link";
import type { ClientCase } from "@/lib/clients";

// Client work card — told in the hero's own order: what I found → what I
// built → what changed → what they said. Amber marks client work apart from
// Ryan's own builds (the green project cards further down).
export function ClientLogo({ client, size = "md" }: { client: ClientCase; size?: "md" | "lg" }) {
  const chip = client.logoBg === "dark" ? "bg-ink-900" : "bg-white";
  const h = size === "lg" ? "h-12" : "h-10";
  return (
    <span className={`inline-flex h-14 items-center rounded px-3 ${chip}`}>
      <Image
        src={client.logo}
        alt={client.company}
        width={160}
        height={40}
        className={`${h} w-auto max-w-[10rem] object-contain`}
      />
    </span>
  );
}

export function ClientCard({ client }: { client: ClientCase }) {
  const { company, industry, opportunity, built, results, quote, page, featured } = client;

  return (
    <div className="glass-card flex h-full flex-col rounded-lg border border-amber-400/40 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <ClientLogo client={client} />
        <div>
          <p className="font-display text-base font-bold tracking-tight text-fg">{company}</p>
          <p className="text-xs text-fg-muted">{industry}</p>
        </div>
      </div>

      <dl className={`mt-6 grid gap-4 ${featured ? "sm:grid-cols-2 sm:gap-8" : ""}`}>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-400">
            The opportunity
          </dt>
          <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{opportunity}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-400">
            What I built
          </dt>
          <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{built}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {results.map((r) => (
          <span
            key={r}
            className="rounded border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 font-mono text-xs text-amber-400"
          >
            {r}
          </span>
        ))}
      </div>

      <blockquote className="mt-6 border-l-2 border-amber-400/50 pl-4">
        <p className="text-base leading-relaxed text-fg sm:text-lg">
          <span className="text-amber-400">&ldquo;</span>
          {quote.text}
          <span className="text-amber-400">&rdquo;</span>
        </p>
        <footer className="mt-2 text-sm text-fg-muted">
          <span className="font-semibold text-fg">{quote.name}</span> — {quote.role}, {company}
        </footer>
      </blockquote>

      {page && (
        <Link
          href={`/work/${client.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-xs text-fg-muted transition-colors hover:text-amber-400"
        >
          Read the case study <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
