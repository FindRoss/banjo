const API_URL = process.env.API_URL;

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function postJson<T>(path: string, body: unknown): Promise<Result<T>> {
  if (!API_URL) throw new Error('API_URL is not set');

  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const json = await response.json();
  if (!response.ok) {
    return { ok: false, error: json.error ?? 'Something went wrong' };
  }
  return { ok: true, data: json };
}

export function login(email: string, password: string) {
  return postJson<{ token: string; user: { id: number; email: string } }>(
    '/auth/login',
    { email, password },
  );
}

export function register(email: string, password: string) {
  return postJson<{ id: number; email: string }>('/auth/register', {
    email,
    password,
  });
}