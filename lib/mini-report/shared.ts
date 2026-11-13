// Types, the fit rule and the money maths, shared by the server and the browser.
// (Kept apart from prompts.ts so the page doesn't ship the AI prompt to every visitor.)

export const CATEGORIES = [
  "quotes", "followups", "scheduling", "bookings", "reporting", "messages",
  "marketing", "ordering", "paperwork", "other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Answers = {
  role?: string; role_other?: string;
  team?: string; revenue?: string;
  week_goes?: string[]; week_goes_other?: string;
  enquiries?: string[]; enquiries_other?: string;
  tools?: string[]; tools_other?: string;
  admin_task?: string;
};

export type Opportunity = {
  title: string; category: Category; today: string; with_ai: string; evidence: string;
  /** How this idea grows profit, said to the owner (added 12 Nov; absent on older reports). */
  profit?: string;
  hours_low: number; hours_high: number;
};
export type Report = { business_name: string; opportunities: Opportunity[] };

// Fit (Ryan, 15 Oct): owner/manager AND (team 2+ OR revenue $250k+).
// Skipped the questions = unknown = still shown the offer; Ryan qualifies on the call.
export type Fit = "good" | "low" | "unknown";
export function fitOf(a: Answers): Fit {
  const { role, team, revenue: rev } = a;
  const bigRev = rev === "$250k–$1M" || rev === "$1M–$5M" || rev === "$5M+";
  const hasTeam = !!team && team !== "Just me";
  if (!role && !team && !rev) return "unknown";
  if (role === "Other") return "low";
  if (hasTeam || bigRev || (!team && !rev)) return "good";
  return "low";
}

// Money maths (deterministic, never the AI's): a $75k salary is about $36 an hour.
export const HOURLY_RATE = 75000 / 52 / 40;
export function yearlyDollars(hoursPerWeek: number): string {
  return "$" + (Math.round((hoursPerWeek * HOURLY_RATE * 52) / 100) * 100).toLocaleString("en-NZ");
}

/** A name's possessive: "Oldershaw Accountants’", "Habit Health’s". */
export const poss = (n: string) => (/s$/i.test(n) ? `${n}’` : `${n}’s`);

// The snapshot's money wording, shared by the screen and the email (Ryan, 12 Nov: time back is profit
// in your pocket, or a team freed for the work with the biggest effect on the business).
export const GAIN_LINE =
  "Every hour AI takes off your team is money you keep, or an hour they put into the work that moves the business most: winning work, looking after customers, growing.";
export const BASIS_LINE =
  "Money figures only count the admin time saved, valued at one person's $75,000 a year salary (about $36 an hour). They don't count the extra work these ideas could win back, which can be the bigger gain. Every figure is a rough estimate, not a promise.";

// How the snapshot was made (Ryan, 12 Nov): AI is only as good as its input. The snapshot is a best guess from a
// 90-second read of the website + a few answers; the Full AI Opportunity Report is where the real picture comes from.
export const INPUT_NOTE_TITLE = "How this was made";
export const INPUT_NOTE =
  "AI is only as good as what it's given. This snapshot came from your website and a few quick answers, in about 90 seconds, so treat these ideas as best guesses, not a plan. The real picture comes from how your business actually runs, day to day.";
