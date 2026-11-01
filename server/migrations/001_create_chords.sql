CREATE TABLE chords (
  id SERIAL PRIMARY KEY,
  root TEXT NOT NULL,
  quality TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  notes TEXT NOT NULL,
  UNIQUE (root, quality)
);