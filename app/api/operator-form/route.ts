import { Resend } from "resend";
import type { NextRequest } from "next/server";

// Human-readable labels for the email summary, in the order they appear on the form.
const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  role: "Role & organisation",
  involves: "What the role involves day to day",
  timeEaters: "Biggest time-eaters / most repetitive tasks",
  handOff: "One task they'd hand off tomorrow",
  tools: "Tools / software they use most",
  anythingSpecific: "Anything specific to look at",
};

// Where intake submissions land. Once ryanalexanderblack.com is verified in
// Resend this can be the Gmail directly; override per environment if needed.
const TO = process.env.OPERATOR_FORM_TO || "ryanalexanderblack@gmail.com";

// Generic send-from identity on the verified domain. Any local-part on a verified
// domain works without separate verification, so `hello@` is reusable for other
// functions later (app notifications, etc.) — vary only the display name per use.
// (This is a sending identity, not a mailbox; replies go to the submitter below.)
const FROM = process.env.MAIL_FROM || "Ryan Alexander Black — Operator Intake <hello@ryanalexanderblack.com>";

export async function POST(request: NextRequest) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't retry.
  if (data.company_website) {
    return Response.json({ ok: true });
  }

  if (!data.name?.trim() || !data.email?.trim()) {
    return Response.json(
      { ok: false, error: "Please include at least your name and email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("operator-form: RESEND_API_KEY is not set");
    return Response.json(
      { ok: false, error: "The form isn't configured to send yet." },
      { status: 500 },
    );
  }

  // Build the summary from whatever fields came through, in label order.
  const rows = Object.keys(LABELS)
    .filter((key) => data[key]?.trim())
    .map((key) => ({ label: LABELS[key], value: data[key].trim() }));

  const text = rows.map((r) => `${r.label}:\n${r.value}`).join("\n\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
    <h2 style="margin:0 0 16px">New operator intake — ${escapeHtml(data.name)}</h2>
    ${rows
      .map(
        (r) =>
          `<p style="margin:0 0 14px"><strong>${escapeHtml(r.label)}</strong><br>${escapeHtml(
            r.value,
          ).replace(/\n/g, "<br>")}</p>`,
      )
      .join("")}
  </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email.trim(),
      subject: `New operator intake — ${data.name.trim()}`,
      text,
      html,
    });
    if (error) {
      console.error("operator-form: resend error", error);
      return Response.json({ ok: false, error: "Couldn't send the form." }, { status: 502 });
    }
  } catch (err) {
    console.error("operator-form: send threw", err);
    return Response.json({ ok: false, error: "Couldn't send the form." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
