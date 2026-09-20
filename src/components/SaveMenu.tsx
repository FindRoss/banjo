import { useState } from 'react'; 
import type { Collection, ChordRef } from '../data/types'

interface SaveMenuProps { 
	savedChord: ChordRef; 
	collections: Collection[];
	handleNewCollection: () => void;
	handleAddToCollection: () => void;
}

function SaveMenu({ savedChord, collections, handleNewCollection, handleAddToCollection }: SaveMenuProps) {
	const [saveMenuOpen, setSaveMenuOpen] = useState(false);


	return (
		<>
			<button onClick={(prev) => setSaveMenuOpen(prev => !prev)}>Save</button>
			{
				saveMenuOpen && (
					<>
						<button onClick={handleNewCollection}>+ New Collection</button>
						{collections.map(collection => (
							<div key={collection.id}>
								{collection.name} 
								<button 
										onClick={() =>handleAddToCollection(collection.id, savedChord)}
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