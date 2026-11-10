// Emails for the mini-report, sent with Resend (the site's existing sender):
//   1. the visitor's copy of their AI Profit Snapshot ("A copy is on its way to your inbox")
//   2. an alert to Ryan for every snapshot (every snapshot is a lead)
//   3. an alert to Ryan for every application for the Full AI Opportunity Report
//   4. an alert to Ryan when the report engine fails on our side (the visitor is still a lead)
// With no RESEND_API_KEY (local dev) nothing is sent; each email is logged instead.
import { Resend } from "resend";
import { answersText } from "./prompts";
import { yearlyDollars, type Answers, type Fit, type Report } from "./shared";

const TO_RYAN = process.env.OPERATOR_FORM_TO || "ryanalexanderblack@gmail.com";
const FROM = process.env.MAIL_FROM || "Ryan Alexander Black <hello@ryanalexanderblack.com>";

export type Utm = Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content" | "gclid" | "fbclid" | "landing", string>>;

const esc = (s: string) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

async function send(msg: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[mini-report] email not sent (no RESEND_API_KEY): to=${msg.to} subject="${msg.subject}"`);
    return;
  }
  const { error } = await new Resend(key).emails.send({ from: FROM, ...msg });
  if (error) console.error("[mini-report] resend error", error);
}

function ideasHtml(rep: Report): string {
  return rep.opportunities.map((o, i) => `
    <div style="border:1px solid #E6EBE8;border-radius:12px;padding:14px 16px;margin:0 0 12px">
      <div style="font-weight:700;font-size:16px;margin:0 0 8px">${i + 1}. ${esc(o.title)}</div>
      <p style="margin:0 0 6px"><b>Today:</b> ${esc(o.today)}</p>
      <p style="margin:0 0 6px"><b>With AI:</b> ${esc(o.with_ai)}</p>
      <p style="margin:0 0 6px;color:#5C6B64;font-style:italic">Based on: ${esc(o.evidence)}</p>
      <p style="margin:0;color:#047857;font-weight:600">~${o.hours_low}–${o.hours_high} hrs a week back · ≈ ${yearlyDollars(o.hours_low)}–${yearlyDollars(o.hours_high)} a year in admin time</p>
    </div>`).join("");
}

function ideasText(rep: Report): string {
  return rep.opportunities.map((o, i) =>
    `${i + 1}. ${o.title}\nToday: ${o.today}\nWith AI: ${o.with_ai}\nBased on: ${o.evidence}\n` +
    `~${o.hours_low}–${o.hours_high} hrs a week back · ≈ ${yearlyDollars(o.hours_low)}–${yearlyDollars(o.hours_high)} a year`,
  ).join("\n\n");
}

function totals(rep: Report) {
  const lo = rep.opportunities.reduce((s, o) => s + o.hours_low, 0);
  const hi = rep.opportunities.reduce((s, o) => s + o.hours_high, 0);
  return { lo, hi, line: `~${lo}–${hi} hrs a week back, ≈ ${yearlyDollars(lo)}–${yearlyDollars(hi)} a year in admin time` };
}

const BASIS = "Money figures assume a $75,000 a year salary (about $36 an hour). Every figure is a rough estimate, not a promise.";
const utmText = (u: Utm) => Object.entries(u).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(" · ") || "(none)";

// Which front door the snapshot came through: Greenline AI (greenlineai.nz, whose good fits go on to
// /next) or the portfolio's /ai-report. It sets the next-step link, the list's name and the sign-off.
export type Brand = "greenline" | "site";

export async function sendReportEmails(ctx: {
  email: string; site: string; rep: Report; answers: Answers; fit: Fit; utm: Utm; costUsd: number; brand?: Brand;
}) {
  const { email, site, rep, answers, fit, utm } = ctx;
  const greenline = ctx.brand === "greenline";
  const t = totals(rep);
  const subject = `Your AI Profit Snapshot: 3 places AI could save ${rep.business_name} time`;

  // 1. The visitor's copy. Replies come straight to Ryan.
  const offer = fit === "low"
    ? (greenline
        ? `<p>You're on the list for Signal over Noise: what's working for NZ businesses each week, and one AI idea to grow your profit. If your team grows, reply to this email and we'll talk.</p>`
        : `<p>The weekly business pulse is on its way: what's moving for NZ business, and how AI gives you the edge. If your team grows, reply to this email and we'll talk.</p>`)
    : (greenline
        ? `<p>Your snapshot was the quick version. The free <b>Full AI Opportunity Report</b> goes much deeper: a quick call, a 45-minute audit, then your plan, walked through in person. I take on 2 a month. <a href="https://greenlineai.nz/next">See how it works and apply</a>, or just reply to this email.</p>`
        : `<p>That was the 2-minute version. The free <b>Full AI Opportunity Report</b> goes much deeper: a quick call, a 45-minute audit in Hawke's Bay, then your plan, walked through in person. Ryan only takes on 2 a month. <a href="https://www.ryanalexanderblack.com/ai-report">Apply on the site</a>, or just reply to this email.</p>`);
  const signText = greenline ? "Ryan Alexander Black · Greenline AI · greenlineai.nz" : "Ryan Alexander Black · ryanalexanderblack.com";
  const signHtml = greenline
    ? `Ryan Alexander Black<br>Greenline AI · <a href="https://greenlineai.nz">greenlineai.nz</a>`
    : `Ryan Alexander Black<br><a href="https://www.ryanalexanderblack.com">ryanalexanderblack.com</a>`;
  await send({
    to: email,
    replyTo: TO_RYAN,
    subject,
    text: `${subject}\n\n${t.line}\n\n${ideasText(rep)}\n\n${BASIS}\n\n${signText}`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0A0F0D;max-width:600px">
      <h2 style="margin:0 0 6px">${esc(subject)}</h2>
      <p style="margin:0 0 16px;color:#5C6B64">Built from your website and your answers. ✦ Written by AI.</p>
      <p style="margin:0 0 16px;font-weight:600">${esc(t.line)}</p>
      ${ideasHtml(rep)}
      <p style="font-size:12px;color:#5C6B64">${BASIS}</p>
      ${offer}
      <p style="margin-top:20px">${signHtml}</p>
    </div>`,
  });

  // 2. Ryan's lead alert.
  await send({
    to: TO_RYAN,
    replyTo: email,
    subject: `Snapshot${greenline ? " (Greenline)" : ""}: ${rep.business_name} (fit: ${fit})`,
    text: `${email} · ${site}\nFit: ${fit}\nUTM: ${utmText(utm)}\nAI cost: ~US$${ctx.costUsd}\n\n${answersText(answers)}\n\n${t.line}\n\n${ideasText(rep)}`,
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.55;color:#111;max-width:640px">
      <h2 style="margin:0 0 10px">Snapshot: ${esc(rep.business_name)} <span style="color:#047857">(fit: ${fit})</span></h2>
      <p style="margin:0 0 4px"><b>Email:</b> ${esc(email)} · <b>Site:</b> ${esc(site)}</p>
      <p style="margin:0 0 4px"><b>Source:</b> ${esc(utmText(utm))}</p>
      <p style="margin:0 0 12px;color:#5C6B64">AI cost ~US$${ctx.costUsd}</p>
      <pre style="white-space:pre-wrap;font:inherit;background:#F5F8F6;padding:10px 12px;border-radius:8px">${esc(answersText(answers))}</pre>
      <p style="font-weight:600">${esc(t.line)}</p>
      ${ideasHtml(rep)}
    </div>`,
  });
}

export async function sendServiceAlert(ctx: { step: "read" | "report"; email: string; site: string; detail: string }) {
  const { step, email, site, detail } = ctx;
  const lines = [
    `Step: ${step === "read" ? "reading their website" : "writing their report"}`,
    `Cause: ${detail}`,
    `Email: ${email}`,
    `Site: ${site}`,
    "",
    "They were told: their details are with you, and you'll email their report once it's back up.",
    "The fix: sort the cause (top up Firecrawl credits, or check the Anthropic key's spend limit), then run their " +
      "website on ryanalexanderblack.com/ai-report with their email, so the report goes straight to them.",
  ];
  await send({
    to: TO_RYAN,
    replyTo: email,
    subject: `⚠ Mini-report down: ${site} didn't get a report`,
    text: lines.join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.55;color:#111;max-width:640px">
      <h2 style="margin:0 0 10px;color:#B42318">⚠ Mini-report down: ${esc(site)}</h2>
      <pre style="white-space:pre-wrap;font:inherit;background:#FEF3F2;padding:10px 12px;border-radius:8px">${esc(lines.join("\n"))}</pre>
    </div>`,
  });
}

export async function sendApplication(ctx: {
  name: string; mobile: string; when: string; email: string; site: string; business: string;
  fit: Fit; answers: Answers; ideas: string[]; utm: Utm;
}) {
  const { name, mobile, when, email, site, business, fit, answers, ideas, utm } = ctx;
  const lines = [
    `Name: ${name}`, `Mobile: ${mobile}`, `Best time to call: ${when || "(not given)"}`,
    `Email: ${email}`, `Business: ${business} · ${site}`, `Fit: ${fit}`, `Source: ${utmText(utm)}`,
    "", answersText(answers), "", "Their 3 ideas:", ...ideas.map((t, i) => `${i + 1}. ${t}`),
  ];
  await send({
    to: TO_RYAN,
    replyTo: email,
    subject: `Full AI Opportunity Report application: ${business} (${name})`,
    text: lines.join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.55;color:#111;max-width:640px">
      <h2 style="margin:0 0 10px">Application: ${esc(business)} <span style="color:#047857">(fit: ${fit})</span></h2>
      <p style="margin:0 0 12px">Call within one business day.</p>
      <pre style="white-space:pre-wrap;font:inherit;background:#F5F8F6;padding:10px 12px;border-radius:8px">${esc(lines.join("\n"))}</pre>
    </div>`,
  });
}
