import type { NextRequest } from "next/server";
import { handleIntake } from "@/lib/intake-email";

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  message: "Message",
};

export async function POST(request: NextRequest) {
  return handleIntake(request, { labels: LABELS, kind: "enquiry" });
}
