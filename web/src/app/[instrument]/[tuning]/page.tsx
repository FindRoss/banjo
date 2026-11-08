import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChords, getTuning, getTunings } from '@/lib/api';
import { capitalise, fullName } from '@/lib/names';
import type { Root } from '@/lib/types';

const ROOTS: Root[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

type Params = Promise<{ instrument: string; tuning: string }>;

export const instant = false;

export async function generateStaticParams() {
  const tunings = await getTunings();
  return tunings.map(tuning => ({
    instrument: tuning.instrument,
    tuning: tuning.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { instrument, tuning: tuningSlug } = await params;
  const tuning = await getTuning(instrument, tuningSlug);

  if (!tuning) return {};

  return {
    alternates: { canonical: `/${instrument}/${tuningSlug}` },
    title: `${capitalise(instrument)} Chords in ${tuning.name} Tuning`,
    description: `Browse every ${instrument} chord in ${tuning.name} tuning, with fretboard diagrams, finger positions and note names.`,
  };
}

export default async function TuningPage({ params }: { params: Params }) {
  const { instrument, tuning: tuningSlug } = await params;

  const tuning = await getTuning(instrument, tuningSlug);
  if (!tuning) notFound();

  const chords = await getChords(instrument, tuningSlug);

  return (
    <main style={{ padding: 40 }}>
      <h1>
        {capitalise(instrument)} chords in {tuning.name} tuning
      </h1>

      {ROOTS.map(root => {
        const group = chords.filter(chord => chord.root === root);
        if (group.length === 0) return null;

        return (
          <section key={root}>
            <h2>{root}</h2>
            <ul>
              {group.map(chord => (
                <li key={chord.id}>
                  <Link href={`/${instrument}/${tuningSlug}/${chord.slug}`}>
                    {fullName(chord)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}