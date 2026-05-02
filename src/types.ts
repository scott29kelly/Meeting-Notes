export type CategoryId =
  | 'prayer'
  | 'body_concerns'
  | 'budget'
  | 'last_sunday'
  | 'this_sunday'
  | 'large_events'
  | 'small_groups'
  | 'facilities'
  | 'media'
  | 'mens_ministry'
  | 'womens_ministry'
  | 'youth_ministry'
  | 'childrens_ministry';

export interface Subpoint {
  id: string;
  text: string;
}

export interface Item {
  id: string;
  text: string;
  subpoints: Subpoint[];
}

export type NotebookState = Record<CategoryId, Item[]>;

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  emoji: string;
  placeholder: string;
}

export type DraftStatus = 'idle' | 'saving' | 'saved';
