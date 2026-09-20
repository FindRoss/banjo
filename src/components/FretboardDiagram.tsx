import type { ChordPosition, DisplayMode } from '../data/types';
import { getNoteAt } from '../data/notes';

interface FretboardDiagramProps {
  position: ChordPosition;
  displayMode: DisplayMode;
}

const left = 30;
const top = 40;
const width = 140;
const fretHeight = 40;
const numFrets = 4;
const stringGap = width / 3;

function FretboardDiagram({ position, displayMode }: FretboardDiagramProps) {
  return (
    <svg viewBox="0 0 200 240" width={220} height={264}>
      <line
        x1={left}
        x2={left + width}
        y1={top}
        y2={top}
        stroke="black"
        strokeWidth={position.baseFret === 1 ? 4 : 1}
      />

      {position.baseFret > 1 && (
        <text x={left + width + 6} y={top + 20} fontSize={20} fontWeight="bold">
          {position.baseFret}fr
        </text>
      )}

      {[1, 2, 3, 4].map((fret) => {
        const y = top + fret * fretHeight;
        return (
          <line
            key={fret}
            x1={left}
            x2={left + width}
            y1={y}
            y2={y}
            stroke="black"
            strokeWidth={1}
          />
        );
      })}

      {position.frets.map((value, stringIndex) => {
        const x = left + stringIndex * stringGap;

        return (
          <g key={stringIndex}>
            <line
              x1={x}
              x2={x}
              y1={top}
              y2={top + numFrets * fretHeight}
              stroke="black"
              strokeWidth={1}
            />
            {value === 'o' && (
              <text x={x} y={top - 12} textAnchor="middle" fontSize={14}>
                {displayMode === 'notes' ? getNoteAt(stringIndex, 0) : 'o'}
              </text>
            )}
            {value === 'x' && (
              <text x={x} y={top - 12} textAnchor="middle" fontSize={14}>
                  X
              </text>
              )}
            {typeof value === 'number' && (
              <>
              <circle cx={x} cy={top + (value - position.baseFret + 1 - 0.5) * fretHeight} r={8} fill="black" />
        
              {displayMode === 'notes' && (
                <text x={x} y={top + (value - position.baseFret + 1 - 0.5) * fretHeight + 4} textAnchor="middle" fontSize={10} fill="white">
                  {getNoteAt(stringIndex, value)}
                </text>
              )}

              {displayMode === 'fingers' &&  position.fingers && (
                <text x={x} y={top + (value - position.baseFret + 1 - 0.5) * fretHeight + 4} textAnchor="middle" fontSize={10} fill="white">
                  {position.fingers[stringIndex]}
                </text>
              )}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default FretboardDiagram;