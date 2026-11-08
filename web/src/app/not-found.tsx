import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <Link href="/">Back to CloudChords</Link>
    </main>
  );
}