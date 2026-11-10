import { NextResponse, type NextRequest } from "next/server";

// Greenline AI's own domains serve only the Greenline page, sealed: nothing on them leads back into the
// portfolio (money-engine/greenline-page.md). Every other host (ryanalexanderblack.com, previews,
// localhost) passes straight through.
const GREENLINE = /^(www\.)?greenlineai\.(nz|co\.nz)$/;
const CANONICAL = "greenlineai.nz";
// What the page needs on its own domain besides itself: the report form's API.
const PASS = /^\/api\/mini-report\//;
// Greenline's own pages, at their short addresses.
const PAGES: Record<string, string> = { "/": "/greenline", "/privacy": "/greenline/privacy", "/terms": "/greenline/terms" };

export function proxy(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();
  if (!GREENLINE.test(host)) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  const home = (path: string) => new URL(`https://${CANONICAL}${path}${search}`);
  // One address: www. and .co.nz move to greenlineai.nz, keeping the path and campaign tags.
  if (host !== CANONICAL) return NextResponse.redirect(home(pathname), 308);
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
