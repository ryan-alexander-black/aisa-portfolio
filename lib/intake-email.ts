import { Resend } from "resend";
import type { NextRequest } from "next/server";

// Shared handler for the intake forms (operator + owner). Each route passes its
// own field labels and a "kind" used in the subject/heading; everything else —
// parsing, honeypot, validation, Resend send — is identical, so it lives here.

// Where submissions land. Once ryanalexanderblack.com is verified in Resend this
// can be the Gmail directly; override per environment if needed.
const TO = process.env.OPERATOR_FORM_TO || "ryanalexanderblack@gmail.com";

// Generic send-from identity on the verified domain. Any local-part on a verified
// domain works without separate verification, so `hello@` is reusable across forms.
// (This is a sending identity, not a mailbox; replies go to the submitter below.)
const FROM = process.env.MAIL_FROM || "Ryan Alexander Black — Audit Intake <hello@ryanalexanderblack.com>";

export async function handleIntake(
  request: NextRequest,
  { labels, kind }: { labels: Record<string, string>; kind: string },
): Promise<Response> {
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
    console.error("intake: RESEND_API_KEY is not set");
    return Response.json(
      { ok: false, error: "The form isn't configured to send yet." },
      { status: 500 },
    );
  }

  // Build the summary from whatever fields came through, in label order.
  const rows = Object.keys(labels)
    .filter((key) => data[key]?.trim())
    .map((key) => ({ label: labels[key], value: data[key].trim() }));

  const subject = `New ${kind} — ${data.name.trim()}`;
  const text = rows.map((r) => `${r.label}:\n${r.value}`).join("\n\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
    <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
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
      subject,
      text,
      html,
    });
    if (error) {
      console.error("intake: resend error", error);
      return Response.json({ ok: false, error: "Couldn't send the form." }, { status: 502 });
    }
  } catch (err) {
    console.error("intake: send threw", err);
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
