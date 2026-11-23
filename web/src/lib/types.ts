export type Quality = 'major' | 'minor' | 'augmented' | 'seventh' | 'sixth';
export type Root = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type FretValue = number | 'o' | 'x';
export type DisplayMode = 'none' | 'notes' | 'fingers';

export interface ChordPosition {
  id: number;
  baseFret: number;
  frets: FretValue[];
  fingers: number[] | null;
}

export interface Chord {
  id: number;
  root: Root;
  quality: Quality;
  slug: string;
  name: string;
  notes: string;
  positions: ChordPosition[];
}

export interface Tuning {
  id: number;
  instrument: string;
  name: string;
  slug: string;
  openStrings: string[];
}

export interface CollectionItem {
  id: number;
  positionId: number;
  baseFret: number;
  frets: FretValue[];
  fingers: number[] | null;
  chord: { slug: string; root: Root; quality: Quality };
  tuning: {
    instrument: string;
    slug: string;
    name: string;
    openStrings: string[];
  };
}

export interface SavedCollection {
  id: number;
  name: string;
  created_at: string;
  items: CollectionItem[];
}
