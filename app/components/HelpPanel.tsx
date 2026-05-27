'use client';

const actions = [
  { key: 'Add entity', desc: 'Click "+ Add Entity" in the toolbar to drop a new table onto the canvas.' },
  { key: 'Rename entity', desc: 'Click the dark header of any entity card and type a new name.' },
  { key: 'Add column', desc: 'Click "+ add column" at the bottom of an entity card.' },
  { key: 'Edit column name', desc: 'Click the column name text to edit it inline.' },
  { key: 'Change column type', desc: 'Use the dropdown on the right side of any column row.' },
  { key: 'Toggle primary key', desc: 'Click the "PK" badge on a column to mark or unmark it as a primary key.' },
  { key: 'Delete column', desc: 'Hover over a column row — click the × that appears on the right.' },
  { key: 'Delete entity', desc: 'Hover over the entity header — click the × that appears on the right. Also removes all connected edges.' },
  { key: 'Connect entities', desc: 'Drag from the right handle (▶) of one entity to the left handle (◀) of another to create a relationship.' },
  { key: 'Move entity', desc: 'Drag the entity card by its body to reposition it on the canvas.' },
  { key: 'Pan canvas', desc: 'Click and drag on empty canvas space to pan around.' },
  { key: 'Zoom', desc: 'Scroll to zoom in or out.' },
  { key: 'Check Answer', desc: 'Click "Check Answer" to grade your current schema against the scenario.' },
  { key: 'Next Level', desc: 'Appears after a correct answer — advances to the next scenario and clears the canvas.' },
];

type Props = {
  onClose: () => void;
};

export default function HelpPanel({ onClose }: Props) {
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-white border border-slate-200 rounded-lg shadow-xl w-[420px] max-h-[70vh] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">How to use the canvas</h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-lg leading-none"
        >
          ×
        </button>
      </div>
      <div className="overflow-y-auto px-4 py-3 space-y-3">
        {actions.map((a) => (
          <div key={a.key}>
            <span className="text-xs font-semibold text-slate-700">{a.key} — </span>
            <span className="text-xs text-slate-500">{a.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
