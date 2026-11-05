import FretboardDiagram from '@/components/FretboardDiagram';
import { getChord, getTuning } from '@/lib/api';

export default async function Home() {
  const chord = await getChord('g7');
  const tuning = await getTuning('banjo', 'open-g');

  return (
    <main style={{ padding: 40 }}>
      <h1>{chord.name}</h1>
      <p>{chord.notes}</p>
      {chord.positions.map(position => (
        <FretboardDiagram
          key={position.id}
          position={position}
          openStrings={tuning.openStrings}
          displayMode="notes"
        />
      ))}
    </main>
  );
}