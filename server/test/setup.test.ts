import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app.js';

describe('test setup', () => {
  it('answers /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('has the migrated and seeded test database', async () => {
    const response = await request(app).get('/tunings');
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(
      expect.objectContaining({ instrument: 'banjo', slug: 'open-g' }),
    );
  });
});