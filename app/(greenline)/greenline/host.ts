import { headers } from "next/headers";
import { notFound } from "next/navigation";

// Greenline pages exist only on Greenline's own domains (and locally for review). On the portfolio's
// host they 404, so nobody can trim a URL back into the portfolio (money-engine/greenline-page.md).
const HOSTS = /^(www\.)?greenlineai\.(nz|co\.nz)$|^localhost$|^127\.0\.0\.1$/;

export async function greenlineHostOnly() {
  const host = ((await headers()).get("host") || "").split(":")[0].toLowerCase();
  if (!HOSTS.test(host)) notFound();
}
