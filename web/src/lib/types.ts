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