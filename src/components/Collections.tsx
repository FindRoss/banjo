import type { Collection, DisplayMode } from '../data/types';
import { chords } from '../data/chords';
import FretboardDiagram from '../components/FretboardDiagram';

interface CollectionsProps {
	collections: Collection[];
	displayMode: DisplayMode;
	handleRemoveChord: (collectionId: string, chordIndex: number) => void;
	handleDeleteCollection: (collectionId: string) => void;
}

function Collections({collections, displayMode, handleRemoveChord, handleDeleteCollection}: CollectionsProps) {


	return (
		<>
			<h2>Hello World From Collections</h2>
			<p>You have {collections.length} collections</p>
			
			{collections.map((col, index) => (
				<div key={index}>
					
					<h3>{col.name}</h3>
					<button onClick={() => handleDeleteCollection(col.id)}>Delete Collection</button>

					{col.chordRefs.map((ref, index) => { 
					
						const chord = Object.values(chords).find(c => 
							c.root === ref.root && c.quality === ref.quality
						);
						if (!chord) return null;		
						
						const position = chord?.positions[ref.positionIndex]; 
						if (!position) return null;

						return (
							<div key={index}>
								<h4>{chord.name}</h4>
								<p>{chord.notes}</p>
								<FretboardDiagram position={position} displayMode={displayMode} key={index} />
								<button onClick={() => handleRemoveChord(col.id, index)}>Delete Chord</button>
							</div>	
						)
					})}

				</div>
			))}
		</>
	)
}; 

export default Collections; 