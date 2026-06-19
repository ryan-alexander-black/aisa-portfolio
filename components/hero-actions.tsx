"use client";

import { useState } from "react";
import { ContactModal } from "./contact-modal";

export function HeroActions() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#work"
          className="rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          See the work
        </a>
        <button
          onClick={() => setContactOpen(true)}
          className="glass-card rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
        >
          Get in touch
        </button>
        <a
          href="/Ryan-Alexander-Black-CV.pdf"
          target="_blank"
          rel="noopener"
          className="glass-card rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
        >
          Download CV
        </a>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
