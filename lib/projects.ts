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
  caseStudy?: boolean; // has a /projects/<slug> page
  stack: string[]; // short tech chips
  liveUrl?: string; // deployed / live link
  exampleUrl?: string; // a real output to view (e.g. the rendered newsletter)
  repoUrl?: string;
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
    stack: ["Next.js", "Supabase", "Claude API", "Vercel"],
    summary:
      "Software that takes a fitness coach from zero to a launched, running business — four guided modules plus the tools to operate it: content and ad planners, an AI assistant that drafts replies to clients, a simple client tracker (CRM), and a website builder. Built solo over ~300 hours.",
    underHood: [
      "Automated trial-to-paid flow — sign-ups and billing handled with no manual steps",
      "AI hardened to stay accurate in production (it won't drift or invent its own data)",
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
    slug: "challenge-day-2",
    title: "Challenge — Day 2",
    tagline: "Day 2 of the 7-day AI build challenge.",
    status: "planned",
    stack: ["TBD"],
    summary: "One build a day, shipped publicly. Coming as the challenge runs.",
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
