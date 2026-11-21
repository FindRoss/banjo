'use server'; 

import { getToken } from '@/lib/session'; 
import {
  addToCollection,
  createCollection,
  listCollections,
  type Collection,
} from '@/lib/collections-api'; 

export type CollectionsResult = 
  | { status: 'logged-out' }
  | { status: 'error'; error: string }
  | { status: 'ok'; collections: Collection[] };

export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function getCollectionsAction(): Promise<CollectionsResult> {
  const token = await getToken(); 
  if (!token) return { status: 'logged-out' }; 

  const result = await listCollections(token);
  if (!result.ok) return { status: 'error', error: result.error };

  return { status: 'ok', collections: result.data };
}

export async function saveToCollectionAction(
  collectionId: number,
  positionId: number, 
): Promise<ActionResult> {
  const token = await getToken(); 
  if (!token) return { ok: false, error: 'Please log in to save chords' }; 

  const result = await addToCollection(token, collectionId, positionId);
  if (!result.ok) return { ok: false, error: result.error };

  return { ok: true, data: null};
}

export async function createCollectionAction(name: string): Promise<ActionResult<Collection>> {
  const token = await getToken(); 
  if (!token) return { ok: false, error: 'Please log in to create a collection' }; 

  const trimmed = name.trim(); 
  if (!trimmed) return { ok: false, error: 'Give the collection a name' };

  const result = await createCollection(token, trimmed); 
  if (!result.ok) return { ok: false, error: result.error }; 

  return { ok: true, data: result.data }; 
}