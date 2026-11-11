"use client";

// The Greenline AI opt-in page (greenlineai.nz). One job: get the free AI Profit Snapshot requested.
// The funnel (Ryan, 10 Nov; money-engine/greenline-page.md → "The funnel"): the ad sells the click,
// this page sells the opt-in and nothing else, the snapshot is the thank-you, and only good fits are
// shown /next, the page that sells the Full AI Opportunity Report. So nothing here talks about the
// full report, the audit or "2 a month". Every value comes from the Greenline design system
// (greenline-kit.css); every word from brand/STORY.md → "The brand: Greenline AI". Both forms hand
// the email + website to the same report flow as /ai-report, which then takes over the page.
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { MiniReportFlow, startError, type MiniReportStart } from "../../(site)/ai-report/mini-report-flow";
import type { ClientQuote } from "@/lib/clients";
import { CTA, Footer, Header } from "./chrome";

export type Proof = {
  company: string; industry: string; results: string[]; stats: { stat: string; label: string }[]; quote: ClientQuote;
  logo?: string; logoBg?: "light" | "dark";
};

// Moving backgrounds: drop a short loop in /public/greenline and set its path here. Until then the
// still shows (it is also the poster, and what reduced-motion visitors always see).
const MOTION: { hero?: string; band?: string } = {};
// Photos (Ryan, 10 Nov: the "dream" of a more profitable business). GPT Image 2.5, 10 Nov; sources in the KIE
// asset store. An empty path shows a labelled placeholder locally and nothing on the live site.
// 11 Nov (Ryan): Ryan himself on the deck (GPT Image 2.5 edit of hero-dream.jpg with his profile photo).
const IMAGES: { hero?: string } = { hero: "/greenline/hero-ryan-deck.jpg" };

/** An image spot. With no `src` yet: a labelled placeholder while developing, nothing in production.
 *  `focus`: the CSS object-position that keeps the subject in frame when the slot crops the photo. */
export function ImageSlot({ src, alt, label, className = "", focus = "50% 50%" }: {
  src?: string; alt: string; label: string; className?: string; focus?: string;
}) {
  if (src) {
    return (
      <div className={`gl-slot ${className}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: focus }} />
      </div>
    );
  }
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className={`gl-slot gl-slot-empty caption ${className}`} role="img" aria-label={`Image placeholder: ${label}`}>
      <span><b>Image to come</b><br />{label}</span>
    </div>
  );
}

export function Backdrop({ still, video, wash, first }: { still: string; video?: string; wash: string; first?: boolean }) {
  return (
    <div className="gl-backdrop" aria-hidden="true">
      <Image src={still} alt="" fill sizes="100vw" className="gl-backdrop-still" loading={first ? "eager" : "lazy"} />
      {video && <video className="gl-backdrop-video" src={video} poster={still} autoPlay loop muted playsInline />}
      <div className="gl-backdrop-wash" style={{ background: wash }} />
    </div>
  );
}

function SnapshotForm({ where, full, onStart }: { where: string; full?: boolean; onStart: (s: MiniReportStart) => void }) {
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const bad = startError(email, site);
    if (bad) { setErr(bad); return; }
    onStart({ email: email.trim(), site: site.trim(), trap });
  };
  return (
    <form className="gl-form" id={where === "hero" ? "report" : undefined} onSubmit={submit} noValidate>
      <h3 className="gl-form-title display-sm">Get your free AI Profit Snapshot</h3>
      {full && <p className="gl-form-sub small">3 places AI could grow your profit, specific to your business. About 90 seconds.</p>}
      {full && (
        <ul className="gl-form-ticks small">
          <li>3 ideas built from your own website</li>
          <li>The hours and dollars each could give back</li>
          <li>On screen straight away, and in your inbox</li>
        </ul>
      )}
      <div className="gl-field">
        <label className="gl-label label" htmlFor={`gl-email-${where}`}>Your email</label>
        <input className="gl-input body-sm" id={`gl-email-${where}`} type="email" placeholder="you@yourbusiness.co.nz"
               autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-field">
        <label className="gl-label label" htmlFor={`gl-site-${where}`}>Your website</label>
        <input className="gl-input body-sm" id={`gl-site-${where}`} type="text" placeholder="yourbusiness.co.nz"
               autoComplete="url" value={site} onChange={(e) => { setSite(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-trap" aria-hidden="true">
        <label htmlFor={`gl-cw-${where}`}>Company website</label>
        <input id={`gl-cw-${where}`} type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      {err && <p className="gl-field-error caption" role="alert">{err}</p>}
      <button className="gl-btn gl-btn-block button" type="submit">{CTA}</button>
      {full && (
        <p className="gl-fine fine">
          Your snapshot by email, plus Signal over Noise: what&apos;s working for NZ businesses each week, and one AI idea to
          grow your profit. Unsubscribe any time. <a href="/privacy">Privacy</a>
        </p>
      )}
    </form>
  );
}

function Cta() {
  return <div className="gl-cta"><a className="gl-btn button" href="#report">{CTA}</a></div>;
}

export function GreenlinePage({ proof }: { proof: Proof[] }) {
  const [started, setStarted] = useState<MiniReportStart | null>(null);

  // Once a form is sent, the report flow takes over the page. Good fits finish on a button to /next.
  if (started) {
    return (
      <>
        <div className="gl-root"><Header cta={null} /></div>
        <MiniReportFlow initial={started} next="/next" onRestart={() => { setStarted(null); window.scrollTo(0, 0); }} />
      </>
    );
  }

  const voice = proof[0];
  return (
    <div className="gl-root">
      <Header />

      <main>
        <section className="gl-hero gl-has-bg">
          <Backdrop first still="/greenline/bg-light-lines.jpg" video={MOTION.hero}
                    wash="linear-gradient(180deg, rgba(255,255,255,.25), rgba(245,248,246,.45))" />
          <div className="gl-hero-copy">
            <p className="gl-eyebrow eyebrow">Free AI Profit Snapshot · for growing NZ businesses</p>
            <h1 className="display-xl">See where AI could grow your profit.</h1>
            <p className="gl-lede lede">
              Pop in your website. In about 90 seconds you get 3 ideas specific to your business, with the hours each could
              give back and roughly what that&apos;s worth a year.
            </p>
          </div>
          <SnapshotForm where="hero" full onStart={setStarted} />
          <ImageSlot className="gl-hero-photo" src={IMAGES.hero} focus="22% 50%"
                     alt="A business owner relaxing with a coffee on a sunny deck above vineyards and the sea"
                     label="The dream: an owner with time back and the business running well (more profit, more life)" />
        </section>

        <div className="gl-stats">
          <div className="gl-stat"><b className="display-sm">Only 90 seconds</b><span className="caption">with your email and website</span></div>
          <div className="gl-stat"><b className="display-sm">3 ideas</b><span className="caption">specific to your business</span></div>
          <div className="gl-stat"><b className="display-sm">Completely free</b><span className="caption">nothing to pay</span></div>
          <div className="gl-stat"><b className="display-sm">Instantly delivered</b><span className="caption">on screen and in your inbox</span></div>
        </div>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">What&apos;s in your snapshot</p>
          <h2 className="gl-heading display-lg">Three ideas, built from your own business.</h2>
          <div className="gl-steps gl-steps-3 gl-gap-top">
            <div className="gl-step">
              <p className="gl-step-tag tag">From your website</p>
              <h3 className="display-sm">3 places AI could help</h3>
              <p className="body">Each one names the work it would take off your plate, and how AI would handle it.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Time and money</p>
              <h3 className="display-sm">What each could give back</h3>
              <p className="body">The hours a week each idea could save, and roughly what that&apos;s worth a year.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Easy to check</p>
              <h3 className="display-sm">Where each idea came from</h3>
              <p className="body">Every idea shows what on your site or in your answers it&apos;s based on.</p>
            </div>
          </div>
          <Cta />
        </section>

        {voice && (
          <section className="gl-section gl-section-mist gl-has-bg">
            {/* A light wash so the workshop photo shows; the words sit on their own frosted panel. */}
            <Backdrop still="/greenline/bg-workshop.jpg" wash="linear-gradient(rgba(245,248,246,.04), rgba(245,248,246,.1))" />
            <div className="gl-panel">
              <p className="gl-eyebrow eyebrow">From Ryan Alexander Black</p>
              <h2 className="gl-heading display-lg">Real results for businesses like yours.</h2>
              <p className="gl-lede body gl-mt-2">{proof.map((p) => p.company).join(" · ")}</p>
              <article className="gl-card gl-gap-top">
                <blockquote className="gl-quote body">
                  &ldquo;{voice.quote.text}&rdquo;
                  <cite className="caption">{voice.quote.name}, {voice.quote.role} · {voice.company}</cite>
                </blockquote>
              </article>
            </div>
          </section>
        )}

        <section className="gl-band gl-has-bg">
          <Backdrop still="/greenline/bg-dark-lines.jpg" video={MOTION.band}
                    wash="linear-gradient(rgba(10,15,13,.45), rgba(10,15,13,.6))" />
          <div>
            <p className="gl-eyebrow eyebrow">Your free AI Profit Snapshot</p>
            <h2 className="gl-heading display-lg">Three ideas for your business, in about 90 seconds.</h2>
            <p className="gl-lede lede">
              Simply enter your email and website, and you&apos;ll instantly receive your free AI Profit Snapshot on screen
              and in your inbox.
            </p>
          </div>
          <SnapshotForm where="band" onStart={setStarted} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
