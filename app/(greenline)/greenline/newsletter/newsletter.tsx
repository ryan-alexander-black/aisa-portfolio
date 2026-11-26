"use client";

// The Signal over Noise opt-in (greenlineai.nz/newsletter). One job: get the first name and email. No snapshot pitch
// here; it's offered once in the welcome email (money-engine/greenline-cold-intro.md → the funnel order, Ryan 24 Nov).
// After sign-up the same URL shows the confirmation (no redirect), like the snapshot page.
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { getUtm, track } from "@/lib/track";
import { Footer, Header } from "../chrome";
import { Backdrop } from "../greenline-page";

const CTA = "Send me Signal over Noise";

function SignupForm({ where, full, onDone }: { where: string; full?: boolean; onDone: (name: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim(), em = email.trim();
    if (!n) { setErr("Please add your first name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { setErr("That email doesn't look quite right."); return; }
    setSending(true);
    setErr("");
    try {
      const res = await fetch("/api/greenline/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: em, company_website: trap, utm: getUtm() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong signing you up.");
      }
      track("newsletter_signup");
      onDone(n.split(/\s+/)[0]);
    } catch (e2) {
      setErr(`${(e2 as Error).message} Try again, or email ryan@greenlineai.nz and I'll add you.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="gl-form" id={where === "hero" ? "signup" : undefined} onSubmit={submit} noValidate>
      {full && (
        <>
          <h3 className="gl-form-title display-sm">Get Signal over Noise</h3>
          <p className="gl-form-sub small">Free, every Monday morning, from Ryan at Greenline AI.</p>
          <ul className="gl-form-ticks small">
            <li>The week just gone in New Zealand business and beyond, in plain words</li>
            <li>In the green, in the red: what&apos;s making and costing businesses money</li>
            <li>One AI idea you could use that week</li>
          </ul>
        </>
      )}
      <div className="gl-field">
        <label className="gl-label label" htmlFor={`gl-nl-name-${where}`}>First name</label>
        <input className="gl-input body-sm" id={`gl-nl-name-${where}`} type="text" placeholder="Your first name"
               autoComplete="given-name" value={name} onChange={(e) => { setName(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-field">
        <label className="gl-label label" htmlFor={`gl-nl-email-${where}`}>Email</label>
        <input className="gl-input body-sm" id={`gl-nl-email-${where}`} type="email" placeholder="you@yourbusiness.co.nz"
               autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
      </div>
      <div className="gl-trap" aria-hidden="true">
        <label htmlFor={`gl-nl-cw-${where}`}>Company website</label>
        <input id={`gl-nl-cw-${where}`} type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      {err && <p className="gl-field-error caption" role="alert">{err}</p>}
      <button className="gl-btn gl-btn-block button" type="submit" disabled={sending}>{sending ? "Signing you up…" : CTA}</button>
      <p className="gl-fine fine">
        {full
          ? "You'll get Signal over Noise every Monday, plus a short welcome from me now. Unsubscribe in one click, any time."
          : "Unsubscribe in one click, any time."}
      </p>
    </form>
  );
}

function Thanks({ name }: { name: string }) {
  return (
    <main className="gl-nl-thanks">
      <span className="gl-done-tick" aria-hidden="true">✓</span>
      <p className="gl-eyebrow eyebrow">You&apos;re in</p>
      <h1 className="display-lg">Thanks{name ? `, ${name}` : ""}. Keep an eye out for your first issue next week.</h1>
      <p className="gl-lede lede">A short welcome from me is on its way to your inbox now.</p>
      <div className="gl-card gl-nl-next">
        <p className="gl-eyebrow eyebrow">One small thing</p>
        <h2 className="display-sm">Make sure Monday&apos;s issue finds you.</h2>
        <p className="body">
          If the welcome isn&apos;t there in a few minutes, check your Promotions or spam folder. Then add
          ryan@greenlineai.nz to your contacts, so every issue lands where you&apos;ll see it.
        </p>
      </div>
    </main>
  );
}

export function NewsletterPage() {
  const [done, setDone] = useState<string | null>(null);
  const finish = (name: string) => { setDone(name); window.scrollTo(0, 0); };

  if (done !== null) {
    return (
      <div className="gl-root">
        <Header home cta={null} />
        <Thanks name={done} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="gl-root">
      <Header home cta="#signup" label="Get Signal over Noise" />
      <main>
        <section className="gl-hero gl-nl-hero gl-has-bg">
          <Backdrop first still="/greenline/bg-light-lines.jpg"
                    wash="linear-gradient(180deg, rgba(255,255,255,.25), rgba(245,248,246,.45))" />
          <div className="gl-hero-copy">
            <p className="gl-eyebrow eyebrow">Signal over Noise · free, every Monday</p>
            <h1 className="display-lg">Start your week knowing what&apos;s working for New Zealand businesses.</h1>
            <p className="gl-lede lede">
              A short email every Monday morning: the week just gone in New Zealand business and beyond, and one practical
              AI idea to grow your profit. A few minutes to read.
            </p>
          </div>
          <SignupForm where="hero" full onDone={finish} />
          <figure className="gl-nl-peek">
            <div className="gl-slot">
              <Image src="/greenline/signal-peek.jpg" alt="The top of a Signal over Noise issue" fill
                     sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: "50% 0%" }} />
            </div>
            <figcaption className="caption">The top of a real issue. Everything verified from reliable sources.</figcaption>
          </figure>
        </section>

        <section className="gl-section gl-on-band gl-nl-who-band">
          <div className="gl-nl-who">
            <div className="gl-nl-who-photo">
              <Image src="/ryan-headshot.png" alt="Ryan Alexander Black" fill sizes="180px" />
            </div>
            <div>
              <p className="gl-eyebrow eyebrow">Who writes it</p>
              <h2 className="gl-heading display-lg">Hey, I&apos;m Ryan.</h2>
              <p className="body gl-mt-2">
                I&apos;m based in Napier, New Zealand. My purpose is to help businesses grow their profit, using AI tools
                and real business knowledge. Signal over Noise is a completely free email every week. If you find it
                helpful, pop your details in to get it every Monday.
              </p>
            </div>
          </div>
        </section>

        <section className="gl-section">
          <p className="gl-eyebrow eyebrow">What&apos;s inside</p>
          <h2 className="gl-heading display-lg">The week that was, and what to do about it.</h2>
          <p className="gl-lede body gl-mt-2">
            You can&apos;t control the economy. You can control how well your business runs. Each issue gives you both
            sides, in four short parts.
          </p>
          <div className="gl-steps gl-nl-parts gl-gap-top">
            <div className="gl-step">
              <p className="gl-step-tag tag">01</p>
              <h3 className="display-sm">This week in NZ business, and beyond</h3>
              <p className="small">The week just gone, verified from reliable sources.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">02</p>
              <h3 className="display-sm">In the green, in the red</h3>
              <p className="small">Where businesses are making money, and where it&apos;s costing them.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">03</p>
              <h3 className="display-sm">By the numbers</h3>
              <p className="small">One chart: the week at a glance.</p>
            </div>
            <div className="gl-step">
              <p className="gl-step-tag tag">04</p>
              <h3 className="display-sm">This week&apos;s AI idea</h3>
              <p className="small">One practical idea to grow your profit, to try before Friday.</p>
            </div>
          </div>
        </section>

        <section className="gl-band gl-has-bg">
          <Backdrop still="/greenline/bg-dark-lines.jpg" wash="linear-gradient(rgba(10,15,13,.45), rgba(10,15,13,.6))" />
          <div>
            <p className="gl-eyebrow eyebrow">Free, every Monday</p>
            <h2 className="gl-heading display-lg">Get Signal over Noise, free every Monday.</h2>
            <p className="gl-lede lede">One email, a few minutes, one idea worth your time.</p>
          </div>
          <SignupForm where="band" onDone={finish} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
