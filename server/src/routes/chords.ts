import { Router } from 'express'; 
import pool from '../db.js';
import { chordsQuerySchema, chordSlugParamsSchema, tuningQuerySchema } from '../schemas.js';

const router = Router(); 

router.get('/', async (req, res) => {
  // Check the incoming filters 
  const parsed = chordsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid query', 
      details: parsed.error.issues
    })
  }

  const { root, quality, instrument, tuning } = parsed.data;

  // Run the query
  const result = await pool.query(`
      SELECT c.id, c.root, c.quality, c.slug, c.name, c.notes,
        json_agg(
          json_build_object('id', p.id, 'baseFret', p.base_fret, 'frets', p.frets, 'fingers', p.fingers)
          ORDER BY p.position_number
        ) AS positions
            FROM chords c
        JOIN positions p ON p.chord_id = c.id
        JOIN tunings t ON t.id = p.tuning_id
        WHERE t.instrument = $3 AND t.slug = $4
        AND ($1::text IS NULL OR c.root = $1)
        AND ($2::text IS NULL OR c.quality = $2)
        GROUP BY c.id
        ORDER BY c.id
    `, [root ?? null, quality ?? null, instrument, tuning]
  ); 

  // Send result.rows back as JSON
  res.json(result.rows);
});

router.get('/:slug', async (req, res) => {
  // 1. Check the slug and the tuning
  const parsedParams = chordSlugParamsSchema.safeParse(req.params); 
  const parsedQuery = tuningQuerySchema.safeParse(req.query); 

  if (!parsedParams.success || !parsedQuery.success) {
    return res.status(400).json({ error: 'Invalid slug or tuning' });
  }

  const { slug } = parsedParams.data; 
  const { instrument, tuning } = parsedQuery.data;

  // 2. Ask the database for that one chord
  const result = await pool.query(`
    SELECT c.id, c.root, c.quality, c.slug, c.name, c.notes, json_agg(
      json_build_object('id', p.id, 'baseFret', p.base_fret, 'frets', p.frets, 'fingers', p.fingers)
        ORDER BY p.position_number
    ) AS positions
     FROM chords c
     JOIN positions p ON p.chord_id = c.id
     JOIN tunings t ON t.id = p.tuning_id
     WHERE c.slug = $1 AND t.instrument = $2 AND t.slug = $3
     GROUP BY c.id
    `, [slug, instrument, tuning]
  );

  // 3. If nothing came back, there's no such chord
  if(result.rows.length === 0) {
    return res.status(404).json({ error: 'Chord not found' });
  }

  // 4. Send back the one chord
  res.json(result.rows[0]); 
});

export default router;