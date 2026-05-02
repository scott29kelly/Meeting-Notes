import { CATEGORIES } from '../config/categories';
import type { NotebookState } from '../types';
import type { NotebookActions } from '../hooks/useNotebook';
import { CategoryBlock } from './CategoryBlock';

interface Props {
  state: NotebookState;
  actions: NotebookActions;
}

export function NotebookPanel({ state, actions }: Props) {
  return (
    <section aria-label="Notebook" className="min-w-0">
      <ol className="flex flex-col gap-10">
        {CATEGORIES.map((def, index) => (
          <li key={def.id}>
            <CategoryBlock
              definition={def}
              index={index}
              items={state[def.id]}
              actions={actions}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
