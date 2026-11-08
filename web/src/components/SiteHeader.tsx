import Image from 'next/image';
import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        <Image src="/favicon.svg" alt="" width={28} height={28} />
        CloudChords
      </Link>
    </header>
  );
}