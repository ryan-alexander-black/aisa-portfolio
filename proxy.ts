import { NextResponse, type NextRequest } from "next/server";

// Greenline AI's own domains serve only the Greenline page, sealed: nothing on them leads back into the
// portfolio (money-engine/greenline-page.md). Every other host (ryanalexanderblack.com, previews,
// localhost) passes straight through.
const GREENLINE = /^(www\.)?greenlineai\.(nz|co\.nz)$/;
const CANONICAL = "greenlineai.nz";
// What the pages need on their own domain besides themselves: the report form's API and Greenline's own forms.
const PASS = /^\/api\/(mini-report|greenline)\//;
// Ad click ids that mark a visit as campaign traffic (Google, Meta, Microsoft).
const CLICK_IDS = new Set(["gclid", "gbraid", "wbraid", "fbclid", "msclkid"]);
// Greenline's own pages, at their short addresses.
const PAGES: Record<string, string> = {
  "/": "/greenline", "/profit-snapshot": "/greenline/profit-snapshot", "/full-report": "/greenline/full-report",
  "/privacy": "/greenline/privacy", "/terms": "/greenline/terms",
  "/owner-form": "/greenline/owner-form", "/newsletter": "/greenline/newsletter",
};

export function proxy(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();
  if (!GREENLINE.test(host)) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  const home = (path: string) => new URL(`https://${CANONICAL}${path}${search}`);
  // One address: www. and .co.nz move to greenlineai.nz, keeping the path and campaign tags.
  if (host !== CANONICAL) return NextResponse.redirect(home(pathname), 308);
  // Old addresses (26 Nov, Ryan): /next became /full-report. Snapshot emails already sent carry /next?s=…, so the
  // redirect keeps the query (the sealed context that pre-fills the application).
  if (pathname === "/next") return NextResponse.redirect(home("/full-report"), 308);
  // The bridge (26 Nov): the root became a homepage, but the live Meta and Google ads still point at the root and
  // promise the free snapshot. An ad click (it carries a click id) to the root still gets the snapshot; everyone else,
  // flyer and card scans included (Ryan: fine), gets the homepage. Drop this once both ads use /profit-snapshot.
  if (pathname === "/" && [...req.nextUrl.searchParams.keys()].some((k) => CLICK_IDS.has(k))) {
    const url = req.nextUrl.clone();
    url.pathname = "/greenline/profit-snapshot";
    return NextResponse.rewrite(url);
  }
  if (PAGES[pathname]) {
    const url = req.nextUrl.clone();
    url.pathname = PAGES[pathname];
    return NextResponse.rewrite(url);
  }
  if (PASS.test(pathname)) return NextResponse.next();
  // Anything else (including the /greenline paths themselves) goes to the page's one address, tags kept.
  return NextResponse.redirect(home("/"), 307);
}

export const config = {
  // Skip Next's own assets and plain files (images, the icon, videos), which every page needs.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|mp4|webm|txt|xml|pdf)$).*)"],
};
