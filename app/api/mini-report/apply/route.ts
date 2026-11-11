import {
  EMAIL_RE, cleanAnswers, cleanStr, cleanUtm, clientIp, rateLimited,
} from "@/lib/mini-report/server";
import { fitOf } from "@/lib/mini-report/shared";
import { after } from "next/server";
import { sendApplication } from "@/lib/mini-report/emails";
import { addToList } from "@/lib/mini-report/mailerlite";

// Step 3 (good fit or unknown): the application for the full, free AI Opportunity Report.
// Sends Ryan an alert to call within one business day.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body.company_website) return Response.json({ ok: true }); // honeypot

  const name = cleanStr(body.name, 100);
  const mobile = cleanStr(body.mobile, 40);
  if (!name || mobile.replace(/\D/g, "").length < 7) {
    return Response.json({ error: "Add your name and mobile so Ryan can call." }, { status: 400 });
  }
  const email = cleanStr(body.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return Response.json({ error: "Please start again." }, { status: 400 });
  if (rateLimited(`apply-ip:${clientIp(request)}`, 5, 60 * 60 * 1000)) {
    return Response.json({ error: "Please try again later." }, { status: 429 });
  }

  const answers = cleanAnswers(body.answers);
  const brand = body.brand === "greenline" ? "greenline" : "site";
  const utm = cleanUtm(body.utm);
  const site = cleanStr(body.site, 300);
  const business = cleanStr(body.business, 120);
  after(() => addToList({
    email, group: "Applied", brand, site, business: business || undefined, name, phone: mobile,
    answers, fit: fitOf(answers), utm,
  }));
  await sendApplication({
    name, mobile, email,
    when: cleanStr(body.when, 20),
    site: cleanStr(body.site, 300),
    business: cleanStr(body.business, 120) || "(unknown business)",
    fit: fitOf(answers),
    answers,
    ideas: Array.isArray(body.ideas) ? body.ideas.slice(0, 3).map((t) => cleanStr(t, 120)) : [],
    utm: cleanUtm(body.utm),
    brand: body.brand === "greenline" ? "greenline" : "site",
  });
  return Response.json({ ok: true });
}
