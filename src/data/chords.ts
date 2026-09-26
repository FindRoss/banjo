import type { Chord, Quality } from './types';


export const roots = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const qualities: Quality[] = ['major', 'minor', 'augmented', 'seventh'];
export const qualityLabels: Record<Quality, string> = { major: 'Major', minor: 'Minor', augmented: 'Aug', seventh: '7th' };

export const chords: Record<string, Chord> = {
  G: {
    name: 'G',
    root: 'G',
    quality: 'major',
    notes: 'G, B, D', 
    positions: [
        { baseFret: 1, frets: ['o', 'o', 'o', 'o'], fingers: [0, 0, 0, 0] },
        { baseFret: 3, frets: [5, 4, 3, 5], fingers: [3, 2, 1, 4 ] }, 
        { baseFret: 7, frets: [9, 7, 8, 9], fingers: [3, 1, 1, 4] }
    ],
  },
  Gm: {
    name: 'Gm',
    root: 'G',
    quality: 'minor',
    notes: 'G, Bb, D', 
    positions: [
      { baseFret: 3, frets: [5, 3, 3, 5], fingers: [3, 1, 1, 4] },
      { baseFret: 7, frets: [8, 7, 8, 8], fingers: [2, 1, 3, 4] }
    ],
  },
  C: {
    name: 'C',
    root: 'C',
    quality: 'major',
    notes: 'C, E, G', 
    positions: [
        { baseFret: 1, frets: [2, 'o', 1, 2], fingers: [ 2, 0, 1, 3 ] },
        { baseFret: 5, frets: ['o', 'o', 'o', 'o'], fingers: [ 0, 0, 0, 0 ] },
        { baseFret: 8, frets: [10, 9, 8, 10], fingers: [ 3, 2, 1, 4 ] }
    ],
  },
  Cm: {
    name: 'Cm',
    root: 'C',
    quality: 'minor',
    notes: 'C, Eb, G', 
    positions: [{ baseFret: 1, frets: [1, 'o', 1, 1] }],
  },
  C7: {
    name: 'C7',
    root: 'C',
    quality: 'seventh',
    notes: 'todo', 
    positions: [
      { baseFret: 1, frets: [2, 3, 1, 2], fingers: [3, 4, 1, 2] },
      { baseFret: 5, frets: [5, 5, 5, 8], fingers: [1, 1, 1, 4] },
      { baseFret: 5, frets: [8, 5, 5, 5], fingers: [3, 1, 1, 1] },
      { baseFret: 8, frets: [8, 9, 8, 10], fingers: [1, 2, 1, 4] }
    ],
  },
  Caug: {
    name: 'Caug',
    root: 'C',
    quality: 'augmented',
    notes: 'todo', 
    positions: [{ baseFret: 1, frets: [2, 1, 1, 2] }],
  },
  D: {
    name: 'D',
    root: 'D',
    quality: 'major',
    notes: 'D, F#, A',
    positions: [
        { baseFret: 2, frets: [4, 3, 2, 4 ] }, 
        { baseFret: 7, frets: ['o', 'o', 'o', 'o'] },
        { baseFret: 10, frets: [12, 11, 10, 12] }
    ]
  }, 
  E: {
    name: 'E',
    root: 'E',
    quality: 'major',
    notes: 'E, G#, B',
    positions: [
        { baseFret: 1, frets: [2, 1, 'o', 2] }, 
        { baseFret: 4, frets: [6, 4, 5, 6] }, 
        { baseFret: 9, frets: ['o', 'o', 'o', 'o'] }
    ]
  }, 
  F: {
    name: 'F',
    root: 'F',
    quality: 'major',
    notes: 'F, A, C', 
    positions: [
        { baseFret: 1, frets: [3, 2, 1, 3] },
        { baseFret: 5, frets: [7, 5, 6, 7] }, 
        { baseFret: 10, frets: ['o', 'o', 'o', 'o'] }
    ]
  }
};