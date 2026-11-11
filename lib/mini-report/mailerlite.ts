// The email list (MailerLite, Ryan 10 Nov): every snapshot joins the "Snapshot" group, every application the
// "Applied" group, with the UTM source and the answers as fields. No welcome email is sent from here — the
// automations live in MailerLite (the free plan's API can't send). Failures are logged, never shown to the visitor.
// Docs: developers.mailerlite.com (subscribers / fields / groups), checked 11 Nov 2026.
import type { Answers, Fit } from "./shared";

const BASE = "https://connect.mailerlite.com/api";
const token = () => process.env.MAILERLITE_API_KEY || process.env.mailer_lite_api || "";

async function ml<T = unknown>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    method: init?.method ?? "GET",
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json", Accept: "application/json" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  });
  if (!r.ok) throw new Error(`MailerLite ${init?.method ?? "GET"} ${path} → ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return (r.status === 204 ? {} : await r.json()) as T;
}

// Custom fields we keep on each subscriber (created on first use; MailerLite gives each a key).
const CUSTOM_FIELDS = [
  "Website", "Front door", "Fit", "Role", "Team size", "Revenue", "Time sinks",
  "UTM source", "UTM medium", "UTM campaign",
] as const;
type FieldName = (typeof CUSTOM_FIELDS)[number];

let fieldKeys: Partial<Record<FieldName, string>> | null = null;
const groupIds: Record<string, string> = {};

async function ensureFields(): Promise<Partial<Record<FieldName, string>>> {
  if (fieldKeys) return fieldKeys;
  const have = await ml<{ data: { name: string; key: string }[] }>("/fields?limit=100");
  const byName = new Map(have.data.map((f) => [f.name.toLowerCase(), f.key]));
  const keys: Partial<Record<FieldName, string>> = {};
  for (const name of CUSTOM_FIELDS) {
    let key = byName.get(name.toLowerCase());
    if (!key) key = (await ml<{ data: { key: string } }>("/fields", { method: "POST", body: { name, type: "text" } })).data.key;
    keys[name] = key;
  }
  fieldKeys = keys;
  return keys;
}

async function ensureGroup(name: string): Promise<string> {
  if (groupIds[name]) return groupIds[name];
  const found = await ml<{ data: { id: string; name: string }[] }>(`/groups?limit=100&filter[name]=${encodeURIComponent(name)}`);
  const exact = found.data.find((g) => g.name.toLowerCase() === name.toLowerCase());
  const id = exact?.id ?? (await ml<{ data: { id: string } }>("/groups", { method: "POST", body: { name } })).data.id;
  groupIds[name] = id;
  return id;
}

export async function addToList(ctx: {
  email: string; group: "Snapshot" | "Applied"; brand: "greenline" | "site";
  site?: string; business?: string; name?: string; phone?: string;
  answers?: Answers; fit?: Fit; utm?: Record<string, string>;
}): Promise<void> {
  if (!token()) {
    console.log(`[mini-report] MailerLite not configured: ${ctx.email} not added to ${ctx.group}`);
    return;
  }
  try {
    const [keys, groupId] = await Promise.all([ensureFields(), ensureGroup(ctx.group)]);
    const a = ctx.answers ?? {};
    const custom: Partial<Record<FieldName, string | undefined>> = {
      "Website": ctx.site,
      "Front door": ctx.brand === "greenline" ? "Greenline AI" : "ryanalexanderblack.com",
      "Fit": ctx.fit,
      "Role": a.role === "Other" ? a.role_other || "Other" : a.role,
      "Team size": a.team,
      "Revenue": a.revenue,
      "Time sinks": [...(a.week_goes ?? []), a.week_goes_other].filter(Boolean).join(", ") || undefined,
      "UTM source": ctx.utm?.utm_source,
      "UTM medium": ctx.utm?.utm_medium,
      "UTM campaign": ctx.utm?.utm_campaign,
    };
    const fields: Record<string, string> = {};
    for (const [name, value] of Object.entries(custom)) {
      const key = keys[name as FieldName];
      if (key && value) fields[key] = value.slice(0, 1000);
    }
    if (ctx.name) fields.name = ctx.name.slice(0, 100);
    if (ctx.business) fields.company = ctx.business.slice(0, 120);
    if (ctx.phone) fields.phone = ctx.phone.slice(0, 40);
    // Upsert: an existing subscriber keeps their other groups and fields.
    await ml("/subscribers", { method: "POST", body: { email: ctx.email, fields, groups: [groupId] } });
    console.log(`[mini-report] MailerLite: ${ctx.email} → ${ctx.group}`);
  } catch (e) {
    console.error("[mini-report] MailerLite add failed", e);
  }
}
