'use client';

import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'Node 2' } },
];

const edges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
