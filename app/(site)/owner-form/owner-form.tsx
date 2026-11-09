"use client";

import { useState } from "react";

type Field = {
  key: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "checkboxes";
  placeholder?: string;
  options?: readonly string[];
  optional?: boolean;
};

// The questions, in order. `key` matches the payload the route handler emails.
const FIELDS: readonly Field[] = [
  { key: "name", label: "Your name", type: "text" },
  { key: "email", label: "Email", type: "email", placeholder: "you@business.com" },
  { key: "business", label: "Business name & website", type: "text", placeholder: "Acme Co. — acme.com" },
  { key: "teamSize", label: "Team size", type: "select", options: ["Just me", "2–5", "6–15", "16–50", "50+"] },
  { key: "sells", label: "In one sentence, what does your business do or sell?", type: "textarea" },
  { key: "customer", label: "Who's your typical customer?", type: "text", placeholder: "one line is plenty" },
  {
    key: "findYou",
    label: "How do most customers find you? (tick all that apply)",
    type: "checkboxes",
    options: [
      "Referrals / word of mouth",
      "Google / SEO",
      "Social (organic)",
      "Paid ads",
      "Cold outreach",
      "Events / networking",
      "Other",
    ],
  },
  {
    key: "ownerTimeEaters",
    label: "As the owner, the top 2–3 tasks that eat the most of YOUR week",
    type: "textarea",
    placeholder: "The “I shouldn't be doing this myself” stuff.",
  },
  {
    key: "painAreas",
    label:
      "Across the business — marketing, sales, delivery, support/admin — where do things feel slowest, messiest, or most manual right now?",
    type: "textarea",
    placeholder: "Just point me at the rough areas — we'll dig into the detail on the call.",
  },
  {
    key: "magicWand",
    label: "Magic wand: if you got 10 hours of your week back instantly, what would you cut first?",
    type: "textarea",
  },
  {
    key: "aiTried",
    label: "Have you or your team tried any AI tools yet?",
    type: "select",
    options: ["No", "Tried but didn't stick", "Yes, a few regularly", "Pretty AI-savvy"],
  },
  {
    key: "success",
    label: "If this audit goes well, what would success look like for you?",
    type: "textarea",
    placeholder: "e.g. save 10 hrs/week · stop losing leads · get my weekends back · scale without hiring",
  },
  {
    key: "anythingSpecific",
    label: "Anything specific you'd like me to look at?",
    type: "textarea",
    optional: true,
    placeholder: "Anything at all — or just write N/A.",
  },
];

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-fg placeholder:text-fg-muted/60 outline-none transition-colors focus:border-green-brand/60 focus:ring-1 focus:ring-green-brand/40";

type Status = "idle" | "submitting" | "success" | "error";

export function OwnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload: Record<string, string> = {
      company_website: (fd.get("company_website") as string) ?? "",
    };
    for (const f of FIELDS) {
      payload[f.key] =
        f.type === "checkboxes"
          ? fd.getAll(f.key).join(", ")
          : ((fd.get(f.key) as string) ?? "").trim();
    }

    // A checkbox group can't use native `required` (it'd demand every box), so check it here.
    if (!payload.findYou) {
      setStatus("error");
      setError("Please tick at least one option for how customers find you.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/owner-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong sending the form.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-lg border border-green-brand/40 bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold tracking-tight">Got it — thank you!</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          Your answers are in — <strong className="text-fg">nothing else needed from you</strong>. You
          can close this window. I&apos;ll go through them before our call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {/* Honeypot — hidden from people, tempting to bots. If filled, we drop it server-side. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" tabIndex={-1}>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {FIELDS.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key} className="block text-sm font-medium text-fg">
            {field.label}
            {!field.optional && <span className="ml-1 text-accent">*</span>}
          </label>

          {field.type === "textarea" && (
            <textarea
              id={field.key}
              name={field.key}
              rows={3}
              required={!field.optional}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}

          {(field.type === "text" || field.type === "email") && (
            <input
              id={field.key}
              name={field.key}
              type={field.type}
              required={!field.optional}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}

          {field.type === "select" && (
            <select id={field.key} name={field.key} required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select…
              </option>
              {field.options!.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkboxes" && (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {field.options!.map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm text-fg-muted">
                  <input
                    type="checkbox"
                    name={field.key}
                    value={o}
                    className="h-4 w-4 rounded border-border text-green-brand focus:ring-green-brand/40"
                  />
                  {o}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {status === "error" && (
        <p className="text-sm text-red-500" role="alert">
          {error} You can also just email me at{" "}
          <a className="underline" href="mailto:ryanalexanderblack@gmail.com">
            ryanalexanderblack@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send it over →"}
      </button>
    </form>
  );
}
