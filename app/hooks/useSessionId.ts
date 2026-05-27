'use client';

import { useEffect, useState } from 'react';

const KEY = 'eli5_session_id';

function generateId(): string {
  return crypto.randomUUID();
}

export function useSessionId(): string {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = generateId();
      localStorage.setItem(KEY, id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
}
