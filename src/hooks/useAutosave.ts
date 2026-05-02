import { useEffect, useRef, useState } from 'react';
import type { DraftStatus, NotebookState } from '../types';
import { clearDraft, saveDraft } from '../utils/storage';
import { hasAnyContent } from '../utils/report';

const DEBOUNCE_MS = 1200;

export function useAutosave(state: NotebookState, enabled: boolean): {
  status: DraftStatus;
  savedAt: number | null;
} {
  const [status, setStatus] = useState<DraftStatus>('idle');
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const timer = useRef<number | null>(null);
  const initialMount = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
    if (!hasAnyContent(state)) {
      clearDraft();
      setSavedAt(null);
      setStatus('idle');
      return;
    }
    setStatus('saving');
    timer.current = window.setTimeout(() => {
      const ts = saveDraft(state);
      setSavedAt(ts);
      setStatus('saved');
      window.setTimeout(() => setStatus('idle'), 1400);
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, [state, enabled]);

  return { status, savedAt };
}
