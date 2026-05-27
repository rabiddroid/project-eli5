'use client';

type Props = {
  title: string;
  description: string;
};

export default function ScenarioPanel({ title, description }: Props) {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white border border-slate-200 rounded-lg shadow-md px-4 py-3 max-w-xs">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Scenario</p>
      <h2 className="text-sm font-bold text-slate-800 mb-1">{title}</h2>
      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
