// Background constellation — interconnected nodes ("interconnected AI
// solutions"), drawn in the language of the brand's constellation mark
// (brand/logo/options/opt6-constellation: green-gradient nodes meshed by thin
// lines). Fixed and faint, behind all content; the reading band (body::after)
// veils it under the text column so it never hurts legibility. Coordinates are
// hand-placed (deterministic — no random, so no hydration drift) and biased to
// the left/right thirds, leaving a calmer channel down the middle.

type Node = { x: number; y: number; r: number };

// viewBox is 1440 × 960; the SVG slices to cover any viewport.
const NODES: Node[] = [
  // left cluster
  { x: 90, y: 170, r: 5 }, // 0 hub
  { x: 250, y: 90, r: 3 }, // 1
  { x: 160, y: 360, r: 3 }, // 2
  { x: 330, y: 300, r: 4 }, // 3
  { x: 120, y: 560, r: 3 }, // 4
  { x: 300, y: 650, r: 5 }, // 5 hub
  { x: 180, y: 820, r: 3 }, // 6
  { x: 410, y: 880, r: 4 }, // 7
  { x: 60, y: 900, r: 3 }, // 8
  // centre (sparse)
  { x: 620, y: 150, r: 3 }, // 9
  { x: 700, y: 520, r: 4 }, // 10
  { x: 560, y: 820, r: 3 }, // 11
  { x: 830, y: 300, r: 3 }, // 12
  // right cluster
  { x: 1020, y: 120, r: 4 }, // 13
  { x: 1180, y: 220, r: 5 }, // 14 hub
  { x: 1330, y: 140, r: 3 }, // 15
  { x: 1100, y: 430, r: 3 }, // 16
  { x: 1300, y: 480, r: 5 }, // 17 hub
  { x: 1180, y: 670, r: 4 }, // 18
  { x: 1360, y: 770, r: 3 }, // 19
  { x: 1000, y: 830, r: 4 }, // 20
  { x: 1250, y: 880, r: 3 }, // 21
];

const EDGES: [number, number][] = [
  // left mesh
  [0, 1], [0, 3], [1, 3], [0, 2], [2, 3], [2, 4], [4, 5], [3, 5], [5, 6], [6, 7], [6, 8], [5, 7],
  // centre links (mostly veiled by the reading band)
  [1, 9], [9, 12], [12, 13], [3, 9], [10, 5], [10, 18], [11, 7], [11, 20], [10, 12],
  // right mesh
  [13, 14], [14, 15], [13, 16], [14, 16], [16, 17], [14, 17], [17, 18], [18, 19], [18, 20], [20, 21], [19, 21], [17, 19],
  // a couple of long spines tying the whole system together
  [5, 10], [10, 16],
];

export function Constellation() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="constellation" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2EE6A6" />
            <stop offset="1" stopColor="#11D38B" />
          </linearGradient>
        </defs>
        <g stroke="url(#constellation)" strokeWidth="1" strokeLinecap="round" opacity="0.2">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>
        <g fill="url(#constellation)" opacity="0.55">
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
