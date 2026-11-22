import type { MetadataRoute } from "next";
import { currentSite } from "@/lib/site-host";

// Per host (lib/site-host.ts): each site lists only its own public pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await currentSite();
  return site.paths.map((path) => ({
    url: `${site.origin}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : path === "/privacy" || path === "/terms" ? 0.2 : 0.7,
  }));
}
