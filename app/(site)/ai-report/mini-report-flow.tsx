"use client";

// The mini-report flow: email + website → questions while the AI reads the site → the report →
// the application for the full AI Opportunity Report. A React port of the tested prototype
// (Nexus money-engine/instant-win/mockup-flow.html v5, design in flow-design.md).
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { getUtm, track } from "@/lib/track";
import { yearlyDollars, type Fit, type Opportunity } from "@/lib/mini-report/shared";

// ---------------------------------------------------------------- a live % meter
// Eases toward a target, creeps while waiting so the number keeps moving, and only reaches 100
// when the real work is done.
function useMeter(cap: number) {
  const [pct, setPct] = useState(0);
  const m = useRef({ p: 0, t: 0, done: false, timer: undefined as ReturnType<typeof setInterval> | undefined, onFull: null as null | (() => void) });
  const stop = useCallback(() => clearInterval(m.current.timer), []);
  const start = useCallback(() => {
    const s = m.current;
    clearInterval(s.timer);
    Object.assign(s, { p: 0, t: 0, done: false, onFull: null });
    s.timer = setInterval(() => {
      if (!s.done && s.p >= s.t - 1 && s.t < cap) s.t += 0.15;
      if (s.t > s.p) s.p = Math.min(s.t, s.p + Math.max(0.35, (s.t - s.p) * 0.08));
      const v = Math.floor(s.p);
      setPct(v);
      if (v >= 100) { clearInterval(s.timer); const cb = s.onFull; s.onFull = null; cb?.(); }
    }, 120);
  }, [cap]);
  const to = useCallback((t: number) => { m.current.t = Math.max(m.current.t, t); }, []);
  const finish = useCallback((cb: () => void) => { const s = m.current; s.done = true; s.onFull = cb; s.t = Math.max(s.t, 100); }, []);
  useEffect(() => () => clearInterval(m.current.timer), []);
  return { pct, start, to, finish, stop };
}

// ---------------------------------------------------------------- one illustration per idea type
const VIZ: Record<string, string> = {
  quotes: '<rect x="18" y="10" width="44" height="58" rx="6"/><path d="M27 26h26M27 36h26M27 46h16"/><circle cx="58" cy="60" r="11" fill="currentColor" fill-opacity=".18"/><path d="M53 60l4 4 7-8"/>',
  followups: '<rect x="10" y="22" width="48" height="34" rx="5"/><path d="M10 26l24 17 24-17"/><path d="M60 18a14 14 0 1 1-6 26"/><path d="M60 12v7h7"/>',
  scheduling: '<rect x="12" y="16" width="56" height="50" rx="6"/><path d="M12 30h56M26 10v12M54 10v12"/><path d="M24 42h8M36 42h8M48 42h8M24 54h8M36 54h8"/><circle cx="52" cy="54" r="5" fill="currentColor"/>',
  bookings: '<rect x="10" y="16" width="44" height="44" rx="6"/><path d="M10 28h44M22 10v10M42 10v10"/><circle cx="56" cy="54" r="14" fill="currentColor" fill-opacity=".14"/><path d="M56 46v8l6 4"/>',
  reporting: '<path d="M12 66h58"/><rect x="18" y="44" width="10" height="22" rx="2"/><rect x="34" y="32" width="10" height="34" rx="2"/><rect x="50" y="20" width="10" height="46" rx="2"/><path d="M16 34l16-10 14 6 20-16"/>',
  messages: '<path d="M10 18h40a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H26l-10 8v-8h-6a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z"/><path d="M60 34h6a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6h-2v8l-10-8H44a6 6 0 0 1-6-6v-2"/><path d="M18 30h24M18 38h16"/>',
  marketing: '<path d="M12 34v12h10l24 14V20L22 34z"/><path d="M22 46l4 16h8l-4-16"/><path d="M56 30a12 12 0 0 1 0 20M62 24a20 20 0 0 1 0 32"/>',
  ordering: '<path d="M14 26l26-12 26 12-26 12z"/><path d="M14 26v28l26 12 26-12V26M40 38v28"/><path d="M27 20l26 12"/>',
  paperwork: '<rect x="16" y="14" width="46" height="56" rx="6"/><rect x="28" y="8" width="22" height="12" rx="4"/><path d="M26 34l5 5 9-10M26 52l5 5 9-10M46 36h8M46 54h8"/>',
  other: '<path d="M18 66L40 16l22 50M25.5 50h29"/><circle cx="40" cy="16" r="6" fill="currentColor"/><circle cx="18" cy="66" r="6" fill="currentColor"/><circle cx="62" cy="66" r="6" fill="currentColor"/>',
};
function Viz({ cat }: { cat: string }) {
  return (
    <div className="viz" aria-hidden="true">
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
           strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: VIZ[cat] || VIZ.other }} />
    </div>
  );
}

// ---------------------------------------------------------------- the questions
type Group = { q: string; label: string; hint?: string; options: string[]; single?: boolean; max?: number; other?: string };
const GROUPS: Group[] = [
  { q: "role", label: "Your role", options: ["Owner", "Manager", "Other"], single: true, other: "Your role" },
  { q: "team", label: "Team size, including you", options: ["Just me", "2–5", "6–15", "16–50", "50+"], single: true },
  { q: "rev", label: "Roughly, yearly revenue", options: ["Under $250k", "$250k–$1M", "$1M–$5M", "$5M+", "Prefer not to say"], single: true },
  { q: "sinks", label: "Where does the week go?", hint: "pick up to 2", max: 2, other: "What else eats the week?",
    options: ["Quotes & admin", "Chasing leads", "Scheduling jobs", "Reporting & numbers", "Customer messages", "Marketing", "Other"] },
  { q: "enq", label: "How do new enquiries come in?", hint: "pick any", other: "Where else do enquiries come from?",
    options: ["Phone", "Email", "Website form", "Facebook / Instagram", "Walk-ins", "Referrals", "Other"] },
  { q: "tools", label: "What do you run the business on?", hint: "pick any", other: "What else do you use?",
    options: ["Xero", "MYOB", "Spreadsheets", "A job or booking system", "Google Workspace", "Microsoft 365", "Paper & whiteboard", "Other"] },
];

const poss = (n: string) => (/s$/i.test(n) ? `${n}’` : `${n}’s`);

async function api<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    // held = our side failed and Ryan has the visitor's details, so retrying won't help.
    throw Object.assign(new Error(j.error || `Something went wrong (${r.status}).`), { held: !!j.held });
  }
  return j as T;
}

type ReadResult = { token: string; business_name: string; what_they_do: string };
type ReportResult = { business_name: string; opportunities: Opportunity[]; fit: Fit };

/** The first-step check, shared by any page that collects the email + website itself. */
export function startError(email: string, site: string): string {
  return !email.trim() || !site.trim() || email.indexOf("@") < 1 ? "Add your email and website to get started." : "";
}

/** `initial`: another page already took the email + website, so the flow starts the read at once
 *  (skipping its own first screen). `onRestart`: where "start again" goes instead of screen 1. */
export type MiniReportStart = { email: string; site: string; trap?: string };
type FlowProps = { initial?: MiniReportStart; onRestart?: () => void };

export function MiniReportFlow({ initial, onRestart }: FlowProps = {}) {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState(initial?.email ?? "");
  const [site, setSite] = useState(initial?.site ?? "");
  const [trap, setTrap] = useState(initial?.trap ?? "");
  const [err1, setErr1] = useState("");

  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [task, setTask] = useState("");

  const readP = useRef<Promise<ReadResult> | null>(null);
  const [read, setRead] = useState<ReadResult | null>(null);
  const [readErr, setReadErr] = useState("");
  const [ready, setReady] = useState(false);
  const chosen = useRef(false);
  const meter2 = useMeter(88);

  const meter3 = useMeter(94);
  const [rep, setRep] = useState<ReportResult | null>(null);
  const [repErr, setRepErr] = useState("");
  const [held, setHeld] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [err3, setErr3] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const host = site.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "");
  const biz = rep?.business_name || read?.business_name || "your business";

  const go = (n: 1 | 2 | 3) => { setScreen(n); window.scrollTo(0, 0); };

  const tap = (g: Group, opt: string) => {
    setPicked((p) => {
      const cur = p[g.q] || [];
      let next: string[];
      if (g.single) next = cur.includes(opt) ? [] : [opt];
      else if (cur.includes(opt)) next = cur.filter((x) => x !== opt);
      else if (cur.length < (g.max || 99)) next = [...cur, opt];
      else next = cur;
      return { ...p, [g.q]: next };
    });
  };

  const collect = () => {
    const other = (q: string) => ((picked[q] || []).includes("Other") ? (others[q] || "").trim() : "");
    return {
      role: (picked.role || [])[0] || "", role_other: other("role"),
      team: (picked.team || [])[0] || "", revenue: (picked.rev || [])[0] || "",
      week_goes: picked.sinks || [], week_goes_other: other("sinks"),
      enquiries: picked.enq || [], enquiries_other: other("enq"),
      tools: picked.tools || [], tools_other: other("tools"),
      admin_task: task.trim(),
    };
  };

  // ---- Screen 1 → 2. The site read starts at once; the questions fill the wait.
  const begin = (em: string, st: string, tr: string) => {
    setErr1(""); setReadErr(""); setHeld(false); setRead(null); setReady(false); chosen.current = false;
    track("report_requested");
    const p = api<ReadResult>("/api/mini-report/read", { email: em, site: st, company_website: tr });
    readP.current = p;
    p.then((d) => {
      setRead(d);
      meter2.finish(() => { if (!chosen.current) setReady(true); });
    }).catch((err: Error & { held?: boolean }) => { meter2.stop(); setHeld(!!err.held); setReadErr(err.message); });
    go(2);
    meter2.start();
    meter2.to(30);
  };
  const start = (e: FormEvent) => {
    e.preventDefault();
    const bad = startError(email, site);
    if (bad) { setErr1(bad); return; }
    begin(email, site, trap);
  };
  // Handed the details by another page: start straight away, once (StrictMode runs effects twice in dev).
  const begun = useRef(false);
  useEffect(() => {
    if (!initial || begun.current) return;
    begun.current = true;
    begin(initial.email, initial.site, initial.trap ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Screen 2 → 3: a finalising screen while the report is written.
  const finish = async () => {
    if (chosen.current) return;
    chosen.current = true;
    meter2.stop();
    const answers = collect();
    go(3);
    setRepErr("");
    meter3.start();
    meter3.to(60);
    try {
      const d = await (readP.current || Promise.reject(new Error("Please start again.")));
      const r = await api<ReportResult>("/api/mini-report/report", { token: d.token, answers, utm: getUtm() });
      meter3.finish(() => setTimeout(() => { setRep(r); track("report_viewed", { fit: r.fit }); window.scrollTo(0, 0); }, 400));
    } catch (err) {
      meter3.stop();
      setHeld(!!(err as Error & { held?: boolean }).held);
      setRepErr((err as Error).message);
    }
  };

  const restart = () => {
    meter2.stop(); meter3.stop();
    setRead(null); setReadErr(""); setHeld(false); setReady(false); setRep(null); setRepErr(""); chosen.current = false;
    if (onRestart) { onRestart(); return; }
    go(1);
  };

  const apply = async () => {
    if (!name.trim() || !mobile.trim()) { setErr3("Add your name and mobile so Ryan can call."); return; }
    setErr3(""); setApplying(true);
    try {
      await api("/api/mini-report/apply", {
        name, mobile, when: (picked.when || [])[0] || "", email, site, business: biz,
        answers: collect(), ideas: (rep?.opportunities || []).map((o) => o.title), utm: getUtm(), company_website: trap,
      });
      track("audit_applied", { fit: rep?.fit || "unknown" });
      setApplied(true);
    } catch (err) {
      setErr3((err as Error).message);
    } finally {
      setApplying(false);
    }
  };

  // ---- derived display state
  const stage2 = ready ? 3 : read ? 2 : meter2.pct >= 30 ? 1 : 0;
  const cls = (i: number, at: number) => (i < at ? "done" : i === at ? "now" : "");
  const p3 = meter3.pct;
  const stage3 = p3 >= 100 ? 4 : p3 >= 70 ? 3 : p3 >= 45 ? 2 : p3 >= 15 ? 1 : 0;
  const lo = rep ? rep.opportunities.reduce((s, o) => s + o.hours_low, 0) : 0;
  const hi = rep ? rep.opportunities.reduce((s, o) => s + o.hours_high, 0) : 0;

  return (
    <div className="mr">
      <div className="steps">{[1, 2, 3].map((n) => <i key={n} className={n <= screen ? "on" : ""} />)}</div>

      {screen === 1 && (
        <section className="card">
          <div className="eyebrow">Free · for Hawke&apos;s Bay businesses</div>
          <h2>Find 3 places AI could save your business time and money <span className="soft-h">(and admin headaches)</span></h2>
          <p className="lede">Pop in your website. AI reads it and builds a short report for your business in about two minutes.</p>
          <form onSubmit={start} noValidate>
            <label className="f" htmlFor="mr-email">Your email</label>
            <input id="mr-email" type="email" placeholder="you@yourbusiness.co.nz" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="f" htmlFor="mr-site">Your website</label>
            <input id="mr-site" type="text" placeholder="yourbusiness.co.nz" autoComplete="url" value={site} onChange={(e) => setSite(e.target.value)} />
            <div className="trap" aria-hidden="true">
              <label htmlFor="mr-cw">Company website</label>
              <input id="mr-cw" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </div>
            {err1 && <div className="err">{err1}</div>}
            <button className="btn solid big" type="submit"><span>✦</span> Get my free AI report</button>
            <div className="fine">You&apos;ll get your report by email as soon as it&apos;s ready, plus the weekly business pulse: what&apos;s moving for NZ business, and how AI gives you the edge. Unsubscribe any time. <a href="/privacy">Privacy</a></div>
          </form>
        </section>
      )}

      {screen === 2 && (
        <section className={`card${ready ? " ready" : ""}`}>
          <div className="prog">
            <div className="top">
              <span className="pulse" />
              <span>{readErr ? readErr : ready ? `✦ Ready to write ${poss(biz)} report` : "✦ AI is working on your report"}</span>
              <span className="pct">{meter2.pct}%</span>
            </div>
            <div className="bar"><i style={{ width: `${meter2.pct}%` }} /></div>
            <div className="stages">
              <div className={cls(0, stage2)}>{read ? <>Read {host} <small>· found &quot;{read.business_name}&quot;</small></> : "Reading your website"}</div>
              <div className={cls(1, stage2)}>Working out what you do{read?.what_they_do ? <> <small>· {read.what_they_do}</small></> : null}</div>
              <div className={cls(2, stage2)}>Finding opportunities</div>
              <div className={cls(3, stage2)}>Writing your report</div>
            </div>
            {ready && <div className="readynote">Ready when you are. Answer as many as you like, then choose an option at the bottom.</div>}
            {readErr && !held && <button className="btn again" onClick={restart}>Try another website</button>}
          </div>
          <h2 style={{ fontSize: 21 }}>While AI works, make your report sharper</h2>
          <p className="lede">A few quick taps, about a minute. The more you add, the more specific your report. Skip anything you like.</p>

          <div className="q lead">
            <div className="ql">The one job you&apos;d hand to AI tomorrow <small>optional</small></div>
            <div className="why">This one makes the biggest difference. A few words in your own terms is plenty.</div>
            <textarea rows={2} placeholder="The admin job that eats your week" value={task} onChange={(e) => setTask(e.target.value)} maxLength={300} />
            <ul className="ex"><li>pricing quotes after a site visit</li><li>chasing insurers for approval</li><li>turning job notes into invoices</li></ul>
          </div>

          {GROUPS.map((g) => (
            <div className="q" key={g.q}>
              <div className="ql">{g.label} {g.hint && <small>{g.hint}</small>}</div>
              <div className="chips">
                {g.options.map((o) => (
                  <button type="button" key={o} className={`chip${(picked[g.q] || []).includes(o) ? " on" : ""}`} onClick={() => tap(g, o)}>{o}</button>
                ))}
              </div>
              {g.other && (picked[g.q] || []).includes("Other") && (
                <div className="otherbox">
                  <input type="text" placeholder={g.other} maxLength={200} value={others[g.q] || ""}
                         onChange={(e) => setOthers((s) => ({ ...s, [g.q]: e.target.value }))} />
                </div>
              )}
            </div>
          ))}

          <div className="row2">
            <button className="btn solid" onClick={finish} disabled={!!readErr}>✦ Add these to my report</button>
            <button className="btn outline" onClick={finish} disabled={!!readErr}>Send with what I&apos;ve given</button>
          </div>
          <div className="hint2">Every answer sharpens the report, but none are required. &quot;Send with what I&apos;ve given&quot; builds it from your website and whatever you&apos;ve answered so far.</div>
        </section>
      )}

      {screen === 3 && (
        <section className="card">
          {!rep ? (
            <div className="load3">
              <div className="rhead"><div className="eyebrow" style={{ margin: 0 }}>Your AI report</div><span className="badge">✦ AI at work</span></div>
              <h2>{repErr ? repErr : `Finalising ${poss(biz)} report`}</h2>
              {repErr ? (
                !held && <button className="btn again" onClick={restart}>Start again</button>
              ) : (
                <div className="prog" style={{ margin: "16px 0 0" }}>
                  <div className="top"><span className="pulse" /><span>✦ Nearly there, usually under a minute</span><span className="pct">{p3}%</span></div>
                  <div className="bar"><i style={{ width: `${p3}%` }} /></div>
                  <div className="stages">
                    <div className={cls(0, stage3)}>Reading your answers</div>
                    <div className={cls(1, stage3)}>Matching ideas to {biz}</div>
                    <div className={cls(2, stage3)}>Working out the time and money</div>
                    <div className={cls(3, stage3)}>Checking it reads right</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="rhead"><div className="eyebrow" style={{ margin: 0 }}>Your AI report</div><span className="badge">✦ written by AI</span></div>
              <h2>3 places AI could save {biz} time</h2>
              <p className="lede">Built from your website and your answers.</p>
              <div className="total">
                <div><b>~{lo}–{hi} hrs</b><span>a week back, all three together</span></div>
                <div><b>{yearlyDollars(lo)}–{yearlyDollars(hi)}</b><span>a year in admin time</span></div>
              </div>
              {rep.opportunities.map((d, i) => (
                <div className="opp" key={i}>
                  <div className="num">{i + 1}</div>
                  <div>
                    <h3>{d.title}</h3>
                    <p className="ln"><b>Today:</b> {d.today}</p>
                    <p className="ln"><b>With AI:</b> {d.with_ai}</p>
                    {d.evidence && <div className="ev">Based on: {d.evidence}</div>}
                    <div className="val"><span>~{d.hours_low}–{d.hours_high} hrs a week back</span><em>≈ {yearlyDollars(d.hours_low)}–{yearlyDollars(d.hours_high)} a year in admin time</em></div>
                  </div>
                  <Viz cat={d.category} />
                </div>
              ))}
              <div className="basis">Money figures assume a $75,000 a year salary (about $36 an hour). Every figure is a rough estimate, not a promise. The time back goes to the work that grows the business.</div>
              <div className="sent">📬 A copy is on its way to your inbox.</div>

              {rep.fit !== "low" ? (
                <div className="offer">
                  {!applied ? (
                    <div>
                      <div className="slots">Only 2 audits a month</div>
                      <h3>Free for the right Hawke&apos;s Bay businesses</h3>
                      <p>That was the 2-minute version, from your website and a few taps. The free <b style={{ color: "var(--text)" }}>AI Opportunity Report</b> goes much deeper, built around how {biz} really runs. Here&apos;s how it works:</p>
                      <ol className="steps4">
                        <li><span><b>A quick call.</b> Ryan rings to learn a little about the business and see if it&apos;s a fit. A few minutes, that&apos;s all.</span></li>
                        <li><span><b>The audit, about 45 minutes.</b> Ryan comes to you in Hawke&apos;s Bay and maps how your work really flows: quotes, jobs, admin, follow-ups. Video call if that&apos;s easier.</span></li>
                        <li><span><b>Your report.</b> Ryan goes away and builds your plan: your biggest AI opportunities, in the order to tackle them.</span></li>
                        <li><span><b>The walk-through.</b> Ryan sits down with you and takes you through it. It&apos;s yours to keep, whether you work with Ryan or run with it yourself.</span></li>
                      </ol>
                      <p className="free">Ryan only takes on 2 audits a month, so he picks the businesses that will get the most out of it. No obligation.</p>
                      <label className="f" htmlFor="mr-name">Your name</label>
                      <input id="mr-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                      <label className="f" htmlFor="mr-mob">Mobile</label>
                      <input id="mr-mob" type="tel" placeholder="021 …" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                      <div className="q" style={{ margin: "14px 0 0" }}>
                        <div className="ql">Best time to call</div>
                        <div className="chips">
                          {["Morning", "Afternoon", "Evening"].map((o) => (
                            <button type="button" key={o} className={`chip${(picked.when || []).includes(o) ? " on" : ""}`}
                                    onClick={() => tap({ q: "when", label: "", options: [], single: true }, o)}>{o}</button>
                          ))}
                        </div>
                      </div>
                      {err3 && <div className="err">{err3}</div>}
                      <button className="btn solid big" onClick={apply} disabled={applying}>{applying ? "Sending…" : "Apply for a free AI Opportunity Report"}</button>
                      <div className="fine">Ryan will call you within one business day to talk it through.</div>
                    </div>
                  ) : (
                    <div className="done">
                      <b>✓ Application received</b>
                      <span style={{ color: "var(--muted)" }}>Ryan will call you within one business day to talk it through.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="soft">
                  <h3>You&apos;re on the list for the weekly business pulse</h3>
                  <p>What&apos;s moving for NZ business, and how AI gives you the edge, once a week. If your team grows, reply to any email and we&apos;ll talk.</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
