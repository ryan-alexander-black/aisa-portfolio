import type { Metadata } from "next";
import { clients } from "@/lib/clients";
import { GreenlinePage, type Proof } from "./greenline-page";
import { greenlineHostOnly } from "./host";

export const metadata: Metadata = {
  title: "Greenline AI · Grow your profit, not just your revenue",
  description:
    "Growing is only worth it if your profit grows too. Get your free AI Profit Snapshot: 3 places AI could grow your profit, specific to your business.",
  alternates: { canonical: "/" },
  // The share image is opengraph-image.png / twitter-image.png beside this file (source: Nexus
  // brand/greenline/share-image.html, rendered at 1200x630).
  openGraph: {
    type: "website",
    url: "https://greenlineai.nz",
    siteName: "Greenline AI",
    title: "Grow your profit, not just your revenue",
    description: "Get your free AI Profit Snapshot: 3 places AI could grow your profit, specific to your business. About 90 seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow your profit, not just your revenue",
    description: "Get your free AI Profit Snapshot: 3 places AI could grow your profit, specific to your business.",
  },
};

// Proof comes straight from the client records (lib/clients.ts), so the words can't drift from the site.
const PROOF_SLUGS = ["advance-visual", "legends-academy", "cash-direct"];

export default async function Page() {
  await greenlineHostOnly();

  const proof: Proof[] = PROOF_SLUGS.flatMap((slug) => {
    const c = clients.find((x) => x.slug === slug);
    return c ? [{ company: c.company, industry: c.industry, results: c.results.slice(0, 3), quote: c.quote }] : [];
  });
  return <GreenlinePage proof={proof} />;
}
