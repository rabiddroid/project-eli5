'use client';

import type { GradeDiff } from '@/lib/grader';

type Props = {
  diff: GradeDiff;
  onNextLevel?: () => void;
};

export default function GradeResult({ diff, onNextLevel }: Props) {
  if (diff.correct) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-green-50 border border-green-300 rounded-lg shadow-md px-5 py-3 flex items-center gap-4">
        <span className="text-sm text-green-800 font-medium">
          Correct! All entities and relationships are in place.
        </span>
        {onNextLevel && (
          <button
            onClick={onNextLevel}
            className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md transition-colors shrink-0"
          >
            Next Level →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white border border-slate-200 rounded-lg shadow-md px-5 py-4 text-sm min-w-[280px]">
      <p className="font-semibold text-slate-700 mb-3">Not quite yet…</p>
      <ul className="space-y-1.5">
        {diff.missingNodes.map((n) => (
          <li key={n} className="text-slate-600">
            <span className="text-red-500 font-medium">Missing entity:</span> {n}
          </li>
        ))}
        {diff.extraNodes.map((n) => (
          <li key={n} className="text-slate-600">
            <span className="text-amber-500 font-medium">Unexpected entity:</span> {n}
          </li>
        ))}
        {diff.missingEdges.map((e) => (
          <li key={`${e.source}-${e.target}`} className="text-slate-600">
            <span className="text-red-500 font-medium">Missing relationship:</span>{' '}
            {e.source} → {e.target}
          </li>
        ))}
      </ul>
    </div>
  );
}
