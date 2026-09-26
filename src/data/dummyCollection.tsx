import type { Collection } from './types';

export const dummyCollection: Collection[] = [
  {
    id: 'a1b2c3',
    name: 'Song idea 1',
    chordRefs: [
      { root: 'G', quality: 'major', positionIndex: 0 },
      { root: 'C', quality: 'major', positionIndex: 0 },
      { root: 'G', quality: 'major', positionIndex: 1 },
      { root: 'C', quality: 'minor', positionIndex: 0 },
    ],
  },
  {
    id: 'd4e5f6',
    name: 'Warm-ups',
    chordRefs: [
      { root: 'E', quality: 'major', positionIndex: 0 },
      { root: 'F', quality: 'major', positionIndex: 2 },
    ],
  },
  {
    id: 'g7h8i9',
    name: 'Empty one',
    chordRefs: [],
  },
]