import './App.css'
import FretboardDiagram from './components/FretboardDiagram'
import type { DisplayMode, Quality, Root, ChordRef, Collection } from './data/types';
import { chords, roots, qualities, qualityLabels } from './data/chords'
import { useState, useEffect } from 'react'
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
  const [collections, setCollections] = useState<Collection[]>(dummyCollection)

  const chord = Object.values(chords).find(
    c => c.root === displayRoot && c.quality === displayQuality
  );

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

  return (
    <>
      <h1>Banjo Chords</h1>

      <div>
        <select value={displayMode} onChange={e => handleSelectChange(e.target.value as DisplayMode)}>
          <option value="none">Nothing</option>
          <option value="notes">Notes</option>
          <option value="fingers">Fingers</option>
        </select> 
      </div>
      
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
      </div>

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
            <div> 
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
        
    
     
    </>
  )
}

export default App
