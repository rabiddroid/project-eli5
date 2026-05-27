'use client';

import type { GradeDiff } from '@/lib/grader';

export default function GradeResult({ diff }: { diff: GradeDiff }) {
  if (diff.correct) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-green-50 border border-green-300 rounded-lg shadow-md px-5 py-3 text-sm text-green-800 font-medium">
        Correct! All entities and relationships are in place.
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
