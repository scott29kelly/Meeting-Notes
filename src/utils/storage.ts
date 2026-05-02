import { CATEGORY_BY_ID, CATEGORY_IDS } from '../config/categories';
import type { CategoryId, Item, NotebookState } from '../types';
import { uid } from './id';

const DRAFT_KEY = 'meetingNotesDraft';
const DRAFT_VERSION = 2;

interface PersistedDraftV2 {
  version: 2;
  savedAt: number;
  data: NotebookState;
}

type LegacyItem = { text?: unknown; subpoints?: unknown };
type LegacyDraft = Partial<Record<string, LegacyItem[]>>;

function emptyState(): NotebookState {
  const state = {} as NotebookState;
  for (const id of CATEGORY_IDS) {
    state[id] = [{ id: uid(), text: '', subpoints: [] }];
  }
  return state;
}

export function createInitialState(): NotebookState {
  return emptyState();
}

function isCategoryId(value: string): value is CategoryId {
  return value in CATEGORY_BY_ID;
}

function coerceItems(raw: unknown): Item[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) return null;
      const text = typeof (entry as LegacyItem).text === 'string' ? (entry as LegacyItem).text as string : '';
      const subRaw = (entry as LegacyItem).subpoints;
      const subpoints = Array.isArray(subRaw)
        ? subRaw
            .map((s) => (typeof s === 'string' ? { id: uid(), text: s } : null))
            .filter((s): s is { id: string; text: string } => s !== null)
        : [];
      const item: Item = { id: uid(), text, subpoints };
      return item;
    })
    .filter((item): item is Item => item !== null);
}

export function loadDraft(): { state: NotebookState; savedAt: number } | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;

    if ('version' in parsed && (parsed as PersistedDraftV2).version === DRAFT_VERSION) {
      const v2 = parsed as PersistedDraftV2;
      const state = emptyState();
      for (const id of CATEGORY_IDS) {
        const items = coerceItems(v2.data[id]);
        if (items.length > 0) state[id] = items;
      }
      return { state, savedAt: typeof v2.savedAt === 'number' ? v2.savedAt : Date.now() };
    }

    const legacy = parsed as LegacyDraft;
    const state = emptyState();
    for (const key of Object.keys(legacy)) {
      if (!isCategoryId(key)) continue;
      const items = coerceItems(legacy[key]);
      if (items.length > 0) state[key] = items;
    }
    return { state, savedAt: Date.now() };
  } catch {
    localStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

export function saveDraft(state: NotebookState): number {
  const savedAt = Date.now();
  const payload: PersistedDraftV2 = {
    version: DRAFT_VERSION,
    savedAt,
    data: state,
  };
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be disabled in private mode; failing silently is acceptable here.
  }
  return savedAt;
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignored
  }
}

export function hasDraft(): boolean {
  try {
    return localStorage.getItem(DRAFT_KEY) !== null;
  } catch {
    return false;
  }
}
