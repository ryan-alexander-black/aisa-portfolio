import type { NextRequest } from "next/server";
import { handleIntake } from "@/lib/intake-email";

// Human-readable labels for the email summary, in the order they appear on the form.
const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  business: "Business & website",
  teamSize: "Team size",
  sells: "What the business does / sells",
  customer: "Typical customer",
  findYou: "How customers find them",
  ownerTimeEaters: "Owner's biggest time-eaters",
  painAreas: "Where things feel slowest / messiest / most manual",
  magicWand: "Magic wand — 10 hours back",
  aiTried: "AI tools tried so far",
  success: "What success looks like",
  anythingSpecific: "Anything specific to look at",
};

export async function POST(request: NextRequest) {
  return handleIntake(request, { labels: LABELS, kind: "business intake" });
}
