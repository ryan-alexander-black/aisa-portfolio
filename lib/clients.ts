// Client work — real businesses, real results. One source for both the home
// card and the /work/<slug> case-study page, so the two can't drift.
// Every claim here traces to presence/portfolio/claims-menu.md (basis + source).
// Keep client financials, pricing and end-client names OFF this file.

export interface ClientQuote {
  text: string;
  name: string; // first name only
  role: string;
}

export interface ClientCase {
  slug: string;
  company: string;
  industry: string; // one short line under the name
  logo: string; // path in /public
  logoBg: "light" | "dark"; // the chip behind the logo (white-art logos need dark)
  opportunity: string; // "what I found" — the before
  built: string; // "what I built" — one sentence
  results: string[]; // short chips — first is the headline
  quote: ClientQuote;
  featured?: boolean; // full-width card
  page?: ClientPage; // has a /work/<slug> case study
}

export interface ClientPage {
  intro: string;
  opportunity: string[];
  built: { name: string; does: string }[];
  changed: { stat: string; context: string }[];
  quotes: ClientQuote[];
  stack: string[];
}

export const clients: ClientCase[] = [
  {
    slug: "advance-visual",
    company: "Advance Visual",
    industry: "Signage studio · Perth",
    logo: "/clients/advance-visual-logo.svg",
    logoBg: "dark",
    featured: true,
    opportunity:
      "Quoting took up much of the week — handwritten sheets, scanned, then typed into Xero by hand.",
    built:
      "AI quoting straight into Xero — then the AV Hub: quoting, sales leads, purchase orders, job sheets and a live “crystal ball” dashboard, connected to Xero, Monday and their file server.",
    results: [
      "Admin time handed back to the team",
      "Quotes priced on their own rate card",
      "Quoting, POs and job sheets in one place",
      "Their 12-month vision, running early",
    ],
    quote: {
      text: "The quote platform that's been designed is so quick… and accurate.",
      name: "Martin",
      role: "Founder",
    },
    page: {
      intro:
        "Advance Visual designs, prints and installs signage across Perth — around 800 quotes a year. Martin, the founder, wanted to spend his time on the creative side of the business, not the day-to-day admin.",
      opportunity: [
        "The AI Opportunity Report found the biggest leak in quoting. It took at least half of Amanda's week: square metres handwritten on an A4 sheet at the site survey, scanned, then typed into Xero by hand. A big multi-site quote could take hours.",
        "Then the same job was typed again — into Monday, into the weekly report. Mapping the business turned up 33 hand-offs between people and systems. Only 3 happened on their own.",
      ],
      built: [
        {
          name: "AI quoting",
          does: "A digital quote sheet for each major client, priced on AV's own rate card, pushed straight into Xero as a branded quote with the worksheet attached.",
        },
        {
          name: "The AV Hub",
          does: "Their own system: sales leads, quoting, requotes and edits, purchase orders, job sheets and the price book — one place, with logins the team manages themselves.",
        },
        {
          name: "Everything connected",
          does: "Xero, Monday.com, Microsoft 365 email and the office file server. One press in the Hub updates them all — no retyping.",
        },
        {
          name: "The crystal ball",
          does: "A live dashboard of the pipeline and cash flow, straight from Xero and Monday — the view Martin asked for in the first meeting.",
        },
        {
          name: "AI on top",
          does: "Talk to a sign and the quote sheet fills itself. AI reads client artwork proofs, and quotes that were started outside the Hub.",
        },
      ],
      changed: [
        {
          stat: "~$18k/yr",
          context:
            "In admin duties saved — the team's time now goes to higher-value work. About two months after we started.",
        },
        {
          stat: "To the cent",
          context:
            "The engine re-prices AV's own past quotes exactly, and every change is tested against them before it ships.",
        },
        {
          stat: "1 day",
          context:
            "Four client quote sheets designed, built and live in a single day. The purchase-order system took one day too — the first real PO went out within the hour.",
        },
        {
          stat: "~10 weeks",
          context:
            "Their own custom Hub was pitched as the 12-month goal. It was running AV's quoting in about ten weeks.",
        },
        {
          stat: "13 days",
          context: "From yes to the first real quotes going out — and Amanda kept every price.",
        },
      ],
      quotes: [
        {
          text: "The quote platform that's been designed is so quick… and accurate.",
          name: "Martin",
          role: "Founder",
        },
        {
          text: "I can check in with my crystal ball… every morning. Which is next level stuff.",
          name: "Martin",
          role: "Founder",
        },
        { text: "Gee you're a genius! Love it!!", name: "Amanda", role: "General Manager" },
      ],
      stack: [
        "Next.js",
        "Vercel",
        "Supabase",
        "Xero API",
        "Monday.com API",
        "Microsoft 365",
        "Synology NAS",
        "Claude",
      ],
    },
  },
  {
    slug: "legends-academy",
    company: "Legends Academy",
    industry: "Martial-arts gym · Perth · ~400 members",
    logo: "/clients/legends-academy-logo.png",
    logoBg: "dark",
    opportunity:
      "The numbers that run the gym were spread across eight apps, reports were hand-built, and writing procedures cost Dan 3–4 hours a week.",
    built:
      "The Legends Brain — an AI operating system on accounts Legends owns — with a live dashboard connecting Momence, Xero, Meta, Google Ads and more, plus a speak-a-procedure SOP tool.",
    results: [
      "One live view of the whole gym",
      "Eight business systems connected",
      "New ideas built in a day",
      "Clear on which marketing brings in members",
    ],
    quote: {
      text: "It knows me, my culture, my values, it knows everything about Legends.",
      name: "Daniel",
      role: "Owner",
    },
    page: {
      intro:
        "Legends Academy is a Perth martial-arts gym — boxing, Muay Thai, BJJ — with around 400 members. Dan, the owner, wanted to grow without growing the workload.",
      opportunity: [
        "The numbers that run the gym lived in eight different apps: bookings, accounts, ads, tasks, team chat. Every fortnight the team hand-built a report from about five exports, and nobody could see which marketing actually turned into members.",
        "Procedures were the other drag — writing them cost Dan 3–4 hours a week, and the backlog kept growing.",
      ],
      built: [
        {
          name: "The Legends Brain",
          does: "An AI operating system that knows the business — its people, culture and rules — built on accounts Legends owns outright.",
        },
        {
          name: "A live dashboard",
          does: "Members, revenue, the lead funnel, ads and class fill — from Momence, Xero, Meta, Google Ads, Google Analytics, Asana, Slack and the team's own sheets.",
        },
        {
          name: "A Health Score",
          does: "One number for how the gym is tracking, weighted on Dan's own rules.",
        },
        {
          name: "Talk-to-SOP",
          does: "Speak a procedure out loud, get back a clean, branded SOP ready to hand to the team.",
        },
        {
          name: "One-click lists for coaches",
          does: "Members to win back, class fill and memberships — each exported to Excel in a click.",
        },
      ],
      changed: [
        {
          stat: "15 days",
          context:
            "Live on Legends' own accounts 15 days after kickoff — with the first dashboard on real data in three.",
        },
        {
          stat: "8 systems",
          context: "Connected into one brain. The plan scoped four.",
        },
        {
          stat: "Sat → Sun",
          context: "Dan asked for a Health Score on a Saturday. It was live on the Sunday.",
        },
        {
          stat: "The channel that works",
          context:
            "For the first time the numbers showed which enquiry channel actually turns into members — and which doesn't.",
        },
        {
          stat: "Minutes",
          context: "A procedure that had stalled for months, written by voice in minutes.",
        },
        {
          stat: "~50% headroom",
          context:
            "Real class capacity showed room for about 50% more members than the gym's own target.",
        },
      ],
      quotes: [
        {
          text: "It knows me, my culture, my values, it knows everything about Legends.",
          name: "Daniel",
          role: "Owner",
        },
        {
          text: "One month, man… we've done so much… I won't forget that.",
          name: "Daniel",
          role: "Owner",
        },
        {
          text: "You don't know how much headway I have made in the last 2 days! Incredible!!",
          name: "Daniel",
          role: "Owner",
        },
      ],
      stack: [
        "Next.js",
        "Python on Vercel",
        "Upstash",
        "Momence API",
        "Xero API",
        "Meta + Google Ads APIs",
        "Google Analytics",
        "ChatGPT",
      ],
    },
  },
  {
    slug: "cash-direct",
    company: "Cash Direct",
    industry: "Consumer lender · Australia",
    logo: "/clients/cash-direct-logo.jpg",
    logoBg: "light",
    opportunity:
      "Every loan statement meant pulling two reports, cross-checking them and rebuilding the numbers by hand — about an hour of Shelley's day.",
    built:
      "A tool that does the reconciliation automatically, applies the loan's real rules, flags anything that doesn't add up and produces a client-ready statement — run by Shelley herself.",
    results: ["~75% less time per statement", "~4 hrs/week recovered"],
    quote: {
      text: "Ryan worked with me to identify exactly where AI could take that load off, then implemented practical, easy-to-use solutions that genuinely changed how I work.",
      name: "Shelley",
      role: "Head of Risk and Complaints",
    },
  },
];

export function getClient(slug: string): ClientCase | undefined {
  return clients.find((c) => c.slug === slug);
}
