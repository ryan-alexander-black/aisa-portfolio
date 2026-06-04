import Image from "next/image";
import { projects, workGroups, getProject } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { MarkEyebrow, NodeLabel } from "@/components/blueprint";

const strengths = [
  {
    label: "Whole-system thinking",
    body: "I see how every piece of a business fits — and design how the parts flow together, not just one screen.",
  },
  {
    label: "Business-strong builder",
    body: "Years of running the operation give me the context most builders lack: I build for the outcome, not the demo.",
  },
  {
    label: "AI-native & fast",
    body: "I take products idea → live with AI-assisted tools, learning whatever the build needs as I go.",
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
      "~6–7 years running my own businesses; now building AI software full-time. Flagship is the OCLA web app — built solo, live with paying users.",
  },
  {
    role: "Consultative sales",
    detail:
      "Closed $3–5k offers as a consultative seller — the stakeholder and communication edge that client-facing architecture work runs on.",
  },
];

export default function Home() {
  const spotlight = projects.find((p) => p.featuredLarge);

  return (
    <>
      {/* Hero — the statement, the face, and what I bring, as one flow */}
      <section id="about" className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          {/* Statement + face */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_17rem] lg:gap-16">
            <div>
              <div className="text-plate">
                <MarkEyebrow>AI Solutions Architect</MarkEyebrow>
                <h1 className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.05]">
                  I architect whole systems —{" "}
                  <span className="text-accent">and build them, end to end.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                  I&apos;m Ryan. I take AI products from idea to live — designing how every piece fits
                  together, then building it. After ~6–7 years running my own businesses, I understand
                  the whole system, not just the code — the join most builders miss.
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
              A fuller story — and a downloadable CV — lands here soon.
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
            const items = group.slugs.map(getProject).filter(Boolean);
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
