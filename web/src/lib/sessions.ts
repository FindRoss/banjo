import { cookies } from 'next/headers';

const COOKIE_NAME = 'token';

export async function setSession(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,                                  // browser JS can't read it
    secure: process.env.NODE_ENV === 'production',   // HTTPS only when live
    sameSite: 'lax',                                 // blocks most cross-site abuse
    path: '/',                                       // sent on every page
    maxAge: 60 * 60 * 24 * 7,                        // 7 days, same as the JWT
  });
}

export async function getToken() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}