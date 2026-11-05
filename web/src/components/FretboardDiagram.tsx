import type { ChordPosition, DisplayMode } from '@/lib/types';
import { getNoteAt } from '@/lib/notes';

interface FretboardDiagramProps {
  position: ChordPosition;
  openStrings: string[];
  displayMode: DisplayMode;
  width?: number;
  labels?: boolean;
}

const INK = '#121212';
const MUTED = '#76746E';
const FRET = '#C9C6BF';
const PAPER = '#FFFFFF';
const UI = 'var(--font-ui)';
const MONO = 'var(--font-mono)';

const L = 34, T = 38, G = 40, FH = 38;

export default function FretboardDiagram({
  position,
  openStrings,
  displayMode,
  width = 190,
  labels = false,
}: FretboardDiagramProps) {
  const { baseFret: base, frets, fingers } = position;
  const stringCount = openStrings.length;
  const W = G * (stringCount - 1);

  const nums = frets.filter((v): v is number => typeof v === 'number');
  const maxF = nums.length ? Math.max(...nums) : base;
  const n = Math.max(4, maxF - base + 1);

  const k = (L + W + 70) / width;
  const R = Math.min(17, Math.max(12.5, 8.5 * k));
  const dotFont = Math.max(11, 10 * k);
  const fretFont = Math.max(13, 11 * k);
  const openFont = Math.max(12, 9 * k);

  const H = T + n * FH + (labels ? 30 : 10);
  const VW = L + W + R + 6 + fretFont * 1.9;
  const dotY = (fret: number) => T + (fret - base + 0.5) * FH;

  const barres: { x1: number; x2: number; y: number }[] = [];
  if (fingers) {
    const groups: Record<string, number[]> = {};
    frets.forEach((v, s) => {
      if (typeof v === 'number' && fingers[s] > 0) (groups[`${fingers[s]}-${v}`] ??= []).push(s);
    });
    Object.entries(groups).forEach(([key, ss]) => {
      if (ss.length < 2) return;
      const fret = Number(key.split('-')[1]);
      barres.push({ x1: L + Math.min(...ss) * G, x2: L + Math.max(...ss) * G, y: dotY(fret) });
    });
  }

  return (
    <svg viewBox={`0 0 ${VW} ${H}`} width={width} height={(width * H) / VW} style={{ display: 'block', overflow: 'visible' }}>
      <line x1={L - 1} x2={L + W + 1} y1={T} y2={T} stroke={INK} strokeWidth={base === 1 ? 5 : 1.2} strokeLinecap="round" />
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={L} x2={L + W} y1={T + (i + 1) * FH} y2={T + (i + 1) * FH} stroke={FRET} strokeWidth={1.2} />
      ))}
      {Array.from({ length: stringCount }, (_, s) => (
        <line key={s} x1={L + s * G} x2={L + s * G} y1={T} y2={T + n * FH} stroke={INK} strokeWidth={1.3} />
      ))}
      {base > 1 && (
        <text x={L + W + R + 6} y={T + FH * 0.5 + fretFont * 0.35} fontSize={fretFont} fill={MUTED} style={{ fontFamily: MONO }}>{base}fr</text>
      )}
      {barres.map((b, i) => (
        <rect key={i} x={b.x1 - R} y={b.y - R} width={b.x2 - b.x1 + R * 2} height={R * 2} rx={R} fill={INK} />
      ))}
      {frets.map((v, s) => {
        const x = L + s * G;
        if (v === 'o') {
          return displayMode === 'notes'
            ? <text key={s} x={x} y={T - 12} textAnchor="middle" fontSize={openFont} fill={INK} fontWeight={500} style={{ fontFamily: MONO }}>{getNoteAt(openStrings, s, 0)}</text>
            : <circle key={s} cx={x} cy={T - 15} r={5} fill="none" stroke={INK} strokeWidth={1.5} />;
        }
        if (v === 'x') {
          return <text key={s} x={x} y={T - 10} textAnchor="middle" fontSize={14} fill={MUTED} style={{ fontFamily: UI }}>×</text>;
        }
        const cy = dotY(v);
        return (
          <g key={s}>
            <circle cx={x} cy={cy} r={R} fill={INK} />
            {displayMode === 'notes' && (
              <text x={x} y={cy + dotFont * 0.36} textAnchor="middle" fontSize={dotFont} fill={PAPER} fontWeight={600} style={{ fontFamily: UI }}>{getNoteAt(openStrings, s, v)}</text>
            )}
            {displayMode === 'fingers' && fingers?.[s] ? (
              <text x={x} y={cy + dotFont * 0.38} textAnchor="middle" fontSize={dotFont * 1.08} fill={PAPER} fontWeight={600} style={{ fontFamily: UI }}>{fingers[s]}</text>
            ) : null}
          </g>
        );
      })}
      {labels && openStrings.map((o, s) => (
        <text key={`l${s}`} x={L + s * G} y={H - 8} textAnchor="middle" fontSize={11} fill={MUTED} style={{ fontFamily: MONO }}>{o}</text>
      ))}
    </svg>
  );
}