import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";
import { Section } from "@/components/section";
import { ContactButton } from "@/components/contact-button";

const project = getProject("ocla-funnel")!;
const LIVE = "https://onlinecoachlaunchacademy.com/";

// The full stack, surfaced inside the "Under the hood" zone.
const STACK = [
  "HTML / CSS / JavaScript (no framework)",
  "Vercel (static, cleanUrls)",
  "Klaviyo (Client Subscriptions API + flow)",
  "Meta Pixel",
  "Skool (trial & community)",
];

// The five named systems the sales page is built around.
const SYSTEMS = [
  "The Online Foundation Blueprint",
  "The Warm Audience Activation System",
  "The Dual-Channel Growth Engine",
  "The Sustainable Freedom Model",
  "The Always-On Accountability System",
];

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

export default function OclaFunnelCaseStudy() {
  return (
    <article className="mx-auto my-10 max-w-3xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Design &amp; funnel build</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          OCLA Sales Funnel
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
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            View it live →
          </a>
          <ContactButton className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50">
            Request a walkthrough
          </ContactButton>
        </div>
      </header>

      {/* Plain lead — what it is, for anyone. */}
      <p className="mt-8 text-lg leading-relaxed text-fg-muted">
        This is the public face of OCLA — the sales page that sells the program and the automated
        funnel that turns a curious visitor into a free-trial member. I designed and built all of it by
        hand: a long-form, video-led sales page with a clear story and a five-part breakdown of how the
        program works; a separate lead-magnet opt-in page; and the email sequence that follows up
        automatically once someone opts in.{" "}
        <strong className="text-fg">
          It&apos;s the counterpart to the OCLA app case study — that one is the software; this is the
          design and the go-to-market funnel that live in front of it.
        </strong>
      </p>

      <SurfaceGallery />

      {/* The design */}
      <Section title="The design — the part worth looking at">
        <p>
          The sales page is built to do one job well: take a coach who&apos;s tried and struggled to get
          online and walk them all the way to &ldquo;okay, I&apos;ll try this.&rdquo; So it&apos;s a
          designed <em>argument</em>, not a brochure. It opens on the problem, contrasts{" "}
          <em>the way most coaches go online</em> with <em>the way OCLA builds it instead</em>, earns
          trust with a six-year founder story, then lays the program out as five named systems before a
          four-phase visual roadmap, an exactly-what&apos;s-included section, an FAQ, and a clear
          &ldquo;who this is (and isn&apos;t) for.&rdquo;
        </p>
        <div className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            The five systems the page is built around
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {SYSTEMS.map((s) => (
              <li
                key={s}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5">
          It runs on a real visual system, on brand (The Fitness Stall): custom roadmap illustrations
          for each phase, founder photography, in-product screenshots, short looping videos and a VSL —
          composed into one consistent look, not a stock template. Motion is used with restraint: video
          where it earns attention, static and legible everywhere else.
        </p>
      </Section>

      {/* ── Under-the-hood divider ── */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow">Under the hood</p>
        <p className="mt-2 text-sm text-fg-muted">
          How it&apos;s actually built and wired. The plain version is above — everything from here down
          is the technical detail.
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

      {/* The funnel */}
      <Section title="The funnel — wired end to end">
        <p>
          The page is the front of a complete, automated funnel — and the interesting part is that
          there&apos;s no funnel-builder platform under it. I assembled it from primitives:
        </p>
        <ol className="mt-5 space-y-3">
          <Step n="1" title="Lead magnet → opt-in">
            A separate opt-in page (<code className="font-mono text-[13px] text-accent">/claude-cheat-sheet</code>)
            offers a free resource. The form posts <strong className="text-fg">directly to the Klaviyo
            API</strong> — no plugin, no middleman — and fires a Meta Pixel{" "}
            <code className="font-mono text-[13px] text-accent">Subscribe</code> event the moment it
            succeeds.
          </Step>
          <Step n="2" title="Automated nurture">
            Joining the list triggers a <strong className="text-fg">live 7-email Klaviyo flow</strong>{" "}
            (&ldquo;Added to List&rdquo;), spaced across the seven-day free-trial window — the first
            email immediate, the rest on daily delays — with profile-property steps at entry and exit so
            the sequence stays clean.
          </Step>
          <Step n="3" title="The handoff">
            Every &ldquo;Start 7-Day Free Trial&rdquo; call to action routes to the{" "}
            <strong className="text-fg">Skool</strong> community, where trial-to-paid and the member
            experience live. The sales page persuades; Skool converts and hosts.
          </Step>
          <Step n="4" title="Measurement">
            Meta Pixel on both pages (<code className="font-mono text-[13px] text-accent">PageView</code>{" "}
            everywhere, <code className="font-mono text-[13px] text-accent">Subscribe</code> on opt-in)
            so the ad spend feeding the top of the funnel is actually attributable.
          </Step>
        </ol>
        <p className="mt-5">
          The point: I can take a marketing idea and stand up the <strong className="text-fg">whole</strong>{" "}
          path — page, capture, follow-up, tracking, handoff — not just one piece of it.
        </p>
      </Section>

      {/* Decisions */}
      <Story
        n="01"
        title="Build the funnel from primitives, not a funnel platform"
        plain="Page-builder platforms are quick, but they own your pages, your data, and a monthly fee. Static pages on Vercel plus Klaviyo and Pixel wired in directly means OCLA owns the asset outright — and it loads instantly."
      >
        <p>
          ClickFunnels / Kajabi-style tools rent you a funnel. Building the page as static HTML on Vercel
          and talking to Klaviyo + Pixel directly means OCLA owns the asset outright, it loads instantly,
          and there&apos;s nothing to rent. It&apos;s the same ownership argument I make to clients —
          applied to my own funnel.
        </p>
      </Story>

      <Story
        n="02"
        title="Let each tool do the one thing it&apos;s best at"
        plain="The sales page persuades, Klaviyo nurtures, Skool handles trial-to-paid and community. Rather than force one platform to do all three badly, I designed the clean seams between them."
      >
        <p>
          Instead of one all-in-one platform doing three jobs poorly, each layer does what it&apos;s best
          at — and the work is in the seams: the opt-in handoff to Klaviyo, the pixel events, the trial
          CTA into Skool. Those joins are what make the funnel measurable and reliable.
        </p>
      </Story>

      {/* Where it is now */}
      <Section title="Where it is now">
        <p>
          It&apos;s <strong className="text-fg">live</strong> at{" "}
          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            onlinecoachlaunchacademy.com
          </a>
          , running the full funnel — opt-in capture, the automated seven-email sequence, and the Skool
          trial handoff. OCLA itself is now in maintenance mode, but the funnel stands as a complete,
          working example of the <strong className="text-fg">design and go-to-market</strong> side of a
          launch — the part that lives in front of the software.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want to see how it&apos;s wired?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          See the page live, or I&apos;ll happily walk through the design choices and how the funnel is
          put together.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            View it live
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

// One captioned screenshot per funnel surface, rendered at its natural aspect.
const SURFACES: { key: string; w: number; h: number; label: string }[] = [
  { key: "sales-page", w: 1000, h: 12187, label: "The full sales page — narrative, five systems, roadmap, VSL" },
  { key: "opt-in", w: 1280, h: 1067, label: "Lead-magnet opt-in page → Klaviyo" },
];

function SurfaceGallery() {
  return (
    <div className="mt-8">
      <p className="font-mono text-xs text-fg-muted">Inside the funnel</p>
      <div className="mt-3 space-y-3">
        {SURFACES.map((s) => (
          <figure key={s.key} className="overflow-hidden rounded-lg border border-border bg-surface">
            <Image
              src={`/projects/ocla-funnel/${s.key}.jpg`}
              alt={s.label}
              width={s.w}
              height={s.h}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
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

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="font-mono text-sm text-accent">{n}</span>
      <div>
        <p className="font-display text-sm font-semibold tracking-tight text-fg">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{children}</p>
      </div>
    </li>
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
      <p className="mt-3 text-[15px] leading-relaxed text-fg">{plain}</p>
      <div className="mt-3 space-y-3 border-t border-border pt-3 text-[14px] leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}
