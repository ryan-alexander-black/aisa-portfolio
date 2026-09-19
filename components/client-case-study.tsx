import Link from "next/link";
import type { ClientCase } from "@/lib/clients";
import { Section } from "@/components/section";
import { ClientLogo } from "@/components/client-card";
import { ReportButton } from "@/components/report-button";

// The /work/<slug> case study for a client install. Same order as the home
// card, expanded: opportunity → what I built → what changed → in their words
// → under the hood. Content comes from lib/clients.ts (one source, two views).
export function ClientCaseStudy({ client }: { client: ClientCase }) {
  const page = client.page!;

  return (
    <article className="mx-auto my-10 max-w-3xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <Link href="/#client-work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All client work
      </Link>

      <header className="mt-6">
        <ClientLogo client={client} size="lg" />
        <p className="eyebrow mt-6">Client case study · {client.industry}</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {client.company}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted">{page.intro}</p>
      </header>

      {/* No bare numbers up top (Ryan, 19 Sep): a stat without its context reads as noise —
          every number lives under "What changed", with its sentence. */}

      <Section title="The opportunity">
        {page.opportunity.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Section>

      <Section title="What I built">
        <ul className="space-y-4">
          {page.built.map((b) => (
            <li key={b.name} className="border-l-2 border-green-brand/50 pl-4">
              <p className="font-display font-semibold tracking-tight">{b.name}</p>
              <p className="mt-1 text-[15px] text-fg-muted">{b.does}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What changed">
        <dl className="grid gap-4">
          {page.changed.map((c) => (
            <div
              key={c.stat}
              className="grid gap-1 rounded-lg border border-amber-400/30 bg-amber-400/5 p-4 sm:grid-cols-[9rem_1fr] sm:gap-4"
            >
              <dt className="font-display text-lg font-extrabold tracking-tight text-amber-400">
                {c.stat}
              </dt>
              <dd className="text-[15px] leading-relaxed text-fg-muted">{c.context}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="In their words">
        <div className="space-y-5">
          {page.quotes.map((q) => (
            <blockquote key={q.text} className="border-l-2 border-amber-400/50 pl-4">
              <p className="text-lg leading-relaxed text-fg">
                <span className="text-amber-400">&ldquo;</span>
                {q.text}
                <span className="text-amber-400">&rdquo;</span>
              </p>
              <footer className="mt-1.5 text-sm text-fg-muted">
                <span className="font-semibold text-fg">{q.name}</span> — {q.role}, {client.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <div className="mt-16 rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow">Under the hood</p>
        <p className="mt-2 text-sm text-fg-muted">
          The tools behind it — the client&apos;s own software, connected, with AI doing the work
          in between.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
          {page.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-green-brand/40 p-6 text-center">
        <p className="font-display text-xl font-bold tracking-tight">
          What would this look like in your business?
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          It starts with a free AI Opportunity Report — your biggest wins, ranked by value.
        </p>
        <div className="mt-5 flex justify-center">
          <ReportButton />
        </div>
      </div>
    </article>
  );
}
