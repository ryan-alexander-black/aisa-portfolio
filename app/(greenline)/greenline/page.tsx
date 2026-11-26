import type { Metadata } from "next";
import Image from "next/image";
import { clients, type ClientCase, type ClientQuote } from "@/lib/clients";
import { CTA, Footer, Header } from "./chrome";
import { Backdrop } from "./greenline-page";
import { greenlineHostOnly } from "./host";

// greenlineai.nz: the Greenline AI homepage (Ryan, 26 Nov). A business-first, simpler take on ryanalexanderblack.com.
// Order (Ryan, 26 Nov): hero → who's behind it → the two free ways in → real results (AV big, Legends + Cash Direct
// under it) → how it works. No phone or email on the page (spam). Ad clicks to the root still get the snapshot (proxy.ts).
export const metadata: Metadata = {
  title: "Greenline AI · AI for NZ businesses · Grow your profit, not just your revenue",
  description:
    "Greenline AI finds where AI can save your business real hours and money, then builds it into how you work. Start with a free AI Profit Snapshot.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://greenlineai.nz",
    siteName: "Greenline AI",
    title: "Grow your profit, not just your revenue",
    description: "AI built into how NZ businesses work, so the same team gets more done. Start with a free AI Profit Snapshot.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow your profit, not just your revenue",
    description: "AI built into how NZ businesses work. Start with a free AI Profit Snapshot.",
  },
};

const SNAPSHOT = "/profit-snapshot";

const STEPS = [
  {
    tag: "Find",
    title: "Where AI would pay off",
    text: "We go through how the business runs, from the first enquiry to the paid invoice, and find the biggest profit wins, in order.",
  },
  {
    tag: "Build",
    title: "One win at a time",
    text: "Built around the tools you already use, and tested on your real numbers before your team relies on it.",
  },
  {
    tag: "Grow",
    title: "One system for the business",
    text: "Each build joins the last, so the whole business runs on one system and the next idea slots straight in.",
  },
];

// Every word below comes from the client records (lib/clients.ts), so it can't drift from the portfolio.
const client = (slug: string) => clients.find((c) => c.slug === slug) as ClientCase;
const quoteOf = (c: ClientCase, start: string): ClientQuote =>
  [c.quote, ...(c.page?.quotes ?? [])].find((q) => q.text.startsWith(start)) ?? c.quote;

function Logo({ c }: { c: ClientCase }) {
  return (
    <span className={`gl-hm-logo gl-hm-logo-${c.logoBg}`}>
      <Image src={c.logo} alt={`${c.company} logo`} width={160} height={48} />
    </span>
  );
}

function Quote({ q }: { q: ClientQuote }) {
  return (
    <blockquote className="gl-quote body">
      &ldquo;{q.text}&rdquo;
      <cite className="caption">{q.name}, {q.role}</cite>
    </blockquote>
  );
}

export default async function Page() {
  await greenlineHostOnly();
  const av = client("advance-visual");
  const avQuoting = av.proofStats?.[0];
  const avHub = av.proofStats?.[3];
  const small = [
    { c: client("legends-academy"), quote: quoteOf(client("legends-academy"), "One month, man") },
    { c: client("cash-direct"), quote: client("cash-direct").quote },
  ];

  return (
    <div className="gl-root">
      <Header cta={SNAPSHOT} />
      <main>
        <section className="gl-hm-hero gl-has-bg">
          <Backdrop first still="/greenline/bg-light-lines.jpg"
                    wash="linear-gradient(180deg, rgba(255,255,255,.25), rgba(245,248,246,.45))" />
          <div>
            <p className="gl-eyebrow eyebrow">Greenline AI · AI for NZ businesses</p>
            <h1 className="display-xl">Grow your profit, not just your revenue.</h1>
            <p className="gl-lede lede">
              Greenline AI finds where AI can save your business real hours and money, then builds it into how you work.
              AI does the legwork. Your people make the calls.
            </p>
            <div className="gl-hm-actions">
              <a className="gl-btn button" href={SNAPSHOT}>{CTA}</a>
            </div>
          </div>
          <div className="gl-slot gl-hm-photo">
            {/* GPT Image 2.5 Sunburst, 26 Nov (KIE asset 61c5bfa4): an owner in a bright Hawke's Bay workshop-office. */}
            <Image src="/greenline/hero-home.jpg" alt="A business owner with a coffee checking a rising chart on a laptop while the team works behind him"
                   fill priority sizes="(max-width: 760px) 100vw, 45vw" style={{ objectPosition: "40% 50%" }} />
          </div>
        </section>

        <section className="gl-section gl-on-band gl-nl-who-band">
          <div className="gl-nl-who">
            <div className="gl-nl-who-photo">
              <Image src="/ryan-headshot.png" alt="Ryan Alexander Black" fill sizes="180px" />
            </div>
            <div>
              <p className="gl-eyebrow eyebrow">Who&apos;s behind it</p>
              <h2 className="gl-heading display-lg">Hey, I&apos;m Ryan.</h2>
              <p className="body gl-mt-2">
                I&apos;m Hawke&apos;s Bay born and based in Napier. I spent nearly a decade at a signage company, working
                almost every role up to production manager, sold cars, then ran our own online coaching business with my
                wife for over five years. One lesson kept coming back: profit is what matters most. So I started Greenline
                AI, to help NZ businesses grow without their costs growing with them.
              </p>
            </div>
          </div>
        </section>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">Start here, free</p>
          <h2 className="gl-heading display-lg">Two free ways to start.</h2>
          <div className="gl-steps gl-gap-top">
            <div className="gl-step gl-hm-way">
              <p className="gl-step-tag tag">A free report · about 90 seconds</p>
              <h3 className="display-sm">Your free AI Profit Snapshot</h3>
              <p className="body">
                Pop in your website and get a short report: 3 places AI could grow your profit, specific to your business,
                with the hours each could give back. On screen straight away, and in your inbox.
              </p>
              <a className="gl-btn button" href={SNAPSHOT}>{CTA}</a>
            </div>
            <div className="gl-step gl-hm-way">
              <p className="gl-step-tag tag">A free weekly email · every Monday</p>
              <h3 className="display-sm">Signal over Noise</h3>
              <p className="body">
                A short email newsletter every Monday morning: what happened in NZ business the week just gone, and one
                practical AI idea to grow your profit. A few minutes to read.
              </p>
              <a className="gl-btn gl-hm-ghost button" href="/newsletter">Get Signal over Noise</a>
            </div>
          </div>
        </section>

        <section className="gl-section gl-section-mist">
          <p className="gl-eyebrow eyebrow">Real results</p>
          <h2 className="gl-heading display-lg">Built and running in real businesses.</h2>

          <article className="gl-card gl-hm-feature gl-gap-top">
            <div className="gl-hm-head">
              <Logo c={av} />
              <p className="gl-step-tag tag">{av.company} · {av.industry}</p>
            </div>
            <div className="gl-hm-wins">
              {avQuoting && (
                <div>
                  <p className="gl-hm-kicker small">Quoting</p>
                  <p className="gl-hm-stat display-sm">{avQuoting.stat}</p>
                  <p className="small gl-hm-muted">{avQuoting.label}</p>
                  <Quote q={av.quote} />
                </div>
              )}
              {avHub && (
                <div>
                  <p className="gl-hm-kicker small">Running the business</p>
                  <p className="gl-hm-stat display-sm">{avHub.stat}</p>
                  <p className="small gl-hm-muted">{avHub.label} Quotes, jobs and invoices, from any device.</p>
                  <Quote q={quoteOf(av, "Love the fact")} />
                </div>
              )}
            </div>
          </article>

          <div className="gl-hm-proof">
            {small.map(({ c, quote }) => {
              const s = c.proofStats?.[0];
              return (
                <article className="gl-card" key={c.slug}>
                  <div className="gl-hm-head">
                    <Logo c={c} />
                    <p className="gl-step-tag tag">{c.company} · {c.industry.split(" · ")[0]}</p>
                  </div>
                  <p className="gl-hm-stat display-sm">{s?.stat ?? c.results[0]}</p>
                  {s?.label && <p className="small gl-hm-muted">{s.label}</p>}
                  <Quote q={quote} />
                </article>
              );
            })}
          </div>
        </section>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">How it works</p>
          <h2 className="gl-heading display-lg">Find it, build it, keep growing.</h2>
          <div className="gl-steps gl-steps-3 gl-gap-top">
            {STEPS.map((s, i) => (
              <div className="gl-step" key={s.tag}>
                <p className="gl-step-tag tag">0{i + 1} · {s.tag}</p>
                <h3 className="display-sm">{s.title}</h3>
                <p className="body">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="gl-hm-actions">
            <a className="gl-btn button" href={SNAPSHOT}>{CTA}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
