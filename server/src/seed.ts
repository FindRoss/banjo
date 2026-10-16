import pool from './db.js';
import { chords } from './seed/chords.js';

async function seed() {
  for (const chord of Object.values(chords)) {
    const result = await pool.query(`
      INSERT INTO chords (root, quality, name, notes)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (root, quality)
        DO UPDATE SET name = EXCLUDED.name, notes = EXCLUDED.notes
        RETURNING id
    `, [chord.root, chord.quality, chord.name, chord.notes])


    const chordId = result.rows[0].id

      for (let i = 0; i < chord.positions.length; i++) {
        const position = chord.positions[i];
        await pool.query(`
          INSERT INTO positions (chord_id, position_number, base_fret, frets, fingers)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (chord_id, position_number)
            DO UPDATE SET base_fret = EXCLUDED.base_fret, frets = EXCLUDED.frets, fingers = EXCLUDED.fingers
        `, [chordId, i + 1, position.baseFret, JSON.stringify(position.frets), position.fingers ? JSON.stringify(position.fingers) : null])
      }
  }

  await pool.end();
}

seed();