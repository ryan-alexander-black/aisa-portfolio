import type { Metadata } from "next";
import { GREENLINE, TermsBody } from "@/components/legal";
import { Footer, Header } from "../chrome";
import { greenlineHostOnly } from "../host";

export const metadata: Metadata = {
  title: "Terms of Service | Greenline AI",
  description: "Terms of service for greenlineai.nz and the client services of Greenline AI.",
  alternates: { canonical: "/terms" },
};

// Effective date is maintained by hand: bump it whenever the substance changes (wording shared with
// the portfolio's /terms in components/legal.tsx).
const EFFECTIVE = "10 November 2026";

export default async function Page() {
  await greenlineHostOnly();
  return (
    <div className="gl-root">
      <Header cta="/#report" home />
      <main className="gl-legal">
        <p className="gl-eyebrow eyebrow">Greenline AI</p>
        <h1 className="display-lg">Terms of Service</h1>
        <p className="gl-legal-date caption">Effective {EFFECTIVE}</p>
        <div className="gl-legal-body body">
          <TermsBody brand={GREENLINE} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
