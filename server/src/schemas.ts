import { z } from 'zod'; 

export const chordsQuerySchema = z.object({
  root: z.enum(['C', 'D', 'E', 'F', 'G', 'A', 'B']).optional(), 
  quality: z.enum(['major', 'minor', 'augmented', 'seventh', 'sixth']).optional()
}); 

export const credentialsSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8)
});