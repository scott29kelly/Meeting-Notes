import { X } from 'lucide-react';
import { formatTimestamp } from '../utils/date';

interface Props {
  savedAt: number;
  onRestore: () => void;
  onDismiss: () => void;
}

export function DraftBanner({ savedAt, onRestore, onDismiss }: Props) {
  const date = new Date(savedAt);
  const isToday = date.toDateString() === new Date().toDateString();
  const label = isToday
    ? `Saved today at ${formatTimestamp(date)}`
    : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="mx-5 lg:mx-10 mb-6 flex items-center justify-between gap-4 border-y border-paper-rule py-3">
      <div className="flex items-center gap-3">
        <span className="text-mono-label">Draft on file</span>
        <span className="text-sm text-ink-soft">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={onRestore} className="quiet-button">
          Restore
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="icon-button"
          aria-label="Dismiss saved draft notice"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
