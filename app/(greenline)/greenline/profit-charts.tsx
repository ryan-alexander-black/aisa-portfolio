// The green line (Ryan, 13 Nov): flat today, a small lift after the snapshot, a steep climb after the report,
// and close to revenue once it's built. An illustration, not data. Drawn in Nexus first
// (money-engine/greenline-posts/profit-line-v2.html) and copied here; the curves are fixed paths.

const REVENUE =
  "M20,206 L110,206 C135.2,202.7 208.3,197.7 260,186 C311.7,174.3 363.3,157.3 420,136 C476.7,114.7 570,71 600,58";
const PROFIT =
  "M20,264 L110,264 C135.2,260.7 208.3,257 260,244 C311.7,231 363.3,212.7 420,186 C476.7,159.3 570,101 600,84";
const PROFIT_FLAT =
  "M20,264 L110,264 C135.2,263.7 208.3,263 260,262 C311.7,261 363.3,259.7 420,258 C476.7,256.3 570,253 600,252";
const STEPS: [number, string][] = [[110, "TODAY"], [260, "SNAPSHOT"], [420, "REPORT"], [600, "BUILT"]];
const NODES: [number, number][] = [[110, 264], [260, 244], [420, 186], [600, 84]];

/** The glowing green line through Today → Snapshot → Report → Built, on the dark band. `id` keeps the
 *  gradient and glow ids unique when the chart appears twice on a page. */
export function GreenLineChart({ id }: { id: string }) {
  return (
    <svg className="gl-chart-svg" viewBox="0 0 640 320" role="img"
         aria-label="Illustration: revenue and profit are flat today, lift a little after the snapshot, climb after the report, and profit nearly meets revenue once it's built">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2EE6A6" stopOpacity=".34" />
          <stop offset="1" stopColor="#2EE6A6" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="#1E2723" strokeWidth="1">
        <line x1="20" y1="80" x2="620" y2="80" /><line x1="20" y1="150" x2="620" y2="150" /><line x1="20" y1="220" x2="620" y2="220" />
      </g>
      <g stroke="#1E2723" strokeWidth="1" strokeDasharray="2 6">
        {STEPS.map(([x]) => <line key={x} x1={x} y1="40" x2={x} y2="280" />)}
      </g>
      <line x1="20" y1="280" x2="620" y2="280" stroke="#2A3530" strokeWidth="2" />
      <path d={REVENUE} fill="none" stroke="#9FB0A8" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" />
      <path d={`${PROFIT} L600,280 L20,280 Z`} fill={`url(#${id}-fill)`} />
      <path d={PROFIT} fill="none" stroke="#2EE6A6" strokeWidth="6" strokeLinecap="round" filter={`url(#${id}-glow)`} />
      <g fill="#2EE6A6" filter={`url(#${id}-glow)`}>
        {NODES.map(([x, y]) => <circle key={x} cx={x} cy={y} r={x === 600 ? 11 : 8} />)}
      </g>
      <circle cx="600" cy="84" r="24" fill="#2EE6A6" fillOpacity=".14" />
      <g fontFamily="var(--font-mono)" fontSize="15" fill="#9FB0A8" letterSpacing="1" textAnchor="middle">
        {STEPS.map(([x, t]) => <text key={x} x={x === 600 ? 588 : x} y="308">{t}</text>)}
      </g>
      <text x="586" y="40" textAnchor="end" fontSize="17" fill="#9FB0A8">Revenue</text>
      <text x="566" y="178" textAnchor="end" fontFamily="var(--font-display)" fontWeight="800" fontSize="28" fill="#2EE6A6">Profit</text>
    </svg>
  );
}

/** The usual way, on mist: the same revenue climb, profit barely moves. */
export function UsualWayChart() {
  return (
    <svg className="gl-chart-svg" viewBox="0 0 640 320" role="img"
         aria-label="Illustration: revenue climbs the usual way, but profit barely moves">
      <g stroke="#E6EBE8" strokeWidth="1">
        <line x1="20" y1="80" x2="620" y2="80" /><line x1="20" y1="150" x2="620" y2="150" /><line x1="20" y1="220" x2="620" y2="220" />
      </g>
      <line x1="20" y1="280" x2="620" y2="280" stroke="#CDD6D1" strokeWidth="2" />
      <path d={REVENUE} fill="none" stroke="#5C6B64" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" />
      <path d={PROFIT_FLAT} fill="none" stroke="#9FB0A8" strokeWidth="6" strokeLinecap="round" />
      <circle cx="600" cy="252" r="9" fill="#9FB0A8" />
      <g fontFamily="var(--font-mono)" fontSize="15" fill="#5C6B64" letterSpacing="1" textAnchor="middle">
        <text x="110" y="308">TODAY</text><text x="570" y="308">A YEAR ON</text>
      </g>
      <text x="586" y="40" textAnchor="end" fontSize="17" fill="#5C6B64">Revenue</text>
      <text x="586" y="234" textAnchor="end" fontFamily="var(--font-display)" fontWeight="700" fontSize="22" fill="#5C6B64">Profit barely moves</text>
    </svg>
  );
}
