import type { NextRequest } from "next/server";
import { handleIntake } from "@/lib/intake-email";

const LABELS: Record<string, string> = {
  request: "Request",
  name: "Name",
  email: "Email",
  business: "Business",
  message: "Message",
};

export async function POST(request: NextRequest) {
  return handleIntake(request, { labels: LABELS, kind: "enquiry" });
}
