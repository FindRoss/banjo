import { Router } from 'express'; 
import pool from '../db.js';
import { chordsQuerySchema } from '../schemas.js';

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

  const { root, quality } = parsed.data;

  // Run the query
  const result = await pool.query(`
      SELECT c.id, c.root, c.quality, c.name, c.notes,
        json_agg(
          json_build_object('id', p.id, 'baseFret', p.base_fret, 'frets', p.frets, 'fingers', p.fingers)
          ORDER BY p.position_number
        ) AS positions
        FROM chords c
        JOIN positions p ON p.chord_id = c.id
        WHERE ($1::text IS NULL OR c.root = $1)         
        AND ($2::text IS NULL OR c.quality = $2)
        GROUP BY c.id
        ORDER BY c.id
    `, [root ?? null, quality ?? null]
  ); 

  // Send result.rows back as JSON
  res.json(result.rows);
});

export default router;