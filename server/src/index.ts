import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import chordRouter from './routes/chords.js';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/health', healthRouter);
app.use('/chords', chordRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}. All good`);
})

