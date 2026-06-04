import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Constellation } from "@/components/constellation";

export const metadata: Metadata = {
  title: "Ryan Alexander Black — AI Solutions Architect",
  description:
    "Business-strong builder who architects whole systems — turning ideas into working AI software, end to end. Selected builds and case studies.",
  metadataBase: new URL("https://www.ryanalexanderblack.com"),
  openGraph: {
    title: "Ryan Alexander Black — AI Solutions Architect",
    description:
      "Business-strong builder who architects whole systems — turning ideas into working AI software, end to end.",
    type: "website",
    url: "https://www.ryanalexanderblack.com",
    siteName: "Ryan Alexander Black",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Alexander Black — AI Solutions Architect",
    description:
      "Business-strong builder who architects whole systems — turning ideas into working AI software, end to end.",
  },
  // og:image / twitter:image are generated automatically from
  // app/opengraph-image.png and app/twitter-image.png (1200×630).
};

// Runs before paint so there's no flash of the wrong theme. Defaults to dark
// (the brand's signature look) on first visit; remembers the user's choice after.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';var c=document.documentElement.classList;if(t==='light'){c.add('light');c.remove('dark');}else{c.add('dark');c.remove('light');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Constellation />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
