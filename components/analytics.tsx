"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureUtm } from "@/lib/track";

// Site-wide tracking tags. Each loads only when its ID is set in the environment, so nothing
// third-party runs until Ryan adds the IDs (GA4, Meta Pixel, Google Ads). UTM capture always runs
// (it stays in the visitor's own browser until they ask for a report).
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** `metaPixel`: load the Meta Pixel (Greenline AI's dataset). Only the Greenline layout passes it, so the portfolio's
 *  visitors and /ai-report leads never count as Greenline conversions (13 Nov). */
export function Analytics({ metaPixel = false }: { metaPixel?: boolean }) {
  useEffect(() => captureUtm(), []);
  const gtagId = GA4 || ADS;
  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());` +
              (GA4 ? `gtag('config','${GA4}');` : "") +
              (ADS ? `gtag('config','${ADS}');` : "")}
          </Script>
        </>
      )}
      {metaPixel && PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
