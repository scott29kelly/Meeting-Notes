import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { formatMeetingDate } from '../utils/date';

interface Props {
  html: string;
  hasContent: boolean;
  meetingDate: Date;
  isOpen: boolean;
  onToggle: () => void;
}

export const DocumentPreview = forwardRef<HTMLElement, Props>(function DocumentPreview(
  { html, hasContent, meetingDate, isOpen, onToggle },
  ref,
) {
  return (
    <aside
      ref={ref}
      aria-label="Generated agenda preview"
      className="mt-12 lg:mt-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-7rem)]"
    >
      <button
        type="button"
        className="flex items-center justify-between gap-3 w-full lg:hidden border-y border-paper-rule py-3"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-mono-label">Live preview</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className="transition-transform duration-180 ease-out-quint"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>

      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:block lg:overflow-y-auto lg:max-h-[calc(100vh-7rem)]`}
      >
        <div className="mt-4 lg:mt-0 bg-surface-aged px-6 py-10 lg:px-12 lg:py-12 border border-paper-rule">
          <p className="text-mono-label">Bucks Church &middot; Operations</p>
          <h2 className="mt-2 font-serif text-2xl tracking-[-0.015em] text-ink">
            Staff Meeting Notes
          </h2>
          <p className="mt-1 font-serif italic text-ink-soft">
            {formatMeetingDate(meetingDate)}
          </p>
          <hr className="my-6 border-0 border-t border-paper-rule" />

          {hasContent ? (
            <div
              className="font-serif text-base text-ink leading-[1.65] preview-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="font-serif italic text-ink-faint">
              The agenda will appear here as you type. Fill any section on the left to
              begin.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
});
