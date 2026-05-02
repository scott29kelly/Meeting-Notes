import { X } from 'lucide-react';
import type { CategoryId, Subpoint } from '../types';
import type { NotebookActions } from '../hooks/useNotebook';

interface Props {
  categoryId: CategoryId;
  itemId: string;
  subpoint: Subpoint;
  actions: NotebookActions;
}

export function SubItemRow({ categoryId, itemId, subpoint, actions }: Props) {
  return (
    <div className="group flex items-center gap-2">
      <input
        type="text"
        value={subpoint.text}
        onChange={(e) =>
          actions.setSubpointText(categoryId, itemId, subpoint.id, e.target.value)
        }
        placeholder="Subpoint."
        className="ruled-input text-sm"
        aria-label="Subpoint"
      />
      <button
        type="button"
        className="icon-button shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        onClick={() => actions.removeSubpoint(categoryId, itemId, subpoint.id)}
        aria-label="Remove subpoint"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
