'use client';

import { useCallback, useEffect, useState } from 'react';
import { scenarioOrder } from '@/lib/scenarios';

const KEY = 'eli5_completed';

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

function save(completed: string[]) {
  localStorage.setItem(KEY, JSON.stringify(completed));
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(load());
  }, []);

  const markComplete = useCallback((scenarioId: string) => {
    setCompleted((prev) => {
      if (prev.includes(scenarioId)) return prev;
      const next = [...prev, scenarioId];
      save(next);
      return next;
    });
  }, []);

  function nextScenarioId(currentId: string): string | null {
    const idx = scenarioOrder.indexOf(currentId);
    return idx >= 0 && idx < scenarioOrder.length - 1 ? scenarioOrder[idx + 1] : null;
  }

  return { completed, markComplete, nextScenarioId };
}
