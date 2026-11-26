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
};

export default async function Page() {
  await greenlineHostOnly();
  return <NewsletterPage />;
}
