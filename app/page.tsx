'use client';

import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import EntityNode from './components/EntityNode';

const nodeTypes = { entity: EntityNode };

const nodes = [
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

const edges = [{ id: 'e1-2', source: 'node-1', target: 'node-2' }];

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
}
