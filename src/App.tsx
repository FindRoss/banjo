import './App.css'
import type { DisplayMode, Quality, Root, ChordRef, Collection, Views } from './data/types';
import { chords, roots, qualities, qualityLabels } from './data/chords'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import FretboardDiagram from './components/FretboardDiagram'
import Collections from './components/Collections'
import SaveMenu from './components/SaveMenu'
import { dummyCollection } from './data/dummyCollection'

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
  const chord = Object.values(chords).find(
    c => c.root === displayRoot && c.quality === displayQuality
  );

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]); 

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]); 

  function handleNewCollection() { 
    const name = prompt('Collection name?');
    if (!name) return; 

    const newCollection: Collection = { 
      id: crypto.randomUUID(), 
      name, 
      chordRefs: [],
    }

    setCollections(prev => [...prev, newCollection])
	}

  function handleAddToCollection(collectionId: string, chordRef: ChordRef) {
    
    setCollections(prev => 
      prev.map(col => 
        col.id === collectionId
          ? { ...col, chordRefs: [...col.chordRefs, chordRef] }
          : col
      )
    )
  }

  function handleSelectChange(mode: DisplayMode) {
    setDisplayMode(mode);
    localStorage.setItem('displayMode', mode);
  }

  function handleButtonClick(note: Root) {
    setDisplayRoot(note);
    localStorage.setItem('root', note);
  }  

  function handleQualityClick(quality: Quality) {
    setDisplayQuality(quality)
    localStorage.setItem('quality', quality)
  }

  function handleRemoveChord(collectionId: string, chordIndex: number) {
    if (!confirm('Remove this chord?')) return;

    setCollections(prev => 
      prev.map(col => 
        col.id === collectionId
          ? { ...col, chordRefs: col.chordRefs.filter((_, i) => i !== chordIndex)} 
          : col
      )
    )
  }

  function handleDeleteCollection(collectionId: string) {
    if (!confirm('Delete this collection?')) return;

    setCollections(prev => 
      prev.filter(col => col.id !== collectionId)
    )
  }

  return (
    <>
      <Nav view={view} setView={setView} /> 

      <div>
        <select value={displayMode} onChange={e => handleSelectChange(e.target.value as DisplayMode)}>
          <option value="none">Nothing</option>
          <option value="notes">Notes</option>
          <option value="fingers">Fingers</option>
        </select> 
      </div>


      {view === 'chords' ? (
        
        <div>
          {roots.map(note => (
            
              <button 
                onClick={() => handleButtonClick(note)} 
                key={note}
                className={(note === displayRoot) ? 'active' : ''}
                >
                  {note}
              </button>
            ))}


        <div>
          {qualities.map(quality => <button onClick={() => handleQualityClick(quality)} key={quality} className={(quality === displayQuality) ? 'active' : ''}>{qualityLabels[quality]}</button>)}
        </div>

        <p>
          { 
            chord?.notes && (
            <>Notes in a <strong>{chord.name}</strong>: {chord.notes}</>
          )}
        </p>

        {
          chord ? (
            chord.positions.map((position, index) => (
              <div key={index}> 
                <FretboardDiagram position={position} displayMode={displayMode} key={index} />
                <SaveMenu 
                  chordRef={{ root: chord.root, quality: chord.quality, positionIndex: index }}
                  collections={collections}
                  handleNewCollection={handleNewCollection} 
                  handleAddToCollection={handleAddToCollection}
                  key={index + 1} 
                />
              </div>
            ))
          ) : (
            <p>No chord diagram yet for this chord</p>
          )
        }
      
        </div>
      ) : (
        <Collections 
          collections={collections} 
          displayMode={displayMode} 
          handleDeleteCollection={handleDeleteCollection}
          handleRemoveChord={handleRemoveChord} 
        />
      )}

      
     
      
      
    </>
  )
}

export default App;
