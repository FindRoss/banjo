import type { Chord, Quality } from '@/lib/types';

export function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const qualityEndings: Record<Quality, string> = {
  major: ' Major',
  minor: ' Minor',
  augmented: ' Augmented',
  seventh: '7',
  sixth: '6',
};

export function fullName(chord: Chord) {
  return chord.root + qualityEndings[chord.quality];
}