import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';
import { getMe } from '@/lib/auth-api';
import { getToken } from '@/lib/session';

export default async function AuthNav() {
  const token = await getToken();
  const user = token ? await getMe(token) : null;

  if (!user) {
    return (
      <nav className="auth-nav">
        <Link href="/login">Log in</Link>
      </nav>
    );
  }

  return (
    <nav className="auth-nav">
      <span className="auth-nav-email">{user.email}</span>
      <form action={logoutAction}>
        <button type="submit">Log out</button>
      </form>
    </nav>
  );
}