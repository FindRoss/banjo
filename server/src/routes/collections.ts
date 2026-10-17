import { Router } from 'express'; 
import pool from '../db.js'; 
import requireAuth from '../middleware/requireAuth.js'; 
import { createCollectionSchema, credentialsSchema } from '../schemas.js';

const router = Router(); 

router.use(requireAuth);

router.get('/', async (req, res) => {
  const userId = res.locals.user.id; 
  
  const result = await pool.query(
      'SELECT * FROM collections c WHERE $1 = user_id', 
      [userId]
    );

  res.json(result.rows);
  
}); 



// This is to POST a collection

//  const parsed = createCollectionSchema.safeParse(req.body); 
//   if (!parsed.success) {
//     return res.status(400).json({
//       error: 'Invalid query', 
//       details: parsed.error.issues
//     }); 
//   }

export default router; 