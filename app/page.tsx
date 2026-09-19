import Image from "next/image";
import { projects, workGroups, getProject, isPublished } from "@/lib/projects";
import { clients } from "@/lib/clients";
import { ProjectCard } from "@/components/project-card";
import { ClientCard } from "@/components/client-card";
import { MarkEyebrow, NodeLabel } from "@/components/blueprint";
import { HeroActions } from "@/components/hero-actions";

// Reconciled into one list (2026-07-04) — the old 3-card "strengths" grid and
// this "experience" list said largely the same things twice (range, business
// background, AI-native pace). One clean pass now covers all of it.
// The hero's proof: what the work does, said plainly (Ryan, 19 Sep — soft for now: AI is
// about helping people do higher-value work, not replacing them; the hard numbers live on
// the case-study pages). The promise above them stays the offer line.
const proof = [
  { stat: "Time back", label: "admin handed to AI, so your team gets on with the work that matters" },
  { stat: "Cost down", label: "less spent on double-handling and busywork" },
  { stat: "Accuracy", label: "every result checked against your own numbers" },
];

// How the work runs — the same order every client story follows.
const method = [
  {
    step: "Find",
    detail:
      "A free AI Opportunity Report: where your week actually goes, and the biggest wins, ranked by value.",
  },
  {
    step: "Build",
    detail: "The highest-value automation first — the one that pays for the rest.",
  },
  {
    step: "Install",
    detail:
      "Your AI operating system: your tools connected, a live view of the business, and room to grow.",
  },
];

const experience = [
  {
    role: "Builder & founder",
    detail:
      "~7 years running my own businesses; now building AI software full-time. Flagship is OCLA — a SaaS that unifies a whole coaching business into one system, built solo, live with paying users. That background is the context most AI builders lack — I build for outcomes, not just features that look good in a demo.",
  },
  {
    role: "Operations & delivery",
    detail:
      "Ran production and installation for a signage company — ~$250k/month, 30+ concurrent projects, a team of 5–6. I understand real-world constraints.",
  },
  {
    role: "Range, end to end",
    detail:
      "Full-stack SaaS, a rules-based data/decision engine, a custom AI media toolset (MCP server + automated video editor), and research/reporting automation pipelines — I build whatever the job needs, idea to live, not just the fun bits in the middle.",
  },
  {
    role: "AI-native & fast",
    detail:
      "I take ideas → live with AI-assisted tooling, with the production guardrails (validation, code-not-LLM for anything numeric, tests) that keep AI reliable once real people use it.",
  },
];

export default function Home() {
  const spotlight = projects.find((p) => p.featuredLarge && isPublished(p));
  const funnel = getProject("ocla-funnel");
  const funnelShown = funnel && isPublished(funnel);

  return (
    <>
      {/* Hero — the statement, the face, and what I bring, as one flow */}
      <section id="about" className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-8 sm:pb-14 sm:pt-28">
          {/* Statement + face */}
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_17rem] lg:gap-16">
            <div>
              <div className="text-plate">
                <MarkEyebrow>AI Solutions Consultant &amp; Builder</MarkEyebrow>
                <h1 className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.05]">
                  I find businesses&rsquo; highest-value AI opportunities —{" "}
                  <span className="text-accent">then build &amp; install them, end to end.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                  I&apos;m Ryan. I start with a free AI Opportunity Report, build the highest-value
                  automation first, then install the AI operating system that connects your tools.
                  Seven years running my own businesses means I build for how a business actually
                  runs.
                </p>
              </div>
              <HeroActions />

              {/* Proof — the promise, backed by real client numbers */}
              <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3">
                {proof.map((p) => (
                  <div
                    key={p.stat}
                    className="glass-card rounded-lg border border-amber-400/30 px-3 py-3 sm:px-4"
                  >
                    <p className="font-display text-lg font-extrabold leading-tight tracking-tight text-amber-400 sm:text-2xl">
                      {p.stat}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-fg-muted sm:text-xs">{p.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-fg-muted">
                Client work for{" "}
                {clients.map((c, i) => (
                  <span key={c.slug}>
                    {i > 0 && <span className="text-fg-muted/60"> · </span>}
                    <a href={c.page ? `/work/${c.slug}` : "#client-work"} className="font-semibold text-fg hover:text-amber-400">
                      {c.company}
                    </a>
                  </span>
                ))}
              </p>
            </div>

            {/* The face */}
            <div className="relative order-first mx-auto w-28 sm:w-52 lg:order-none lg:mx-0 lg:w-full">
              <div
                className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-green-brand/25 blur-[60px]"
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-green-brand/80 shadow-glow">
                <Image
                  src="/ryan-headshot.png"
                  alt="Ryan Black"
                  fill
                  sizes="(min-width: 1024px) 17rem, (min-width: 640px) 13rem, 11rem"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* How I work — the offer line, as three steps */}
      <section className="mx-auto max-w-5xl px-6 pt-4">
        <div className="text-plate inline-block">
          <MarkEyebrow>How I work</MarkEyebrow>
        </div>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {method.map((m, i) => (
            <li key={m.step} className="glass-card rounded-lg border border-border p-5">
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <p className="mt-1 font-display text-lg font-bold tracking-tight">{m.step}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{m.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Client work — real businesses, told as found → built → result */}
      <section id="client-work" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 sm:pt-20">
        <div className="mb-8 text-plate inline-block">
          <MarkEyebrow>Client work</MarkEyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Opportunities found, built and running
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {clients.map((c) => (
            <div key={c.slug} className={c.featured ? "sm:col-span-2" : ""}>
              <ClientCard client={c} />
            </div>
          ))}
        </div>
      </section>

      {/* Background — who's behind the work (was in the hero) */}
      <section className="mx-auto max-w-5xl px-6 pt-20">
        <div className="text-plate">
          <MarkEyebrow>Background</MarkEyebrow>
          <dl className="mt-6 grid gap-4">
            {experience.map((e) => (
              <div key={e.role} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="font-display text-sm font-semibold tracking-tight text-fg">
                  {e.role}
                </dt>
                <dd className="text-sm leading-relaxed text-fg-muted">{e.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-plate inline-block">
          <MarkEyebrow>Also built</MarkEyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Products &amp; personal builds
          </h2>
        </div>

        {/* Spotlight — the centrepiece, full width above the pairs */}
        {spotlight && (
          <div className="mb-12">
            <ProjectCard project={spotlight} large />
          </div>
        )}

        {/* Everything else — grouped, in layers of two */}
        <div className="space-y-12">
          {workGroups.map((group, i) => {
            const items = group.slugs.map(getProject).filter((p) => p && isPublished(p));
            if (items.length === 0) return null;
            return (
              <div key={group.label}>
                <NodeLabel index={String(i + 1).padStart(2, "0")}>{group.label}</NodeLabel>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {items.map((p) => (
                    <ProjectCard key={p!.slug} project={p!} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Design & go-to-market — a full-width banner under the grouped pairs */}
        {funnelShown && (
          <div className="mt-12">
            <NodeLabel index={String(workGroups.length + 1).padStart(2, "0")}>
              Design &amp; go-to-market
            </NodeLabel>
            <div className="mt-4">
              <ProjectCard project={funnel} large eyebrow="Design & funnel build" />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
