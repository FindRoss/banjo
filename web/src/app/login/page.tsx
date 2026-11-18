import type { Metadata } from 'next';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { loginAction } from '@/app/actions/auth';

export const metadata: Metadata = {
  title: 'Log in',
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main className="page auth-page">
      <h1 className="page-title">Log in</h1>
      <AuthForm
        action={loginAction}
        submitLabel="Log in"
        passwordAutoComplete="current-password"
      />
        <p className="auth-alt">
          New here? <Link href="/register">Create an account</Link>
        </p>
    </main>
  )
}