CREATE TABLE chords (
  id SERIAL PRIMARY KEY,
  root TEXT NOT NULL,
  quality TEXT NOT NULL,
  name TEXT NOT NULL,
  notes TEXT NOT NULL,
  UNIQUE (root, quality)
);