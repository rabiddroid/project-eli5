'use client';

type Props = {
  onAddEntity: () => void;
};

export default function Toolbar({ onAddEntity }: Props) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2">
      <button
        onClick={onAddEntity}
        className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors"
      >
        + Add Entity
      </button>
    </div>
  );
}
