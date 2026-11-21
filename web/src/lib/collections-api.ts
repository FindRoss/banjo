const API_URL = process.env.API_URL; 

export type Collection = {
  id: number;
  name: string;
}

type Result<T> = { ok: true; data: T } | { ok: false, error: string }; 

async function authedFetch<T>(
  token: string, 
  path: string, 
  init: { method?: string; body?: unknown } = {}, 
): Promise<Result<T>> {
  if (!API_URL) throw new Error('API_URL is not set');

  const response = await fetch(`${API_URL}${path}`, {
    method: init.method ?? 'GET', 
    headers: {
      Authorization: `Bearer ${token}`, 
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    }, 
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  }); 

  if (response.status === 204) return { ok: true, data: undefined as T };

  const json = await response.json(); 
  if (!response.ok) {
    return { ok: false, error: json.error ?? 'Something went wrong' }; 
  }
  return { ok: true, data: json }; 
}

export function listCollections(token: string) {
  return authedFetch<Collection[]>(token, '/collections'); 
}

export function createCollection(token: string, name: string) {
  return authedFetch<Collection>(token, '/collections', {
    method: 'POST', 
    body: { name }
  });
}

export function addToCollection(token: string, collectionId: number, positionId: number) {
  return authedFetch<unknown>(token, `/collections/${collectionId}/items`, {
    method: 'POST', 
    body: { positionId }, 
  });
}