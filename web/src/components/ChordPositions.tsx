'use client';

import { useState } from 'react';
import FretboardDiagram from '@/components/FretboardDiagram';
import SegmentedControl from '@/components/SegmentedControl';
import type { ChordPosition, DisplayMode } from '@/lib/types';

const options: { value: DisplayMode; label: string }[] = [
  { value: 'none', label: 'Off' },
  { value: 'notes', label: 'Notes' },
  { value: 'fingers', label: 'Fingers' },
];

interface ChordPositionsProps {
  positions: ChordPosition[];
  openStrings: string[];
}

export default function ChordPositions({ positions, openStrings }: ChordPositionsProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes');

  return (
    <>
      <div className="display-row">
        <SegmentedControl options={options} value={displayMode} onChange={setDisplayMode} />
      </div>

      <div className="positions-grid">
        {positions.map((position, index) => (
          <div className="position-card" key={position.id}>
            <FretboardDiagram
              position={position}
              openStrings={openStrings}
              displayMode={displayMode}
            />
            <div className="card-footer">
              <div className="card-title">Position {index + 1}</div>
              <div className="card-sub">
                {position.baseFret === 1 ? 'Open' : `Fret ${position.baseFret}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}