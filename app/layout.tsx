import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Ryan Alexander Black — AI Solutions Architect",
  description:
    "Business-strong builder who architects whole systems — turning ideas into working AI software, end to end. Selected builds and case studies.",
  metadataBase: new URL("https://ryanalexanderblack.com"),
  openGraph: {
    title: "Ryan Alexander Black — AI Solutions Architect",
    description:
      "Business-strong builder who architects whole systems — turning ideas into working AI software, end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Dark by default — the brand's signature look (dark surface, one green moment).
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
