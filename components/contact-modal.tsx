"use client";

import { useEffect, useRef, useState } from "react";

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-fg placeholder:text-fg-muted/60 outline-none transition-colors focus:border-green-brand/60 focus:ring-1 focus:ring-green-brand/40";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset form state when modal opens
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,15,13,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-heading"
        className="glass-card w-full max-w-lg rounded-2xl border border-border p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-1 font-display text-2xl font-extrabold tracking-tight"
            >
              Send me a message
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 rounded-md p-1 text-fg-muted transition-colors hover:text-fg"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="rounded-lg border border-green-brand/40 bg-surface p-6 text-center">
            <p className="font-display text-lg font-bold tracking-tight">Message sent!</p>
            <p className="mt-1 text-sm text-fg-muted">
              I&apos;ll get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-md bg-accent-solid px-5 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" tabIndex={-1}>
              <label>
                Company website
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-fg">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoFocus
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-fg">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-fg">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className={inputClass}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                {error} You can also email me at{" "}
                <a className="underline" href="mailto:ryanalexanderblack@gmail.com">
                  ryanalexanderblack@gmail.com
                </a>
                .
              </p>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send →"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
