// Server-side engine for the mini-report: reads a business's website with Firecrawl, names it,
// and writes the three-idea report with Claude. Ported from the tested Nexus prototype
// (money-engine/instant-win/prototype/server.py). Runs only in route handlers (Node runtime).
import { createHmac, timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { NAME_SCHEMA, NAME_SYSTEM, REPORT_SCHEMA, REPORT_SYSTEM, answersText } from "./prompts";
import type { Answers, Report } from "./shared";

export const MODEL = "claude-opus-5-5";
const PRICE_IN = 4.0, PRICE_OUT = 20.0; // US$ per 1M tokens, Opus 5.5 (claude-api skill table, cached 2026-10-06)
const FIRECRAWL = "https://api.firecrawl.dev/v2/scrape";
const EXTRA_PAGE_HINTS = ["about", "service", "what-we-do", "our-work", "work", "solutions", "products", "team"];
const MAX_PAGE_CHARS = 14000;
const TOKEN_TTL_MS = 60 * 60 * 1000; // a site read stays valid for an hour

/** An error whose message is safe to show the visitor. */
export class VisibleError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

// ------------------------------------------------------------------ the website
export function normaliseSite(raw: string): string {
  const s = raw.trim();
  if (!s || s.length > 300) throw new VisibleError("Add your website to get started.");
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
  } catch {
    throw new VisibleError("That website address doesn't look right.");
  }
  const host = url.hostname.toLowerCase();
  const isIp = /^[\d.]+$/.test(host) || host.includes(":");
  if (!["http:", "https:"].includes(url.protocol) || !host.includes(".") || isIp ||
      host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new VisibleError("That website address doesn't look right.");
  }
  return url.toString();
}

type Page = { url: string; title: string; markdown: string };

async function scrape(url: string, links = false): Promise<Page & { links: string[]; finalUrl: string }> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) throw new Error("FIRECRAWL_API_KEY is not set");
  const r = await fetch(FIRECRAWL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, formats: links ? ["markdown", "links"] : ["markdown"], onlyMainContent: true }),
    signal: AbortSignal.timeout(45_000),
  });
  if (!r.ok) throw new Error(`Firecrawl ${r.status}`);
  const data = ((await r.json()) as { data?: Record<string, unknown> }).data || {};
  const meta = (data.metadata || {}) as Record<string, string>;
  return {
    url,
    title: meta.title || "",
    markdown: String(data.markdown || "").slice(0, MAX_PAGE_CHARS),
    links: (data.links as string[]) || [],
    finalUrl: meta.url || url,
  };
}

function pickExtraPages(home: string, links: string[], n = 2): string[] {
  const base = new URL(home).hostname.replace(/^www\./, "");
  const seen = new Set<string>();
  const out: string[] = [];
  for (const href of links) {
    let u: URL;
    try { u = new URL(href, home); } catch { continue; }
    u.hash = "";
    const s = u.toString().replace(/\/$/, "");
    if (u.hostname.replace(/^www\./, "") !== base || !u.pathname.replace(/\//g, "") || seen.has(s)) continue;
    seen.add(s);
    if (EXTRA_PAGE_HINTS.some((h) => u.pathname.toLowerCase().includes(h))) out.push(s);
    if (out.length >= n) break;
  }
  return out;
}

// ------------------------------------------------------------------ Claude
let client: Anthropic | null = null;
const anthropic = () => (client ??= new Anthropic());

function cost(u: { input_tokens: number; output_tokens: number }): number {
  return (u.input_tokens * PRICE_IN + u.output_tokens * PRICE_OUT) / 1_000_000;
}

/** One structured-output call. Server-side fallback is on (claude-api skill default for Opus 5.5):
 *  if a safety classifier declines, the API re-runs the request on the recommended fallback model. */
async function claudeJson<T>(system: string, user: string, schema: Record<string, unknown>,
                             effort: "low" | "medium", maxTokens = 16000) {
  const resp = await anthropic().beta.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
    output_config: { effort, format: { type: "json_schema", schema } },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  });
  if (resp.stop_reason === "refusal") throw new VisibleError("The AI couldn't write a report for this one.", 422);
  const text = resp.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("No text in the AI's reply");
  return { data: JSON.parse(text.text) as T, cost: cost(resp.usage) };
}

// ------------------------------------------------------------------ read + report
export type SiteRead = {
  site: string; email: string; business_name: string; what_they_do: string;
  pages: Page[]; read_cost: number; read_seconds: number; iat: number;
};

export async function readSite(site: string, email: string): Promise<SiteRead> {
  const t0 = Date.now();
  const home = await scrape(site, true).catch(() => {
    throw new VisibleError("Couldn't read that website. Check the address and try again.", 422);
  });
  // The site must load before any AI runs (the guard against junk addresses).
  if (home.markdown.trim().length < 80) {
    throw new VisibleError("Couldn't read enough of that website to write a report.", 422);
  }
  const extraUrls = pickExtraPages(home.finalUrl, home.links);
  const extra = (await Promise.allSettled(extraUrls.map((u) => scrape(u))))
    .flatMap((r) => (r.status === "fulfilled" && r.value.markdown.trim() ? [r.value] : []));
  const pages: Page[] = [home, ...extra].map(({ url, title, markdown }) => ({ url, title, markdown }));
  const { data: named, cost: c } = await claudeJson<{ business_name: string; what_they_do: string }>(
    NAME_SYSTEM,
    `Page title: ${home.title}\n\n<homepage>\n${home.markdown.slice(0, 6000)}\n</homepage>`,
    NAME_SCHEMA, "low", 2000,
  );
  return {
    site, email, business_name: named.business_name, what_they_do: named.what_they_do, pages,
    read_cost: c, read_seconds: (Date.now() - t0) / 1000, iat: Date.now(),
  };
}

export type ReportMeta = { model: string; seconds: number; cost_usd: number; pages: number };

export async function writeReport(read: SiteRead, answers: Answers): Promise<Report & { meta: ReportMeta }> {
  const t0 = Date.now();
  const siteText = read.pages.map((p) => `<page url="${p.url}">\n${p.markdown}\n</page>`).join("\n\n");
  const user = `Business: ${read.business_name} (${read.what_they_do})\n\n` +
    `<their_answers>\n${answersText(answers)}\n</their_answers>\n\n` +
    `<their_website>\n${siteText}\n</their_website>\n\nWrite the report.`;
  const { data: rep, cost: c } = await claudeJson<Report>(REPORT_SYSTEM, user, REPORT_SCHEMA, "medium");
  rep.opportunities = rep.opportunities.slice(0, 3).map((o) => {   // guard the numbers the page multiplies
    const lo = Math.max(1, Math.min(Math.trunc(Number(o.hours_low)) || 1, 8));
    return { ...o, hours_low: lo, hours_high: Math.max(lo, Math.min(Math.trunc(Number(o.hours_high)) || lo, 8)) };
  });
  return {
    ...rep,
    meta: { model: MODEL, seconds: (Date.now() - t0) / 1000, cost_usd: +(c + read.read_cost).toFixed(3), pages: read.pages.length },
  };
}

// ------------------------------------------------------------------ the signed hand-off
// The site read happens first (while the visitor answers questions), then the report. Serverless
// functions share no memory, so the read travels back via the browser, signed so it can't be altered.
function secret(): string {
  const s = process.env.MINI_REPORT_SECRET;
  if (!s || s.length < 32) throw new Error("MINI_REPORT_SECRET is not set (32+ characters)");
  return s;
}

export function signRead(read: SiteRead): string {
  const body = Buffer.from(JSON.stringify(read)).toString("base64url");
  return `${body}.${createHmac("sha256", secret()).update(body).digest("base64url")}`;
}

export function verifyRead(token: string): SiteRead {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) throw new VisibleError("Please start again.");
  const want = createHmac("sha256", secret()).update(body).digest();
  const got = Buffer.from(sig, "base64url");
  if (got.length !== want.length || !timingSafeEqual(got, want)) throw new VisibleError("Please start again.");
  const read = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SiteRead;
  if (Date.now() - read.iat > TOKEN_TTL_MS) throw new VisibleError("That took a while, so please start again.");
  return read;
}

// ------------------------------------------------------------------ guards
// Best effort only: each serverless instance keeps its own counts. The hard stop on spend is the
// Anthropic workspace spend limit on the site's own key. Swap for a shared store before ads run.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// What the browser sends is untrusted: keep only known fields, as short strings.
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const strs = (v: unknown) => (Array.isArray(v) ? v.slice(0, 10).map((x) => str(x, 60)).filter(Boolean) : []);

export function cleanAnswers(v: unknown): Answers {
  const a = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  return {
    role: str(a.role, 40), role_other: str(a.role_other),
    team: str(a.team, 20), revenue: str(a.revenue, 30),
    week_goes: strs(a.week_goes), week_goes_other: str(a.week_goes_other),
    enquiries: strs(a.enquiries), enquiries_other: str(a.enquiries_other),
    tools: strs(a.tools), tools_other: str(a.tools_other),
    admin_task: str(a.admin_task, 300),
  };
}

export function cleanUtm(v: unknown): Record<string, string> {
  const a = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "landing"];
  return Object.fromEntries(keys.map((k) => [k, str(a[k], 200)]).filter(([, val]) => val));
}

export { str as cleanStr };
