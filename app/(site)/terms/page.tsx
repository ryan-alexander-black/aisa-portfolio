import type { Metadata } from "next";
import { TermsBody, PORTFOLIO } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Ryan Alexander Black",
  description:
    "Terms of service for ryanalexanderblack.com and the client services of Ryan Alexander Black — AI Solutions (AIS).",
};

const EFFECTIVE = "26 August 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
        Ryan Alexander Black — AI Solutions (AIS)
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-fg-muted">Effective {EFFECTIVE}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-fg [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-[15px] [&_li]:text-[15px]">
        <TermsBody brand={PORTFOLIO} />
      </div>
    </div>
  );
}
