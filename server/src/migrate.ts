import fs from 'node:fs';
import path from 'node:path'; 
import pool from './db.js';

const migrationsDir = path.join(import.meta.dirname, '../migrations');

async function migrate() {
  // 1. Make sure a "migrations" table exists
  await pool.query(` 
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  // 2. Read the names of the .sql files, in order
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()

  // 3. Ask the database which ones have already run
  const result = await pool.query('SELECT name FROM migrations'); 
  const applied = result.rows.map(row => row.name);

  // 4. For each file that hasn't run: run its SQL, then record its name
  for (const file of files) {
    if (applied.includes(file)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    await pool.query(sql);
    await pool.query('INSERT INTO migrations (name) VALUES ($1)', [file]);

    console.log('Applied', file);
  }

  // 5. Close the connection
  await pool.end();
}

migrate();