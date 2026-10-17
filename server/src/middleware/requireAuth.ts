import type { Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken'; 
import { JWT_SECRET } from '../config.js';

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
  // 1. read the Authorization header
  const authHeader = req.headers.authorization; 

  // 2. if it's missing or doesn't start with "Bearer ", reply 401
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Missing or invalid authorization header'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.locals.user = payload; 
    next(); 
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
}