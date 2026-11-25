"use client";

import { useState } from "react";

// greenlineai.nz/owner-form: the questions a business owner answers before the Full AI Opportunity Report's
// audit (money-engine/flow/05-intake-form.md → the business-owner form). Same 12 questions as the portfolio's
// /owner-form, in the Greenline look; answers go to Ryan through /api/greenline/owner-form.

type Field = {
  key: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "chips";
  placeholder?: string;
  options?: readonly string[];
  optional?: boolean;
  autoComplete?: string;
};

// `key` matches the labels in app/api/greenline/owner-form/route.ts.
const FIELDS: readonly Field[] = [
  { key: "name", label: "Your name", type: "text", autoComplete: "name" },
  { key: "email", label: "Your email", type: "email", placeholder: "you@yourbusiness.co.nz", autoComplete: "email" },
  { key: "business", label: "Business name and website", type: "text", placeholder: "Your Business Ltd, yourbusiness.co.nz" },
  { key: "teamSize", label: "Team size", type: "select", options: ["Just me", "2–5", "6–15", "16–50", "50+"] },
  { key: "sells", label: "In one sentence, what does your business do or sell?", type: "textarea" },
  { key: "customer", label: "Who's your typical customer?", type: "text", placeholder: "One line is plenty" },
  {
    key: "findYou",
    label: "How do most customers find you? Pick all that apply.",
    type: "chips",
    options: ["Referrals / word of mouth", "Google", "Social media", "Paid ads", "Cold outreach", "Events / networking", "Other"],
  },
  {
    key: "ownerTimeEaters",
    label: "As the owner, which 2–3 tasks eat the most of your week?",
    type: "textarea",
    placeholder: "The \"I shouldn't be doing this myself\" stuff.",
  },
  {
    key: "painAreas",
    label: "Across the business (marketing, sales, the work itself, admin), where do things feel slowest, messiest or most manual?",
    type: "textarea",
    placeholder: "Just point me at the rough areas. We'll go into the detail together.",
  },
  { key: "magicWand", label: "Magic wand: if you got 10 hours of your week back, what would you stop doing first?", type: "textarea" },
  {
    key: "aiTried",
    label: "Have you or your team tried any AI tools yet?",
    type: "select",
    options: ["No", "Tried but it didn't stick", "Yes, a few regularly", "Pretty AI-savvy"],
  },
  {
    key: "success",
    label: "If this goes well, what would success look like for you?",
    type: "textarea",
    placeholder: "e.g. 10 hours a week back · no more lost enquiries · weekends back · grow without hiring",
  },
  { key: "anythingSpecific", label: "Anything specific you'd like me to look at?", type: "textarea", optional: true, placeholder: "Optional" },
];

export function OwnerForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [findYou, setFindYou] = useState<string[]>([]);
  const [trap, setTrap] = useState("");
  const [err, setErr] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: string, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErr("");
    setMissing((m) => m.filter((k) => k !== key));
  };
  const toggle = (o: string) => {
    setFindYou((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
    setMissing((m) => m.filter((k) => k !== "findYou"));
    setErr("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Record<string, string> = { company_website: trap };
    for (const f of FIELDS) payload[f.key] = f.type === "chips" ? findYou.join(", ") : (values[f.key] || "").trim();

    const gaps = FIELDS.filter((f) => !f.optional && !payload[f.key]).map((f) => f.key);
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) gaps.push("email");
    if (gaps.length) {
      setMissing(gaps);
      setErr(gaps.length === 1 ? "One answer still needs filling in (marked in red)." : `${gaps.length} answers still need filling in (marked in red).`);
      document.getElementById(`gl-of-${gaps[0]}`)?.focus();
      return;
    }

    setSending(true);
    setErr("");
    try {
      const res = await fetch("/api/greenline/owner-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong sending your answers.");
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e2) {
      setErr(`${(e2 as Error).message} You can also email your answers to ryan@greenlineai.nz.`);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const first = (values.name || "").trim().split(/\s+/)[0];
    return (
      <div className="gl-form gl-form-done gl-of-form" role="status">
        <span className="gl-done-tick" aria-hidden="true">✓</span>
        <h2 className="gl-form-title display-sm">Got it, thank you{first ? `, ${first}` : ""}</h2>
        <p className="gl-form-sub body">
          Your answers are in and there&apos;s nothing else you need to do. I&apos;ll read through them before we sit down.
        </p>
        <p className="gl-eyebrow eyebrow">What happens next</p>
        <ol className="gl-done-steps">
          <li><b>The audit.</b> We sit down and go through how the business runs, day to day.</li>
          <li><b>Your report.</b> Your biggest AI opportunities, in the order to tackle them.</li>
          <li><b>The walk-through.</b> I talk you through it. It&apos;s yours to keep.</li>
        </ol>
      </div>
    );
  }

  return (
    <form className="gl-form gl-of-form" onSubmit={submit} noValidate>
      {FIELDS.map((f) => {
        const id = `gl-of-${f.key}`;
        const bad = missing.includes(f.key);
        const label = (
          <>
            {f.label}
            {f.optional ? <span className="gl-of-opt"> (optional)</span> : null}
          </>
        );
        if (f.type === "chips") {
          return (
            <fieldset key={f.key} className="gl-field gl-when gl-of-field">
              <legend className="gl-label label">{label}</legend>
              <div className={`gl-when-row${bad ? " gl-of-bad" : ""}`}>
                {f.options!.map((o, i) => (
                  <button type="button" key={o} id={i === 0 ? id : undefined} className={`gl-chip small${findYou.includes(o) ? " is-on" : ""}`}
                          aria-pressed={findYou.includes(o)} onClick={() => toggle(o)}>{o}</button>
                ))}
              </div>
            </fieldset>
          );
        }
        return (
          <div key={f.key} className="gl-field gl-of-field">
            <label className="gl-label label" htmlFor={id}>{label}</label>
            {f.type === "textarea" ? (
              <textarea className="gl-input body-sm gl-of-text" id={id} rows={3} placeholder={f.placeholder} aria-invalid={bad || undefined}
                        value={values[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />
            ) : f.type === "select" ? (
              <select className="gl-input body-sm" id={id} aria-invalid={bad || undefined} value={values[f.key] || ""}
                      onChange={(e) => set(f.key, e.target.value)}>
                <option value="" disabled>Choose one</option>
                {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input className="gl-input body-sm" id={id} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete}
                     aria-invalid={bad || undefined} value={values[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />
            )}
          </div>
        );
      })}
      <div className="gl-trap" aria-hidden="true">
        <label htmlFor="gl-of-cw">Company website</label>
        <input id="gl-of-cw" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      {err && <p className="gl-field-error caption" role="alert">{err}</p>}
      <button className="gl-btn gl-btn-block button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send my answers"}</button>
      <p className="gl-fine fine">Your answers come straight to me and stay private.</p>
    </form>
  );
}
