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
          Quick intake
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">
          Thanks for doing this! It&apos;s just a quick orientation so our call goes straight to the
          useful stuff — takes 2–3 minutes, short answers are perfect. We&apos;ll get into the detail
          when we chat.
        </p>
      </header>

      <OperatorForm />
    </article>
  );
}
