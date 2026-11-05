import { z } from 'zod'; 

export const chordsQuerySchema = z.object({
  root: z.enum(['C', 'D', 'E', 'F', 'G', 'A', 'B']).optional(), 
  quality: z.enum(['major', 'minor', 'augmented', 'seventh', 'sixth']).optional(), 
  instrument: z.string().default('banjo'), 
  tuning: z.string().default('open-g')
}); 

export const credentialsSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8)
});

export const createCollectionSchema = z.object({
  name: z.string().trim().min(1).max(60)
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const addItemSchema = z.object({
  positionId: z.number().int().positive()
}); 

export const itemParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  itemId: z.coerce.number().int().positive(),
});

export const chordSlugParamsSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
})

export const tuningQuerySchema = z.object({
  instrument: z.string().default('banjo'),
  tuning: z.string().default('open-g'),
})


