import { CornerDownRight, Plus, X } from 'lucide-react';
import type { CategoryId, Item } from '../types';
import type { NotebookActions } from '../hooks/useNotebook';
import { SubItemRow } from './SubItemRow';

interface Props {
  categoryId: CategoryId;
  item: Item;
  actions: NotebookActions;
}

export function ItemRow({ categoryId, item, actions }: Props) {
  const isEmpty = item.text.trim().length === 0;
  return (
    <div className="group">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={item.text}
          onChange={(e) => actions.setItemText(categoryId, item.id, e.target.value)}
          placeholder="Write the update."
          className="ruled-input"
          aria-label="Note item"
        />
        <button
          type="button"
          className="icon-button shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          onClick={() => actions.removeItem(categoryId, item.id)}
          aria-label="Remove item"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {item.subpoints.length > 0 && (
        <ul className="mt-1 flex flex-col gap-0 pl-7 border-l border-paper-rule ml-1">
          {item.subpoints.map((sub) => (
            <li key={sub.id} className="-ml-px">
              <SubItemRow
                categoryId={categoryId}
                itemId={item.id}
                subpoint={sub}
                actions={actions}
              />
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="quiet-button mt-1 ml-7"
        onClick={() => actions.addSubpoint(categoryId, item.id)}
        disabled={isEmpty}
      >
        <CornerDownRight size={12} strokeWidth={1.5} />
        <span className="inline-flex items-center gap-1">
          <Plus size={11} strokeWidth={1.5} />
          Subpoint
        </span>
      </button>
    </div>
  );
}
