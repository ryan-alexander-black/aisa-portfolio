import type { NextRequest } from "next/server";
import { handleIntake } from "@/lib/intake-email";

// greenlineai.nz/owner-form's answers → ryan@greenlineai.nz, from Greenline's own Resend account.
// The labels follow the form's order (app/(greenline)/greenline/owner-form/owner-form.tsx).
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
  return handleIntake(request, { labels: LABELS, kind: "owner form (Greenline)", greenline: true });
}
