'use server'; 

import { redirect } from 'next/navigation';
import { login, register } from '@/lib/auth-api';
import { setSession } from '@/lib/session';
import type { FormState } from '@/components/AuthForm';

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''), 
  }; 
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const {email, password} = readCredentials(formData);

  const result = await login(email, password);
  if (!result.ok) return {error: result.error}; 

  await setSession(result.data.token); 
  redirect('/'); 
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { email, password } = readCredentials(formData);

  const created = await register(email, password); 
  if (!created.ok) return { error: created.error }; 

  // Registering doesnt return a token, so log in straight away
  const result = await login(email, password);
  if (!result.ok) return { error: result.error };
  
  await setSession(result.data.token); 
  redirect('/');
}