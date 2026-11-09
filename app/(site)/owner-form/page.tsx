import type { Metadata } from "next";
import { OwnerForm } from "./owner-form";

export const metadata: Metadata = {
  title: "AI Opportunity Audit — Pre-Call Intake | Ryan Alexander Black",
  description:
    "A ~5-minute intake so I can prep before our AI opportunity audit — where AI and automation could save your business real time and money.",
  // Keep it out of search results — this is a link I share directly with people.
  robots: { index: false, follow: false },
};

export default function OwnerFormPage() {
  return (
    <article className="mx-auto my-10 max-w-2xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <header>
        <p className="eyebrow">AI Opportunity Audit</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pre-audit questionnaire
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">
          Completing this short questionnaire before our audit ensures we make the most of our time
          together. Your answers let me come prepared, ask the right questions, and focus the
          conversation on identifying the highest-value AI and automation opportunities for your
          business. It takes around five minutes — concise answers are perfectly fine, and the more
          candid you are, the more useful the audit will be.
        </p>
      </header>

      <OwnerForm />
    </article>
  );
}
