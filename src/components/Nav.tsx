import type { Views, DisplayMode } from '../data/types';
import SegmentedControl from './SegmentedControl';
import './Nav.css';

interface NavProps {
	view: Views;
	setView: (view: Views) => void;
	displayMode: DisplayMode;
	onDisplayModeChange: (mode: DisplayMode) => void;
}

const displayOptions: { value: DisplayMode; label: string }[] = [
	{ value: 'none', label: 'Off' },
	{ value: 'notes', label: 'Notes' },
	{ value: 'fingers', label: 'Fingers' },
];

const viewOptions: { value: Views; label: string }[] = [
	{ value: 'chords', label: 'Chords' },
	{ value: 'collections', label: 'Collections' },
];

function Nav({ view, setView, displayMode, onDisplayModeChange }: NavProps) {
	return (
		<>
			{/* Desktop top bar */}
			<header className="top-bar">
				<div className="top-bar-left">
					<h1 className="top-bar-title">
						<img src="/favicon.svg" alt="" className="logo-mark" />
						Banjo Chords
					</h1>
					<SegmentedControl className="seg-view" options={viewOptions} value={view} onChange={setView} />
				</div>
				<div className="top-bar-right">
					<span className="show-on-dots-label">Show on dots</span>
					<SegmentedControl className="seg-display-desktop" options={displayOptions} value={displayMode} onChange={onDisplayModeChange} />
				</div>
			</header>

			{/* Phone bottom tab bar */}
			<nav className="tab-bar">
				<button className={`tab${view === 'chords' ? ' active' : ''}`} onClick={() => setView('chords')}>
					<span className="tab-indicator" />
					<span className="tab-label">Chords</span>
				</button>
				<button className={`tab${view === 'collections' ? ' active' : ''}`} onClick={() => setView('collections')}>
					<span className="tab-indicator" />
					<span className="tab-label">Collections</span>
				</button>
			</nav>
		</>
	);
}

export default Nav;
