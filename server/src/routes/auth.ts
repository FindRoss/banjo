import { Router } from 'express'; 
import bcrypt from 'bcrypt'; 
import pool from '../db.js';
import { credentialsSchema } from '../schemas.js';
import jwt from 'jsonwebtoken'; 
import { JWT_SECRET } from '../config.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.post('/register', async (req, res) => {
  // 1. validate req.body with credentialsSchema (400 if invalid)
  const parsed = credentialsSchema.safeParse(req.body); 

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid input', 
      details: parsed.error.issues
    })
  } 

  const {email, password} = parsed.data;

  // 2. hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. insert the user
  const result = await pool.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) 
     ON CONFLICT (email) DO NOTHING 
     RETURNING id, email`,
    [email, passwordHash]
  );

  // 4. if the email was already taken, reply 409 ???
  if (result.rows.length === 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  
  // 5. otherwise reply 201 with the new user's id and email
  res.status(201).json(result.rows[0]);
});

router.post('/login', async (req, res) => {
  // 1. validate req.body with credentialsSchema (400 if invalid)
  const parsed = credentialsSchema.safeParse(req.body); 

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid input', 
      details: parsed.error.issues
    });
  }

  const { email, password } = parsed.data; 

  // 2. find the user by email
  const results = await pool.query(
    `SELECT * FROM users WHERE email = $1`, [email]
  );
  
  const user = results.rows[0]; 
  const passwordMatches = user && await bcrypt.compare(password, user.password_hash);
  
  // 3. if there's no user OR the password doesn't match, reply 401
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // 4. create a token and send it back
  const token = jwt.sign(
    { id: user.id, email: user.email},
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user.id, email: user.email } });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: res.locals.user })
})


export default router;
