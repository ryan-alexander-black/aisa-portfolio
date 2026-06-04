// The portfolio's source of truth. Each entry renders a card on the home grid;
// entries with `caseStudy: true` also get a /projects/<slug> page.
// Keep copy plain and outcome-led (brand voice: no hype, lead with what it does).

export type ProjectStatus = "shipped" | "live" | "building" | "planned";

export interface Project {
  slug: string;
  title: string;
  tagline: string; // one line: what it is / what it does (plain English)
  status: ProjectStatus;
  featured?: boolean; // surfaced at the top of the grid
  featuredLarge?: boolean; // the centrepiece — renders as a 2-col spotlight card
  caseStudy?: boolean; // has a /projects/<slug> page
  stack: string[]; // short tech chips
  liveUrl?: string; // deployed / live link
  exampleUrl?: string; // a real output to view (e.g. the rendered newsletter)
  repoUrl?: string;
  // A few hard numbers for the spotlight card / case-study header.
  metrics?: { label: string; value: string }[];
  // Optional cover image for the large spotlight card (falls back to a branded panel).
  cover?: string;
  // The plain-English "what it does" lead — readable by anyone, no jargon.
  summary: string;
  // The technical layer, quarantined behind an "Under the hood" label so
  // non-technical readers can skip it. Points keep the real terms but gloss them.
  underHood?: string[];
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  live: "Live",
  building: "In progress",
  planned: "Planned",
};

export const projects: Project[] = [
  {
    slug: "ocla",
    title: "OCLA",
    tagline: "A complete app that takes a fitness coach from zero to a launched business.",
    status: "live",
    featured: true,
    featuredLarge: true,
    caseStudy: true,
    stack: ["Next.js", "Supabase", "Claude API", "Vercel"],
    metrics: [
      { label: "Built solo", value: "~100 hrs" },
      { label: "Modules", value: "4" },
      { label: "Operating tools", value: "6" },
      { label: "AI endpoints", value: "12" },
    ],
    cover: "/projects/ocla/kpi-tracker.jpg",
    summary:
      "Online Coach Launch Academy — software that takes a fitness coach from zero to a launched, running business. A four-module guided curriculum, then the tools to operate the business: content and ad planners, an AI assistant for live client DMs, a daily-metrics tracker, a simple client tracker (CRM), and a website-copy builder — with an AI helper on every page. Built solo, live with paying users.",
    underHood: [
      "AI on every feature (Claude), hardened to stay accurate in production — it won't drift or anchor to a user's old answers when it regenerates",
      "Designed around a third-party's limits — a trial→paid lifecycle built on the handful of events the community platform actually exposes",
      "Row-level security — every user only ever sees their own data",
    ],
  },
  {
    slug: "newsletter",
    title: "Newsletter Automation",
    tagline: '"Signal over Noise" — give it a topic, get a finished newsletter.',
    status: "shipped",
    featured: true,
    caseStudy: true,
    stack: ["Python", "Perplexity", "Claude"],
    exampleUrl: "/projects/newsletter/example/signal-over-noise-01.html",
    summary:
      "Give it a topic and it produces a finished newsletter — researched with real sources, written in a set brand voice, with accurate charts and a header image, then checked and sent. The card below links to a real issue it produced.",
    underHood: [
      "Charts are drawn in code, not AI-generated — so the numbers are always exact",
      "Every issue is checked by rendering it to an image before it sends",
      "Each part (research, images, sending) is swappable without rebuilding the rest",
    ],
  },
  {
    slug: "super-tracker",
    title: "Investment Strategy Engine",
    tagline:
      "A rules-based engine that scores the market daily and tells me when my strategy says move.",
    status: "shipped",
    featured: true,
    caseStudy: true,
    stack: ["Python", "SQLite", "FastAPI", "Next.js", "Claude API"],
    metrics: [
      { label: "Golden tests", value: "22" },
      { label: "Report cadences", value: "3" },
      { label: "History migrated", value: "6 tabs" },
      { label: "Math by LLM", value: "0%" },
    ],
    summary:
      "A personal decision-support system for a disciplined, rules-based investment (superannuation) strategy. It pulls live market and macro data, scores conditions against a fixed debt-cycle rulebook, tracks allocation gates and triggers, and tracks whether the strategy is working (balance and returns over time) — all on a dashboard with daily, weekly and monthly reports, replacing a manual ChatGPT-and-Excel routine. It recommends; the human decides — it never auto-trades.",
    underHood: [
      "Every number the decision depends on is computed in plain Python, never by an AI — the old LLM workflow made ~6 moving-average errors in a single month",
      "The rulebook lives as versioned config (data, not code), so every strategy change is auditable",
      "AI is used only for the genuinely linguistic parts — news sentiment, report narrative, and a chat that explains your own data",
    ],
  },
  {
    slug: "tfs-creative-suite",
    title: "TFS Creative Suite",
    tagline: "One place to generate images, video, voice and music — saved to the cloud.",
    status: "live",
    featured: true,
    stack: ["MCP", "KIE.ai", "Remotion"],
    summary:
      "A single toolset for generating images, video, voice and music from top AI models, with every result saved to the cloud automatically. I built the connector that wires those models into the tools I use day to day — plus an automated video editor that turned clips into finished Reels for live ad campaigns.",
    underHood: [
      "A custom connector (MCP server) links multiple AI media models into one toolset",
      "Generated assets save to permanent cloud storage automatically",
      "An automated editor (Remotion) assembled clips into finished, ad-ready Reels",
    ],
  },
  {
    slug: "business-brief",
    title: "Business Brief Generator",
    tagline: "Point it at a company's website → a branded, ready-to-read business brief.",
    status: "shipped",
    featured: true,
    caseStudy: true,
    stack: ["Firecrawl MCP", "Python", "Claude"],
    summary:
      "Give it a company's web address and it produces a complete brief on that business — what they do, how they're positioned, who they serve, their team, and their full visual identity (colours, fonts, logo) — then renders it as a clean, branded PDF. Built from public pages only, in about an hour. The preview is a real, anonymised run.",
    underHood: [
      "Reads the site with the Firecrawl MCP server — maps the pages, pulls the content, and auto-extracts the brand (colours, fonts, logo)",
      "Two outputs from one research pass — a candid internal recon brief, or a warm client-facing version in your own brand",
      "Renders to a styled PDF in code (headless browser), so the output is consistent every time",
    ],
  },
  {
    slug: "challenge-day-3",
    title: "Challenge — Day 3",
    tagline: "Day 3 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
  },
  {
    slug: "challenge-day-4",
    title: "Challenge — Day 4",
    tagline: "Day 4 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
  },
  {
    slug: "challenge-day-5",
    title: "Challenge — Day 5",
    tagline: "Day 5 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
  },
  {
    slug: "challenge-day-6",
    title: "Challenge — Day 6",
    tagline: "Day 6 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
  },
  {
    slug: "challenge-day-7",
    title: "Challenge — Day 7",
    tagline: "Day 7 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
  },
  {
    slug: "marathon-plan",
    title: "Marathon Training Plan",
    tagline: "An adaptive training-plan builder (scope TBC).",
    status: "planned",
    stack: ["TBD"],
    summary: "A personal build in the running domain — concept and scope being defined.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function caseStudySlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}
