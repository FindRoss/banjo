import Link from 'next/link';
import { getTunings } from '@/lib/api';
import { capitalise } from '@/lib/names';

export default async function Home() {
  const tunings = await getTunings();

  return (
    <main style={{ padding: 40 }}>
      <h1>CloudChords</h1>
      <p>Chord charts and fretboard diagrams.</p>
      <ul>
        {tunings.map(tuning => (
          <li key={tuning.id}>
            <Link href={`/${tuning.instrument}/${tuning.slug}`}>
              {capitalise(tuning.instrument)} chords in {tuning.name} tuning
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}