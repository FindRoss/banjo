import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: { status?: number; message?: string }, 
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ?? 500; 

  if (status >= 500) {
    console.error(err); 
  }

  res.status(status).json({
    error: status >= 500 ? 'Something went wrong' : err.message, 
  });
}