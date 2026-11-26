import type { Metadata } from "next";
import Image from "next/image";
import { clients } from "@/lib/clients";
import { CTA, Footer, Header } from "./chrome";
import { Backdrop } from "./greenline-page";
import { greenlineHostOnly } from "./host";

// greenlineai.nz: the Greenline AI homepage (Ryan, 26 Nov). A business-first, simpler take on ryanalexanderblack.com:
// what Greenline does, how it works, proof, who's behind it, and the two free ways in (the AI Profit Snapshot at
// /profit-snapshot, Signal over Noise at /newsletter). Ad clicks to the root still get the snapshot (proxy.ts).
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
const PROOF_SLUGS = ["advance-visual", "legends-academy", "cash-direct"];

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

export default async function Page() {
  await greenlineHostOnly();
  const proof = PROOF_SLUGS.flatMap((slug) => {
    const c = clients.find((x) => x.slug === slug);
    if (!c) return [];
    const s = c.proofStats?.[0];
    return [{ company: c.company, industry: c.industry.split(" · ")[0], stat: s?.stat ?? c.results[0], label: s?.label, quote: c.quote }];
  });

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
              <a className="gl-hm-link body" href="/newsletter">Or get Signal over Noise, free every Monday →</a>
            </div>
          </div>
          <div className="gl-slot gl-hm-photo">
            <Image src="/greenline/hero-dream.jpg" alt="A business owner relaxing with a coffee on a sunny deck above vineyards and the sea"
                   fill priority sizes="(max-width: 760px) 100vw, 45vw" style={{ objectPosition: "22% 50%" }} />
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
        </section>

        <section className="gl-section gl-section-mist">
          <p className="gl-eyebrow eyebrow">Real results</p>
          <h2 className="gl-heading display-lg">Built and running in real businesses.</h2>
          <div className="gl-hm-proof gl-gap-top">
            {proof.map((p) => (
              <article className="gl-card" key={p.company}>
                <p className="gl-step-tag tag">{p.company} · {p.industry}</p>
                <p className="gl-hm-stat display-sm">{p.stat}</p>
                {p.label && <p className="small gl-hm-muted">{p.label}</p>}
                <blockquote className="gl-quote body">
                  &ldquo;{p.quote.text}&rdquo;
                  <cite className="caption">{p.quote.name}, {p.quote.role}</cite>
                </blockquote>
              </article>
            ))}
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
              <p className="gl-step-tag tag">About 90 seconds</p>
              <h3 className="display-sm">Your free AI Profit Snapshot</h3>
              <p className="body">Pop in your website and get 3 places AI could grow your profit, with the hours each could give back.</p>
              <a className="gl-btn button" href={SNAPSHOT}>{CTA}</a>
            </div>
            <div className="gl-step gl-hm-way">
              <p className="gl-step-tag tag">Every Monday</p>
              <h3 className="display-sm">Signal over Noise</h3>
              <p className="body">The week just gone in NZ business and beyond, and one practical AI idea to grow your profit.</p>
              <a className="gl-btn gl-hm-ghost button" href="/newsletter">Get Signal over Noise</a>
            </div>
          </div>
          <p className="gl-hm-contact body">
            Rather just talk? Call or text Ryan on <a href="tel:+642904309605">029 0430 9605</a> or email{" "}
            <a href="mailto:ryan@greenlineai.nz">ryan@greenlineai.nz</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
