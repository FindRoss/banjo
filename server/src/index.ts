import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

// GET Health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
}); 

app.get('/health/db', async (req, res) => {
  const results = await pool.query('SELECT NOW()')
  
  res.json({ status: 'ok', time: results.rows[0].now })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}. All good`);
})

