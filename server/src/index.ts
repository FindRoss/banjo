import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import chordRouter from './routes/chords.js';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import collectionsRouter from './routes/collections.js'; 
import tuningsRouter from './routes/tunings.js';

import errorHandler from './middleware/errorHandler.js';
import { authLimiter } from './middleware/rateLimits.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/health', healthRouter);
app.use('/chords', chordRouter);
app.use('/auth', authLimiter, authRouter);
app.use('/collections', collectionsRouter);
app.use('/tunings', tuningsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}. All good`);
});