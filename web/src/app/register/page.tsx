import type { Metadata } from 'next';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { registerAction } from '@/app/actions/auth';

export const metadata: Metadata = {
  title: 'Create an account', 
  robots: { index: false }
}; 

export default function RegiterPage() {
  return (
    <main className="page auth-page">
      <h1 className="page-title">Create an account</h1>
      <AuthForm 
        action={registerAction}
        submitLabel="Create account"
        passwordAutoComplete="new-password"
      />
      <p className="auth-alt">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}