import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { DeleteCollectionButton, RemoveItemButton } from '@/components/CollectionActions';
import FretboardDiagram from '@/components/FretboardDiagram';
import { listSavedCollections } from '@/lib/collections-api';
import { fullName } from '@/lib/names';
import { getToken } from '@/lib/session';

export const metadata: Metadata = {
  title: 'My collections',
  robots: { index: false },
};

export default function CollectionsPage() {
  return (
    <main className="page">
      <h1 className="page-title">My collections</h1>
      <Suspense fallback={<p className="page-intro">Loading…</p>}>
        <CollectionsList />
      </Suspense>
    </main>
  );
}

async function CollectionsList() {
  const token = await getToken();
  if (!token) redirect('/login');

  const result = await listSavedCollections(token);
  if (!result.ok) return <p className="page-intro">{result.error}</p>;

  const collections = result.data;

  if (collections.length === 0) {
    return (
      <p className="page-intro">
        No collections yet. Open any chord page and press Save under a fingering to start one.
      </p>
    );
  }

  return (
    <>
      {collections.map((collection) => (
        <section className="collection-section" key={collection.id}>
          <div className="collection-header">
            <h2 className="collection-name">{collection.name}</h2>
            <DeleteCollectionButton collectionId={collection.id} name={collection.name} />
          </div>

          {collection.items.length === 0 ? (
            <p className="page-intro">Nothing saved here yet.</p>
          ) : (
            <div className="positions-grid">
              {collection.items.map((item) => (
                <div className="position-card" key={item.id}>
                  <FretboardDiagram
                    position={{
                      id: item.positionId,
                      baseFret: item.baseFret,
                      frets: item.frets,
                      fingers: item.fingers,
                    }}
                    openStrings={item.tuning.openStrings}
                    displayMode="notes"
                  />
                  <div className="card-footer">
                    <div className="card-title">
                      <Link
                        href={`/${item.tuning.instrument}/${item.tuning.slug}/${item.chord.slug}`}
                      >
                        {fullName(item.chord)}
                      </Link>
                    </div>
                    <div className="card-sub">
                      {item.baseFret === 1 ? 'Open' : `Fret ${item.baseFret}`} · {item.tuning.name}
                    </div>
                  </div>
                  <RemoveItemButton collectionId={collection.id} itemId={item.id} />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}