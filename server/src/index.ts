import express from 'express';
import dotenv from 'dotenv';

import chordRouter from './routes/chords.js';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use('/health', healthRouter);
app.use('/chords', chordRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}. All good`);
})

