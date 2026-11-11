import type { Metadata } from "next";
import { clients } from "@/lib/clients";
import type { Proof } from "../greenline-page";
import { greenlineHostOnly } from "../host";
import { NextPage } from "./next-page";

// greenlineai.nz/next: the funnel's landing page. Its one job is to sell the call (an application for
// the Full AI Opportunity Report). Good fits reach it from the end of their snapshot, the snapshot
// email and the email sequence (money-engine/greenline-page.md → "The funnel").
export const metadata: Metadata = {
  title: "The Full AI Opportunity Report · Greenline AI",
  description:
    "Turn your snapshot into a full plan to grow your profit. A quick call, a 45-minute audit, then your plan, walked through in person. Completely free, limited to 2 reports per month.",
  alternates: { canonical: "/next" },
  robots: { index: false },
};

const PROOF_SLUGS = ["advance-visual", "legends-academy", "cash-direct"];

export default async function Page() {
  await greenlineHostOnly();
  const proof: Proof[] = PROOF_SLUGS.flatMap((slug) => {
    const c = clients.find((x) => x.slug === slug);
    return c ? [{ company: c.company, industry: c.industry.split(" · ")[0], results: c.results.slice(0, 3), stats: c.proofStats ?? [], quote: c.quote }] : [];
  });
  return <NextPage proof={proof} />;
}
