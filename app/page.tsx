'use client';

import { useCallback, useState } from 'react';
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

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
