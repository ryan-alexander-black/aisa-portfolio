import Image from "next/image";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* one confident green moment */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-green-brand/15 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={48}
            height={48}
            className="mb-8 h-12 w-12"
            priority
          />
          <p className="eyebrow">AI Solutions Architect — in the making</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            I architect whole systems —{" "}
            <span className="text-accent">and build them, end to end.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Business-strong builder turning ideas into working AI software. I take products
            from idea to live — designing how every piece flows together, then shipping it.
            Below are selected builds, each with the problem it solved and the stack behind it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              See the work
            </a>
            <a
              href="mailto:ryanalexanderblack@gmail.com"
              className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Builds &amp; case studies
          </h2>
        </div>

        {/* Featured */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {/* Everything else */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
