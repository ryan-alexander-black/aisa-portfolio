import Image from "next/image";
import { projects, workGroups, getProject, isPublished } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { MarkEyebrow, NodeLabel } from "@/components/blueprint";

const strengths = [
  {
    label: "Business-minded builder",
    body: "~7 years running my own businesses — I read a whole operation fast and build from a holistic perspective, not narrow focused outcomes. The context most AI builders lack.",
  },
  {
    label: "Real systems, not just what looks good",
    body: "I set up the operating system a business runs on, then automate the repetitive work — designed end to end, not just nice looking features.",
  },
  {
    label: "AI-native & fast",
    body: "I take ideas → live with AI-assisted tools, adapting to whatever the build needs as I go.",
  },
];

const experience = [
  {
    role: "Operations & delivery",
    detail:
      "Ran production and installation for a signage company — ~$250k/month, 30+ concurrent projects, a team of 5–6.",
  },
  {
    role: "Founder & builder",
    detail:
      "~7 years running my own businesses; now building AI systems full-time. Flagship is OCLA — a SaaS that unifies a whole coaching business into one system, built solo, live with paying users.",
  },
  {
    role: "Built my own AIOS",
    detail:
      "I run my own operation on a custom AI operating system I built (Nexus) — the same AI business hub & automations I set up inside a business.",
  },
];

export default function Home() {
  const spotlight = projects.find((p) => p.featuredLarge && isPublished(p));

  return (
    <>
      {/* Hero — the statement, the face, and what I bring, as one flow */}
      <section id="about" className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          {/* Statement + face */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_17rem] lg:gap-16">
            <div>
              <div className="text-plate">
                <MarkEyebrow>AI Solutions Architect &amp; Builder</MarkEyebrow>
                <h1 className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.05]">
                  I install the AI operating system a business runs on —{" "}
                  <span className="text-accent">and automate the boring work.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                  I&apos;m Ryan. After ~7 years running my own businesses, I build the AI systems that
                  make them run. I go into a business, set up its AI operating system, and layer in the
                  automations that kill the repetitive work — the whole-operation judgement most AI
                  builders lack. I proved it on my own business first: OCLA (a live SaaS) and Nexus (my own
                  AIOS).
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
                >
                  See the work
                </a>
                <a
                  href="mailto:ryanalexanderblack@gmail.com"
                  className="glass-card rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
                >
                  Get in touch
                </a>
                <a
                  href="/Ryan-Alexander-Black-CV.pdf"
                  target="_blank"
                  rel="noopener"
                  className="glass-card rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* The face */}
            <div className="relative order-first mx-auto w-44 sm:w-52 lg:order-none lg:mx-0 lg:w-full">
              <div
                className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-green-brand/25 blur-[60px]"
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-green-brand/80 shadow-glow">
                <Image
                  src="/ryan.jpg"
                  alt="Ryan Black"
                  fill
                  sizes="(min-width: 1024px) 17rem, (min-width: 640px) 13rem, 11rem"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Flows straight into what that means in practice — no second "About" heading */}
          <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3">
            {strengths.map((s) => (
              <div key={s.label} className="glass-card rounded-lg border border-border p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-plate">
            <dl className="grid gap-4 pt-6">
              {experience.map((e) => (
                <div key={e.role} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-4">
                  <dt className="font-display text-sm font-semibold tracking-tight text-fg">
                    {e.role}
                  </dt>
                  <dd className="text-sm leading-relaxed text-fg-muted">{e.detail}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm text-fg-muted">
              The full story is in my CV →{" "}
              <a
                href="/Ryan-Alexander-Black-CV.pdf"
                target="_blank"
                rel="noopener"
                className="text-accent underline-offset-4 hover:underline"
              >
                Download CV
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-plate inline-block">
          <MarkEyebrow>Selected work</MarkEyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Builds &amp; case studies
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
      </section>
    </>
  );
}
