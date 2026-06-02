import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";

const project = getProject("newsletter")!;
const EXAMPLE = "/projects/newsletter/example/signal-over-noise-01.html";

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

const PIPELINE: { stage: string; how: string; why: string }[] = [
  {
    stage: "Research",
    how: "Perplexity Sonar (sonar-pro) → cited synthesis + sources",
    why: "real, current facts with attribution",
  },
  {
    stage: "Write",
    how: "LLM reasoning → structured content JSON in a defined brand voice",
    why: "the creative / judgment layer",
  },
  {
    stage: "Charts",
    how: "code (Pillow + brand tokens) → PNG",
    why: "diffusion models garble numbers and labels — data viz must be exact",
  },
  {
    stage: "Hero image",
    how: "an image API — editorial art only, no text",
    why: "the one place generative imagery actually fits",
  },
  {
    stage: "Assemble",
    how: "content JSON → email-safe HTML (inline styles, tables, ~600px, hosted PNGs)",
    why: "renders consistently across email clients",
  },
  {
    stage: "Verify",
    how: "headless Edge/Chrome → full-email PNG",
    why: "nothing sends unseen",
  },
  {
    stage: "Send",
    how: "test channel (Gmail) for drafts; an ESP for production",
    why: "swappable send slot",
  },
];

const TOOLS: { name: string; does: string }[] = [
  { name: "research_topic.py", does: "Perplexity Sonar → cited research JSON" },
  { name: "build_charts.py", does: "content JSON → on-brand PNG charts (real fonts via Pillow)" },
  { name: "build_email_html.py", does: "content JSON → responsive, email-safe HTML" },
  { name: "preview_email.py", does: "HTML → PNG via headless browser (the verify gate)" },
  { name: "host_image.py", does: "local image → public URL (email needs hosted images)" },
  { name: "brand_kit.py", does: "loads the brand tokens + fonts (shared helper)" },
];

export default function NewsletterCaseStudy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Challenge Day 1</p>
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
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={EXAMPLE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Open the live example →
          </a>
        </div>
      </header>

      {/* Rendered output */}
      <figure className="mt-12 overflow-hidden rounded-lg border border-border bg-surface">
        <Image
          src="/projects/newsletter/preview.png"
          alt="Signal over Noise — Issue 01, the real rendered output of the pipeline"
          width={1200}
          height={1600}
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-fg-muted">
          Issue 01 — the real, unedited output of the pipeline.
        </figcaption>
      </figure>

      {/* Problem */}
      <Section title="The problem">
        <p>
          A good newsletter is several different jobs wearing one coat: current research with
          sources, writing in a consistent voice, accurate data visuals, an email that actually
          renders in every client, and a final read-through before it goes out. Done by hand it&apos;s
          slow; handed entirely to an AI it&apos;s unreliable — models invent figures, garble chart
          labels, and produce HTML that breaks in Outlook.
        </p>
        <p>
          The goal: a pipeline that takes a single <em>topic</em> and returns a finished, on-brand,
          fact-checked issue — without the failure modes.
        </p>
      </Section>

      {/* How it works */}
      <Section title="How it works">
        <p>
          Seven stages, each owned by whichever layer is right for the job — reasoning where
          judgment matters, deterministic code where exactness matters.
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

      {/* Why this way */}
      <Section title="Why it's built this way">
        <p>
          The architecture is <strong className="text-fg">probabilistic where it should be and
          deterministic where it must be</strong> — that split is what makes it reliable. The
          model writes and synthesises; code handles anything where being slightly wrong isn&apos;t
          acceptable.
        </p>
        <p>
          Every provider is a <strong className="text-fg">swappable slot</strong>: the research
          engine, the image generator, and the send channel can each be replaced without touching
          the rest of the pipeline. That&apos;s the integration-architecture thinking the whole system
          is meant to demonstrate.
        </p>
      </Section>

      {/* Charts highlight */}
      <Section title="The charts are code, not generated">
        <p>
          This is the decision that matters most. Image models are great at editorial art and
          terrible at data — they&apos;ll happily invent a fourth bar or misspell an axis. So charts are
          rendered in code from the content JSON, using the real brand tokens and fonts. The
          numbers are exactly the numbers.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {["chart-ai-spend", "chart-why-owners"].map((c) => (
            <Image
              key={c}
              src={`/projects/newsletter/${c}.png`}
              alt="On-brand data chart rendered in code"
              width={800}
              height={500}
              className="w-full rounded-lg border border-border bg-surface"
            />
          ))}
        </div>
      </Section>

      {/* Tools */}
      <Section title="The tools">
        <p>
          Each stage is a small, testable Python tool — the deterministic execution layer of the
          WAT framework (Workflows · Agents · Tools).
        </p>
        <ul className="mt-6 space-y-3">
          {TOOLS.map((t) => (
            <li key={t.name} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <code className="font-mono text-sm text-accent sm:w-56 sm:shrink-0">{t.name}</code>
              <span className="text-sm text-fg-muted">{t.does}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Learned */}
      <Section title="Taking it to a real audience">
        <p>
          A test send to your own inbox is not production — and knowing the gap is part of the
          work. Before a real list this needs: a proper ESP (not personal Gmail), a working
          unsubscribe link, a physical postal address in the footer (CAN-SPAM / GDPR / CASL),
          honest opt-in wording, an authenticated sending domain (SPF / DKIM / DMARC), and
          permanent image hosting (generated-image URLs expire). Those are tracked as the go-live
          checklist.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want the full walkthrough?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          Open the live issue, or get in touch and I&apos;ll talk you through the architecture.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={EXAMPLE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Open the live example
          </a>
          <a
            href="mailto:alexanderthegreatcoaching@gmail.com"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
          >
            Get in touch
          </a>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-fg [&_p]:text-[15px]">{children}</div>
    </section>
  );
}
