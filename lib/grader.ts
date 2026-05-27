import { type Scenario } from './scenarios';

export type CanvasNode = {
  id: string;
  name: string;
};

export type CanvasEdge = {
  source: string; // node id
  target: string; // node id
};

export type GradeDiff = {
  missingNodes: string[];
  extraNodes: string[];
  missingEdges: { source: string; target: string }[];
  extraEdges: { source: string; target: string }[];
  correct: boolean;
};

function normalize(name: string): string {
  return name.toLowerCase().trim().replace(/[\s-]+/g, '_');
}

function resolveCanonical(name: string, scenario: Scenario): string | null {
  const n = normalize(name);
  for (const node of scenario.nodes) {
    if (n === normalize(node.canonical) || node.aliases.some((a) => normalize(a) === n)) {
      return node.canonical;
    }
  }
  return null;
}

export function grade(
  nodes: CanvasNode[],
  edges: CanvasEdge[],
  scenario: Scenario
): GradeDiff {
  // Map each canvas node id → canonical name (null if not recognized)
  const idToCanonical = new Map<string, string | null>();
  for (const node of nodes) {
    idToCanonical.set(node.id, resolveCanonical(node.name, scenario));
  }

  const drawnCanonicals = new Set(
    [...idToCanonical.values()].filter((c): c is string => c !== null)
  );

  const missingNodes = scenario.nodes
    .map((n) => n.canonical)
    .filter((c) => !drawnCanonicals.has(c));

  const extraNodes = nodes
    .map((n) => n.name)
    .filter((_, i) => idToCanonical.get(nodes[i].id) === null);

  // Resolve edges to canonical names, drop unresolvable ones
  const drawnEdges = edges.flatMap((e) => {
    const src = idToCanonical.get(e.source);
    const tgt = idToCanonical.get(e.target);
    if (!src || !tgt) return [];
    return [{ source: src, target: tgt }];
  });

  const missingEdges = scenario.edges.filter((expected) => {
    return !drawnEdges.some(
      (drawn) =>
        (drawn.source === expected.source && drawn.target === expected.target) ||
        (drawn.source === expected.target && drawn.target === expected.source)
    );
  });

  const extraEdges = drawnEdges.filter((drawn) => {
    return !scenario.edges.some(
      (expected) =>
        (expected.source === drawn.source && expected.target === drawn.target) ||
        (expected.source === drawn.target && expected.target === drawn.source)
    );
  });

  return {
    missingNodes,
    extraNodes,
    missingEdges,
    extraEdges,
    correct:
      missingNodes.length === 0 &&
      extraNodes.length === 0 &&
      missingEdges.length === 0 &&
      extraEdges.length === 0,
  };
}
