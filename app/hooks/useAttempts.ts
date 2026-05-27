'use client';

import { useCallback, useEffect, useState } from 'react';
import type { GradeDiff } from '@/lib/grader';

export type Attempt = {
  id: string;
  sessionId: string;
  scenarioId: string;
  timestamp: number;
  nodes: { id: string; name: string }[];
  edges: { source: string; target: string }[];
  diff: GradeDiff;
};

const KEY = 'eli5_attempts';

function load(): Attempt[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

function save(attempts: Attempt[]) {
  localStorage.setItem(KEY, JSON.stringify(attempts));
}

export function useAttempts() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    setAttempts(load());
  }, []);

  const addAttempt = useCallback((attempt: Attempt) => {
    setAttempts((prev) => {
      const next = [...prev, attempt];
      save(next);
      return next;
    });
  }, []);

  return { attempts, addAttempt };
}
