import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";
import { Section } from "@/components/section";
import { OclaArchitecture } from "@/components/ocla-architecture";

const project = getProject("ocla")!;
const CONTACT = "mailto:ryanalexanderblack@gmail.com?subject=OCLA%20walkthrough";

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

// The full stack, surfaced inside the "Under the hood" zone.
const STACK = [
  "Next.js 16 (App Router)",
  "React 19",
  "TypeScript",
  "Supabase — Postgres + Auth + RLS",
  "Claude Sonnet 4 (Anthropic SDK)",
  "Upstash Redis",
  "Resend",
  "Vercel — hosting + cron",
  "Recharts",
  "react-pdf + docx",
];

// The product surface — a 4-module curriculum, then the tools to run the business.
const CURRICULUM: { name: string; does: string }[] = [
  { name: "Module 1 — Niche & Ideal Client", does: "defines who they help and the outcome; AI writes a promise statement + deep client insights" },
  { name: "Module 2 — Social & Content", does: "Instagram bio, four content pillars, and a 32-idea content bank" },
  { name: "Module 3 — Offer Creation", does: "maps the client journey, builds program pillars, names it, sets pricing tiers" },
  { name: "Module 4 — DMs & Call Offer", does: "a call-booking offer + a poll-style cold-DM opener" },
];

const TOOLS: { name: string; does: string }[] = [
  { name: "Content Planner", does: "weekly post planning from the content bank — AI writes captions + format-specific content (scripts, carousels, overlays)" },
  { name: "DM Support", does: "real-time AI guidance through a live DM conversation, two reply options at each step" },
  { name: "KPI Tracker", does: "daily outreach + ad metrics, a booking→taken→converted funnel, rolling rates" },
  { name: "Client Hub", does: "a light CRM — MRR, min-term alerts, a per-client week-by-week journey tracker" },
  { name: "Ad Planner", does: "Meta ad copy (primary text, talking-head script, B-roll overlays) from the user's own data" },
  { name: "Website Generator", does: "ready-to-paste copy for an 8-section sales page, drawn from a saved coach profile" },
];

export default function OclaCaseStudy() {
  return (
    <article className="mx-auto my-10 max-w-3xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Flagship build</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          OCLA — Online Coach Launch Academy
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
            Live at ocla.thefitnessstall.com · login-gated (private)
          </span>
        </div>
      </header>

      {/* Plain lead — what it does, for anyone. */}
      <p className="mt-8 text-lg leading-relaxed text-fg-muted">
        Most online fitness coaches start with no system: no clear niche, no content plan, no
        repeatable way to find and sign clients. OCLA takes a coach through that whole journey —
        four guided modules that build their niche, content, offer and outreach from scratch — then
        hands them the tools to actually run the business day to day. AI helps at every step, and an
        assistant is one click away on every page. It&apos;s a real, live product, not a demo.
      </p>

      {/* The proof — system map first (it's a private app), then the surfaces a coach uses. */}
      <figure className="mt-8">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface p-4 sm:p-6">
          <OclaArchitecture />
        </div>
        <figcaption className="mt-2 font-mono text-xs text-fg-muted">
          How the pieces fit — the app, its data, the AI layer, and the community-to-app flow.
        </figcaption>
      </figure>

      <SurfaceGallery />

      {/* The problem */}
      <Section title="The problem">
        <p>
          Two hard problems sit on top of each other here. The first is product: a coach&apos;s journey
          from zero to a running business is a dozen connected decisions — niche, content, offer,
          pricing, outreach, delivery — and most tools only solve one slice. The second is
          reliability: the moment you put AI on every feature, you inherit its failure modes. Models
          drift, invent data, and time out. A portfolio demo can hide that; a live app coaches pay
          for cannot.
        </p>
        <p>
          The goal was one coherent system that takes a coach all the way through, where the AI is
          genuinely dependable — and where the business plumbing around it (sign-ups, trials,
          billing state) holds together against a third-party platform that doesn&apos;t give you the
          hooks you&apos;d want.
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

      {/* The product / scope */}
      <Section title="What it actually does">
        <p>
          Seven surfaces. A four-module curriculum that the coach completes in order, then six tools
          that unlock to run the business — plus an AI helper on every page that knows where the user
          is and what they&apos;ve saved.
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              The curriculum
            </p>
            <ul className="mt-3 space-y-2.5">
              {CURRICULUM.map((m) => (
                <li key={m.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <span className="font-display text-sm font-semibold sm:w-64 sm:shrink-0">{m.name}</span>
                  <span className="text-sm text-fg-muted">{m.does}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              The tools to run it
            </p>
            <ul className="mt-3 space-y-2.5">
              {TOOLS.map((t) => (
                <li key={t.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <span className="font-display text-sm font-semibold sm:w-64 sm:shrink-0">{t.name}</span>
                  <span className="text-sm text-fg-muted">{t.does}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Engineering stories */}
      <Section title="The four engineering problems worth talking about">
        <p>
          The interesting work wasn&apos;t the screens — it was making a multi-tenant, AI-heavy app
          behave in production. Four decisions carried most of the weight.
        </p>
      </Section>

      <Story
        n="01"
        title="Designing around a platform that won't tell you what happened"
        plain="The community platform tells the app when someone joins a paid trial — but never tells it when that trial turns into a real subscription, or when someone cancels or a payment fails. So the app had to figure out its own access rules safely."
      >
        <p>
          Sign-ups come from a Skool community, whose Zapier integration exposes only two events —
          &ldquo;Answered Membership Questions&rdquo; and &ldquo;New Paid Member.&rdquo; There&apos;s no
          trial-converted, cancellation, or payment-failed event, and Stripe Express was locked. So
          access can&apos;t be read straight from billing.
        </p>
        <p>
          The answer is a <strong className="text-fg">subscription state machine</strong> on the
          approved-emails table — <code className="font-mono text-[13px] text-accent">invited → trial
          → paid → overdue / cancelled / revoked</code>. A &ldquo;New Paid Member&rdquo; webhook
          (<code className="font-mono text-[13px] text-accent">/api/zapier/skool-join</code>) opens a
          7-day trial row; feature access is gated by trial day (Module 1 from day 1, Module 2 from
          day 5, the rest on paid); and from day 7 the app <em>infers</em> conversion — Skool would
          have removed the member if the auto-charge failed, so continued membership is the signal.
          A daily Vercel cron drives the trial clock, and admin override buttons are the deliberate
          manual fallback for the states the platform never reports. It&apos;s integration architecture
          designed around real, missing hooks — not the happy path.
        </p>
      </Story>

      <Story
        n="02"
        title="Keeping AI dependable in production"
        plain="Putting AI on every feature means inheriting every way AI goes wrong — it drifts, repeats itself, or times out. The app is built so none of that reaches the user."
      >
        <p>
          Generation is split into <strong className="text-fg">small, per-section endpoints</strong>
          {" "}(12 in total) rather than one giant call — that keeps each request inside Vercel&apos;s
          limit (every AI route sets <code className="font-mono text-[13px] text-accent">maxDuration
          = 60</code> and each fetch carries a 60-second{" "}
          <code className="font-mono text-[13px] text-accent">AbortSignal.timeout</code>). Where a
          screen needs many pieces at once — the eight-section website generator, the ad planner —
          they fan out in parallel with{" "}
          <code className="font-mono text-[13px] text-accent">Promise.allSettled</code>, so one
          failed section never sinks the rest.
        </p>
        <p>
          The subtle one is <strong className="text-fg">drift</strong>. When a user regenerates their
          client insights, the prompt first <em>strips their previous answers out of the context</em>
          {" "}— otherwise the model anchors to the old wording and returns lightly-reworded
          variations instead of fresh thinking (especially damaging after a user redoes their niche).
          Every AI endpoint is also rate-limited (200 requests/hour/user via Upstash Redis, failing
          open in local dev) to keep a runaway loop from burning the API budget.
        </p>
      </Story>

      <Story
        n="03"
        title="Every user sees only their own data"
        plain="It's one app serving many separate coaches. Each only ever sees their own clients, content, and numbers — enforced at the database, not just the screen."
      >
        <p>
          Isolation is enforced with <strong className="text-fg">row-level security</strong> in
          Postgres, so the boundary lives in the database rather than hopeful checks in the UI.
          Privileged work (admin actions, the cron) runs through a server-only service-role client
          that&apos;s never exposed to the browser. Even the support &ldquo;log in as this user&rdquo;
          feature is done safely — the admin mints a server-side magic link and POSTs the token in
          the request body (never in a URL that could leak) to land in the user&apos;s session.
        </p>
      </Story>

      <Story
        n="04"
        title="Built to be edited safely"
        plain="A tool people use daily has to feel instant and never lose work — even on a flaky connection or a fast double-click."
      >
        <p>
          Edits are <strong className="text-fg">optimistic with rollback</strong> — the change shows
          immediately and reverts only if the save fails. Autosave treats local state as the source
          of truth so a slow response can&apos;t clobber newer typing, and a per-resource{" "}
          <code className="font-mono text-[13px] text-accent">AbortController</code> cancels an
          in-flight save when a newer one starts, killing out-of-order races. Schema changes ship as
          additive, numbered migrations (001–019) so live user data is never reshaped from under
          them, and finished module work exports to polished PDF and DOCX.
        </p>
      </Story>

      {/* The community half */}
      <Section title="The other half — the community it plugs into">
        <p>
          OCLA isn&apos;t just the app. About a third of the build (~50 hours) went into the paired
          <strong className="text-fg"> Skool community</strong> that sells and onboards it — the
          go-to-market half of the same product. The two are wired together: when someone joins the
          paid community, Skool fires a Zap that hits{" "}
          <code className="font-mono text-[13px] text-accent">/api/zapier/skool-join</code>, which
          provisions their trial in the app automatically — no manual approval step. A daily{" "}
          <code className="font-mono text-[13px] text-accent">trial-pulse</code> cron then emails a
          digest (via Resend) so onboarding stays on top of where each new member is in their trial.
          Designing the product <em>and</em> the funnel that feeds it is the whole-system thinking the
          rest of this portfolio is about.
        </p>
      </Section>

      {/* Why this way */}
      <Section title="Why it's built this way">
        <p>
          The throughline is <strong className="text-fg">probabilistic where it should be,
          deterministic where it must be</strong>. The model writes and reasons; code owns anything
          where being slightly wrong isn&apos;t acceptable — access rules, money state, data isolation.
        </p>
        <p>
          And nearly every hard decision was <strong className="text-fg">designing around a real
          constraint</strong> rather than an ideal one: Skool exposes two events, so the app infers
          the rest; Vercel caps execution at 60 seconds, so generation is split and parallelised;
          billing state isn&apos;t readable, so a state machine plus manual overrides covers the gap.
          That&apos;s the work of an architect — making the pieces flow together given what the real
          systems will and won&apos;t do.
        </p>
      </Section>

      {/* Where it is now */}
      <Section title="Where it is now">
        <p>
          OCLA is <strong className="text-fg">live in production with paying users.</strong> Since
          pivoting toward an AI-architecture career I&apos;ve moved it to maintenance-only — kept
          running for its users, infrastructure trimmed to lower-cost tiers, fully backed up — and it
          now serves as the centrepiece of this portfolio. It&apos;s the most complete answer I have to
          &ldquo;can you architect and ship a real, AI-native system end to end?&rdquo; — so it&apos;s the
          one I point to first.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want the full walkthrough?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          It&apos;s a private, login-gated app — but I&apos;ll happily give you a live tour and talk
          through any part of the architecture.
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

// A captioned tile per app surface. Renders a real screenshot when one exists in
// /public/projects/ocla/<key>.png; until then, a clean branded placeholder so the
// page reads as intentional. Swapping in screenshots is drop-the-file simple.
const SURFACES: { key: string; label: string }[] = [
  { key: "foundation", label: "Foundation Builder — the 4-module curriculum" },
  { key: "content-planner", label: "Content Planner — weekly posts" },
  { key: "dm-support", label: "DM Support — live AI reply guidance" },
  { key: "kpi-tracker", label: "KPI Tracker — outreach + ads funnel" },
  { key: "client-hub", label: "Client Hub — CRM + MRR" },
  { key: "ad-planner", label: "Ad Planner — Meta campaign copy" },
];

function SurfaceGallery() {
  const dir = path.join(process.cwd(), "public", "projects", "ocla");
  return (
    <div className="mt-5">
      <p className="font-mono text-xs text-fg-muted">Inside the app</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SURFACES.map((s) => {
          const file = `${s.key}.jpg`;
          const hasShot = fs.existsSync(path.join(dir, file));
          return (
            <figure
              key={s.key}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-green-brand/10 to-transparent">
                {hasShot ? (
                  <Image
                    src={`/projects/ocla/${file}`}
                    alt={s.label}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Image src="/brand/logo-mark.svg" alt="" width={32} height={32} className="opacity-50" />
                  </div>
                )}
              </div>
              <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] text-fg-muted">
                {s.label}
              </figcaption>
            </figure>
          );
        })}
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
      {/* Plain-English summary first — the buyer's version. */}
      <p className="mt-3 text-[15px] leading-relaxed text-fg">{plain}</p>
      {/* The technical detail. */}
      <div className="mt-3 space-y-3 border-t border-border pt-3 text-[14px] leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}
