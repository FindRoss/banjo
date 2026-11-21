'use client';

import { useState, type SyntheticEvent } from 'react';
import Link from 'next/link';
import {
  createCollectionAction,
  getCollectionsAction,
  saveToCollectionAction,
  type CollectionsResult,
} from '@/app/actions/collections';

export default function SaveButton({ positionId }: { positionId: number }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CollectionsResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setMessage(null);
    setData(null);
    setData(await getCollectionsAction());
  }

  async function save(collectionId: number, collectionName: string) {
    const result = await saveToCollectionAction(collectionId, positionId);
    setMessage(result.ok ? `Saved to ${collectionName}` : result.error);
  }

  async function handlePick(collectionId: number, collectionName: string) {
    setBusy(true);
    await save(collectionId, collectionName);
    setBusy(false);
  }

  async function handleCreate(event: SyntheticEvent) {
    event.preventDefault();
    setBusy(true);

    const created = await createCollectionAction(newName);
    if (!created.ok) {
      setMessage(created.error);
      setBusy(false);
      return;
    }

    await save(created.data.id, created.data.name);
    setNewName('');
    setData(await getCollectionsAction());
    setBusy(false);
  }

  return (
    <div className="save">
      <button type="button" className="save-toggle" onClick={toggle} aria-expanded={open}>
        {open ? 'Close' : 'Save'}
      </button>

      {open && (
        <div className="save-menu">
          {data === null && <p className="save-note">Loading…</p>}

          {data?.status === 'logged-out' && (
            <p className="save-note">
              <Link href="/login">Log in</Link> or <Link href="/register">create an account</Link>{' '}
              to save chords.
            </p>
          )}

          {data?.status === 'error' && <p className="save-note">{data.error}</p>}

          {data?.status === 'ok' && (
            <>
              {data.collections.length > 0 && (
                <ul className="save-list">
                  {data.collections.map((collection) => (
                    <li key={collection.id}>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handlePick(collection.id, collection.name)}
                      >
                        {collection.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <form className="save-new" onSubmit={handleCreate}>
                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="New collection"
                  maxLength={60}
                  aria-label="New collection name"
                />
                <button type="submit" disabled={busy}>
                  Create
                </button>
              </form>
            </>
          )}

          {message && (
            <p className="save-note" role="status">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}