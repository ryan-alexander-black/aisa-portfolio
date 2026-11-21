import type { Metadata } from "next";
import { GreenlinePrivacyBody } from "@/components/legal";
import { Footer, Header } from "../chrome";
import { greenlineHostOnly } from "../host";

export const metadata: Metadata = {
  title: "Privacy Policy | Greenline AI",
  description: "What Greenline AI collects when you ask for the free AI Profit Snapshot, how it's used and who it's shared with.",
  alternates: { canonical: "/privacy" },
};

// Effective date is maintained by hand: bump it whenever the substance changes (wording in
// components/legal.tsx → GreenlinePrivacyBody).
const EFFECTIVE = "21 November 2026";

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
          <GreenlinePrivacyBody />
        </div>
      </main>
      <Footer />
    </div>
  );
}
