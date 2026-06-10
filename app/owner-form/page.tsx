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
          Pre-call intake
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">
          Thanks for doing this! It just helps me prep so our call goes straight to the useful stuff —
          about 5 minutes, short answers are perfect. The more honest the better; we&apos;ll get into the
          detail when we chat.
        </p>
      </header>

      <OwnerForm />
    </article>
  );
}
