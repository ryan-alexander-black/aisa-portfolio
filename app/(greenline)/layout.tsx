import type { Metadata } from "next";
// The report flow's colours come from the shared Signal Green tokens; Greenline's own come from the kit.
import "../(site)/brand-tokens.css";
import "../(site)/ai-report/mini-report.css";
import "./greenline-kit.css";
import "./greenline-page.css";
import { Analytics } from "@/components/analytics";

// Greenline AI's own root layout: no portfolio header, footer, menu or background, so the page has
// nowhere to go but the form (money-engine/greenline-page.md). Light only, by design.
export const metadata: Metadata = {
  metadataBase: new URL("https://greenlineai.nz"),
};

export default function GreenlineLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions add attributes to <html> (as on the portfolio's layout).
    <html lang="en-NZ" className="light" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" />
      </head>
      <body>
        {children}
        <Analytics metaPixel />
      </body>
    </html>
  );
}
