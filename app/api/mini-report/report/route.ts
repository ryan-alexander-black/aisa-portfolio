import { after } from "next/server";
import {
  VisibleError, cleanAnswers, cleanUtm, clientIp, rateLimited, verifyRead, writeReport,
} from "@/lib/mini-report/server";
import { fitOf } from "@/lib/mini-report/shared";
import { sendReportEmails } from "@/lib/mini-report/emails";

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
  try {
    const read = verifyRead(String(body.token || ""));
    if (rateLimited(`report-ip:${clientIp(request)}`, 8, 60 * 60 * 1000)) {
      throw new VisibleError("You've run a few reports already. Please try again later.", 429);
    }
    const answers = cleanAnswers(body.answers);
    const utm = cleanUtm(body.utm);
    const rep = await writeReport(read, answers);
    const fit = fitOf(answers);

    after(() =>
      sendReportEmails({ email: read.email, site: read.site, rep, answers, fit, utm, costUsd: rep.meta.cost_usd })
        .catch((e) => console.error("[mini-report] report emails failed", e)),
    );
    console.log(`[mini-report] report for ${read.business_name}: ${rep.meta.seconds.toFixed(1)}s, ~US$${rep.meta.cost_usd}, fit ${fit}`);
    return Response.json({ business_name: rep.business_name, opportunities: rep.opportunities, fit });
  } catch (e) {
    if (e instanceof VisibleError) return Response.json({ error: e.message }, { status: e.status });
    console.error("[mini-report] report failed", e);
    return Response.json({ error: "Something went wrong writing your report. Please try again." }, { status: 502 });
  }
}
