'use client';

type Props = {
  onAddEntity: () => void;
  onGrade: () => void;
  grading: boolean;
  attempts: number;
};

export default function Toolbar({ onAddEntity, onGrade, grading, attempts }: Props) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2">
      <button
        onClick={onAddEntity}
        className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors"
      >
        + Add Entity
      </button>
      <div className="w-px bg-slate-200 self-stretch" />
      <button
        onClick={onGrade}
        disabled={grading}
        className="text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 disabled:opacity-50 px-3 py-1.5 rounded-md transition-colors"
      >
        {grading ? 'Checking…' : 'Check Answer'}
      </button>
      {attempts > 0 && (
        <>
          <div className="w-px bg-slate-200 self-stretch" />
          <span className="text-xs text-slate-400 px-1">
            {attempts} {attempts === 1 ? 'attempt' : 'attempts'}
          </span>
        </>
      )}
    </div>
  );
}
