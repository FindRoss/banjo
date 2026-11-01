CREATE TABLE collection_items (
  id SERIAL PRIMARY KEY, 
  collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE, 
  position_id INTEGER NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL
)