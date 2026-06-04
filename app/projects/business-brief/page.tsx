import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";
import { Section } from "@/components/section";

const project = getProject("business-brief")!;

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

const PIPELINE: { stage: string; how: string; why: string }[] = [
  {
    stage: "Map",
    how: "Firecrawl maps the site → the real page list",
    why: "find where the content actually lives (rarely the homepage)",
  },
  {
    stage: "Read",
    how: "scrape home, about, services and work → markdown",
    why: "the words: what they do, the story, the team, the clients",
  },
  {
    stage: "Brand",
    how: "Firecrawl 'branding' extraction → colours, fonts, logo",
    why: "the full visual identity, captured automatically — no manual picking",
  },
  {
    stage: "Capture",
    how: "full-page screenshot + download the brand assets locally",
    why: "a visual reference, saved so the brief is self-contained",
  },
  {
    stage: "Synthesise",
    how: "LLM → a structured brief (positioning, clients, team, opportunities)",
    why: "the read, not a data dump — patterns, gaps, and where to help",
  },
  {
    stage: "Render",
    how: "code → a styled PDF via a headless browser",
    why: "a clean, branded, send-ready document every time",
  },
];

const TOOLS: { name: string; does: string }[] = [
  { name: "Firecrawl MCP", does: "the read engine — map / scrape / branding / screenshot" },
  { name: "md_to_pdf.py", does: "Markdown → styled, brand-themed PDF (headless browser)" },
  { name: "json_to_csv.py", does: "structured extracts → clean CSV (the sibling scraper tool)" },
];

export default function BusinessBriefCaseStudy() {
  return (
    <article className="mx-auto my-10 max-w-3xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Challenge Day 2</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          {project.title}
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
      </header>

      {/* Plain lead — for a non-technical reader. */}
      <p className="mt-8 text-lg leading-relaxed text-fg-muted">
        Walking into a meeting understanding a business takes real homework — what they do, how
        they&apos;re positioned, who they serve, and how they present. This does that homework from
        nothing but their website address: it reads the site, captures the brand, and hands back a
        complete, ready-to-read brief — rendered as a clean, branded PDF. Here&apos;s a real run
        (client details redacted):
      </p>

      {/* Rendered output — capped height with a fade. */}
      <figure className="mt-6">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <div className="relative max-h-[460px] overflow-hidden">
            <Image
              src="/projects/business-brief/preview.png"
              alt="A real, anonymised business brief produced by the generator"
              width={920}
              height={1180}
              className="w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent" />
          </div>
          <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-fg-muted">
            A real run — anonymised (name, contact and named accounts redacted)
          </figcaption>
        </div>
      </figure>

      {/* Problem */}
      <Section title="The problem">
        <p>
          Researching a business properly is slow, and most write-ups are either a shallow copy of
          the homepage or a wall of raw scraped text. The useful version is a <em>read</em> — what
          the business actually makes money on, how it&apos;s positioned, where the gaps are — and it
          needs to look like something you&apos;d be happy to hand over.
        </p>
        <p>
          The goal: give it one <em>URL</em> and get back a structured, accurate, nicely-presented
          brief — without inventing anything that isn&apos;t on the site.
        </p>
      </Section>

      {/* ── Under-the-hood divider ── */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow">Under the hood</p>
        <p className="mt-2 text-sm text-fg-muted">
          How it&apos;s actually built. The plain version is above — everything from here down is the
          technical detail.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
          {project.stack.concat(["Headless browser", "WAT framework"]).map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <Section title="How it works">
        <p>
          Six stages, each owned by whichever layer is right for the job — the read engine pulls the
          facts and the brand, the model does the synthesis, and code renders the document.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface font-mono text-xs uppercase tracking-wider text-fg-muted">
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">How</th>
                <th className="px-4 py-3 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {PIPELINE.map((row) => (
                <tr key={row.stage} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-display font-semibold">{row.stage}</td>
                  <td className="px-4 py-3 text-fg-muted">{row.how}</td>
                  <td className="px-4 py-3 text-fg-muted">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Branding highlight */}
      <Section title="It captures the brand automatically">
        <p>
          The part that makes the output feel finished: the visual identity is{" "}
          <strong className="text-fg">pulled straight from the live site</strong> — primary and
          secondary colours (as exact hex), the fonts, and the logo — with no manual picking. That
          palette in the preview above was extracted, not typed in. It means the brief can be styled
          in the right brand from the first pass.
        </p>
      </Section>

      {/* Two routes */}
      <Section title="Two outputs from one research pass">
        <p>
          The research is captured once; the framing is a choice. The same underlying facts render
          as either of two documents:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="font-display font-semibold">Internal recon</p>
            <p className="mt-2 text-sm text-fg-muted">
              A candid prep doc, neutral styling — for walking into a meeting or interview already
              knowing the business and where you&apos;d add value.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="font-display font-semibold">Client-facing</p>
            <p className="mt-2 text-sm text-fg-muted">
              A warm, first-person document you can hand to the business itself — opportunity-led and
              styled in your own brand, a deliverable that doubles as a demo of the work.
            </p>
          </div>
        </div>
      </Section>

      {/* Tools */}
      <Section title="The tools">
        <p>
          A read engine connected over MCP, plus small, reusable scripts — the deterministic
          execution layer of the WAT framework (Workflows · Agents · Tools).
        </p>
        <ul className="mt-6 space-y-3">
          {TOOLS.map((t) => (
            <li key={t.name} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <code className="font-mono text-sm text-accent sm:w-44 sm:shrink-0">{t.name}</code>
              <span className="text-sm text-fg-muted">{t.does}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Limits / integrity */}
      <Section title="Honest limits">
        <p>
          It reads <strong className="text-fg">public pages only</strong>, at a reasonable rate, and
          never invents facts — anything not on the site simply isn&apos;t in the brief. Founding
          dates, client lists and claims are taken as the company states them, flagged to verify in
          conversation. It&apos;s a fast, deep <em>starting</em> understanding — not due diligence.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want one run on your business?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          Send me a URL and I&apos;ll talk you through what it pulls — and how the architecture fits
          together.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:ryanalexanderblack@gmail.com"
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </div>
    </article>
  );
}
