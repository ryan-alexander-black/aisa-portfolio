import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { clients } from "@/lib/clients";
import { GreenlinePage, type Proof } from "./greenline-page";

// The page exists only on Greenline's own domains (and locally for review). On the portfolio's host
// it 404s, so nobody can trim a URL back into the portfolio (money-engine/greenline-page.md).
const HOSTS = /^(www\.)?greenlineai\.(nz|co\.nz)$|^localhost$|^127\.0\.0\.1$/;

export const metadata: Metadata = {
  title: "Greenline AI · Grow your profit, not just your revenue",
  description:
    "Growing is only worth it if your profit grows too. Get your free AI Opportunity Report: 3 places AI could grow your profit, specific to your business.",
  alternates: { canonical: "/" },
};

// Proof comes straight from the client records (lib/clients.ts), so the words can't drift from the site.
const PROOF_SLUGS = ["advance-visual", "legends-academy", "cash-direct"];

export default async function Page() {
  const host = ((await headers()).get("host") || "").split(":")[0].toLowerCase();
  if (!HOSTS.test(host)) notFound();

  const proof: Proof[] = PROOF_SLUGS.flatMap((slug) => {
    const c = clients.find((x) => x.slug === slug);
    return c ? [{ company: c.company, industry: c.industry, results: c.results.slice(0, 3), quote: c.quote }] : [];
  });
  return <GreenlinePage proof={proof} />;
}
