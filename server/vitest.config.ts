import { defineConfig } from 'vitest/config';
import {  TEST_DATABASE_URL } from './test/testEnv.js'; 

export default defineConfig({
  test: {
    env: {
      DATABASE_URL: TEST_DATABASE_URL,
      JWT_SECRET: 'test-secret',
    },
    globalSetup: ['./test/globalSetup.ts'], 
    fileParallelism: false,
    include: ['test/**/*.test.ts'],
  }
})