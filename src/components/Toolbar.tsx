import { Check, ClipboardCopy, Eye, Trash2 } from 'lucide-react';
import type { DraftStatus } from '../types';
import { formatTimestamp } from '../utils/date';

interface Props {
  autosaveStatus: DraftStatus;
  savedAt: number | null;
  copyState: 'idle' | 'success' | 'error' | 'empty';
  canCopy: boolean;
  onCopy: () => void;
  onPreview: () => void;
  onClear: () => void;
}

function autosaveLabel(status: DraftStatus, savedAt: number | null): string {
  if (status === 'saving') return 'Saving draft';
  if (status === 'saved' && savedAt) return `Saved at ${formatTimestamp(new Date(savedAt))}`;
  if (savedAt) return `Saved at ${formatTimestamp(new Date(savedAt))}`;
  return 'Autosaves as you type';
}

function copyLabel(state: 'idle' | 'success' | 'error' | 'empty'): string {
  switch (state) {
    case 'success':
      return 'Copied';
    case 'error':
      return 'Copy failed';
    case 'empty':
      return 'Add a note first';
    case 'idle':
      return 'Copy agenda';
  }
}

export function Toolbar({
  autosaveStatus,
  savedAt,
  copyState,
  canCopy,
  onCopy,
  onPreview,
  onClear,
}: Props) {
  const dotClass =
    autosaveStatus === 'saving'
      ? 'bg-accent'
      : autosaveStatus === 'saved'
        ? 'bg-success'
        : 'bg-paper-rule';

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-paper-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1320px] flex flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-10">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${dotClass} transition-colors duration-180 ease-out-quint`}
            aria-hidden
          />
          <span className="text-mono-label">{autosaveLabel(autosaveStatus, savedAt)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="toolbar-link lg:hidden" onClick={onPreview}>
            <Eye size={14} strokeWidth={1.5} />
            Preview
          </button>
          <button type="button" className="toolbar-link" onClick={onClear}>
            <Trash2 size={14} strokeWidth={1.5} />
            Clear all
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onCopy}
            disabled={!canCopy && copyState === 'idle'}
            data-state={copyState}
          >
            {copyState === 'success' ? (
              <Check size={16} strokeWidth={1.5} />
            ) : (
              <ClipboardCopy size={16} strokeWidth={1.5} />
            )}
            {copyLabel(copyState)}
          </button>
        </div>
      </div>
    </div>
  );
}
