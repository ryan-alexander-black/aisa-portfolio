"use client";

// The Greenline AI sales page (the short MVP: money-engine/greenline-page.md → "v1 to build").
// One job: get the free AI Opportunity Report requested. Every value comes from the Greenline design
// system (greenline-kit.css); every word from brand/STORY.md → "The brand: Greenline AI" and the
// approved mockup (greenline-mini-v3). Both forms hand the email + website to the same report flow
// as /ai-report, which then takes over the page.
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { MiniReportFlow, startError, type MiniReportStart } from "../../(site)/ai-report/mini-report-flow";
import type { ClientQuote } from "@/lib/clients";

export type Proof = { company: string; industry: string; results: string[]; quote: ClientQuote };

const CTA = "Get my free AI Opportunity Report";

// Moving backgrounds: drop a short loop in /public/greenline and set its path here. Until then the
// still shows (it is also the poster, and what reduced-motion visitors always see).
const MOTION: { hero?: string; band?: string } = {};

function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg className="gl-mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="2,18 8,14 13,16 21,5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2.5" cy="18" r="1.8" fill="currentColor" />
      <circle cx="13" cy="16" r="1.8" fill="currentColor" />
      <circle cx="21" cy="5" r="2.2" fill="currentColor" />
    </svg>
  );
}

function Lockup() {
  return (
    <div className="gl-lockup">
      <Mark />
      <div>
        <div className="gl-lockup-name">Greenline <b>AI</b></div>
        <div className="gl-lockup-by">with Ryan Alexander Black · AI for NZ businesses</div>
      </div>
    </div>
  );
}

function Header({ withButton = true }: { withButton?: boolean }) {
  return (
    <header className="gl-header">
      <div className="gl-header-in">
        <Lockup />
        {withButton && <a className="gl-btn gl-btn-sm button-sm" href="#report">{CTA}</a>}
      </div>
    </header>
  );
}

function Backdrop({ still, video, wash, first }: { still: string; video?: string; wash: string; first?: boolean }) {
  return (
    <div className="gl-backdrop" aria-hidden="true">
      <Image src={still} alt="" fill sizes="100vw" className="gl-backdrop-still" loading={first ? "eager" : "lazy"} />
      {video && <video className="gl-backdrop-video" src={video} poster={still} autoPlay loop muted playsInline />}
      <div className="gl-backdrop-wash" style={{ background: wash }} />
    </div>
  );
}

function ReportForm({ where, full, onStart }: { where: string; full?: boolean; onStart: (s: MiniReportStart) => void }) {
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
      <h3 className="gl-form-title display-sm">Get your free AI Opportunity Report</h3>
      {full && <p className="gl-form-sub small">3 places AI could grow your profit, specific to your business. About 2 minutes.</p>}
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
          Your report by email, plus Signal over Noise: what&apos;s working for NZ businesses each week, and one AI idea to
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

  // Once a form is sent, the report flow takes over the page, exactly as it runs on /ai-report.
  if (started) {
    return (
      <>
        <div className="gl-root"><Header withButton={false} /></div>
        <MiniReportFlow initial={started} onRestart={() => { setStarted(null); window.scrollTo(0, 0); }} />
      </>
    );
  }

  return (
    <div className="gl-root">
      <Header />

      <main>
        <section className="gl-hero gl-has-bg">
          <Backdrop first still="/greenline/bg-light-lines.jpg" video={MOTION.hero}
                    wash="linear-gradient(180deg, rgba(255,255,255,.25), rgba(245,248,246,.45))" />
          <div>
            <p className="gl-eyebrow eyebrow">For growing NZ businesses</p>
            <h1 className="display-xl">Grow your business. Keep more of what it makes.</h1>
            <p className="gl-lede lede">
              Growing is only worth it if your profit grows too. I learn how your business runs, from the first enquiry to
              the paid invoice. Then I build the AI tools that let you grow without your costs growing with you.
            </p>
          </div>
          <ReportForm where="hero" full onStart={setStarted} />
        </section>

        <div className="gl-stats">
          <div className="gl-stat"><b className="display-sm">2 minutes</b><span className="caption">your email and website</span></div>
          <div className="gl-stat"><b className="display-sm">3 ideas</b><span className="caption">specific to your business</span></div>
          <div className="gl-stat"><b className="display-sm">Free</b><span className="caption">no call needed to see it</span></div>
          <div className="gl-stat"><b className="display-sm">2 a month</b><span className="caption">full audits I take on</span></div>
        </div>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">The Greenline way</p>
          <h2 className="gl-heading display-lg">Two ways to grow. Only one grows your profit.</h2>
          <div className="gl-compare gl-gap-top">
            <div className="gl-compare-col gl-compare-usual">
              <h3 className="display-sm">The usual way</h3>
              <ul className="body">
                <li>More sales means more staff</li>
                <li>More jobs means more admin hours</li>
                <li>Costs climb with every dollar of growth</li>
                <li>Revenue goes up. Profit barely moves</li>
              </ul>
            </div>
            <div className="gl-compare-col gl-compare-green">
              <h3 className="display-sm">The Greenline way</h3>
              <ul className="body">
                <li>AI handles the repeated work: quotes, follow-ups, invoices</li>
                <li>The same team takes on more jobs</li>
                <li>Costs stay steady as sales grow</li>
                <li>Revenue goes up. Profit goes up with it</li>
              </ul>
            </div>
          </div>
          <div className="gl-line">
            <div>
              <h3 className="display-md">The green line is profit.</h3>
              <p className="gl-lede body gl-mt-2">That&apos;s the line Greenline AI is built to lift. Not just bigger, more profitable.</p>
            </div>
            <div>
              <svg className="gl-profit" viewBox="0 0 400 170" role="img" aria-label="Illustration: revenue and profit rising together">
                <line className="axis" x1="10" y1="160" x2="390" y2="160" strokeWidth="1.5" />
                <polyline className="revenue" points="10,125 105,108 200,84 295,60 390,28" fill="none" strokeWidth="3" strokeDasharray="8 6" />
                <polyline className="profit" points="10,152 105,142 200,124 295,100 390,72" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle className="node" cx="390" cy="72" r="8" />
              </svg>
              <div className="gl-key small">
                <span>- - - Revenue</span><span className="is-profit">&#9473; Profit</span><span className="fine">Illustration, not data</span>
              </div>
            </div>
          </div>
          <Cta />
        </section>

        <section className="gl-section gl-section-mist gl-has-bg">
          <Backdrop still="/greenline/bg-workshop.jpg" wash="linear-gradient(rgba(245,248,246,.86), rgba(245,248,246,.9))" />
          <p className="gl-eyebrow eyebrow">Real businesses, real results</p>
          <h2 className="gl-heading display-lg">Already working for businesses like yours.</h2>
          <div className="gl-proof gl-gap-top">
            {proof.map((p) => (
              <article className="gl-card" key={p.company}>
                <h3 className="gl-card-who title">{p.company}</h3>
                <p className="gl-card-meta caption">{p.industry}</p>
                <ul className="body-sm">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
                <blockquote className="gl-quote body-sm">
                  &ldquo;{p.quote.text}&rdquo;
                  <cite className="caption">{p.quote.name}, {p.quote.role}</cite>
                </blockquote>
              </article>
            ))}
          </div>
          <Cta />
        </section>

        <section className="gl-section gl-has-bg">
          <Backdrop still="/greenline/bg-light-lines.jpg" wash="linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.82))" />
          <p className="gl-eyebrow eyebrow">How it works</p>
          <h2 className="gl-heading display-lg">Start free. Go deeper if it fits.</h2>
          <div className="gl-steps gl-gap-top">
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 1 · Free · 2 minutes</p>
              <h3 className="display-sm">Your free AI report</h3>
              <p className="body">Pop in your email and website. You get 3 places AI could grow your profit, on screen and by email.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 2 · Free · 2 a month</p>
              <h3 className="display-sm">The full AI Opportunity Report</h3>
              <p className="body">If it&apos;s a fit: a quick call, a 45-minute audit of how your business runs, then your plan, walked through in person.</p>
            </div>
          </div>
          <div className="gl-faq gl-faq-top">
            <div className="gl-faq-item"><h3 className="title">Is it really free?</h3><p className="body-sm">Yes. The 2-minute report and the full AI Opportunity Report are both free. You only pay if you choose to have me build it.</p></div>
            <div className="gl-faq-item"><h3 className="title">Do I need to be techy?</h3><p className="body-sm">No. I build it and set it up. You and your team just use it.</p></div>
            <div className="gl-faq-item"><h3 className="title">What does a build cost?</h3><p className="body-sm">It depends on what&apos;s worth building. You get a clear quote after the audit, with the return it should bring.</p></div>
            <div className="gl-faq-item"><h3 className="title">Why only 2 audits a month?</h3><p className="body-sm">Each one takes real time. I pick the businesses that will get the most out of it.</p></div>
          </div>
        </section>

        <section className="gl-band gl-has-bg">
          <Backdrop still="/greenline/bg-dark-lines.jpg" video={MOTION.band}
                    wash="linear-gradient(rgba(10,15,13,.45), rgba(10,15,13,.6))" />
          <div>
            <p className="gl-eyebrow eyebrow">Your free AI Opportunity Report</p>
            <h2 className="gl-heading display-lg">See where AI can grow your profit.</h2>
            <p className="gl-lede lede">Two minutes, your website, three ideas specific to your business. Free.</p>
          </div>
          <ReportForm where="band" onStart={setStarted} />
        </section>
      </main>

      <footer className="gl-footer caption">
        <span>Greenline AI · with Ryan Alexander Black · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span>
        <span>greenlineai.nz</span>
      </footer>
    </div>
  );
}
