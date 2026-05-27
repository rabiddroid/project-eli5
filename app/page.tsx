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
import type { GradeDiff } from '@/lib/grader';
import { scenarios } from '@/lib/scenarios';
import ScenarioPanel from './components/ScenarioPanel';
import { useSessionId } from './hooks/useSessionId';
import { useAttempts } from './hooks/useAttempts';

const SCENARIO_ID = 'library';
const scenario = scenarios[SCENARIO_ID];

const nodeTypes = { entity: EntityNode };

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'entity',
    position: { x: 100, y: 150 },
    data: {
      name: 'books',
      columns: [
        { name: 'id', type: 'integer', isPrimaryKey: true },
        { name: 'title', type: 'varchar', isPrimaryKey: false },
      ],
    },
  },
  {
    id: 'node-2',
    type: 'entity',
    position: { x: 380, y: 150 },
    data: {
      name: 'members',
      columns: [
        { name: 'id', type: 'integer', isPrimaryKey: true },
        { name: 'name', type: 'varchar', isPrimaryKey: false },
      ],
    },
  },
];

const initialEdges: Edge[] = [];

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const sessionId = useSessionId();
  const { addAttempt } = useAttempts();
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeDiff | null>(null);
  const idCounter = useRef(3);

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
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: {
        name: 'new_entity',
        columns: [{ name: 'id', type: 'integer', isPrimaryKey: true }],
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
        body: JSON.stringify({ scenarioId: SCENARIO_ID, nodes: canvasNodes, edges: canvasEdges }),
      });
      const diff = await res.json();
      setResult(diff);
      if (sessionId) {
        addAttempt({
          id: crypto.randomUUID(),
          sessionId,
          scenarioId: SCENARIO_ID,
          timestamp: Date.now(),
          nodes: canvasNodes,
          edges: canvasEdges,
          diff,
        });
      }
    } finally {
      setGrading(false);
    }
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ScenarioPanel title={scenario.title} description={scenario.description} />
      <Toolbar onAddEntity={onAddEntity} onGrade={onGrade} grading={grading} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
      {result && <GradeResult diff={result} />}
    </div>
  );
}
