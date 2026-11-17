import { openContext } from "@/lib/mini-report/server";

// greenlineai.nz/next?s=… (the snapshot email's Apply button): turns the sealed link back into the
// snapshot's context so the application arrives pre-filled on any device. A bad or old link just
// returns nothing, and the visitor fills in the email + website themselves.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const ctx = openContext(String(body.s || ""));
  if (!ctx) return Response.json({ error: "That link has expired." }, { status: 404 });
  return Response.json(ctx, { headers: { "Cache-Control": "no-store" } });
}
