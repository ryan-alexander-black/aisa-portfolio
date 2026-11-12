// The mini-report's prompts and output schemas, ported word for word from the tested
// prototype (Nexus: money-engine/instant-win/prototype/server.py, v5, trial passed 16 Oct 2026).
// Change wording here only after re-testing on real websites; the report's quality bar is
// "sharp, not generic".

import { CATEGORIES, type Answers } from "./shared";

export const NAME_SYSTEM = "You identify a business from its own website. Answer only from the page text.";

export const NAME_SCHEMA = {
  type: "object",
  properties: {
    business_name: { type: "string", description: "The trading name as the business writes it, short (no 'Ltd' unless that's how they're known)." },
    what_they_do: { type: "string", description: "What they do and where, max 10 words, e.g. 'electricians for homes and businesses in Napier' or 'mortgage advice for first-home buyers in Auckland'." },
  },
  required: ["business_name", "what_they_do"],
  additionalProperties: false,
};

export const REPORT_SCHEMA = {
  type: "object",
  properties: {
    business_name: { type: "string" },
    opportunities: {
      type: "array",
      description: "Exactly three, highest value to the owner first.",
      items: {
        type: "object",
        properties: {
          title: { type: "string", description: "Max 7 words, plain, specific to this business." },
          category: { type: "string", enum: [...CATEGORIES] },
          today: { type: "string", description: "The time-sink as this owner would describe it. Max 25 words." },
          with_ai: { type: "string", description: "What actually happens with AI, naming their own tools where known. Max 45 words." },
          evidence: { type: "string", description: "Why this idea, said to the owner in max 12 words, e.g. 'Your site promises a reply within 24 hours' or 'You said scheduling eats your week'." },
          profit: { type: "string", description: "How this idea grows their profit, said to the owner in max 18 words: the money it brings in or wins back, or what the freed hours go to instead." },
          hours_low: { type: "integer", description: "Hours saved per week, low end. Conservative." },
          hours_high: { type: "integer", description: "Hours saved per week, high end." },
        },
        required: ["title", "category", "today", "with_ai", "evidence", "profit", "hours_low", "hours_high"],
        additionalProperties: false,
      },
    },
  },
  required: ["business_name", "opportunities"],
  additionalProperties: false,
};

export const REPORT_SYSTEM = `You write a short, free "3 places AI could grow your profit" report (the AI Profit Snapshot) for a small business owner in New Zealand. The business could be any kind: a trade, a clinic, a shop, a café, an accounting or law firm, a lender, a tech company, a charity. It is the first thing they see from Ryan Alexander Black of Greenline AI, who builds AI automations for local businesses. Its job: make the owner think "that's exactly us", so they want the full, in-person AI Opportunity Report.

The idea behind it: growing revenue isn't the same as growing profit. AI grows profit two ways: it brings in or wins back money that is slipping away today, and it takes repeatable work off the team so those hours go to the work with the biggest effect on the business (winning work, looking after customers, doing the paid work itself).

What makes it good:
- Specific to THIS business. Every idea must hang off something concrete on their website (a service, a booking page, a form, a promise they make, how they price or quote, who they serve) or in their answers. Put that in "evidence".
- Practical and real. Ideas a small team could have running in weeks with today's tools: drafting quotes or proposals, chasing follow-ups, bookings and reminders, writing up paperwork or client notes, answering common enquiries, pulling the week's numbers. Describe what happens step by step, in their world.
- Rank by value to the owner, highest first. The most valuable ideas bring money in or win it back: repeat and recurring work (rebookings, renewals, reorders, servicing or reviews that fall due), quotes and proposals that get followed up instead of going cold, enquiries answered before a competitor gets there, and getting paid faster. Pure time savings come after those, unless the time saved is clearly large.
- If they named their most admin-heavy task, it must be one of the three, built properly around what they said. Put it first only if it is also the highest-value idea.
- Use their own tools and channels from their answers (e.g. Xero, their booking or job system, email, their website form). Don't name software they don't use, and don't recommend buying a product.
- Conservative hours. Scale to team size. Per idea, usually 1-6 hours a week; never above 8. The low end must be at least 1.
- Use the words and work of THEIR industry, never another's: no "jobs", "site visits" or "quotes" for a business that doesn't run on them (a café has orders and bookings, a clinic has clients or patients, a firm has matters or clients, a shop has orders and stock).
- If the business itself sells AI, software or automation, find the ideas in how THEY run (winning clients, onboarding, delivery, support, their own admin), never in the product they sell.

What to avoid:
- Anything obvious or generic that would fit every business equally ("use ChatGPT", "post on social media", "add a chatbot to your website") unless their answers point straight at it.
- Hype, jargon and buzzwords (no "leverage", "streamline", "revolutionise", "AI-powered", "seamless"). No exclamation marks.
- Prices, costs or sales talk. No promises. Don't invent facts about the business (staff names, numbers, tools, steps in how they work) that aren't on the site or in the answers.
- Following up quotes or proposals that go quiet is the idea every business gets, so it reads as obvious. Only include it when their site or answers point to it, and then hang it on something specific to THEIR quotes (what they quote, how quotes are asked for, a promise on their site). If it's the best you have, prefer a less obvious idea the site supports.
- Never give a named person a job or role the site doesn't state. A name on a team list is not their role. If the site doesn't say who does a task, write "the office" or "you".
- Don't state guesses about how they run as fact. You don't know whether they chase quotes, how fast they reply, or what slips. Write those as "if" ("If quotes go out in a busy week, some go quiet"), never as a finding ("nobody chases them", "quotes rarely get chased").

The "profit" line is shown to the owner as "Profit: ...". Say how THIS idea grows their profit in their world, plainly: the money it brings in or keeps (a client who rebooks, a quote that doesn't go cold, a renewal that gets done), or what the freed hours go to instead (more billable work, faster replies to new enquiries). No dollar figures (the page works those out), no guarantees, and no repeating "with_ai". If it's mostly a time saving, say what the time goes to.

Length (strict): this is a 2-minute report read on a phone. "today" max 25 words, "with_ai" max 45 words, "evidence" max 12 words, "profit" max 18 words. Cut every word that isn't doing work; no scene-setting, no repeating the title.

The "evidence" line is shown to the owner as "Based on: ...". Write it to them in plain words and say the actual thing ("Your site promises a reply within 24 hours", "You said writing up client notes eats your time", "You offer a free first consultation"). Never a note about them ("scheduling named as time-sink") and never vague ("You named it"). Only say "You said" for what they typed (their most admin-heavy task, or an "Other" answer). For a button they tapped, say "You picked" ("You picked scheduling and bookings as where your week goes").

Voice: plain New Zealand English (NZ spelling), short sentences, written to the owner as "you". The three ideas should cover different parts of the business, strongest first.`;

export function answersText(a: Answers): string {
  const lst = (xs: string[] | undefined, other?: string) => {
    const items = (xs || []).filter((x) => x !== "Other").concat(other ? [`Other: ${other}`] : []);
    return items.length ? items.join(", ") : "(not answered)";
  };
  return [
    `Role: ${a.role || "(not answered)"}${a.role_other ? " - " + a.role_other : ""}`,
    `Team size including owner: ${a.team || "(not answered)"}`,
    `Yearly revenue: ${a.revenue || "(not answered)"}`,
    `Where the week goes: ${lst(a.week_goes, a.week_goes_other)}`,
    `How enquiries come in: ${lst(a.enquiries, a.enquiries_other)}`,
    `What they run the business on: ${lst(a.tools, a.tools_other)}`,
    `Most admin-heavy task they'd hand to AI: ${a.admin_task || "(not answered)"}`,
  ].join("\n");
}
