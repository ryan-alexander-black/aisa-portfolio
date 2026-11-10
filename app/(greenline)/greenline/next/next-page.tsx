"use client";

// The Full AI Opportunity Report page (greenlineai.nz/next). It sells one thing: the application
// (then Ryan calls at the time they pick). Visitors who came from their snapshot carry its context in
// sessionStorage (set by the report flow): their email and website arrive pre-filled, so they only add a
// name, mobile and best time (Ryan, 10 Nov). Anyone else (an email link, a new device) fills all of it.
import { useEffect, useState, type FormEvent } from "react";
import { SNAPSHOT_KEY, type SnapshotContext } from "../../../(site)/ai-report/mini-report-flow";
import { getUtm, track } from "@/lib/track";
import { APPLY, Footer, Header } from "../chrome";
import { Backdrop, ImageSlot, type Proof } from "../greenline-page";

const WHEN = ["Morning", "Afternoon", "Evening"];
// Photos (see IMAGES in greenline-page.tsx): the business running well. GPT Image 2.5, 10 Nov.
const IMAGES: { hero?: string } = { hero: "/greenline/hero-team.jpg" };

function ApplyForm() {
  const [ctx, setCtx] = useState<SnapshotContext | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [when, setWhen] = useState("");
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SNAPSHOT_KEY);
      if (!raw) return;
      const c = JSON.parse(raw) as SnapshotContext;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the browser after mount
      setCtx(c);
      setEmail(c.email || "");
      setSite(c.site || "");
    } catch { /* no storage: they fill in the email + website themselves */ }
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    const st = site.trim();
    if (!name.trim() || mobile.replace(/\D/g, "").length < 7) { setErr("Add your name and mobile so I can call."); return; }
    if (em.indexOf("@") < 1 || !st) { setErr("Add your email and website too."); return; }
    setErr(""); setSending(true);
    try {
      const r = await fetch("/api/mini-report/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), mobile: mobile.trim(), when, email: em, site: st,
          business: ctx?.business || "", answers: ctx?.answers || {}, ideas: ctx?.ideas || [],
          utm: getUtm(), company_website: trap,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || `Something went wrong (${r.status}).`);
      track("audit_applied", { fit: ctx?.fit || "unknown" });
      setDone(true);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="gl-form" role="status">
        <h3 className="gl-form-title display-sm">✓ Application received</h3>
        <p className="gl-form-sub small">I&apos;ll call you within one business day to talk it through.</p>
      </div>
    );
  }
  return (
    <form className="gl-form" id="apply" onSubmit={submit} noValidate>
      <h3 className="gl-form-title display-sm">Apply for your Full AI Opportunity Report</h3>
      <p className="gl-form-sub small">
        {ctx?.business ? `For ${ctx.business}. ` : ""}I&apos;ll call you within one business day to talk it through.
      </p>
      <div className="gl-field">
        <label className="gl-label label" htmlFor="gl-name">Your name</label>
        <input className="gl-input body-sm" id="gl-name" type="text" autoComplete="name" value={name}
               onChange={(e) => { setName(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-field">
        <label className="gl-label label" htmlFor="gl-mobile">Mobile</label>
        <input className="gl-input body-sm" id="gl-mobile" type="tel" placeholder="021 …" autoComplete="tel" value={mobile}
               onChange={(e) => { setMobile(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-field">
        <label className="gl-label label" htmlFor="gl-apply-email">Your email</label>
        <input className="gl-input body-sm" id="gl-apply-email" type="email" placeholder="you@yourbusiness.co.nz"
               autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-field">
        <label className="gl-label label" htmlFor="gl-apply-site">Your website</label>
        <input className="gl-input body-sm" id="gl-apply-site" type="text" placeholder="yourbusiness.co.nz"
               autoComplete="url" value={site} onChange={(e) => { setSite(e.target.value); setErr(""); }} />
      </div>
      <fieldset className="gl-field gl-when">
        <legend className="gl-label label">Best time to call</legend>
        <div className="gl-when-row">
          {WHEN.map((w) => (
            <button type="button" key={w} className={`gl-chip small${when === w ? " is-on" : ""}`} aria-pressed={when === w}
                    onClick={() => setWhen(when === w ? "" : w)}>{w}</button>
          ))}
        </div>
      </fieldset>
      <div className="gl-trap" aria-hidden="true">
        <label htmlFor="gl-apply-cw">Company website</label>
        <input id="gl-apply-cw" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      {err && <p className="gl-field-error caption" role="alert">{err}</p>}
      <button className="gl-btn gl-btn-block button" type="submit" disabled={sending}>{sending ? "Sending…" : APPLY}</button>
      <p className="gl-fine fine">No obligation. <a href="/privacy">Privacy</a></p>
    </form>
  );
}

function Cta() {
  return <div className="gl-cta"><a className="gl-btn button" href="#apply">{APPLY}</a></div>;
}

export function NextPage({ proof }: { proof: Proof[] }) {
  return (
    <div className="gl-root">
      <Header home cta="#apply" label="Apply for the full report" />

      <main>
        <section className="gl-hero gl-has-bg">
          <Backdrop first still="/greenline/bg-light-lines.jpg"
                    wash="linear-gradient(180deg, rgba(255,255,255,.25), rgba(245,248,246,.45))" />
          <div className="gl-hero-copy">
            <p className="gl-eyebrow eyebrow">The Full AI Opportunity Report · completely free</p>
            <h1 className="display-xl">Turn your snapshot into a full plan to grow your profit.</h1>
            <p className="gl-lede lede">
              Your snapshot came from your website. The full report comes from how your business really runs. We spend 45
              minutes mapping the work from enquiry to invoice, then I hand you a plan: where AI could save the most time
              and money, and what to tackle first.
            </p>
          </div>
          <ApplyForm />
          <ImageSlot className="gl-hero-photo" src={IMAGES.hero} focus="50% 45%"
                     alt="A small team in a bright workshop office, smiling at a laptop showing a rising green chart"
                     label="The business running well: the owner and team at work, nothing piling up" />
        </section>

        <div className="gl-stats">
          <div className="gl-stat"><b className="display-sm">Completely free</b><span className="caption">no cost, no obligation</span></div>
          <div className="gl-stat"><b className="display-sm">45 minutes</b><span className="caption">the audit, in person or by video</span></div>
          <div className="gl-stat"><b className="display-sm">Your plan</b><span className="caption">walked through in person</span></div>
          <div className="gl-stat"><b className="display-sm">Limited</b><span className="caption">to 2 reports per month</span></div>
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
                <li>AI handles the simple, repeatable work</li>
                <li>The same team takes on more jobs</li>
                <li>Costs stay steady as sales grow</li>
                <li>Revenue goes up. Profit goes up with it</li>
              </ul>
            </div>
          </div>
          <div className="gl-line">
            <div>
              <h3 className="display-md">The green line is profit.</h3>
              <p className="gl-lede body gl-mt-2">Your report shows where AI could lift it in your business, and what to do first.</p>
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
        </section>

        <section className="gl-section gl-section-mist gl-has-bg">
          {/* A light wash so the workshop photo shows crisp; the heading sits on a frosted panel. */}
          <Backdrop still="/greenline/bg-workshop.jpg" wash="linear-gradient(rgba(245,248,246,.04), rgba(245,248,246,.1))" />
          <div className="gl-panel gl-panel-fit">
            <p className="gl-eyebrow eyebrow">How it works</p>
            <h2 className="gl-heading display-lg">Four steps, all free.</h2>
          </div>
          <div className="gl-steps gl-gap-top">
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 1 · a few minutes</p>
              <h3 className="display-sm">A quick call</h3>
              <p className="body">I ring to learn a little about your business and check it&apos;s a fit.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 2 · about 45 minutes</p>
              <h3 className="display-sm">The audit</h3>
              <p className="body">I come to you in Hawke&apos;s Bay and map how the work really flows: enquiries, quotes, jobs, admin, follow-ups. Video call if that&apos;s easier.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 3</p>
              <h3 className="display-sm">Your report</h3>
              <p className="body">I put together your plan: your biggest AI opportunities, in the order to tackle them.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">Step 4</p>
              <h3 className="display-sm">The walk-through</h3>
              <p className="body">I sit down with you and talk you through it. It&apos;s yours to keep: run with it yourself, or we can talk about working together on the AI solutions.</p>
            </div>
          </div>
          <Cta />
        </section>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">Real businesses, real results</p>
          <h2 className="gl-heading display-lg">Real results for businesses like yours.</h2>
          <div className="gl-proof gl-gap-top">
            {proof.map((p) => (
              <article className="gl-card" key={p.company}>
                <h3 className="gl-card-who title">{p.company}</h3>
                <p className="gl-card-meta caption">{p.industry}</p>
                {p.stats.length > 0 ? (
                  <dl className="gl-proof-stats">
                    {p.stats.map((s) => (
                      <div className="gl-proof-stat" key={s.stat}><dt className="display-md">{s.stat}</dt><dd className="body-sm">{s.label}</dd></div>
                    ))}
                  </dl>
                ) : (
                  <ul className="body-sm">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
                )}
                <blockquote className="gl-quote body-sm">
                  &ldquo;{p.quote.text}&rdquo;
                  <cite className="caption">{p.quote.name}, {p.quote.role}</cite>
                </blockquote>
              </article>
            ))}
          </div>
          <h2 className="gl-heading display-md gl-faq-head">FAQs</h2>
          <div className="gl-faq gl-faq-top">
            <div className="gl-faq-item"><h3 className="title">Is it really free?</h3><p className="body-sm">Yes. The snapshot and the Full AI Opportunity Report are both completely free, with no obligation.</p></div>
            <div className="gl-faq-item"><h3 className="title">Do I need to be techy?</h3><p className="body-sm">No. I guide you through how AI could fit your business.</p></div>
            <div className="gl-faq-item"><h3 className="title">Do I have to buy anything after?</h3><p className="body-sm">No. The report is yours to keep. If you&apos;d like to work together on it afterwards, I&apos;d be glad to talk.</p></div>
            <div className="gl-faq-item"><h3 className="title">Why only 2 reports a month?</h3><p className="body-sm">Each one takes real time. I pick the businesses that will get the most out of it.</p></div>
          </div>
        </section>

        <section className="gl-band gl-has-bg">
          <Backdrop still="/greenline/bg-dark-lines.jpg" wash="linear-gradient(rgba(10,15,13,.45), rgba(10,15,13,.6))" />
          <div>
            <p className="gl-eyebrow eyebrow">2 reports available each month</p>
            <h2 className="gl-heading display-lg">Let&apos;s find your biggest profit wins.</h2>
            <p className="gl-lede lede">I take on 2 full reports a month, so I pick the businesses that will get the most out of it. Add your name and mobile and I&apos;ll call you.</p>
          </div>
          <div><a className="gl-btn button" href="#apply">{APPLY}</a></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
