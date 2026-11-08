import { cacheLife } from 'next/cache';
import type { Chord, Tuning } from '@/lib/types';

const API_URL = process.env.API_URL;

async function apiGet<T>(path: string): Promise<T | null> {
  if (!API_URL) throw new Error('API_URL is not set');

  const response = await fetch(`${API_URL}${path}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`API request failed: ${path} (status ${response.status})`);
  }
  return response.json();
}

export async function getTunings(): Promise<Tuning[]> {
  'use cache';
  cacheLife('days');

  return (await apiGet<Tuning[]>('/tunings')) ?? [];
}

export async function getTuning(instrument: string, slug: string): Promise<Tuning | null> {
  'use cache';
  cacheLife('days');

  const tunings = await getTunings();
  return tunings.find(t => t.instrument === instrument && t.slug === slug) ?? null;
}

export async function getChords(instrument: string, tuning: string): Promise<Chord[]> {
  'use cache';
  cacheLife('days');

  return (await apiGet<Chord[]>(`/chords?instrument=${instrument}&tuning=${tuning}`)) ?? [];
}

export async function getChord(instrument: string, tuning: string, slug: string): Promise<Chord | null> {
  'use cache';
  cacheLife('days');

  return apiGet<Chord>(`/chords/${slug}?instrument=${instrument}&tuning=${tuning}`);
}