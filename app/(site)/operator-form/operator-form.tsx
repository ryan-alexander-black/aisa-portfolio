"use client";

import { useState } from "react";

// The questions, in order. `key` matches the payload the route handler emails;
// `optional` drops the required flag. Textareas for anything open-ended.
const FIELDS = [
  { key: "name", label: "Your name", type: "text", placeholder: "" },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  {
    key: "role",
    label: "Your role & organisation",
    type: "text",
    placeholder: "e.g. Operations Manager at Acme Co.",
  },
  {
    key: "involves",
    label: "What does your role involve day to day?",
    type: "textarea",
    placeholder: "A sentence or two — the gist is plenty.",
  },
  {
    key: "timeEaters",
    label: "The 2–3 tasks that eat the most of your time or feel the most repetitive",
    type: "textarea",
    placeholder: "Just list them — no essays.",
  },
  {
    key: "handOff",
    label: "If you could hand off one task tomorrow, what would it be?",
    type: "textarea",
    placeholder: "",
  },
  {
    key: "tools",
    label: "What tools / software do you use most?",
    type: "text",
    placeholder: "email, spreadsheets, any specific platforms…",
  },
  {
    key: "anythingSpecific",
    label: "Anything specific you'd like me to look at?",
    type: "textarea",
    placeholder: "Anything at all — or just write N/A.",
  },
] as const;

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-fg placeholder:text-fg-muted/60 outline-none transition-colors focus:border-green-brand/60 focus:ring-1 focus:ring-green-brand/40";

type Status = "idle" | "submitting" | "success" | "error";

export function OperatorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/operator-form", {
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
            <span className="ml-1 text-accent">*</span>
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.key}
              name={field.key}
              rows={3}
              required
              placeholder={field.placeholder}
              className={inputClass}
            />
          ) : (
            <input
              id={field.key}
              name={field.key}
              type={field.type}
              required
              placeholder={field.placeholder}
              className={inputClass}
            />
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
