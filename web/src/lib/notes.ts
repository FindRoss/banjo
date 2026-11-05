export const CHROMATIC_SCALE = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
];

export function getNoteAt(openStrings: string[], stringIndex: number, fret: number): string {
  const openIndex = CHROMATIC_SCALE.indexOf(openStrings[stringIndex]);
  return CHROMATIC_SCALE[(openIndex + fret) % CHROMATIC_SCALE.length];
}