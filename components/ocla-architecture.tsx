// OCLA system diagram — inline SVG so it's crisp at any size and themes
// automatically (every colour is a brand CSS variable, defined per light/dark).
// The community→app seam, the AI layer with its guards, data, and the cron flow.

const T = "var(--color-text)";
const M = "var(--color-text-muted)";
const B = "var(--color-border)";
const G = "var(--green-brand)";
const SURFACE = "var(--color-surface)";
const BG = "var(--color-bg)";
const DISPLAY = "var(--font-display)";
const MONO = "var(--font-mono)";

function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={BG}
        stroke={accent ? G : B}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
        textAnchor="middle"
        style={{ font: `600 13px ${DISPLAY}` }}
        fill={T}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          style={{ font: `400 10px ${MONO}` }}
          fill={M}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

// One labelled connector. Label is drawn OFF the line (above for horizontal,
// beside for vertical) so text never sits on the arrow.
function Edge({
  d,
  label,
  lx,
  ly,
  anchor = "middle",
}: {
  d: string;
  label?: string;
  lx?: number;
  ly?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={M} strokeWidth={1.3} markerEnd="url(#ah)" />
      {label && lx != null && ly != null && (
        <text x={lx} y={ly} textAnchor={anchor} style={{ font: `400 9.5px ${MONO}` }} fill={M}>
          {label}
        </text>
      )}
    </g>
  );
}

export function OclaArchitecture() {
  return (
    <svg viewBox="0 0 880 470" className="w-full min-w-[42rem] sm:min-w-0" role="img" aria-label="OCLA system architecture diagram">
      <defs>
        <marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
          <path d="M0,0 L8,3.5 L0,7 Z" fill={M} />
        </marker>
      </defs>

      {/* ── Acquisition seam (top, left → right) ── */}
      <Node x={20} y={20} w={150} h={52} title="Skool community" sub="paid member joins" accent />
      <Node x={210} y={20} w={130} h={52} title="Zapier webhook" />
      <Node x={380} y={20} w={210} h={52} title="/api/zapier/skool-join" sub="provisions 7-day trial" accent />

      <Edge d="M170,46 L204,46" />
      <Edge d="M340,46 L374,46" />
      {/* drop straight down into the app */}
      <Edge d="M485,72 L485,116" label="creates trial row" lx={495} ly={99} anchor="start" />

      {/* ── The app (big container) ── */}
      <rect x={20} y={120} width={530} height={210} rx={14} fill={SURFACE} stroke={B} />
      <text x={40} y={148} style={{ font: `700 14px ${DISPLAY}` }} fill={T}>
        OCLA — Next.js 16 · App Router · Vercel
      </text>
      <text x={40} y={166} style={{ font: `400 10px ${MONO}` }} fill={M}>
        7 surfaces · multi-tenant · AI helper on every page
      </text>

      {/* surface chips */}
      {[
        ["Foundation Builder", 40, 180],
        ["Content Planner", 200, 180],
        ["DM Support", 360, 180],
        ["KPI Tracker", 40, 214],
        ["Client Hub", 200, 214],
        ["Ad Planner", 360, 214],
        ["Website Generator", 40, 248],
        ["AI Helper", 200, 248],
      ].map(([label, x, y]) => (
        <g key={label as string}>
          <rect x={x as number} y={y as number} width={150} height={24} rx={6} fill={BG} stroke={B} />
          <text
            x={(x as number) + 75}
            y={(y as number) + 16}
            textAnchor="middle"
            style={{ font: `400 10px ${MONO}` }}
            fill={M}
          >
            {label as string}
          </text>
        </g>
      ))}

      <rect x={40} y={288} width={500} height={28} rx={6} fill="transparent" stroke={G} strokeDasharray="3 3" />
      <text x={290} y={306} textAnchor="middle" style={{ font: `500 11px ${MONO}` }} fill={G}>
        12 AI endpoints · maxDuration 60s · parallel fan-out (Promise.allSettled)
      </text>

      {/* ── Services (right column) — straight horizontal arrows, labels above ── */}
      <Node x={640} y={120} w={220} h={56} title="Claude Sonnet 4" sub="generation + chat" accent />
      <Node x={640} y={192} w={220} h={50} title="Upstash Redis" sub="200 req/hr rate limit" />
      <Node x={640} y={258} w={220} h={56} title="Supabase" sub="Postgres · Auth · RLS" />

      <Edge d="M550,148 L638,148" label="AI calls" lx={594} ly={139} />
      <Edge d="M550,217 L638,217" label="rate limit" lx={594} ly={208} />
      <Edge d="M550,286 L638,286" label="data · RLS" lx={594} ly={277} />

      {/* ── Infra (bottom) ── */}
      <Node x={20} y={370} w={250} h={56} title="Vercel Cron — daily" sub="trial-pulse" />
      <Node x={330} y={370} w={200} h={56} title="Resend" sub="trial digest email" />
      <Edge d="M275,398 L328,398" />
      {/* cron drives the trial clock back into the app (points up) */}
      <Edge d="M145,368 L145,332" label="drives trial clock" lx={155} ly={353} anchor="start" />
    </svg>
  );
}
