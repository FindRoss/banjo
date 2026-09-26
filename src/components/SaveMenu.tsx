import { useState } from 'react'; 
import type { Collection, ChordRef } from '../data/types'

interface SaveMenuProps { 
	chordRef: ChordRef; 
	collections: Collection[];
	handleNewCollection: () => void;
	handleAddToCollection: (collectionId: string, chordRed: ChordRef) => void;
}

function SaveMenu({ chordRef, collections, handleNewCollection, handleAddToCollection }: SaveMenuProps) {
	const [saveMenuOpen, setSaveMenuOpen] = useState(false);


	return (
		<>
			<button onClick={() => setSaveMenuOpen(prev => !prev)}>Save</button>
			{
				saveMenuOpen && (
					<>
						<button onClick={handleNewCollection}>+ New Collection</button>
						{collections.map(collection => (
							<div key={collection.id}>
								{collection.name} 
								<button 
									onClick={() => handleAddToCollection(collection.id, chordRef)}
								>
									Add
								</button> 
							</div>
						))}
					</>
				)
			}
		
		</>
	)
}

export default SaveMenu; 