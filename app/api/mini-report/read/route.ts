import {
  EMAIL_RE, VisibleError, clientIp, normaliseSite, rateLimited, readSite, signRead, cleanStr,
} from "@/lib/mini-report/server";

// Step 1 of the mini-report: read the website and name the business. Starts the moment the visitor
// submits their email + website; the questions on screen 2 fill the wait.
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  // Honeypot: bots fill the hidden field. Pretend nothing happened.
  if (body.company_website) return Response.json({ error: "Please try again." }, { status: 400 });

  try {
    const email = cleanStr(body.email, 200).toLowerCase();
    if (!EMAIL_RE.test(email)) throw new VisibleError("Add your email and website to get started.");
    const site = normaliseSite(cleanStr(body.site, 300));

    const ip = clientIp(request);
    if (rateLimited(`read-ip:${ip}`, 6, 60 * 60 * 1000) || rateLimited(`read-email:${email}`, 4, 24 * 60 * 60 * 1000)) {
      throw new VisibleError("You've run a few reports already. Please try again later.", 429);
    }

    const read = await readSite(site, email);
    return Response.json({
      token: signRead(read),
      business_name: read.business_name,
      what_they_do: read.what_they_do,
    });
  } catch (e) {
    if (e instanceof VisibleError) return Response.json({ error: e.message }, { status: e.status });
    console.error("[mini-report] read failed", e);
    return Response.json({ error: "Something went wrong reading that website. Please try again." }, { status: 502 });
  }
}
