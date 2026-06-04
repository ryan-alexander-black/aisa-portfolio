import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";
import { Section } from "@/components/section";
import { SuperTrackerArchitecture } from "@/components/super-tracker-architecture";

const project = getProject("super-tracker")!;
const CONTACT = "mailto:ryanalexanderblack@gmail.com?subject=Investment%20Strategy%20Engine%20walkthrough";

// The full stack, surfaced inside the "Under the hood" zone.
const STACK = [
  "Python 3.11 (stdlib-only engine)",
  "SQLite",
  "FastAPI",
  "Next.js / TypeScript",
  "Anthropic Claude",
  "react-markdown",
  "FRED + keyless EOD prices",
  "GitHub Actions cron",
  "Windows Task Scheduler",
];

// The deterministic engine — the maths that's never left to a model.
const ENGINE: { name: string; does: string }[] = [
  { name: "Indicators", does: "moving averages, RSI, StochRSI — computed in plain Python from stored price history, not read off a web search" },
  { name: "Scoring", does: "daily (tiers 3/2/1) and weekly (4/2/1) scores with exact grade bands, straight from the rulebook" },
  { name: "Gates", does: "move-eligibility gates that can only change with cited evidence — no silent drift" },
  { name: "Triggers & vetoes", does: "auto-defensive triggers (HY-spread, 50dMA, VIX) and slow vetoes (RSI, StochRSI, bubble score, debt-cycle phase)" },
  { name: "Growth & performance", does: "balance over time, since-launch and trailing returns, per-sleeve — and periods read “building…” until real history backs them, never a fabricated number" },
];

// The LLM layer — narrow, linguistic, never producing a number.
const LLM: { name: string; does: string }[] = [
  { name: "News sentiment", does: "classifies the macro/credit news that frames a report" },
  { name: "Report narrative", does: "writes the daily/weekly/monthly write-up around the fixed numbers" },
  { name: "Insight chat", does: "answers plain-English questions over your own strategy data" },
];

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

export default function SuperTrackerCaseStudy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Personal build</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Investment Strategy Engine
        </h1>
        <p className="mt-3 text-lg text-accent">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-md border border-border bg-surface px-3 py-2">
                <dd className="font-display text-xl font-bold tracking-tight text-fg">{m.value}</dd>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={CONTACT}
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Request a walkthrough →
          </a>
          <span className="font-mono text-xs text-fg-muted">
            Personal project · private (operates on real financial data)
          </span>
        </div>
      </header>

      {/* Plain lead — what it does, for anyone. */}
      <p className="mt-8 text-lg leading-relaxed text-fg-muted">
        I run a disciplined, rules-based strategy for my retirement fund (superannuation). For a
        while I operated it by hand — a long ChatGPT prompt to read the market, then an Excel sheet
        to track it. It was slow, easy to get wrong, and impossible to audit. This replaced that
        with one system: it pulls live market and macro data, scores conditions against a fixed
        debt-cycle rulebook, tracks where my allocation can and can&apos;t move, and writes me a
        daily, weekly and monthly report — all on a live dashboard. It also tracks whether the
        strategy is actually working: balance over time, returns, and where each sleeve sits.{" "}
        <strong className="text-fg">It recommends; I decide.</strong> It never moves money on its own.
      </p>

      {/* The proof — system map first (it's a private app), then the surfaces. */}
      <figure className="mt-8">
        <div className="overflow-hidden rounded-lg border border-border bg-surface p-4 sm:p-6">
          <SuperTrackerArchitecture />
        </div>
        <figcaption className="mt-2 font-mono text-xs text-fg-muted">
          The hard line down the middle — the exact maths is deterministic Python; the model only
          handles the words.
        </figcaption>
      </figure>

      <SurfaceGallery />

      {/* The problem */}
      <Section title="The problem">
        <p>
          The strategy itself is sound — a rulebook for reading the debt cycle and deciding when a
          defensive or offensive move is justified. The problem was operating it. Doing the maths by
          hand (or worse, asking a language model to read a moving average off a web search) is
          exactly where it broke: the old workflow produced around{" "}
          <strong className="text-fg">six moving-average errors in a single month</strong>. When the
          numbers driving a real financial decision are wrong, the whole thing is worse than useless.
        </p>
        <p>
          So the goal was a system where the maths is never in question, the rulebook can&apos;t
          quietly drift, and every report is reproducible — while still using AI for the parts it
          genuinely helps with: reading the news and explaining the data in plain language.
        </p>
      </Section>

      {/* ── Under-the-hood divider ── */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow">Under the hood</p>
        <p className="mt-2 text-sm text-fg-muted">
          How it&apos;s actually built. The plain version is above — everything from here down is the
          technical detail, for anyone who wants to see how the pieces fit.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* What it does */}
      <Section title="What it actually does">
        <p>
          Two layers, kept deliberately apart. A deterministic engine owns every number a decision
          depends on; a narrow LLM layer handles only the language around those numbers. Reports run
          on three cadences — daily, weekly and monthly.
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              The deterministic engine
            </p>
            <ul className="mt-3 space-y-2.5">
              {ENGINE.map((e) => (
                <li key={e.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <span className="font-display text-sm font-semibold sm:w-44 sm:shrink-0">{e.name}</span>
                  <span className="text-sm text-fg-muted">{e.does}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              The LLM layer (narrow)
            </p>
            <ul className="mt-3 space-y-2.5">
              {LLM.map((l) => (
                <li key={l.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <span className="font-display text-sm font-semibold sm:w-44 sm:shrink-0">{l.name}</span>
                  <span className="text-sm text-fg-muted">{l.does}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Engineering stories */}
      <Section title="The five decisions worth talking about">
        <p>
          The interesting work wasn&apos;t the dashboard — it was deciding what code owns versus what
          the model owns, and making the whole thing reproducible. Five decisions carried most of the
          weight.
        </p>
      </Section>

      <Story
        n="01"
        title="The reliability boundary — maths is never left to a model"
        plain="The moment any step is only 90% reliable, a five-step pipeline is already a coin-flip. So nothing the decision depends on is computed by an AI — it's plain, testable code."
      >
        <p>
          If each step in a pipeline is ~90% accurate you&apos;re at roughly{" "}
          <strong className="text-fg">59% after five steps</strong>. That maths is why the boundary
          exists: indicators, scores, gates, vetoes and triggers are all{" "}
          <strong className="text-fg">deterministic Python computed from stored price history</strong>,
          never values an LLM read off the web. The legacy ChatGPT-and-Excel flow made ~6
          moving-average errors in one month; the engine makes zero, because it&apos;s arithmetic, not
          inference. The model is used <em>around</em> the fixed numbers — sentiment, narrative, chat —
          and never to produce one.
        </p>
      </Story>

      <Story
        n="02"
        title="The rulebook is data, not code"
        plain="The whole strategy — every threshold, band and weight — lives in one config file. Changing the strategy means editing data, and every report can be reproduced exactly."
      >
        <p>
          Thresholds, grade bands and weights live in a versioned{" "}
          <code className="font-mono text-[13px] text-accent">config/framework.toml</code> — the
          rulebook <em>as data</em>. Move-eligibility gates can only change with cited evidence, which
          kills &ldquo;gate drift&rdquo; (the strategy quietly loosening over time). Because the rules
          are data and the engine is pure, it&apos;s fully testable:{" "}
          <strong className="text-fg">22 golden tests reproduce the example reports exactly</strong>{" "}
          (a daily of +18 and a weekly of +25), stdlib-only, so a refactor that changes a single
          number fails loudly.
        </p>
      </Story>

      <Story
        n="03"
        title="Local-first, but cloud-deployable unchanged"
        plain="It runs on my machine off a local database, but the exact same engine runs in the cloud on a schedule — so reports still arrive when my PC is off."
      >
        <p>
          Locally it&apos;s <strong className="text-fg">SQLite plus scheduled CLI runs</strong>{" "}
          (Windows Task Scheduler: weekday dailies, a Monday weekly, a monthly on the 2nd, all on
          AWST). The same code is <strong className="text-fg">cloud-deployable unchanged</strong> —
          Postgres plus a{" "}
          <code className="font-mono text-[13px] text-accent">.github/workflows/report.yml</code> cron
          that runs the identical reports on GitHub&apos;s schedule. Price data is keyless and FRED is
          free, so the only secrets are two API keys held as repo secrets. The engine doesn&apos;t know
          or care which environment it&apos;s in.
        </p>
      </Story>

      <Story
        n="04"
        title="Migrating six tabs of history into a typed backbone"
        plain="The strategy already had months of hand-kept history in a spreadsheet. All of it had to come across cleanly, because the engine reads from that history."
      >
        <p>
          A six-tab Excel tracker was migrated into a typed SQLite schema as the system&apos;s
          backbone — <strong className="text-fg">29 daily entries, 7 weeklies, 19 logged decisions</strong>,
          plus gate states and parked items. The indicators compute off that stored history rather
          than re-fetching, which is both faster and the reason the golden tests can be exact: given
          the same rows in, the engine must produce the same report out.
        </p>
      </Story>

      <Story
        n="05"
        title="Closing the loop — and refusing to fabricate a number"
        plain="Signals are only half of it; the real question is whether the strategy is working. So it now tracks the money — but only ever shows a figure it can actually back with data."
      >
        <p>
          A new <strong className="text-fg">growth &amp; performance</strong> layer tracks balance
          over time, since-launch and trailing returns, and each sleeve&apos;s return — computed from
          logged snapshots, anchored to the latest snapshot rather than the wall clock so the numbers
          stay consistent with the data. The detail that matters: a 3/6/12-month delta resolves to the
          nearest snapshot <em>at or before</em> the cutoff, and if the logged history doesn&apos;t
          reach back that far yet, the period returns <code className="font-mono text-[13px] text-accent">null</code>{" "}
          and the dashboard reads <strong className="text-fg">&ldquo;building…&rdquo;</strong> — never a
          guessed or interpolated figure. The same reliability boundary as the rest of the engine,
          applied to performance: show the real number or show nothing. (Reports also moved to proper
          markdown rendering, so the daily/weekly/monthly write-ups are readable, with a full scorecard.)
        </p>
      </Story>

      {/* Why this way */}
      <Section title="Why it's built this way">
        <p>
          The throughline is the same one the rest of this portfolio is about —{" "}
          <strong className="text-fg">probabilistic where it should be, deterministic where it must
          be</strong>. The model reads news and writes prose; code owns anything where being slightly
          wrong isn&apos;t acceptable — the indicators, the score, the gates, the money decision.
        </p>
        <p>
          That boundary isn&apos;t a limitation, it&apos;s the product. It&apos;s what makes a system you
          can actually trust with a real financial strategy, and it&apos;s the cleanest example I have
          of the kind of architecture I want to build.
        </p>
      </Section>

      {/* Where it is now */}
      <Section title="Where it is now">
        <p>
          It runs for me on schedule — generating the daily, weekly and monthly reports and keeping
          the dashboard current. It&apos;s a{" "}
          <strong className="text-fg">personal project operating on real financial data</strong>, so
          it stays private. It is <em>not</em> financial advice — it&apos;s a systematic
          decision-support tool that operates a predefined rulebook and hands the call back to a human.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want the full walkthrough?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          It&apos;s a private app on my own financial data — but I&apos;ll happily walk you through the
          architecture and the deterministic/AI boundary live.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={CONTACT}
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Request a walkthrough
          </a>
          <Link
            href="/#work"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
          >
            See other work
          </Link>
        </div>
      </div>
    </article>
  );
}

// One captioned screenshot per dashboard surface, rendered at its natural aspect
// so every label and number stays legible. Wide strips go full-width; the portrait
// report is capped so it stays crisp (never upscaled). Every real dollar figure —
// the position value and the whole growth panel's balances — is masked before these
// go public; the app runs on real financial data.
const SURFACES: { key: string; w: number; h: number; label: string; narrow?: boolean }[] = [
  { key: "dashboard", w: 1029, h: 544, label: "Dashboard — grades, position, structural state, gates & recent scores" },
  { key: "growth", w: 1030, h: 322, label: "Growth & performance — balance, returns & per-sleeve (dollar figures masked)" },
  { key: "decisions", w: 1029, h: 577, label: "Decisions log, parked items & AI insight chat" },
  { key: "report", w: 685, h: 1080, label: "Daily report — markdown-rendered, with the full scorecard", narrow: true },
];

function SurfaceGallery() {
  return (
    <div className="mt-5">
      <p className="font-mono text-xs text-fg-muted">Inside the app</p>
      <div className="mt-3 space-y-3">
        {SURFACES.map((s) => (
          <figure
            key={s.key}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <Image
              src={`/projects/super-tracker/${s.key}.jpg`}
              alt={s.label}
              width={s.w}
              height={s.h}
              sizes={s.narrow ? "452px" : "(min-width: 768px) 768px, 100vw"}
              className={s.narrow ? "mx-auto h-auto w-full max-w-[452px]" : "h-auto w-full"}
            />
            <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] text-fg-muted">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Story({
  n,
  title,
  plain,
  children,
}: {
  n: string;
  title: string;
  plain: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 rounded-lg border border-border bg-surface p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent">{n}</span>
        <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
      </div>
      {/* Plain-English summary first — the non-technical version. */}
      <p className="mt-3 text-[15px] leading-relaxed text-fg">{plain}</p>
      {/* The technical detail. */}
      <div className="mt-3 space-y-3 border-t border-border pt-3 text-[14px] leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}
