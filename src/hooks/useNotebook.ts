import { useCallback, useReducer } from 'react';
import type { CategoryId, NotebookState } from '../types';
import { createInitialState } from '../utils/storage';
import { uid } from '../utils/id';

type Action =
  | { type: 'set_item_text'; categoryId: CategoryId; itemId: string; text: string }
  | { type: 'set_subpoint_text'; categoryId: CategoryId; itemId: string; subId: string; text: string }
  | { type: 'add_item'; categoryId: CategoryId }
  | { type: 'remove_item'; categoryId: CategoryId; itemId: string }
  | { type: 'add_subpoint'; categoryId: CategoryId; itemId: string }
  | { type: 'remove_subpoint'; categoryId: CategoryId; itemId: string; subId: string }
  | { type: 'replace'; state: NotebookState }
  | { type: 'reset' };

function reducer(state: NotebookState, action: Action): NotebookState {
  switch (action.type) {
    case 'set_item_text': {
      const items = state[action.categoryId].map((item) =>
        item.id === action.itemId ? { ...item, text: action.text } : item,
      );
      return { ...state, [action.categoryId]: items };
    }
    case 'set_subpoint_text': {
      const items = state[action.categoryId].map((item) => {
        if (item.id !== action.itemId) return item;
        const subpoints = item.subpoints.map((s) =>
          s.id === action.subId ? { ...s, text: action.text } : s,
        );
        return { ...item, subpoints };
      });
      return { ...state, [action.categoryId]: items };
    }
    case 'add_item': {
      const next = [...state[action.categoryId], { id: uid(), text: '', subpoints: [] }];
      return { ...state, [action.categoryId]: next };
    }
    case 'remove_item': {
      const filtered = state[action.categoryId].filter((item) => item.id !== action.itemId);
      const next = filtered.length > 0 ? filtered : [{ id: uid(), text: '', subpoints: [] }];
      return { ...state, [action.categoryId]: next };
    }
    case 'add_subpoint': {
      const items = state[action.categoryId].map((item) =>
        item.id === action.itemId
          ? { ...item, subpoints: [...item.subpoints, { id: uid(), text: '' }] }
          : item,
      );
      return { ...state, [action.categoryId]: items };
    }
    case 'remove_subpoint': {
      const items = state[action.categoryId].map((item) =>
        item.id === action.itemId
          ? { ...item, subpoints: item.subpoints.filter((s) => s.id !== action.subId) }
          : item,
      );
      return { ...state, [action.categoryId]: items };
    }
    case 'replace':
      return action.state;
    case 'reset':
      return createInitialState();
  }
}

export interface NotebookActions {
  setItemText: (categoryId: CategoryId, itemId: string, text: string) => void;
  setSubpointText: (categoryId: CategoryId, itemId: string, subId: string, text: string) => void;
  addItem: (categoryId: CategoryId) => void;
  removeItem: (categoryId: CategoryId, itemId: string) => void;
  addSubpoint: (categoryId: CategoryId, itemId: string) => void;
  removeSubpoint: (categoryId: CategoryId, itemId: string, subId: string) => void;
  replace: (state: NotebookState) => void;
  reset: () => void;
}

export function useNotebook(initial: NotebookState): [NotebookState, NotebookActions] {
  const [state, dispatch] = useReducer(reducer, initial);

  const actions: NotebookActions = {
    setItemText: useCallback((categoryId, itemId, text) => {
      dispatch({ type: 'set_item_text', categoryId, itemId, text });
    }, []),
    setSubpointText: useCallback((categoryId, itemId, subId, text) => {
      dispatch({ type: 'set_subpoint_text', categoryId, itemId, subId, text });
    }, []),
    addItem: useCallback((categoryId) => {
      dispatch({ type: 'add_item', categoryId });
    }, []),
    removeItem: useCallback((categoryId, itemId) => {
      dispatch({ type: 'remove_item', categoryId, itemId });
    }, []),
    addSubpoint: useCallback((categoryId, itemId) => {
      dispatch({ type: 'add_subpoint', categoryId, itemId });
    }, []),
    removeSubpoint: useCallback((categoryId, itemId, subId) => {
      dispatch({ type: 'remove_subpoint', categoryId, itemId, subId });
    }, []),
    replace: useCallback((next) => {
      dispatch({ type: 'replace', state: next });
    }, []),
    reset: useCallback(() => {
      dispatch({ type: 'reset' });
    }, []),
  };

  return [state, actions];
}
