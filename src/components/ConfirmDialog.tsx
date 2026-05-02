import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Keep editing',
  onConfirm,
  onCancel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    function handleCancel(event: Event) {
      event.preventDefault();
      onCancel();
    }
    node.addEventListener('cancel', handleCancel);
    return () => node.removeEventListener('cancel', handleCancel);
  }, [onCancel]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      className="m-auto max-w-md w-[calc(100vw-2rem)] bg-paper p-0"
    >
      <div className="border border-paper-rule bg-paper p-6 lg:p-8">
        <p className="text-mono-label">Confirm</p>
        <h2
          id="confirm-title"
          className="mt-2 font-serif text-xl tracking-[-0.01em] text-ink"
        >
          {title}
        </h2>
        <p
          id="confirm-description"
          className="mt-3 text-sm text-ink-soft leading-relaxed"
        >
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm} autoFocus>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
