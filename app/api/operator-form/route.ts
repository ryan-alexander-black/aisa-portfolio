import type { NextRequest } from "next/server";
import { handleIntake } from "@/lib/intake-email";

// Human-readable labels for the email summary, in the order they appear on the form.
const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  role: "Role & organisation",
  involves: "What the role involves day to day",
  timeEaters: "Biggest time-eaters / most repetitive tasks",
  handOff: "One task they'd hand off tomorrow",
  tools: "Tools / software they use most",
  anythingSpecific: "Anything specific to look at",
};

export async function POST(request: NextRequest) {
  return handleIntake(request, { labels: LABELS, kind: "operator intake" });
}
