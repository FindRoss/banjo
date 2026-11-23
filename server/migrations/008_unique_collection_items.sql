-- 1. Remove existing duplicates, keeping the earliest row of each pair
DELETE FROM collection_items a
USING collection_items b
WHERE a.collection_id = b.collection_id
  AND a.position_id = b.position_id
  AND a.id > b.id;

-- 2. Forbid new ones
ALTER TABLE collection_items
  ADD CONSTRAINT collection_items_collection_position_key
  UNIQUE (collection_id, position_id);