import Link from 'next/link';
import { getTunings } from '@/lib/api';
import { capitalise } from '@/lib/names';

export default async function Home() {
  const tunings = await getTunings();

  return (
    <main className="page">
      <h1 className="page-title">CloudChords</h1>
      <p className="page-intro">
        Chord charts and fretboard diagrams, with note names and finger positions.
      </p>

      <ul className="tuning-list">
        {tunings.map(tuning => (
          <li key={tuning.id}>
            <Link className="tuning-card" href={`/${tuning.instrument}/${tuning.slug}`}>
              <div className="tuning-card-title">
                {capitalise(tuning.instrument)} · {tuning.name} tuning
              </div>
              <div className="tuning-card-strings">{tuning.openStrings.join(' · ')}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}