'use client';

import { useActionState } from 'react';

export type FormState = { error: string } | null;

type Props = {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  passwordAutoComplete: 'current-password' | 'new-password';
};

export default function AuthForm({ action, submitLabel, passwordAutoComplete }: Props) {
  const [state, formAction, pending] = useActionState(action, null); 

  return (
    <form action={formAction} className="auth-form">
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Password
        <input 
          type="password" 
          name="password" 
          required 
          minLength={8} 
          autoComplete={passwordAutoComplete} 
        />
      </label>

      {state?.error && (
        <p className="auth-error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending}>
        { pending ? 'Please wait...' : submitLabel }
      </button>

    </form>
  ); 
} 
