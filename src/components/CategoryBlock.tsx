import { Plus } from 'lucide-react';
import type { CategoryDefinition, Item } from '../types';
import type { NotebookActions } from '../hooks/useNotebook';
import { ItemRow } from './ItemRow';

interface Props {
  definition: CategoryDefinition;
  index: number;
  items: Item[];
  actions: NotebookActions;
}

export function CategoryBlock({ definition, index, items, actions }: Props) {
  const indexLabel = String(index + 1).padStart(2, '0');
  const filledCount = items.filter((i) => i.text.trim().length > 0).length;
  return (
    <article aria-labelledby={`cat-${definition.id}-heading`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-paper-rule pb-2">
        <div className="flex items-baseline gap-3">
          <span className="text-mono-label">{indexLabel}</span>
          <h2
            id={`cat-${definition.id}-heading`}
            className="font-serif text-lg text-ink"
          >
            {definition.name}
          </h2>
        </div>
        {filledCount > 0 && (
          <span
            className="text-mono-label"
            aria-label={`${filledCount} ${filledCount === 1 ? 'entry' : 'entries'}`}
          >
            {filledCount.toString().padStart(2, '0')}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-ink-faint italic">{definition.placeholder}</p>

      <ul className="mt-2 flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <ItemRow
              categoryId={definition.id}
              item={item}
              actions={actions}
            />
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <button
          type="button"
          className="quiet-button"
          onClick={() => actions.addItem(definition.id)}
        >
          <Plus size={14} strokeWidth={1.5} />
          Add item
        </button>
      </div>
    </article>
  );
}
