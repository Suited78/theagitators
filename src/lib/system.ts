/**
 * The signature motif: a fixed set of nodes that reorganises through five
 * states as the visitor scrolls.
 *
 *   Complexity → Understanding → Redesign → Capability → Momentum
 *
 * Every state supplies a position for the same node index, so the system
 * appears to reorganise rather than redraw. Edge sets crossfade between
 * states while the nodes glide, which is what sells "transformation"
 * instead of "network diagram".
 *
 * Coordinates are normalised to 0..1 and stretched to the canvas box, so the
 * same system reads well in a tall hero panel and a wide sticky band.
 */

export const NODE_COUNT = 44;
export const STATE_COUNT = 5;

export type Point = { x: number; y: number };
export type Edge = readonly [number, number];
export type SystemState = {
  name: string;
  points: Point[];
  edges: Edge[];
  /** How much ambient wander the nodes retain in this state (0..1). */
  restlessness: number;
};

/** Deterministic PRNG so the motif is identical on every render and machine. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 01 — Complexity: scattered, tangled, too many connections to read. */
function complexity(): SystemState {
  const rand = mulberry32(9137);
  const points: Point[] = Array.from({ length: NODE_COUNT }, () => ({
    x: 0.04 + rand() * 0.92,
    y: 0.05 + rand() * 0.9,
  }));
  const edges: Edge[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const links = 1 + Math.floor(rand() * 2);
    for (let k = 0; k < links; k++) {
      const j = Math.floor(rand() * NODE_COUNT);
      if (j !== i) edges.push([i, j]);
    }
  }
  return { name: "Complexity", points, edges, restlessness: 1 };
}

/** 02 — Understanding: the same nodes resolve into four legible clusters. */
function understanding(): SystemState {
  const rand = mulberry32(4421);
  const centres: Point[] = [
    { x: 0.2, y: 0.28 },
    { x: 0.72, y: 0.22 },
    { x: 0.3, y: 0.76 },
    { x: 0.79, y: 0.68 },
  ];
  const points: Point[] = [];
  const edges: Edge[] = [];
  const hubs: number[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const c = i % centres.length;
    const isHub = i < centres.length;
    if (isHub) {
      hubs[c] = i;
      points.push({ ...centres[c] });
      continue;
    }
    const angle = rand() * Math.PI * 2;
    const radius = 0.06 + rand() * 0.13;
    points.push({
      x: centres[c].x + Math.cos(angle) * radius,
      y: centres[c].y + Math.sin(angle) * radius * 0.82,
    });
    edges.push([i, hubs[c]]);
  }
  // A single thread between clusters keeps it one system, not four islands.
  for (let c = 1; c < centres.length; c++) edges.push([hubs[c - 1], hubs[c]]);
  return { name: "Understanding", points, edges, restlessness: 0.62 };
}

/** 03 — Redesign: rebuilt onto an explicit grid, connections orthogonal. */
function redesign(): SystemState {
  const cols = 11;
  const rows = Math.ceil(NODE_COUNT / cols);
  const points: Point[] = [];
  const edges: Edge[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    points.push({
      x: 0.07 + (col / (cols - 1)) * 0.86,
      y: 0.16 + (row / Math.max(1, rows - 1)) * 0.68,
    });
    if (col > 0) edges.push([i - 1, i]);
    if (row > 0) edges.push([i - cols, i]);
  }
  return { name: "Redesign", points, edges, restlessness: 0.28 };
}

/** 04 — Capability: a load-bearing lattice, wider at the base. */
function capability(): SystemState {
  const bands = [6, 8, 10, 10, 10];
  const points: Point[] = [];
  const edges: Edge[] = [];
  const rowIndex: number[][] = [];
  let i = 0;
  for (let b = 0; b < bands.length; b++) {
    const count = bands[b];
    const row: number[] = [];
    const spread = 0.34 + (b / (bands.length - 1)) * 0.54;
    for (let n = 0; n < count && i < NODE_COUNT; n++, i++) {
      const t = count === 1 ? 0.5 : n / (count - 1);
      points.push({
        x: 0.5 + (t - 0.5) * spread * 2,
        y: 0.16 + (b / (bands.length - 1)) * 0.68,
      });
      row.push(i);
    }
    rowIndex.push(row);
  }
  while (points.length < NODE_COUNT) points.push({ x: 0.5, y: 0.5 });
  for (const row of rowIndex) {
    for (let n = 1; n < row.length; n++) edges.push([row[n - 1], row[n]]);
  }
  for (let b = 1; b < rowIndex.length; b++) {
    const above = rowIndex[b - 1];
    const below = rowIndex[b];
    for (let n = 0; n < below.length; n++) {
      const target = above[Math.min(above.length - 1, Math.round((n / Math.max(1, below.length - 1)) * (above.length - 1)))];
      if (target !== undefined) edges.push([below[n], target]);
    }
  }
  return { name: "Capability", points, edges, restlessness: 0.18 };
}

/** 05 — Momentum: the lattice releases into parallel lines of travel. */
function momentum(): SystemState {
  const lanes = 5;
  const perLane = Math.ceil(NODE_COUNT / lanes);
  const points: Point[] = [];
  const edges: Edge[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const lane = Math.floor(i / perLane);
    const n = i % perLane;
    const t = n / (perLane - 1);
    points.push({
      x: 0.04 + t * 0.92,
      y: 0.2 + (lane / (lanes - 1)) * 0.6 - t * 0.09,
    });
    if (n > 0) edges.push([i - 1, i]);
  }
  return { name: "Momentum", points, edges, restlessness: 0.4 };
}

export const systemStates: SystemState[] = [
  complexity(),
  understanding(),
  redesign(),
  capability(),
  momentum(),
];

/** Per-node phase and amplitude for the ambient wander. */
export const drift = (() => {
  const rand = mulberry32(2266);
  return Array.from({ length: NODE_COUNT }, () => ({
    phase: rand() * Math.PI * 2,
    speed: 0.35 + rand() * 0.5,
    ampX: (rand() - 0.5) * 0.02,
    ampY: (rand() - 0.5) * 0.02,
  }));
})();

/** Node indices drawn in the accent colour — the eye needs somewhere to land. */
export const accentNodes = new Set([0, 17, 30]);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
