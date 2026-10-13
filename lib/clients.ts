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
  cardImage?: { src: string; alt: string }; // a real screen on the featured card
  page?: ClientPage; // has a /work/<slug> case study
}

export interface ClientScreen {
  src: string; // path in /public — client data masked before capture
  alt: string;
  caption: string;
}

export interface ClientPage {
  intro: string;
  personal?: string; // why Ryan, for this client — one short line
  opportunity: string[];
  built: { name: string; does: string }[];
  screens?: ClientScreen[]; // real screens from the build, client data masked
  changed: { stat: string; context: string }[];
  next?: { name: string; does: string }[]; // what the build opens up — possibilities, not promises
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
    cardImage: {
      src: "/clients/av/taskmaster.jpg",
      alt: "The AV Hub's Taskmaster screen: every live job and each department's workload",
    },
    opportunity:
      "Quoting took up much of the week — handwritten sheets, scanned, then typed into Xero by hand. Then every job was typed again into monday.com, the online board they tracked jobs on.",
    built:
      "The AV Hub — their own system for quoting, sales leads, purchase orders, job sheets and Taskmaster (every live job and every department's workload on one screen), plus a live “crystal ball” dashboard. Connected to Xero, monday.com, email and their file server.",
    results: [
      "Admin time handed back to the team",
      "Quotes priced on their own rate card",
      "Every live job on one screen",
      "Their 12-month vision, running early",
    ],
    quote: {
      text: "The quote platform that's been designed is so quick… and accurate.",
      name: "Martin",
      role: "Founder",
    },
    page: {
      intro:
        "Advance Visual designs, prints and installs signage across Perth — around 800 quotes a year, for national retail brands and local businesses. Martin, the founder, wanted his time back for the creative side of the business, and a business that ran from one system instead of five.",
      personal:
        "I spent nearly a decade at Advance Visual, most recently running production and installation, before I went out on my own. So I knew where the time went before we started.",
      opportunity: [
        "The AI Opportunity Report found the biggest leak in quoting. Amanda, AV's sales manager, spent at least half her week on it: square metres handwritten on an A4 sheet at the site survey, scanned, then typed into Xero (their accounting system) by hand. A big multi-site quote could take hours.",
        "Then the same job was typed again — into monday.com (the online board AV tracked every job on) and into the weekly report. To print a job sheet, the team was creating and voiding about two invoices a day in Xero.",
        "Mapping the whole business turned up 33 hand-offs between people and systems. Only 3 happened on their own.",
      ],
      built: [
        {
          name: "AI quoting",
          does: "A digital quote sheet for each major client, priced on AV's own rate card and sent straight into Xero as a branded quote with the worksheet attached. Talk to a sign and the sheet fills itself; AI reads the client's artwork proofs too.",
        },
        {
          name: "The AV Hub",
          does: "Their own system, in one place: sales leads, quoting, requotes and edits to any old quote, purchase orders emailed to suppliers, job sheets, the price book and team leave — with logins the team manages themselves.",
        },
        {
          name: "Taskmaster",
          does: "Every live job on one screen, in the order it moves: sales, design, production, installation. Each department's workload for the next five working days, worked out from the hours on the quote, plus what needs a person today. Built to take over from monday.com — it runs alongside while the team moves across.",
        },
        {
          name: "The crystal ball",
          does: "A live dashboard of the sales pipeline and cash flow, straight from Xero and monday.com — the view Martin asked for in the first meeting.",
        },
        {
          name: "One record of every customer",
          does: "A contact book linking every client, store and contact to their jobs, and AV's old job archive, searchable from the same screen.",
        },
        {
          name: "Aslan, the AV brain",
          does: "An AI assistant, named after the office dog, that answers questions from the Hub's live data — what's due this week, who has room, where a job is up to. It reads; it never changes anything.",
        },
        {
          name: "Everything connected",
          does: "Xero, monday.com, Microsoft 365 email and the office file server. One press in the Hub updates them all — no retyping.",
        },
      ],
      screens: [
        {
          src: "/clients/av/taskmaster.jpg",
          alt: "Taskmaster overview: every live job by stage, and each department's workload for the next five working days",
          caption:
            "Taskmaster — every live job in the order it moves, and each department's hours for the next five working days, worked out from the quotes.",
        },
        {
          src: "/clients/av/dashboard.jpg",
          alt: "The crystal ball dashboard: invoiced this month, pipeline, quotes out, and where the work sits from quote to install",
          caption:
            "The crystal ball — live from Xero and monday.com: what's invoiced, what's out for quote, and where every dollar sits on its way from quote to install.",
        },
        {
          src: "/clients/av/sales-lead.jpg",
          alt: "The new sales lead form, with client matches coming straight from Xero",
          caption:
            "A new sales lead — start typing the client and it matches straight from Xero, so a job starts with the right details and is never typed twice.",
        },
        {
          src: "/clients/av/team-leave.jpg",
          alt: "The team leave calendar with a request waiting for approval",
          caption:
            "Team leave — book it, approve it, and it flows straight into the workload numbers on Taskmaster.",
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
            "The engine re-prices AV's own past quotes exactly. It was stress-tested on 875 real quotes before the team touched it, and every change is tested again before it ships.",
        },
        {
          stat: "One screen",
          context:
            "Every live job, every department's hours and what needs a person today — where it used to take a phone call and a guess.",
        },
        {
          stat: "1 day",
          context:
            "Four client quote sheets designed, built and live in a single day. The purchase-order system took one day too — the first real PO went out within the hour.",
        },
        {
          stat: "13 days",
          context: "From yes to the first real quotes going out — and Amanda kept every price.",
        },
        {
          stat: "~10 weeks",
          context:
            "Their own custom Hub was pitched as the 12-month goal. It was running AV's quoting in about ten weeks.",
        },
      ],
      quotes: [
        {
          text: "The quote platform that's been designed is so quick… and accurate.",
          name: "Martin",
          role: "Founder",
        },
        {
          text: "It's almost like all my dreams have been answered at once… to know that there's 3.5 hours in laminating, there's seven hours in this… That's next level.",
          name: "Martin",
          role: "Founder",
        },
        {
          text: "I can check in with my crystal ball… every morning. Which is next level stuff.",
          name: "Martin",
          role: "Founder",
        },
        { text: "Gee you're a genius! Love it!!", name: "Amanda", role: "Sales Manager" },
      ],
      stack: [
        "Next.js",
        "Vercel",
        "Supabase",
        "Xero API",
        "monday.com API",
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
