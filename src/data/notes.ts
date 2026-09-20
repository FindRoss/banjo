export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const openStringNotes = ['D', 'G', 'B', 'D']; // 4th, 3rd, 2nd, 1st — same order as `frets`


export function getNoteAt(stringIndex: number, fret: number): string {
  const openNote = openStringNotes[stringIndex];
  const openIndex = CHROMATIC_SCALE.indexOf(openNote);
  const noteIndex = (openIndex + fret) % CHROMATIC_SCALE.length;
  return CHROMATIC_SCALE[noteIndex];
}