import { headers } from "next/headers";

// One app serves two sites (proxy.ts): Greenline AI on greenlineai.nz, the portfolio everywhere else.
// robots.txt and sitemap.xml skip the proxy (it ignores .txt/.xml), so they read the host themselves
// and each site lists only its own public pages.
const GREENLINE = /^(www\.)?greenlineai\.(nz|co\.nz)$/;

export type Site = { origin: string; paths: string[] };

// Greenline: the opt-in page and its legal pages. /next stays out on purpose: it's noindex and only for
// good fits (money-engine/greenline-page.md).
const GREENLINE_SITE: Site = { origin: "https://greenlineai.nz", paths: ["/", "/profit-snapshot", "/newsletter", "/privacy", "/terms"] };

// The portfolio's public pages. /operator-form and /owner-form are noindex and stay out.
const PORTFOLIO_SITE: Site = {
  origin: "https://www.ryanalexanderblack.com",
  paths: [
    "/", "/ai-report",
    "/work/advance-visual", "/work/legends-academy",
    "/projects/business-brief", "/projects/newsletter", "/projects/ocla", "/projects/ocla-funnel",
    "/projects/super-tracker", "/projects/tfs-creative-suite",
    "/privacy", "/terms",
  ],
};

export async function currentSite(): Promise<Site> {
  const host = ((await headers()).get("host") || "").split(":")[0].toLowerCase();
  return GREENLINE.test(host) ? GREENLINE_SITE : PORTFOLIO_SITE;
}
