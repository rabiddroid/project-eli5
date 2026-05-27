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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Toolbar onAddEntity={onAddEntity} />
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
