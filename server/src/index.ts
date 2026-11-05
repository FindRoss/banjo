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
import helmet from 'helmet';
import { PORT, CORS_ORIGIN } from './config.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

app.use('/health', healthRouter);
app.use('/chords', chordRouter);
app.use('/auth', authLimiter, authRouter);
app.use('/collections', collectionsRouter);
app.use('/tunings', tuningsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}. All good`);
});