'use client';

import { useState } from 'react';
import { deleteCollectionAction, removeItemAction } from '@/app/actions/collections';

export function RemoveItemButton({
  collectionId,
  itemId,
}: {
  collectionId: number;
  itemId: number;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setBusy(true);
    setError(null);
    const result = await removeItemAction(collectionId, itemId);
    if (!result.ok) setError(result.error);
    setBusy(false);
  }

  return (
    <>
      <button type="button" className="link-button" disabled={busy} onClick={handleClick}>
        {busy ? 'Removing…' : 'Remove'}
      </button>
      {error && <span className="save-note">{error}</span>}
    </>
  );
}

export function DeleteCollectionButton({
  collectionId,
  name,
}: {
  collectionId: number;
  name: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!window.confirm(`Delete "${name}" and everything saved in it?`)) return;

    setBusy(true);
    setError(null);
    const result = await deleteCollectionAction(collectionId);
    if (!result.ok) setError(result.error);
    setBusy(false);
  }

  return (
    <>
      <button type="button" className="link-button" disabled={busy} onClick={handleClick}>
        {busy ? 'Deleting…' : 'Delete collection'}
      </button>
      {error && <span className="save-note">{error}</span>}
    </>
  );
}