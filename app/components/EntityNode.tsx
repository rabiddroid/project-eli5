'use client';

import { useReactFlow, Handle, Position } from '@xyflow/react';

export type Column = {
  name: string;
  type: string;
  isPrimaryKey: boolean;
};

export type EntityNodeData = {
  name: string;
  columns: Column[];
};

const COLUMN_TYPES = ['integer', 'varchar', 'boolean', 'timestamp', 'text', 'decimal'];

export default function EntityNode({ id, data }: { id: string; data: EntityNodeData }) {
  const { setNodes } = useReactFlow();

  function update(patch: Partial<EntityNodeData>) {
    setNodes((nodes) =>
      nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    );
  }

  function updateColumn(index: number, patch: Partial<Column>) {
    const columns = data.columns.map((col, i) => (i === index ? { ...col, ...patch } : col));
    update({ columns });
  }

  function addColumn() {
    update({
      columns: [...data.columns, { name: 'column', type: 'varchar', isPrimaryKey: false }],
    });
  }

  function deleteColumn(index: number) {
    update({ columns: data.columns.filter((_, i) => i !== index) });
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md min-w-[220px]">
      <Handle type="target" position={Position.Left} />

      {/* Entity name */}
      <div className="bg-slate-700 rounded-t-md px-3 py-2">
        <input
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full bg-transparent text-white text-sm font-semibold outline-none placeholder-slate-400"
          placeholder="entity_name"
        />
      </div>

      {/* Columns */}
      <div className="divide-y divide-slate-100">
        {data.columns.map((col, i) => (
          <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 text-xs group">
            <button
              onClick={() => updateColumn(i, { isPrimaryKey: !col.isPrimaryKey })}
              title="Toggle primary key"
              className={`w-6 shrink-0 font-bold ${col.isPrimaryKey ? 'text-amber-500' : 'text-slate-200 hover:text-amber-300'}`}
            >
              PK
            </button>
            <input
              value={col.name}
              onChange={(e) => updateColumn(i, { name: e.target.value })}
              className="flex-1 min-w-0 text-slate-800 outline-none bg-transparent hover:bg-slate-50 focus:bg-slate-50 rounded px-1"
              placeholder="column_name"
            />
            <select
              value={col.type}
              onChange={(e) => updateColumn(i, { type: e.target.value })}
              className="text-slate-400 bg-transparent outline-none cursor-pointer hover:text-slate-600"
            >
              {COLUMN_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={() => deleteColumn(i)}
              className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add column */}
      <div className="px-3 py-1.5 border-t border-slate-100">
        <button
          onClick={addColumn}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          + add column
        </button>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
