import { execSync } from 'node:child_process';
import { TEST_DATABASE_URL } from './testEnv.js';   

export default function setup() {
  if (!TEST_DATABASE_URL.includes('test')) {
    throw new Error(`Refusing to run tests against "${TEST_DATABASE_URL}"`);
  }

  const env = { ...process.env, DATABASE_URL: TEST_DATABASE_URL };
  execSync('npx tsx src/migrate.ts', { stdio: 'inherit', env });
  execSync('npx tsx src/seed.ts', { stdio: 'inherit', env });
}