// Background constellation — a dense, structured, glowing mesh of
// interconnected nodes ("interconnected AI solutions"), in the language of the
// brand's constellation mark (brand/logo/options/opt6-constellation). Fixed
// behind all content; text sits on its own frosted plates (.text-plate) so the
// network shows everywhere except directly under the words.
//
// The field is a regular TRIANGULAR lattice (offset rows meshed to their
// neighbours) — symmetric and structured, not a random web. Nodes glow via
// soft gradient discs (not an SVG filter), so the per-node twinkle animates
// cheaply. Generated once at module load — fully deterministic, so it's
// identical on server and client (no hydration mismatch).

type Node = { x: number; y: number; r: number; dur: number; delay: number };

const VW = 1440;
const VH = 960;
const S = 88; // horizontal node spacing
const ROWH = S * 0.866; // equilateral-triangle row height
const COLS = Math.ceil(VW / S) + 2;
const ROWS = Math.ceil(VH / ROWH) + 2;

// Deterministic [0,1) from an integer seed (mulberry32 step) — same on server
// and client, used only to vary each node's twinkle timing.
function rand(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const at = (c: number, r: number) => r * COLS + c;

const NODES: Node[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = at(c, r);
    const x = (r % 2) * (S / 2) + c * S; // offset every other row → triangular
    const y = r * ROWH;
    const hub = c % 3 === 0 && r % 2 === 0; // regular, symmetric hub pattern
    NODES.push({ x, y, r: hub ? 3.3 : 1.8, dur: 4 + rand(i * 2) * 4, delay: rand(i * 2 + 1) * 6 });
  }
}

// Mesh each node to its row neighbour and the two nodes below it — clean
// equilateral triangles across the whole field.
const EDGES: [number, number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const a = at(c, r);
    if (c + 1 < COLS) EDGES.push([a, at(c + 1, r)]);
    if (r + 1 < ROWS) {
      EDGES.push([a, at(c, r + 1)]);
      if (r % 2 === 0) {
        if (c - 1 >= 0) EDGES.push([a, at(c - 1, r + 1)]);
      } else {
        if (c + 1 < COLS) EDGES.push([a, at(c + 1, r + 1)]);
      }
    }
  }
}

export function Constellation() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      <svg className="h-full w-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="cEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2EE6A6" />
            <stop offset="1" stopColor="#11D38B" />
          </linearGradient>
          {/* Soft node halo — a radial fade, so it reads as glow without a filter. */}
          <radialGradient id="cGlow">
            <stop offset="0%" stopColor="#2EE6A6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2EE6A6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections — a wide faint pass (the line "glow") under a crisp pass. */}
        <g stroke="#1FDD97" strokeWidth="3.5" strokeLinecap="round" opacity="0.1">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>
        <g stroke="url(#cEdge)" strokeWidth="0.9" strokeLinecap="round" opacity="0.34">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>

        {/* Glowing, twinkling nodes — halo disc + crisp core per node. */}
        {NODES.map((n, i) => (
          <g key={i} className="cnode" style={{ animationDuration: `${n.dur}s`, animationDelay: `${n.delay}s` }}>
            <circle cx={n.x} cy={n.y} r={n.r * 3.4} fill="url(#cGlow)" />
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#cEdge)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
