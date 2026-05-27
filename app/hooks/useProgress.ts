'use client';

import { useCallback, useEffect, useState } from 'react';
import { scenarioOrder } from '@/lib/scenarios';

const COMPLETED_KEY = 'eli5_completed';
const CURRENT_KEY = 'eli5_current_scenario';

function loadCompleted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveCompleted(completed: string[]) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentScenarioId, setCurrentScenarioId] = useState<string>(scenarioOrder[0]);

  useEffect(() => {
    setCompleted(loadCompleted());
    const saved = localStorage.getItem(CURRENT_KEY);
    if (saved && scenarioOrder.includes(saved)) {
      setCurrentScenarioId(saved);
    }
  }, []);

  const markComplete = useCallback((scenarioId: string) => {
    setCompleted((prev) => {
      if (prev.includes(scenarioId)) return prev;
      const next = [...prev, scenarioId];
      saveCompleted(next);
      return next;
    });
  }, []);

  const advanceTo = useCallback((scenarioId: string) => {
    localStorage.setItem(CURRENT_KEY, scenarioId);
    setCurrentScenarioId(scenarioId);
  }, []);

  function nextScenarioId(currentId: string): string | null {
    const idx = scenarioOrder.indexOf(currentId);
    return idx >= 0 && idx < scenarioOrder.length - 1 ? scenarioOrder[idx + 1] : null;
  }

  return { completed, currentScenarioId, markComplete, advanceTo, nextScenarioId };
}
