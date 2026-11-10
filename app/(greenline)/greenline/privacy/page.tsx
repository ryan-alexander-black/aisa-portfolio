import type { Metadata } from "next";
import { GREENLINE, PrivacyBody } from "@/components/legal";
import { Footer, Header } from "../chrome";
import { greenlineHostOnly } from "../host";

export const metadata: Metadata = {
  title: "Privacy Policy | Greenline AI",
  description: "How Greenline AI handles your details when you ask for the free AI Profit Snapshot, and the data in client work.",
  alternates: { canonical: "/privacy" },
};

// Effective date is maintained by hand: bump it whenever the substance changes (wording shared with
// the portfolio's /privacy in components/legal.tsx).
const EFFECTIVE = "10 November 2026";

export default async function Page() {
  await greenlineHostOnly();
  return (
    <div className="gl-root">
      <Header cta="/#report" home />
      <main className="gl-legal">
        <p className="gl-eyebrow eyebrow">Greenline AI</p>
        <h1 className="display-lg">Privacy Policy</h1>
        <p className="gl-legal-date caption">Effective {EFFECTIVE}</p>
        <div className="gl-legal-body body">
          <PrivacyBody brand={GREENLINE} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
