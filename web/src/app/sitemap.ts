import type { MetadataRoute } from 'next';
import { getChords, getTunings } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tunings = await getTunings();
  const entries: MetadataRoute.Sitemap = [{ url: SITE_URL }];

  for (const tuning of tunings) {
    const base = `${SITE_URL}/${tuning.instrument}/${tuning.slug}`;
    entries.push({ url: base });

    const chords = await getChords(tuning.instrument, tuning.slug);
    for (const chord of chords) {
      entries.push({ url: `${base}/${chord.slug}` });
    }
  }

  return entries;
}