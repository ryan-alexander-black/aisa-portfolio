// Investment Strategy Engine system diagram — inline SVG so it's crisp at any
// size and themes automatically (every colour is a brand CSS variable, defined
// per light/dark). The whole point of the picture: the deterministic engine (the
// maths, exact) is split hard from the narrow LLM layer (linguistic only).

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

// A labelled chip inside one of the engine containers.
function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={6} fill={BG} stroke={B} />
      <text
        x={x + w / 2}
        y={y + 17}
        textAnchor="middle"
        style={{ font: `400 10px ${MONO}` }}
        fill={M}
      >
        {label}
      </text>
    </g>
  );
}

// One labelled connector. Label is drawn off the line so text never sits on the arrow.
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
      <path d={d} fill="none" stroke={M} strokeWidth={1.3} markerEnd="url(#ah-st)" />
      {label && lx != null && ly != null && (
        <text x={lx} y={ly} textAnchor={anchor} style={{ font: `400 9.5px ${MONO}` }} fill={M}>
          {label}
        </text>
      )}
    </g>
  );
}

export function SuperTrackerArchitecture() {
  return (
    <svg
      viewBox="0 0 900 600"
      className="w-full"
      role="img"
      aria-label="Investment Strategy Engine system architecture diagram"
    >
      <defs>
        <marker id="ah-st" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
          <path d="M0,0 L8,3.5 L0,7 Z" fill={M} />
        </marker>
      </defs>

      {/* ── Inputs (top) ── */}
      <Node x={30} y={20} w={250} h={56} title="framework.toml" sub="rulebook AS DATA" accent />
      <Node x={325} y={20} w={240} h={56} title="workflows/*.md" sub="Layer 1 — SOPs" />
      <Node x={610} y={20} w={260} h={56} title="live data" sub="EOD prices + FRED macro" />

      {/* ── Orchestration ── */}
      <Node
        x={305}
        y={120}
        w={300}
        h={56}
        title="agent/run_report.py"
        sub="Layer 2 — cron: daily · weekly · monthly"
        accent
      />

      <Edge d="M155,78 L410,118" />
      <Edge d="M445,78 L455,116" />
      <Edge d="M740,78 L500,118" />

      {/* ── The split: deterministic engine vs narrow LLM layer ── */}
      {/* Left — deterministic (solid green: the reliability guarantee) */}
      <rect x={40} y={232} width={470} height={186} rx={14} fill={SURFACE} stroke={G} strokeWidth={1.5} />
      <text x={60} y={260} style={{ font: `700 14px ${DISPLAY}` }} fill={T}>
        Deterministic Python — the maths, exact
      </text>
      <text x={60} y={277} style={{ font: `400 10px ${MONO}` }} fill={M}>
        stdlib-only · computed from stored price history
      </text>
      <Chip x={60} y={290} w={210} label="indicators · MA / RSI / StochRSI" />
      <Chip x={285} y={290} w={205} label="score · tiers + grade bands" />
      <Chip x={60} y={326} w={210} label="gates · move-eligibility" />
      <Chip x={285} y={326} w={205} label="vetoes · bubble / debt-cycle" />
      <Chip x={60} y={362} w={210} label="triggers · HY-spread / 50dMA" />
      <Chip x={285} y={362} w={205} label="cadence · daily/weekly/monthly" />

      {/* Right — narrow LLM (dashed muted: linguistic, never the numbers) */}
      <rect
        x={560}
        y={232}
        width={310}
        height={186}
        rx={14}
        fill={SURFACE}
        stroke={M}
        strokeDasharray="4 3"
      />
      <text x={580} y={260} style={{ font: `700 14px ${DISPLAY}` }} fill={T}>
        Claude (LLM) — linguistic only
      </text>
      <text x={580} y={277} style={{ font: `400 10px ${MONO}` }} fill={M}>
        used around the numbers, never to produce them
      </text>
      <Chip x={580} y={296} w={270} label="news sentiment" />
      <Chip x={580} y={336} w={270} label="report narrative" />
      <Chip x={580} y={376} w={270} label="insight chat — explain your data" />

      <Edge d="M430,178 L300,230" label="exact maths" lx={330} ly={206} anchor="start" />
      <Edge d="M480,178 L660,230" label="narrative" lx={620} ly={206} anchor="start" />

      {/* ── Persistence ── */}
      <Node
        x={250}
        y={452}
        w={400}
        h={52}
        title="SQLite — data/super.db"
        sub="reports · gates · allocations · decisions · alerts"
      />
      <Edge d="M275,418 L420,450" />
      <Edge d="M715,418 L590,450" />

      {/* ── Serving ── */}
      <Node x={150} y={530} w={250} h={50} title="FastAPI — api/" />
      <Node
        x={470}
        y={530}
        w={360}
        h={50}
        title="Next.js dashboard"
        sub="position · gates · score history · chat"
      />
      <Edge d="M400,504 L300,528" />
      <Edge d="M400,555 L468,555" />
    </svg>
  );
}
