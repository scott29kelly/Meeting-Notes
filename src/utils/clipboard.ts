export async function writeRichClipboard(html: string, plain: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && 'write' in navigator.clipboard) {
    try {
      const ClipboardItemCtor = (window as unknown as { ClipboardItem?: typeof ClipboardItem }).ClipboardItem;
      if (ClipboardItemCtor) {
        await navigator.clipboard.write([
          new ClipboardItemCtor({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plain], { type: 'text/plain' }),
          }),
        ]);
        return;
      }
    } catch {
      // fall through to plain text fallback
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(plain);
    return;
  }

  throw new Error('Clipboard not available in this browser.');
}
