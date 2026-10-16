
import type { Root, Quality } from './types';


export const roots: Root[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const qualities: Quality[] = ['major', 'minor', 'augmented', 'seventh', 'sixth'];
export const qualityLabels: Record<Quality, string> = { major: 'Major', minor: 'Minor', augmented: 'Aug', seventh: '7th', sixth: '6th' };
export const qualityFullNames: Record<Quality, string> = { major: 'Major', minor: 'Minor', augmented: 'Augmented', seventh: 'Seventh', sixth: 'Sixth' };