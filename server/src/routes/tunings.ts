import {Router} from 'express'; 
import pool from '../db.js'; 

const router = Router(); 

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT id, instrument, name, slug, open_strings AS "openStrings"
    FROM tunings
    ORDER BY instrument, name  
  `);

  res.json(result.rows);
});

export default router; 