import { cacheLife } from 'next/cache';
import type { Chord, Tuning } from '@/lib/types';

const API_URL = process.env.API_URL;

async function apiGet<T>(path: string): Promise<T> {
  if (!API_URL) throw new Error('API_URL is not set');

  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${path} (status ${response.status})`);
  }
  return response.json();
}

export async function getChord(slug: string): Promise<Chord> {
  'use cache';
  cacheLife('days');

  return apiGet<Chord>(`/chords/${slug}`);
}

export async function getTuning(instrument: string, slug: string): Promise<Tuning> {
  'use cache';
  cacheLife('days');

  const tunings = await apiGet<Tuning[]>('/tunings');
  const tuning = tunings.find(t => t.instrument === instrument && t.slug === slug);
  if (!tuning) throw new Error(`Unknown tuning: ${instrument}/${slug}`);
  return tuning;
}