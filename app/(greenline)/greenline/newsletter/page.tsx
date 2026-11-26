import type { Metadata } from "next";
import { greenlineHostOnly } from "../host";
import { NewsletterPage } from "./newsletter";

// greenlineai.nz/newsletter: the Signal over Noise opt-in (26 Nov). The cold intro email's one link, and the P.S. in
// warm emails. Built from the approved mock-up (money-engine/greenline-mockup/funnel/newsletter-page-v2.html).
export const metadata: Metadata = {
  title: "Signal over Noise · free every Monday · Greenline AI",
  description:
    "A short email every Monday morning: the week just gone in New Zealand business and beyond, and one practical AI idea to grow your profit. Free.",
  alternates: { canonical: "/newsletter" },
  // Its own share card (27 Nov; source brand/greenline/share-image-newsletter.html), so a /newsletter link on LinkedIn
  // or Facebook doesn't show the homepage card.
  openGraph: {
    type: "website",
    url: "https://greenlineai.nz/newsletter",
    siteName: "Greenline AI",
    title: "Signal over Noise · free every Monday",
    description: "Start your week knowing what's working for NZ businesses, and one AI idea to grow your profit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal over Noise · free every Monday",
    description: "Start your week knowing what's working for NZ businesses, and one AI idea to grow your profit.",
  },
};

export default async function Page() {
  await greenlineHostOnly();
  return <NewsletterPage />;
}
