import type { Metadata } from "next";
import { Footer, Header } from "../chrome";
import { greenlineHostOnly } from "../host";
import { OwnerForm } from "./owner-form";

// greenlineai.nz/owner-form: the first step of the Full AI Opportunity Report for a business owner Ryan has
// offered it to directly (a warm lead, sent by email). Shared by link only, so it stays out of search.
export const metadata: Metadata = {
  title: "Before your audit · Greenline AI",
  description: "A few quick questions before your Full AI Opportunity Report, so we can make the most of our time together.",
  alternates: { canonical: "/owner-form" },
  robots: { index: false, follow: false },
};

export default async function Page() {
  await greenlineHostOnly();
  return (
    <div className="gl-root">
      <Header home cta={null} />
      <main className="gl-of">
        <p className="gl-eyebrow eyebrow">The Full AI Opportunity Report · step 1</p>
        <h1 className="display-lg">A few questions before we sit down</h1>
        <p className="gl-of-lede lede">
          This takes about 5 minutes. Your answers mean I come prepared and we spend our time on what matters most
          in your business. Short answers are fine, and the more honest, the more useful your report will be.
        </p>
        <OwnerForm />
      </main>
      <Footer />
    </div>
  );
}
