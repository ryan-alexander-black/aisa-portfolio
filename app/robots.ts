import type { MetadataRoute } from "next";
import { currentSite } from "@/lib/site-host";

// Per host (lib/site-host.ts). Nothing is disallowed: noindex pages say so on the page, and a crawler
// has to be able to fetch a page to read its noindex.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await currentSite();
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.origin}/sitemap.xml` };
}
