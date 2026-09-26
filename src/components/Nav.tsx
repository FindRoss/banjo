import type { Views } from '../data/types'

interface NavProps {
	view: Views
	setView: (view: Views) => void
}

function Nav({ view, setView }: NavProps) {
  return (
		<nav>
			<h1>Banjo Chords</h1>
			<div>
				<button className={view === 'chords' ? 'active' : ''} onClick={() => setView('chords')}>Chords</button>
				<button className={view === 'collections' ? 'active' : ''} onClick={() => setView('collections')}>Collections</button>
			</div>
		</nav>
	)
}

export default Nav;