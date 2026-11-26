// The Greenline AI page frame (lockup, header, footer), shared by the sales page and its privacy +
// terms pages. No hooks and no server-only imports, so server and client components can both use it.
import Image from "next/image";

export const CTA = "Get my free AI Profit Snapshot";
/** The next step, on /full-report: the Full AI Opportunity Report (good fits only, by the report flow's fit rule). */
export const APPLY = "Apply for your Full AI Opportunity Report";

export function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg className="gl-mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="2,18 8,14 13,16 21,5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2" cy="18" r="1.8" fill="currentColor" />
      <circle cx="8" cy="14" r="1.8" fill="currentColor" />
      <circle cx="13" cy="16" r="1.8" fill="currentColor" />
      <circle cx="21" cy="5" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function Lockup() {
  return (
    <div className="gl-lockup">
      <Mark />
      <div>
        <div className="gl-lockup-name">Greenline <b>AI</b></div>
        <div className="gl-lockup-by">with Ryan Alexander Black · AI for NZ businesses</div>
      </div>
    </div>
  );
}

/** `cta`: where the header button goes (none when null), `label` its words. `home`: make the lockup a link home. */
export function Header({ cta = "#report", label = CTA, home = false, newTab = false }: {
  cta?: string | null; label?: string; home?: boolean; newTab?: boolean;
}) {
  return (
    <header className="gl-header">
      <div className="gl-header-in">
        {/* A full page load on purpose: on greenlineai.nz "/" is the proxy's rewrite to /greenline, and
            client-side routing would resolve "/" to the portfolio's own home page. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        {home ? <a className="gl-home" href="/" aria-label="Greenline AI home"><Lockup /></a> : <Lockup />}
        {cta && <a className="gl-btn gl-btn-sm button-sm" href={cta} {...(newTab ? NEW_TAB : {})}>{label}</a>}
      </div>
    </header>
  );
}

/** Opens a link in a new tab (Ryan, 26 Nov: from the homepage, the snapshot and newsletter pages open in a new tab). */
export const NEW_TAB = { target: "_blank", rel: "noopener" } as const;

/** "Hey, I'm Ryan" as a dark band: the homepage and the snapshot page (26 Nov). Short and general on purpose; the
 *  welcome email tells the full story (money-engine/greenline-page.md). */
export function RyanBand() {
  return (
    <section className="gl-section gl-on-band gl-nl-who-band">
      <div className="gl-nl-who">
        <div className="gl-nl-who-photo">
          <Image src="/ryan-headshot.png" alt="Ryan Alexander Black" fill sizes="180px" />
        </div>
        <div>
          <p className="gl-eyebrow eyebrow">Who&apos;s behind it</p>
          <h2 className="gl-heading display-lg">Hey, I&apos;m Ryan.</h2>
          <p className="body gl-mt-2">
            I&apos;m based in Napier, New Zealand. I&apos;ve spent the last 7+ years building and running small businesses,
            and one thing always came back: profit is what matters most. So I started Greenline AI, to help NZ businesses
            grow without their costs growing with them.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="gl-footer caption">
      <span>Greenline AI · with Ryan Alexander Black · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span>
      <span>greenlineai.nz</span>
    </footer>
  );
}
