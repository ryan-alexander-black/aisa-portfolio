import type { Metadata } from "next";
import { OperatorForm } from "./operator-form";

export const metadata: Metadata = {
  title: "AI Time-Back Audit — Quick Intake | Ryan Alexander Black",
  description:
    "A 2-minute intake so I can prep before our AI audit call — where AI and automation could save you real time in your role.",
  // Keep it out of search results — this is a link I share directly with people.
  robots: { index: false, follow: false },
};

export default function OperatorFormPage() {
  return (
    <article className="mx-auto my-10 max-w-2xl rounded-2xl border border-border glass-card px-6 py-10 sm:px-10 sm:py-12">
      <header>
        <p className="eyebrow">AI Time-Back Audit</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pre-audit questionnaire
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">
          Completing this short questionnaire before our audit ensures we make the most of our time
          together. Your answers let me come prepared, ask the right questions, and focus the
          conversation on identifying where AI and automation can give you back the most time in your
          role. It takes two to three minutes — concise answers are perfectly fine.
        </p>
      </header>

      <OperatorForm />
    </article>
  );
}
