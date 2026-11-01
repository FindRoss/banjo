CREATE TABLE positions (
  id SERIAL PRIMARY KEY,
  chord_id INTEGER NOT NULL REFERENCES chords(id) ON DELETE CASCADE,
  tuning_id INTEGER NOT NULL REFERENCES tunings(id),
  position_number INTEGER NOT NULL,
  base_fret INTEGER NOT NULL,
  frets JSONB NOT NULL,
  fingers JSONB,
  UNIQUE (chord_id, tuning_id, position_number)
);