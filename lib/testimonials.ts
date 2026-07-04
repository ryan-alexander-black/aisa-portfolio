// Client testimonials — real outcomes for real businesses, kept deliberately
// separate from `projects.ts` (Ryan's own builds). Same brand voice, plain
// English, but no tech stack/under-the-hood layer: a business owner reading
// this wants proof someone else trusted Ryan and got a result, not the build.

export interface Testimonial {
  slug: string;
  companyLogo: string; // path in /public
  companyLogoAlt: string;
  summary: string; // plain-English "what we did" — sets up the quote
  quote: string; // the strongest excerpt, not necessarily the full testimonial
  name: string;
  title: string;
  company: string;
  pills: string[]; // short result stats — first is the headline, always visible
  // Revealed behind "See more" — generic build detail, no client-specific
  // internals (no licence numbers, no fee/interest specifics).
  whatWeBuilt: string[];
  // One line of context on scope — e.g. this build tackled one of several
  // opportunities identified in the audit. Keeps a single case study from
  // reading like "that's all Ryan found."
  scopeNote?: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: "cash-direct",
    companyLogo: "/clients/cash-direct-logo.jpg",
    companyLogoAlt: "Cash Direct",
    summary:
      "After an initial audit with Shelley, we identified an opportunity to replace her daily manual loan-statement process — pulling two reports, cross-checking them, and rebuilding the numbers by hand in a spreadsheet — with a simple, automated tool she could run herself, checked for errors along the way.",
    quote:
      "Ryan worked with me to identify exactly where AI could take that load off, then implemented practical, easy-to-use solutions that genuinely changed how I work. I'd recommend Ryan to anyone who wants AI implementation that's tailored, well thought out, and actually delivers.",
    name: "Shelley Gregory",
    title: "Head of Risk and Complaints",
    company: "Cash Direct",
    pills: ["~75% less time per statement (1 hr/day → ~15 min)", "~4 hrs/week recovered"],
    whatWeBuilt: [
      "Their loan-management platform (Turnkey) exports raw payment and transaction data, but doesn't produce a clean, trustworthy statement on its own — so every request meant pulling two separate reports and manually reconciling them by hand.",
      "We built a tool that takes those two raw exports and does the reconciliation automatically — applying the loan's real rules, flagging anything that doesn't add up — then produces a clean working file plus a client-ready statement.",
      "Delivered so she could run it herself, day to day, with no ongoing back-and-forth to get a new statement out — and it caught a gap the manual process had been missing.",
    ],
    scopeNote:
      "This was one of several automation opportunities identified in the audit — the same process applies to the rest of her workload.",
  },
];
