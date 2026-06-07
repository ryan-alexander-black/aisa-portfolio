import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject } from "@/lib/projects";
import { StatusBadge } from "@/components/status-badge";
import { Section } from "@/components/section";

const project = getProject("tfs-creative-suite")!;

export const metadata: Metadata = {
  title: `${project.title} — Case study | Ryan Alexander Black`,
  description: project.summary,
};

// What the one connector can make — the categories, each wired to the best provider.
const CATEGORIES: { kind: string; what: string }[] = [
  {
    kind: "Images",
    what: "10 models — cheap drafts (z-image) → premium photoreal (nano-banana), text-in-image, and reference-based editing",
  },
  {
    kind: "Video",
    what: "17 models — Veo, Kling, Wan, Hailuo, Runway, Grok, Gemini Omni; talking-head avatars; text-to-video and image-to-video",
  },
  {
    kind: "Voice",
    what: "ElevenLabs text-to-speech, plus my own cloned voice for content that sounds like me",
  },
  {
    kind: "Music",
    what: "Suno (with persona + stem-separation) and ElevenLabs Music (commercially licensed for paid ads)",
  },
  {
    kind: "Dialogue & audio",
    what: "multi-speaker spots, voice isolation (clean a noisy recording), transcription, and dubbing a voiceover into other languages",
  },
  {
    kind: "Utilities",
    what: "background removal, video upscaling (Topaz), and a permanent asset library",
  },
];

// The automated editor — raw clip in, finished Reel out.
const PIPELINE: { stage: string; how: string }[] = [
  { stage: "Transcribe", how: "ElevenLabs Scribe → the words with word-level timings (for captions)" },
  { stage: "Polish", how: "clean the source audio so the voice sits clearly over the mix" },
  { stage: "Analyse", how: "a skill turns the transcript into a structured reel spec — chapters, stats, captions" },
  { stage: "Generate", how: "pull a fresh music bed + documentary b-roll from the connector (or generate new)" },
  { stage: "Assemble", how: "wire every asset into the spec and render with Remotion → a finished MP4" },
  { stage: "Iterate", how: "tweak one line in the spec (a stat, a chapter, a music swap) → re-render" },
];

export default function TfsCreativeSuiteCaseStudy() {
  return (
    <article className="mx-auto my-10 max-w-3xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <Link href="/#work" className="font-mono text-xs text-fg-muted hover:text-accent">
        ← All work
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Case study · Creative tooling</p>
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
        Producing media with AI usually means juggling a dozen separate tools — one for images, another
        for video, others for voice, music and captions — each with its own login and quirks, and files
        that quietly expire after a couple of weeks. This pulls all of it into one place: a single
        connector my AI assistant can reach for any kind of media, a permanent library so nothing is ever
        lost, and an automated editor that turns a raw clip into a finished, captioned Reel.
      </p>

      {/* Cover */}
      <figure className="mt-6">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <Image
            src="/projects/tfs-creative-suite/cover.jpg"
            alt="TFS Creative Suite — one toolset for AI image, video, voice and music"
            width={1200}
            height={750}
            className="w-full"
          />
          <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-fg-muted">
            One toolset across image · video · voice · music — every result saved to a permanent library
          </figcaption>
        </div>
      </figure>

      {/* Problem */}
      <Section title="The problem">
        <p>
          Running paid ad campaigns means producing a constant stream of media — hero images, b-roll,
          voiceovers, music beds, captioned video. Doing that across separate tools is slow; the cost of
          each generation is invisible until the bill arrives; and most providers&apos; files{" "}
          <em>expire</em>, so last month&apos;s assets are gone the moment you want to reuse them.
        </p>
        <p>
          I wanted one toolset any of my AI assistants could reach — in the chat <em>and</em> inside my
          video editor — that <strong className="text-fg">never loses an asset</strong> and{" "}
          <strong className="text-fg">won&apos;t quietly run up a big bill</strong>.
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
          {project.stack
            .concat(["Vercel serverless", "Vercel Blob", "JSON-RPC / MCP", "Suno", "Gemini Omni"])
            .map((tech) => (
              <span
                key={tech}
                className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>

      {/* Two systems */}
      <Section title="Two connected systems">
        <p>
          It&apos;s two pieces that work together. The <strong className="text-fg">Creative Suite</strong>{" "}
          is a <strong className="text-fg">custom MCP server</strong> — it exposes around 25 tools to my
          AI assistants (in the claude.ai chat and in Claude Code), each one wired to the best provider
          for the job. The <strong className="text-fg">automated editor</strong> is a Remotion pipeline
          that pulls from the Suite&apos;s library and assembles finished video. The MCP server is the
          probabilistic-meets-deterministic seam: the assistant decides <em>what</em> to make; code owns
          the calling, the cost guard, and the storage.
        </p>
      </Section>

      {/* What it can make */}
      <Section title="One connector, every model">
        <p>
          Instead of a login per tool, there&apos;s one connector that reaches the right model for each
          job — and the assistant picks cheap models for drafts, premium for finals.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface font-mono text-xs uppercase tracking-wider text-fg-muted">
                <th className="px-4 py-3 font-medium">Make</th>
                <th className="px-4 py-3 font-medium">What&apos;s wired in</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((row) => (
                <tr key={row.kind} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-display font-semibold">{row.kind}</td>
                  <td className="px-4 py-3 text-fg-muted">{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Permanent library */}
      <Section title="It never loses an asset">
        <p>
          Most AI providers hand back a URL that <strong className="text-fg">expires in ~14 days</strong>.
          Here, every generation is automatically copied into permanent cloud storage (Vercel Blob) and
          returned as a URL that lives forever. The filename encodes the type, model and prompt, so the
          library is searchable without a separate database.
        </p>
        <p>
          The payoff is <strong className="text-fg">cross-session memory</strong>: an image generated in
          one chat is still there next week — and reachable from a <em>different</em> tool. That&apos;s
          exactly how the video editor reuses assets instead of paying to regenerate them.
        </p>
      </Section>

      {/* Cost guard */}
      <Section title="It won't run up a surprise bill">
        <p>
          AI video is expensive, and it&apos;s easy to fire off a $2 generation by accident. Every tool
          estimates its cost <em>before</em> calling, and anything at or above a{" "}
          <strong className="text-fg">$1 threshold is blocked until it&apos;s explicitly confirmed</strong>
          . The assistant announces the price, waits for a yes, and only then spends. Cost control is in
          the code, not left to good intentions.
        </p>
      </Section>

      {/* Brand consistency */}
      <Section title="Same face, same voice, every video">
        <p>
          A campaign falls apart if the presenter looks slightly different in every clip. The Suite solves
          that two ways: a reusable <strong className="text-fg">visual character</strong> and{" "}
          <strong className="text-fg">voice</strong> (registered once via Gemini Omni, then reused across
          every generation), and my own <strong className="text-fg">cloned voice</strong> through
          ElevenLabs — so content can sound like me, not a stock narrator. One English voiceover can then
          be <strong className="text-fg">dubbed into other languages</strong> while keeping the same voice,
          for international ad versions.
        </p>
      </Section>

      {/* The editor */}
      <Section title="From raw clip to finished Reel">
        <p>
          The second half is an automated editor built on Remotion (video composed in code). Drop in a raw
          clip, give it one instruction, and it runs the whole pipeline:
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface font-mono text-xs uppercase tracking-wider text-fg-muted">
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">What happens</th>
              </tr>
            </thead>
            <tbody>
              {PIPELINE.map((row) => (
                <tr key={row.stage} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-display font-semibold">{row.stage}</td>
                  <td className="px-4 py-3 text-fg-muted">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Every per-video choice lives in one editable spec file — move a chapter boundary, change a stat,
          swap the b-roll or the music, and re-render. It&apos;s the same content-layer discipline I use
          everywhere: a human-editable source the render is built from, so nothing is buried in the
          design. This is what produced the finished Reels for live Meta ad campaigns.
        </p>
      </Section>

      {/* Limits / status */}
      <Section title="Honest status">
        <p>
          The Suite is <strong className="text-fg">live and in daily use</strong> as the engine behind TFS
          ad content. It currently runs single-user (URL-obscured rather than full OAuth — the next
          hardening step), and the catalogue tracks the providers as they change: models get added,
          deprecated ones removed. It&apos;s built to be the one place creative gets made, not a finished
          product I sell — it&apos;s evidence of how I wire multiple AI services into one reliable system.
        </p>
      </Section>

      {/* CTA */}
      <div className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Want to see it run?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          I&apos;ll walk you through the connector, the asset library, and a Reel built end to end — and
          how the same pattern would wire AI media into your own pipeline.
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
