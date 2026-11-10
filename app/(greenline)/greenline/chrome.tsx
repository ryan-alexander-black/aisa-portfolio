// The Greenline AI page frame (lockup, header, footer), shared by the sales page and its privacy +
// terms pages. No hooks and no server-only imports, so server and client components can both use it.

export const CTA = "Get my free AI Profit Snapshot";
/** The next step, on /next: the Full AI Opportunity Report (good fits only, by the report flow's fit rule). */
export const APPLY = "Apply for your Full AI Opportunity Report";

export function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg className="gl-mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="2,18 8,14 13,16 21,5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2.5" cy="18" r="1.8" fill="currentColor" />
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
export function Header({ cta = "#report", label = CTA, home = false }: { cta?: string | null; label?: string; home?: boolean }) {
  return (
    <header className="gl-header">
      <div className="gl-header-in">
        {/* A full page load on purpose: on greenlineai.nz "/" is the proxy's rewrite to /greenline, and
            client-side routing would resolve "/" to the portfolio's own home page. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        {home ? <a className="gl-home" href="/" aria-label="Greenline AI home"><Lockup /></a> : <Lockup />}
        {cta && <a className="gl-btn gl-btn-sm button-sm" href={cta}>{label}</a>}
      </div>
    </header>
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
