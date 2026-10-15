import type { Collection } from '../data/types';
import { chords } from '../data/chords';
import FretboardDiagram from '../components/FretboardDiagram';
import './Collections.css';

interface CollectionsProps {
	collections: Collection[];
	handleRemoveChord: (collectionId: string, chordIndex: number) => void;
	handleDeleteCollection: (collectionId: string) => void;
}

function Collections({ collections, handleRemoveChord, handleDeleteCollection }: CollectionsProps) {
	return (
		<div className="collections-view">
			<div className="collections-header desktop-only">
				<h2 className="collections-title">Collections</h2>
				<span className="collections-count">{collections.length} collections</span>
			</div>
			<p className="sub-line phone-only">You have {collections.length} collections</p>

			{collections.map(col => (
				<div className="collection-card" key={col.id}>
					<div className="collection-card-header">
						<div>
							<span className="collection-name">{col.name}</span>
							<span className="collection-chord-count"> {col.chordRefs.length} chords</span>
						</div>
						<button className="delete-collection-btn" onClick={() => handleDeleteCollection(col.id)}>
							<span className="phone-only-inline">Delete</span>
							<span className="desktop-only-inline">Delete collection</span>
						</button>
					</div>

					{col.chordRefs.length === 0 ? (
						<p className="empty-collection">No chords yet. Save one from the Chords tab.</p>
					) : (
						<div className="tile-row">
							{col.chordRefs.map((ref, index) => {
								const chord = Object.values(chords).find(
									c => c.root === ref.root && c.quality === ref.quality
								);
								if (!chord) return null;

								const position = chord.positions[ref.positionIndex];
								if (!position) return null;

								return (
									<div className="chord-tile" key={index}>
										<button className="tile-remove" onClick={() => handleRemoveChord(col.id, index)}>×</button>
										<div className="tile-diagram">
											<FretboardDiagram position={position} displayMode="none" width={84} />
										</div>
										<div className="tile-name">{chord.name}</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default Collections;
