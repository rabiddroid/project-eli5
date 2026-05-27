'use client';

import { Handle, Position } from '@xyflow/react';

export type Column = {
  name: string;
  type: string;
  isPrimaryKey: boolean;
};

export type EntityNodeData = {
  name: string;
  columns: Column[];
};

export default function EntityNode({ data }: { data: EntityNodeData }) {
  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md min-w-[180px]">
      <Handle type="target" position={Position.Left} />

      <div className="bg-slate-700 text-white text-sm font-semibold px-3 py-2 rounded-t-md">
        {data.name}
      </div>

      <div className="divide-y divide-slate-100">
        {data.columns.map((col) => (
          <div key={col.name} className="flex items-center justify-between px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1.5">
              {col.isPrimaryKey && (
                <span className="text-amber-500 font-bold">PK</span>
              )}
              <span className="text-slate-800">{col.name}</span>
            </span>
            <span className="text-slate-400">{col.type}</span>
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
