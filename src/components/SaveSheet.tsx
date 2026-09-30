import { useState } from 'react';
import type { Collection, ChordRef } from '../data/types';
import './SaveSheet.css';

interface SaveSheetProps {
  open: boolean;
  chordRef: ChordRef;
  chordName: string;
  positionIndex: number;
  collections: Collection[];
  onClose: () => void;
  onToggle: (collectionId: string, chordRef: ChordRef) => void;
  onCreate: (name: string, chordRef: ChordRef) => void;
}

function isInCollection(collection: Collection, ref: ChordRef) {
  return collection.chordRefs.some(
    r => r.root === ref.root && r.quality === ref.quality && r.positionIndex === ref.positionIndex
  );
}

function SaveSheet({ open, chordRef, chordName, positionIndex, collections, onClose, onToggle, onCreate }: SaveSheetProps) {
  const [newName, setNewName] = useState('');

  if (!open) return null;

  function handleCreate() {
    onCreate(newName, chordRef);
    setNewName('');
  }

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="save-sheet">
        <div className="sheet-grabber" />
        <div className="sheet-header">
          <div>
            <div className="sheet-title">Save to collection</div>
            <div className="sheet-subtitle">{chordName} · Position {positionIndex + 1}</div>
          </div>
          <button className="sheet-done" onClick={onClose}>Done</button>
        </div>

        <div className="collection-rows">
          {collections.map(collection => {
            const added = isInCollection(collection, chordRef);
            return (
              <button
                key={collection.id}
                className="collection-row"
                onClick={() => onToggle(collection.id, chordRef)}
              >
                <span className="collection-row-text">
                  <span className="collection-row-name">{collection.name}</span>
                  <span className="collection-row-count">{collection.chordRefs.length} chords</span>
                </span>
                <span className={`check-circle${added ? ' added' : ''}`}>{added ? '✓' : ''}</span>
              </button>
            );
          })}
        </div>

        <div className="new-collection-row">
          <input
            className="new-collection-input"
            type="text"
            value={newName}
            placeholder="New collection name"
            onChange={e => setNewName(e.target.value)}
          />
          <button className="create-btn" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </>
  );
}

export default SaveSheet;
