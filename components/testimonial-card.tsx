"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

// Deliberately distinct from ProjectCard: narrative + quote-led, no cover
// image, no tech chips. This is proof someone else trusted the work — it
// should read like a case-study citation, not another build. The build
// detail stays generic (no client-specific internals) and hides behind
// "See more" so the card itself stays lean.
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = useState(false);
  const {
    summary,
    quote,
    name,
    title,
    company,
    pills,
    whatWeBuilt,
    scopeNote,
    companyLogo,
    companyLogoAlt,
  } = testimonial;

  return (
    <div className="glass-card rounded-lg border border-amber-400/40 p-8 sm:p-10">
      {/* Header — company logo + who this is, set apart like a case-study byline */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 items-center rounded bg-white px-2">
          <Image
            src={companyLogo}
            alt={companyLogoAlt}
            width={72}
            height={28}
            className="h-6 w-auto object-contain"
          />
        </span>
        <p className="text-sm text-fg-muted">
          <span className="font-semibold text-fg">{name}</span> — {title}, {company}
        </p>
      </div>

      {/* The narrative — what we did, in plain English */}
      <p className="mt-6 text-base leading-relaxed text-fg-muted">{summary}</p>

      {/* The quote — set apart with a rule and generous space, quotes on both ends */}
      <blockquote className="mt-6 border-l-2 border-amber-400/50 pl-5">
        <p className="text-lg leading-relaxed text-fg sm:text-xl">
          <span className="text-amber-400">&ldquo;</span>
          {quote}
          <span className="text-amber-400">&rdquo;</span>
        </p>
      </blockquote>

      {/* Results — the headline stats */}
      <div className="mt-8 flex flex-wrap gap-2 border-t border-amber-400/20 pt-6">
        {pills.map((pill) => (
          <span
            key={pill}
            className="rounded border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 font-mono text-xs text-amber-400"
          >
            {pill}
          </span>
        ))}
      </div>

      {scopeNote && <p className="mt-3 text-xs text-fg-muted">{scopeNote}</p>}

      {/* See more — the build detail, collapsed by default */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-6 flex items-center gap-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-amber-400"
      >
        {open ? "See less" : "See more — what we built"}
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>→</span>
      </button>

      {open && (
        <ul className="mt-4 space-y-2.5 border-t border-amber-400/20 pt-5">
          {whatWeBuilt.map((line) => (
            <li key={line} className="text-sm leading-relaxed text-fg-muted">
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
