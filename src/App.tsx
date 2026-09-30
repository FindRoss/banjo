import './App.css'
import type { DisplayMode, Quality, Root, ChordRef, Collection, Views } from './data/types';
import { chords, roots, qualities, qualityLabels, qualityFullNames } from './data/chords'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import FretboardDiagram from './components/FretboardDiagram'
import Collections from './components/Collections'
import SaveSheet from './components/SaveSheet'
import SegmentedControl from './components/SegmentedControl'

const displayOptions: { value: DisplayMode; label: string }[] = [
  { value: 'none', label: 'Off' },
  { value: 'notes', label: 'Notes' },
  { value: 'fingers', label: 'Fingers' },
];

function chordRefsMatch(a: ChordRef, b: ChordRef) {
  return a.root === b.root && a.quality === b.quality && a.positionIndex === b.positionIndex;
}

function isSavedAnywhere(collections: Collection[], ref: ChordRef) {
  return collections.some(col => col.chordRefs.some(r => chordRefsMatch(r, ref)));
}

function App() {
  let [displayMode, setDisplayMode] = useState<DisplayMode>(
    () => (localStorage.getItem('displayMode') as DisplayMode) ?? 'none'
  );
  let [displayRoot, setDisplayRoot] = useState<Root>(
    () => (localStorage.getItem('root') as Root) ?? 'C'
  );
  let [displayQuality, setDisplayQuality] = useState<Quality>(
    () => (localStorage.getItem('quality') as Quality) ?? 'major'
  );
  const [collections, setCollections] = useState<Collection[]>(
    () => JSON.parse(localStorage.getItem('collections') ?? '[]')
  );
  const [view, setView] = useState<Views>(
    () => (localStorage.getItem('view') as Views) ?? 'chords'
  );
  const [savingPositionIndex, setSavingPositionIndex] = useState<number | null>(null);

  const chord = Object.values(chords).find(
    c => c.root === displayRoot && c.quality === displayQuality
  );

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  function handleSelectChange(mode: DisplayMode) {
    setDisplayMode(mode);
    localStorage.setItem('displayMode', mode);
  }

  function handleNoteClick(note: Root) {
    setDisplayRoot(note);
    localStorage.setItem('root', note);
    setSavingPositionIndex(null);
  }

  function handleQualityClick(quality: Quality) {
    setDisplayQuality(quality);
    localStorage.setItem('quality', quality);
    setSavingPositionIndex(null);
  }

  function handleViewChange(next: Views) {
    setView(next);
    setSavingPositionIndex(null);
  }

  function handleToggleInCollection(collectionId: string, chordRef: ChordRef) {
    setCollections(prev =>
      prev.map(col => {
        if (col.id !== collectionId) return col;
        const exists = col.chordRefs.some(r => chordRefsMatch(r, chordRef));
        return {
          ...col,
          chordRefs: exists
            ? col.chordRefs.filter(r => !chordRefsMatch(r, chordRef))
            : [...col.chordRefs, chordRef],
        };
      })
    );
  }

  function handleCreateCollection(name: string, chordRef: ChordRef) {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Untitled',
      chordRefs: [chordRef],
    };
    setCollections(prev => [...prev, newCollection]);
  }

  function handleRemoveChord(collectionId: string, chordIndex: number) {
    if (!confirm('Remove this chord?')) return;

    setCollections(prev =>
      prev.map(col =>
        col.id === collectionId
          ? { ...col, chordRefs: col.chordRefs.filter((_, i) => i !== chordIndex) }
          : col
      )
    );
  }

  function handleDeleteCollection(collectionId: string) {
    if (!confirm('Delete this collection?')) return;

    setCollections(prev => prev.filter(col => col.id !== collectionId));
  }

  const savingChordRef: ChordRef | null =
    chord && savingPositionIndex !== null
      ? { root: chord.root, quality: chord.quality, positionIndex: savingPositionIndex }
      : null;

  return (
    <div className="app">
      <Nav
        view={view}
        setView={handleViewChange}
        displayMode={displayMode}
        onDisplayModeChange={handleSelectChange}
      />

      <div className="app-body">
        <h1 className="page-title phone-only">{view === 'chords' ? 'Banjo Chords' : 'Collections'}</h1>

        {view === 'chords' ? (
          <>
            <div className="side-panel">
              <div className="panel-section">
                <div className="section-label">Root</div>
                <div className="root-grid">
                  {roots.map(note => (
                    <button
                      key={note}
                      className={`root-btn${note === displayRoot ? ' active' : ''}`}
                      onClick={() => handleNoteClick(note)}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel-section">
                <div className="section-label">Quality</div>
                <div className="quality-row">
                  {qualities.map(quality => {
                    const exists = Object.values(chords).some(
                      c => c.root === displayRoot && c.quality === quality
                    );
                    return (
                      <button
                        key={quality}
                        className={`quality-pill${quality === displayQuality ? ' active' : ''}`}
                        style={exists ? undefined : { opacity: 0.35 }}
                        onClick={() => handleQualityClick(quality)}
                      >
                        <span className="phone-only-inline">{qualityLabels[quality]}</span>
                        <span className="desktop-only-inline">{qualityFullNames[quality]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="main-area">
              {chord ? (
                <>
                  <div className="chord-header">
                    <div className="chord-name">{chord.name}</div>
                    <div className="chord-meta">
                      <div className="chord-full-name">{chord.root} {qualityFullNames[chord.quality].toLowerCase()}</div>
                      <div className="chord-notes">
                        {chord.notes ? chord.notes.split(',').map(n => n.trim()).join(' · ') : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="phone-only display-row">
                    <SegmentedControl options={displayOptions} value={displayMode} onChange={handleSelectChange} />
                  </div>

                  <div className="positions-grid">
                    {chord.positions.map((position, index) => {
                      const ref: ChordRef = { root: chord.root, quality: chord.quality, positionIndex: index };
                      const saved = isSavedAnywhere(collections, ref);
                      return (
                        <div className="position-card" key={index}>
                          <FretboardDiagram position={position} displayMode={displayMode} width={190} />
                          <div className="card-footer">
                            <div className="card-footer-text">
                              <div className="card-title">Position {index + 1}</div>
                              <div className="card-sub">{position.baseFret === 1 ? 'Open' : `Fret ${position.baseFret}`}</div>
                            </div>
                            <button
                              className={`save-btn${saved ? ' saved' : ''}`}
                              onClick={() => setSavingPositionIndex(index)}
                            >
                              {saved ? 'Saved' : 'Save'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="empty-state">No chord diagram yet for this chord</p>
              )}
            </div>
          </>
        ) : (
          <Collections
            collections={collections}
            handleDeleteCollection={handleDeleteCollection}
            handleRemoveChord={handleRemoveChord}
          />
        )}
      </div>

      {chord && savingChordRef && (
        <SaveSheet
          open={savingPositionIndex !== null}
          chordRef={savingChordRef}
          chordName={chord.name}
          positionIndex={savingPositionIndex ?? 0}
          collections={collections}
          onClose={() => setSavingPositionIndex(null)}
          onToggle={handleToggleInCollection}
          onCreate={handleCreateCollection}
        />
      )}
    </div>
  )
}

export default App;
