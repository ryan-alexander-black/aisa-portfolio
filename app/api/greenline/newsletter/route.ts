import type { NextRequest } from "next/server";
import { addToList } from "@/lib/mini-report/mailerlite";
import { cleanStr, cleanUtm } from "@/lib/mini-report/server";

// greenlineai.nz/newsletter → MailerLite group "Signal over Noise" (26 Nov). MailerLite's automation on that group
// sends the welcome; Monday's issue goes to this group and "Snapshot". The first name, the UTMs and the landing page
// are kept with the sign-up as the consent record (research/email-consent-rules-2026-11.md → "Applied").
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Something went wrong." }, { status: 400 });
  // The hidden field only a bot fills in: say yes, keep nothing.
  if (cleanStr(body.company_website)) return Response.json({ ok: true });

  const email = (cleanStr(body.email, 200) || "").toLowerCase();
  const name = cleanStr(body.name, 60);
  if (!name) return Response.json({ error: "Please add your first name." }, { status: 400 });
  if (!EMAIL.test(email)) return Response.json({ error: "That email doesn't look quite right." }, { status: 400 });

  const ok = await addToList({ email, name, group: "Signal over Noise", brand: "greenline", utm: cleanUtm(body.utm) });
  if (!ok) return Response.json({ error: "Something went wrong signing you up." }, { status: 502 });
  return Response.json({ ok: true });
}
