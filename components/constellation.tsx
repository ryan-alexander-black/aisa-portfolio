// Background constellation — a dense, glowing mesh of interconnected nodes
// ("interconnected AI solutions"), in the language of the brand's constellation
// mark (brand/logo/options/opt6-constellation: green-gradient nodes meshed by
// thin lines). Fixed behind all content; the reading band (body::after) veils
// it under the text column so it stays legible.
//
// The field is a jittered grid meshed to its neighbours — generated once at
// module load with a deterministic PRNG, so server and client render the exact
// same nodes (no hydration mismatch) without hand-placing hundreds of points.

type Node = { x: number; y: number; r: number };

const VW = 1440;
const VH = 960;
const COLS = 22;
const ROWS = 14;

// Deterministic [0,1) from an integer seed (mulberry32 step). Same output on
// server and client — the whole point, so React doesn't see two different DOMs.
function rand(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const cellW = VW / (COLS - 1);
const cellH = VH / (ROWS - 1);
const idx = (c: number, r: number) => r * COLS + c;

const NODES: Node[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = idx(c, r);
    const x = c * cellW + (rand(i * 2 + 1) - 0.5) * cellW * 0.82;
    const y = r * cellH + (rand(i * 2 + 7) - 0.5) * cellH * 0.82;
    const hub = rand(i * 5 + 3) > 0.84; // ~16% brighter, larger hub nodes
    NODES.push({ x, y, r: hub ? 3.6 : 1.9 });
  }
}

// Mesh each node to its right / down / (sometimes) down-right neighbour. With
// the jitter, the straight grid deforms into an organic network of triangles.
const EDGES: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const a = idx(c, r);
    if (c < COLS - 1) EDGES.push([a, idx(c + 1, r)]);
    if (r < ROWS - 1) EDGES.push([a, idx(c, r + 1)]);
    if (c < COLS - 1 && r < ROWS - 1 && rand(a * 11 + 5) > 0.42) EDGES.push([a, idx(c + 1, r + 1)]);
  }
}

export function Constellation() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      <svg className="h-full w-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="constellation" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2EE6A6" />
            <stop offset="1" stopColor="#11D38B" />
          </linearGradient>
          {/* Green halo, like the section hover-glow — blurred copy under the crisp node. */}
          <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        <g stroke="url(#constellation)" strokeWidth="0.9" strokeLinecap="round" opacity="0.3">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>

        {/* Glowing nodes */}
        <g fill="url(#constellation)" filter="url(#nodeGlow)" opacity="0.9">
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
