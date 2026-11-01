import pool from './db.js';
import { chords } from './seed/chords.js';
import type { Quality } from './types.js';

const slugEndings: Record<Quality, string> = {
  major: '-major',
  minor: '-minor',
  seventh: '7', 
  sixth: '6', 
  augmented: '-augmented'
}; 

function slugFor(root: string, quality: Quality) {
  return root.toLowerCase() + slugEndings[quality];
}

async function seed() {
  const tuningResult = await pool.query(
    `SELECT id FROM tunings WHERE instrument = 'banjo' AND slug = 'open-g'`
  );
  const tuningId = tuningResult.rows[0].id;


  for (const chord of Object.values(chords)) {
    const result = await pool.query(`
      INSERT INTO chords (root, quality, slug, name, notes)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (root, quality)
        DO UPDATE SET slug = EXCLUDED.slug, name = EXCLUDED.name, notes = EXCLUDED.notes
        RETURNING id
    `, [chord.root, chord.quality, slugFor(chord.root, chord.quality), chord.name, chord.notes])


    const chordId = result.rows[0].id

      for (let i = 0; i < chord.positions.length; i++) {
        const position = chord.positions[i];
        await pool.query(`
          INSERT INTO positions (chord_id, tuning_id, position_number, base_fret, frets, fingers)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (chord_id, tuning_id, position_number)
            DO UPDATE SET base_fret = EXCLUDED.base_fret, frets = EXCLUDED.frets, fingers = EXCLUDED.fingers
        `, [chordId, tuningId, i + 1, position.baseFret, JSON.stringify(position.frets), position.fingers ? JSON.stringify(position.fingers) : null])
      }
  }

  await pool.end();
}

seed();