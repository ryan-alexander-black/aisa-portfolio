// Client-side tracking helpers. Every call is a no-op until the matching ID is set in Vercel
// (NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_GOOGLE_ADS_ID + conversion labels),
// so the site behaves the same with no tracking configured.

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window { gtag?: Gtag; fbq?: Fbq }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABELS: Record<string, string | undefined> = {
  report_requested: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_REPORT,
  audit_applied: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPLY,
};
// Meta: the application is the standard "Lead"; the rest are custom events.
const META_STANDARD: Record<string, string> = { audit_applied: "Lead" };

// next_viewed: a good fit opened Greenline's /next (the Full AI Opportunity Report page) from their snapshot.
export type TrackEvent = "report_requested" | "report_viewed" | "next_viewed" | "audit_applied";

export function track(event: TrackEvent, params: Record<string, string | number> = {}) {
  try {
    window.gtag?.("event", event, params);
    const label = ADS_LABELS[event];
    if (ADS_ID && label) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${label}` });
    if (META_STANDARD[event]) window.fbq?.("track", META_STANDARD[event], params);
    else window.fbq?.("trackCustom", event, params);
  } catch {
    /* tracking must never break the page */
  }
}

// ---- Where the visitor came from (first touch this visit), saved with each lead.
const UTM_KEY = "rab-utm";
const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

/** Called on every page load: keeps the first set of campaign tags seen this visit. */
export function captureUtm() {
  try {
    if (sessionStorage.getItem(UTM_KEY)) return;
    const q = new URLSearchParams(location.search);
    const found: Record<string, string> = { landing: location.pathname };
    UTM_FIELDS.forEach((k) => { const v = q.get(k); if (v) found[k] = v; });
    if (!found.utm_source && document.referrer && !document.referrer.includes(location.host)) {
      found.utm_source = new URL(document.referrer).hostname; // e.g. google.com, facebook.com
      found.utm_medium = "referral";
    }
    sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch {
    /* storage blocked: nothing to save */
  }
}

export function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}");
  } catch {
    return {};
  }
}
