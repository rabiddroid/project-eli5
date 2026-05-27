import { NextRequest, NextResponse } from 'next/server';
import { grade, type CanvasEdge, type CanvasNode } from '@/lib/grader';
import { scenarios } from '@/lib/scenarios';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { scenarioId, nodes, edges } = body as {
    scenarioId?: string;
    nodes?: CanvasNode[];
    edges?: CanvasEdge[];
  };

  if (!scenarioId || !Array.isArray(nodes) || !Array.isArray(edges)) {
    return NextResponse.json({ error: 'Missing scenarioId, nodes, or edges' }, { status: 400 });
  }

  const scenario = scenarios[scenarioId];
  if (!scenario) {
    return NextResponse.json({ error: `Unknown scenario: ${scenarioId}` }, { status: 404 });
  }

  const diff = grade(nodes, edges, scenario);
  return NextResponse.json(diff);
}
