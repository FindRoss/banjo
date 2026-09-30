
import type { Chord, Root, Quality } from './types';


export const roots: Root[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const qualities: Quality[] = ['major', 'minor', 'augmented', 'seventh', 'sixth'];
export const qualityLabels: Record<Quality, string> = { major: 'Major', minor: 'Minor', augmented: 'Aug', seventh: '7th', sixth: '6th' };
export const qualityFullNames: Record<Quality, string> = { major: 'Major', minor: 'Minor', augmented: 'Augmented', seventh: 'Seventh', sixth: 'Sixth' };

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
  G7: {
    name: 'G7',
    root: 'G',
    quality: 'seventh',
    notes: 'G, B, D, F',
    positions: [
      { baseFret: 1, frets: ['o', 'o', 'o', 3], fingers: [0, 0, 0, 1] }, 
      { baseFret: 1, frets: [3, 'o', 'o', 'o'], fingers: [1, 0, 0, 0] }, 
      { baseFret: 3, frets: [3, 3, 4, 5], fingers: [1, 1, 2, 3] }, 
      { baseFret: 4, frets: [5, 4, 6, 5], fingers: [2, 1, 4, 3] }, 

    ],
  },
  Gaug: {
    name: 'Gaug',
    root: 'G',
    quality: 'augmented',
    notes: 'G, B, D#',
    positions: [
      { baseFret: 1, frets: [1, 'o', 'o', 1], fingers: [1, 0, 0, 3] },
      { baseFret: 4, frets: [5, 4, 4, 5], fingers: [2, 1, 1, 3] }, 
      { baseFret: 8, frets: [9, 8, 8, 9], fingers: [3, 1, 1, 4] }, 
    ],
  },
  C: {
    name: 'C',
    root: 'C',
    quality: 'major',
    notes: 'C, E, G',
    positions: [
        { baseFret: 1, frets: [2, 'o', 1, 2], fingers: [ 2, 0, 1, 3 ] },
        { baseFret: 5, frets: [5, 5, 5, 5], fingers: [ 1, 1, 1, 1 ] },
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
    notes: 'C, E, G, Bb',
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
    notes: 'C, E, G#',
    positions: [
      { baseFret: 1, frets: [2, 1, 1, 2], fingers: [2, 1, 1, 3] },
      { baseFret: 5, frets: [6, 5, 5, 6], fingers: [2, 1, 1, 3] },
      { baseFret: 9, frets: [10, 9, 9, 10], fingers: [2, 1, 1, 3] },
    ],
  },
  C6: {
    name: 'C6', 
    root: 'C',
    quality: 'sixth', 
    notes: '',
    positions: [
      { baseFret: 5, frets: [5, 5, 5, 7], fingers: [1, 1, 1, 3] },
      { baseFret: 5, frets: [7, 5, 5, 5], fingers: [3, 1, 1, 1] },
      { baseFret: 7, frets: [10, 9, 8, 7], fingers: [1, 2, 3, 4] },
    ]
  },
  D: {
    name: 'D',
    root: 'D',
    quality: 'major',
    notes: 'D, F#, A',
    positions: [
        { baseFret: 2, frets: [4, 2, 3, 4], fingers: [3, 1, 2, 4] },
        { baseFret: 7, frets: [7, 7, 7, 7], fingers: [1, 1, 1, 1] },
        { baseFret: 10, frets: [12, 11, 10, 12], fingers: [3, 2, 1, 4] }
    ]
  },
  Dm: {
    name: 'Dm',
    root: 'D',
    quality: 'minor',
    notes: 'D, F, A',
    positions: [
      { baseFret: 1, frets: ['o', 2, 3, 3], fingers: [0, 1, 2, 3] },
      { baseFret: 2, frets: [3, 2, 3, 3], fingers: [2, 1, 3, 4] }, 
      { baseFret: 6, frets: ['o', 7, 6, 7], fingers: [0, 2, 1, 3] }, 
    ],
  },
  D7: {
    name: 'D7',
    root: 'D',
    quality: 'seventh',
    notes: 'D, F#, A, C',
    positions: [
      { baseFret: 1, frets: ['o', 2, 1, 4], fingers: [0, 2, 1, 4] }, 
      { baseFret: 5, frets: ['o', 5, 7, 7], fingers: [0, 1, 3, 4] }, 
      { baseFret: 7, frets: [10, 7, 7, 7], fingers: [4, 1, 1, 1] }, 
      { baseFret: 7, frets: [7, 7, 7, 10], fingers: [1, 1, 1, 4] }, 
    ],
  },
  Daug: {
    name: 'Daug',
    root: 'D',
    quality: 'augmented',
    notes: 'D, F#, A#',
    positions: [{ baseFret: 1, frets: ['o', 3, 3, 4] }],
  },
  E: {
    name: 'E',
    root: 'E',
    quality: 'major',
    notes: 'E, G#, B',
    positions: [
        { baseFret: 1, frets: [2, 1, 'o', 2] },
        { baseFret: 4, frets: [6, 4, 5, 6] },
        { baseFret: 9, frets: [9, 9, 9, 9], fingers: [1, 1, 1, 1] }
    ]
  },
  Em: {
    name: 'Em',
    root: 'E',
    quality: 'minor',
    notes: 'E, G, B',
    positions: [{ baseFret: 1, frets: [2, 'o', 'o', 2] }],
  },
  E7: {
    name: 'E7',
    root: 'E',
    quality: 'seventh',
    notes: 'E, G#, B, D',
    positions: [{ baseFret: 1, frets: ['o', 1, 'o', 2] }],
  },
  Eaug: {
    name: 'Eaug',
    root: 'E',
    quality: 'augmented',
    notes: 'E, G#, C',
    positions: [{ baseFret: 1, frets: [2, 1, 1, 2] }],
  },
  F: {
    name: 'F',
    root: 'F',
    quality: 'major',
    notes: 'F, A, C',
    positions: [
        { baseFret: 1, frets: [3, 2, 1, 3] },
        { baseFret: 5, frets: [7, 5, 6, 7] },
        { baseFret: 10, frets: [10, 10, 10, 10], fingers: [1, 1, 1, 1] }
    ]
  },
  Fm: {
    name: 'Fm',
    root: 'F',
    quality: 'minor',
    notes: 'F, G#, C',
    positions: [{ baseFret: 1, frets: [3, 1, 1, 3] }],
  },
  F7: {
    name: 'F7',
    root: 'F',
    quality: 'seventh',
    notes: 'F, A, C, D#',
    positions: [{ baseFret: 1, frets: [1, 2, 1, 3] }],
  },
  Faug: {
    name: 'Faug',
    root: 'F',
    quality: 'augmented',
    notes: 'F, A, C#',
    positions: [{ baseFret: 1, frets: [3, 2, 2, 3] }],
  },
  A: {
    name: 'A',
    root: 'A',
    quality: 'major',
    notes: 'A, C#, E',
    positions: [
      { baseFret: 2, frets: [2, 2, 2, 2], fingers: [1, 1, 1, 1] },
      { baseFret: 5, frets: [7, 6, 5, 7], fingers: [3, 2, 1, 4] },
      { baseFret: 9, frets: [11, 9, 10, 11], fingers: [3, 1, 2, 4] }
    ],
  },
  Am: {
    name: 'Am',
    root: 'A',
    quality: 'minor',
    notes: 'A, C, E',
    positions: [
      { baseFret: 1, frets: [2, 2, 1, 2], fingers: [2, 3, 1, 4] },
      { baseFret: 5, frets: [7, 5, 5, 7], fingers: [3, 1, 1, 4] }, 
      { baseFret: 9, frets: [10, 9, 10, 10], fingers: [2, 1, 3, 4] }
    ],
  },
  A7: {
    name: 'A7',
    root: 'A',
    quality: 'seventh',
    notes: 'A, C#, E, G',
    positions: [
      { baseFret: 2, frets: [2, 2, 2, 5], fingers: [1, 1, 1, 4] },
      { baseFret: 2, frets: [5, 2, 2, 2], fingers: [4, 1, 1, 1] },
      { baseFret: 5, frets: [5, 5, 6, 7], fingers: [1, 1, 2, 3] }
    ],
  },
  Aaug: {
    name: 'Aaug',
    root: 'A',
    quality: 'augmented',
    notes: 'A, C#, F',
    positions: [{ baseFret: 1, frets: [3, 2, 2, 3] }],
  },
  B: {
    name: 'B',
    root: 'B',
    quality: 'major',
    notes: 'B, D#, F#',
    positions: [{ baseFret: 4, frets: [4, 4, 4, 4], fingers: [1, 1, 1, 1] }],
  },
  Bm: {
    name: 'Bm',
    root: 'B',
    quality: 'minor',
    notes: 'B, D, F#',
    positions: [{ baseFret: 1, frets: ['o', 4, 'o', 4] }],
  },
  B7: {
    name: 'B7',
    root: 'B',
    quality: 'seventh',
    notes: 'B, D#, F#, A',
    positions: [{ baseFret: 1, frets: [1, 2, 'o', 4] }],
  },
  Baug: {
    name: 'Baug',
    root: 'B',
    quality: 'augmented',
    notes: 'B, D#, G',
    positions: [{ baseFret: 1, frets: [1, 'o', 'o', 1] }],
  },
};
