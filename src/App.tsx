import { useEffect, useMemo, useRef, useState } from 'react';
import { AppShell } from './components/AppShell';
import { Header } from './components/Header';
import { NotebookPanel } from './components/NotebookPanel';
import { DocumentPreview } from './components/DocumentPreview';
import { Toolbar } from './components/Toolbar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { DraftBanner } from './components/DraftBanner';
import { useNotebook } from './hooks/useNotebook';
import { useAutosave } from './hooks/useAutosave';
import { clearDraft, createInitialState, hasDraft, loadDraft } from './utils/storage';
import { hasAnyContent, renderReport } from './utils/report';
import { writeRichClipboard } from './utils/clipboard';
import { getNextMeetingDate } from './utils/date';

type CopyState = 'idle' | 'success' | 'error' | 'empty';

export function App() {
  const [state, actions] = useNotebook(createInitialState());
  const meetingDate = useMemo(() => getNextMeetingDate(), []);

  const [restorable, setRestorable] = useState<{ savedAt: number } | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewRef = useRef<HTMLElement | null>(null);
  const restoredRef = useRef(false);

  const { status: autosaveStatus, savedAt } = useAutosave(state, true);

  useEffect(() => {
    if (restoredRef.current) return;
    if (hasDraft()) {
      const draft = loadDraft();
      if (draft) {
        setRestorable({ savedAt: draft.savedAt });
      }
    }
    restoredRef.current = true;
  }, []);

  const report = useMemo(() => renderReport(state, meetingDate), [state, meetingDate]);
  const hasContent = useMemo(() => hasAnyContent(state), [state]);

  function handleRestoreDraft(): void {
    const draft = loadDraft();
    if (draft) {
      actions.replace(draft.state);
    }
    setRestorable(null);
  }

  function handleDismissDraft(): void {
    setRestorable(null);
  }

  function handleClearConfirmed(): void {
    actions.reset();
    clearDraft();
    setConfirmClear(false);
    setCopyState('idle');
  }

  async function handleCopy(): Promise<void> {
    if (!hasContent) {
      setCopyState('empty');
      window.setTimeout(() => setCopyState('idle'), 2000);
      return;
    }
    setPreviewOpen(true);
    try {
      await writeRichClipboard(report.html, report.plain);
      setCopyState('success');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 2400);
    }
  }

  function handleScrollToPreview(): void {
    setPreviewOpen(true);
    window.requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <AppShell>
      <Header meetingDate={meetingDate} />
      {restorable && (
        <DraftBanner
          savedAt={restorable.savedAt}
          onRestore={handleRestoreDraft}
          onDismiss={handleDismissDraft}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12 px-5 lg:px-10 pb-32">
        <NotebookPanel state={state} actions={actions} />
        <DocumentPreview
          ref={previewRef}
          html={report.html}
          hasContent={hasContent}
          meetingDate={meetingDate}
          isOpen={previewOpen}
          onToggle={() => setPreviewOpen((open) => !open)}
        />
      </div>
      <Toolbar
        autosaveStatus={autosaveStatus}
        savedAt={savedAt}
        copyState={copyState}
        canCopy={hasContent}
        onCopy={handleCopy}
        onPreview={handleScrollToPreview}
        onClear={() => setConfirmClear(true)}
      />
      <ConfirmDialog
        open={confirmClear}
        title="Clear every note in this draft?"
        description="This empties all thirteen sections and removes the saved draft. The action cannot be undone."
        confirmLabel="Clear all notes"
        onConfirm={handleClearConfirmed}
        onCancel={() => setConfirmClear(false)}
      />
    </AppShell>
  );
}
