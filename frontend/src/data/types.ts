export type DisplayMode = 'none' | 'notes' | 'fingers';
export type Quality = 'major' | 'minor' | 'augmented' | 'seventh' | 'sixth'; 
export type Root = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'; 

export type FretValue = number | 'o' | 'x'; 

export type Views = 'chords' | 'collections';

export interface ChordPosition {
    id: number;
    baseFret: number;
    frets: FretValue[];
    fingers?: number[] | null;
}

export interface Chord {
    id: number;
    name: string; 
    root: Root;
    quality: Quality;
    notes: string;
    positions: ChordPosition[];
}

export interface ChordRef {
    root: Root; 
    quality: Quality; 
    positionIndex: number;
}

export interface Collection {
    id: string; 
    name: string;
    chordRefs: ChordRef[]
}
