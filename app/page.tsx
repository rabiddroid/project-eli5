'use client';

import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import EntityNode from './components/EntityNode';
import Toolbar from './components/Toolbar';
import GradeResult from './components/GradeResult';
import ScenarioPanel from './components/ScenarioPanel';
import type { GradeDiff } from '@/lib/grader';
import { scenarios } from '@/lib/scenarios';
import { useSessionId } from './hooks/useSessionId';
import { useAttempts } from './hooks/useAttempts';
import { useProgress } from './hooks/useProgress';

const nodeTypes = { entity: EntityNode };

function emptyCanvas(): { nodes: Node[]; edges: Edge[] } {
  return { nodes: [], edges: [] };
}

export default function Home() {
  const sessionId = useSessionId();
  const { attempts, addAttempt } = useAttempts();
  const { currentScenarioId, markComplete, advanceTo, nextScenarioId } = useProgress();

  const scenario = scenarios[currentScenarioId];

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeDiff | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const idCounter = useRef(1);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onAddEntity = useCallback(() => {
    const id = `node-${idCounter.current++}`;
    const newNode: Node = {
      id,
      type: 'entity',
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 200 },
      data: {
        name: 'new_entity',
        columns: [],
        mode: 'simple',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onGrade = useCallback(async () => {
    setGrading(true);
    setResult(null);
    try {
      const canvasNodes = nodes.map((n) => ({ id: n.id, name: n.data.name as string }));
      const canvasEdges = edges.map((e) => ({ source: e.source, target: e.target }));
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: currentScenarioId, nodes: canvasNodes, edges: canvasEdges }),
      });
      const diff = await res.json();
      setResult(diff);
      setAttemptCount((c) => c + 1);
      if (diff.correct) markComplete(currentScenarioId);
      if (sessionId) {
        addAttempt({
          id: crypto.randomUUID(),
          sessionId,
          scenarioId: currentScenarioId,
          timestamp: Date.now(),
          nodes: canvasNodes,
          edges: canvasEdges,
          diff,
        });
      }
    } finally {
      setGrading(false);
    }
  }, [nodes, edges, currentScenarioId, sessionId, addAttempt, markComplete]);

  const onNextLevel = useCallback(() => {
    const next = nextScenarioId(currentScenarioId);
    if (!next) return;
    advanceTo(next);
    const { nodes: n, edges: e } = emptyCanvas();
    setNodes(n);
    setEdges(e);
    setResult(null);
    setAttemptCount(0);
    idCounter.current = 1;
  }, [currentScenarioId, nextScenarioId, advanceTo]);

  const nextId = nextScenarioId(currentScenarioId);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ScenarioPanel level={scenario.level} title={scenario.title} description={scenario.description} instructions={scenario.instructions} />
      <Toolbar
        onAddEntity={onAddEntity}
        onGrade={onGrade}
        grading={grading}
        attempts={attemptCount}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
      {result && (
        <GradeResult
          diff={result}
          onNextLevel={nextId ? onNextLevel : undefined}
        />
      )}
    </div>
  );
}
