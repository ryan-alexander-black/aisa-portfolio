// Runs real AI Profit Snapshots on a list of businesses, with no emails and no MailerLite (quality checks only).
// Uses the same engine as the live site: readSite → writeReport (lib/mini-report/server.ts).
// Costs: ~2–3 Firecrawl credits + ~US$0.10 of Claude per business.
// Run: npx tsx --env-file=.env.local scripts/snapshot-samples.ts <cases.json> <out-dir>
//   cases.json = [{ "label": "...", "site": "...", "answers": { role, team, revenue, week_goes, enquiries, tools, admin_task } }]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readSite, writeReport } from "../lib/mini-report/server";
import { yearlyDollars, type Answers } from "../lib/mini-report/shared";

type Case = { label: string; site: string; answers: Answers };
const [casesPath, outDir] = process.argv.slice(2);
if (!casesPath || !outDir) throw new Error("usage: snapshot-samples.ts <cases.json> <out-dir>");
const cases = JSON.parse(readFileSync(casesPath, "utf8")) as Case[];
mkdirSync(outDir, { recursive: true });

async function one(c: Case): Promise<string> {
  try {
    const read = await readSite(c.site, "samples@greenlineai.nz");
    const rep = await writeReport(read, c.answers);
    const md = [
      `## ${c.label}: ${rep.business_name}`,
      `*${read.what_they_do}* · ${c.site} · ${rep.meta.seconds.toFixed(0)} s · ~US$${rep.meta.cost_usd} · ${read.pages.length} pages read`,
      `Answers: ${JSON.stringify(c.answers)}`,
      "",
      ...rep.opportunities.map((o, i) => [
        `**${i + 1}. ${o.title}** (${o.category})`,
        `- Today: ${o.today}`,
        `- With AI: ${o.with_ai}`,
        `- Profit: ${o.profit ?? "(none)"}`,
        `- Based on: ${o.evidence}`,
        `- ~${o.hours_low}–${o.hours_high} hrs/wk · ≈ ${yearlyDollars(o.hours_low)}–${yearlyDollars(o.hours_high)}/yr`,
      ].join("\n")),
    ].join("\n");
    writeFileSync(join(outDir, `${c.label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.json`),
      JSON.stringify({ case: c, what_they_do: read.what_they_do, report: rep }, null, 2));
    return md;
  } catch (e) {
    return `## ${c.label}: FAILED\n${c.site}\n${(e as Error).message}`;
  }
}

// Two at a time, to stay clear of Firecrawl's rate limit.
async function main() {
  const out: string[] = [];
  for (let i = 0; i < cases.length; i += 2) out.push(...(await Promise.all(cases.slice(i, i + 2).map(one))));
  writeFileSync(join(outDir, "samples.md"), `# AI Profit Snapshot samples\n\n${out.join("\n\n---\n\n")}\n`);
  console.log(out.join("\n\n---\n\n"));
}
main();
