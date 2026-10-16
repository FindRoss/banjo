import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok' })
});

router.get('/db', async (req, res) => {
  const resulst = await pool.query('SELECT NOW()')

  res.json({ status: 'ok', time: resulst.rows[0].now })
});

export default router;