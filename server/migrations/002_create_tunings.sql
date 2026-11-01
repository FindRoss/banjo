CREATE TABLE tunings (
  id SERIAL PRIMARY KEY,
  instrument TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  open_strings JSONB NOT NULL,
  UNIQUE (instrument, slug)
);

INSERT INTO tunings (instrument, name, slug, open_strings)
VALUES ('banjo', 'Open G', 'open-g', '["D","G","B","D"]');