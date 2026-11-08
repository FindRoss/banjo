import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { capitalise, fullName } from '@/lib/names';
import { getChord, getChords, getTuning, getTunings } from '@/lib/api';
import Link from 'next/link';
import ChordPositions from '@/components/ChordPositions';

export const instant = false;

export async function generateStaticParams() {
  const tunings = await getTunings();

  const lists = await Promise.all(
    tunings.map(async tuning => {
      const chords = await getChords(tuning.instrument, tuning.slug);
      return chords.map(chord => ({
        instrument: tuning.instrument,
        tuning: tuning.slug,
        slug: chord.slug,
      }));
    })
  );

  return lists.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ instrument: string; tuning: string; slug: string }>;
}): Promise<Metadata> {
  const { instrument, tuning: tuningSlug, slug } = await params;

  const tuning = await getTuning(instrument, tuningSlug);
  const chord = await getChord(instrument, tuningSlug, slug);

  if (!tuning || !chord) return {};

  const count = chord.positions.length;
  const fingerings = count === 1 ? '1 fingering' : `${count} fingerings`;

  return {
    alternates: { canonical: `/${instrument}/${tuningSlug}/${slug}` },
    title: `${fullName(chord)} ${capitalise(instrument)} Chord (${tuning.name} Tuning)`,
    description: `How to play ${fullName(chord)} on ${instrument} in ${tuning.name} tuning: ${fingerings} with finger positions and note names. Notes in the chord: ${chord.notes}.`,
  };
}

export default async function ChordPage({
  params,
}: {
  params: Promise<{ instrument: string; tuning: string; slug: string }>;
}) {
  const { instrument, tuning: tuningSlug, slug } = await params;

  const tuning = await getTuning(instrument, tuningSlug);
  const chord = await getChord(instrument, tuningSlug, slug);

  if (!tuning || !chord) notFound();

    const notes = chord.notes
    .split(',')
    .map(note => note.trim())
    .join(' · ');

  return (
    <main className="page">
      <Link className="back-link" href={`/${instrument}/${tuningSlug}`}>
        ← All {instrument} chords
      </Link>

      <div className="chord-header">
        <h1 className="chord-name">
          {chord.name}
          <span className="sr-only">
            {' '}
            – {fullName(chord)} {instrument} chord in {tuning.name} tuning
          </span>
        </h1>
        <div className="chord-meta">
          <div className="chord-full-name">
            {fullName(chord)} · {tuning.name}
          </div>
          <div className="chord-notes">{notes}</div>
        </div>
      </div>

      <ChordPositions positions={chord.positions} openStrings={tuning.openStrings} />
    </main>
  );
}
