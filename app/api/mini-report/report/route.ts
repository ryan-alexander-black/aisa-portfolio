import { after } from "next/server";
import {
  HELD_MESSAGE, VisibleError, cleanAnswers, cleanUtm, clientIp, rateLimited, verifyRead, writeReport,
  type SiteRead,
} from "@/lib/mini-report/server";
import { fitOf } from "@/lib/mini-report/shared";
import { sendReportEmails, sendServiceAlert } from "@/lib/mini-report/emails";
import { addToList } from "@/lib/mini-report/mailerlite";

// Step 2 of the mini-report: write the three-idea report from the signed site read + the answers.
// The emails (the visitor's copy, Ryan's lead alert) go out after the response, so the report
// shows without waiting on them.
export const maxDuration = 90;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  let lead: SiteRead | null = null;
  const brand = body.brand === "greenline" ? "greenline" : "site";
  try {
    const read = verifyRead(String(body.token || ""));
    lead = read;
    if (rateLimited(`report-ip:${clientIp(request)}`, 8, 60 * 60 * 1000)) {
      throw new VisibleError("You've run a few reports already. Please try again later.", 429);
    }
    const answers = cleanAnswers(body.answers);
    const utm = cleanUtm(body.utm);
    const rep = await writeReport(read, answers);
    const fit = fitOf(answers);

    after(() =>
      sendReportEmails({
        email: read.email, site: read.site, rep, answers, fit, utm, costUsd: rep.meta.cost_usd,
        brand,
      })
        .catch((e) => console.error("[mini-report] report emails failed", e)),
    );
    after(() => addToList({
      email: read.email, group: "Snapshot", brand, site: read.site, business: rep.business_name, answers, fit, utm,
    }));
    console.log(`[mini-report] report for ${read.business_name}: ${rep.meta.seconds.toFixed(1)}s, ~US$${rep.meta.cost_usd}, fit ${fit}`);
    return Response.json({ business_name: rep.business_name, opportunities: rep.opportunities, fit });
  } catch (e) {
    if (e instanceof VisibleError) return Response.json({ error: e.message }, { status: e.status });
    // Our side failed (the AI's spend limit, an outage): the visitor is still a lead, so alert Ryan.
    console.error("[mini-report] report failed", e);
    if (lead) {
      const { email, site } = lead;
      const detail = (e as Error).message || "unknown error";
      after(() => sendServiceAlert({ step: "report", email, site, detail })
        .catch((err) => console.error("[mini-report] service alert failed", err)));
      // Held, but still a lead: onto the list now; the report follows from Ryan.
      after(() => addToList({ email, group: "Snapshot", brand, site, business: lead?.business_name }));
    }
    return Response.json({ error: HELD_MESSAGE, held: true }, { status: 503 });
  }
}
