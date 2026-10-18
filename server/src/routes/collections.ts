import { Router } from 'express'; 
import pool from '../db.js'; 
import requireAuth from '../middleware/requireAuth.js'; 
import { createCollectionSchema, idParamSchema, addItemSchema, itemParamsSchema } from '../schemas.js';

const router = Router(); 

router.use(requireAuth);

router.get('/', async (req, res) => {
  const userId = res.locals.user.id; 
  
  const result = await pool.query(`
    SELECT c.id, c.name, c.created_at,
        COALESCE(
          json_agg(json_build_object('id', ci.id, 'positionId', ci.position_id) ORDER BY ci.sort_order)
            FILTER (WHERE ci.id IS NOT NULL),
          '[]'
        ) AS items
      FROM collections c
      LEFT JOIN collection_items ci ON ci.collection_id = c.id
      WHERE c.user_id = $1
      GROUP BY c.id
      ORDER BY c.created_at  
    `, [userId]
    );

  res.json(result.rows);
  
}); 

router.post('/', async (req, res) => {
  const userId = res.locals.user.id; 

  const parsed = createCollectionSchema.safeParse(req.body); 

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid name', 
      details: parsed.error.issues
    })
  } 

  const {name} = parsed.data
  
  const result = await pool.query(`
    INSERT INTO collections (user_id, name) VALUES ($1, $2) RETURNING id, name, created_at
    `, [userId, name]
  );

  res.status(201).json({...result.rows[0], items: []})
});

router.delete('/:id', async (req, res) => {
  const userId = res.locals.user.id; 

  const parsed = idParamSchema.safeParse(req.params); 

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid id'
    });
  }

  const { id } = parsed.data;

  const result = await pool.query(`
    DELETE FROM collections WHERE id = $1 AND user_id = $2
    `, [id, userId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  res.status(204).send();
});

router.post('/:id/items', async (req, res) => {
  const userId = res.locals.user.id; 

  const parsedId = idParamSchema.safeParse(req.params);
  const parsedPosition = addItemSchema.safeParse(req.body);

  if (!parsedId.success) {
    return res.status(400).json({
      error: 'Invalid id'
    });
  }

  if (!parsedPosition.success) {
    return res.status(400).json({ error: 'Invalid position' });
  }

  const { id } = parsedId.data;
  const { positionId } = parsedPosition.data;


  const owned = await pool.query(
    'SELECT id FROM collections WHERE id = $1 AND user_id = $2',
    [id, userId]
  );

  if (owned.rows.length === 0) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  const position = await pool.query(`
    SELECT id FROM positions WHERE id = $1
    `, [positionId]
  );
  
  if (position.rows.length === 0) {
    return res.status(404).json({ error: 'No position found' });
  }

  const result = await pool.query(`
    INSERT INTO collection_items (collection_id, position_id, sort_order)
      VALUES ($1, $2, COALESCE((SELECT MAX(sort_order) FROM collection_items WHERE collection_id = $1), 0) + 1)
      RETURNING id, position_id AS "positionId"
    `, [id, positionId]
  );

  return res.status(201).json(result.rows[0]);
});

router.delete('/:id/items/:itemId', async (req, res) => {
  const userId = res.locals.user.id;
  // 1. validate req.params with itemParamsSchema (400 if invalid)
  const parsed = itemParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid id or ids'
    });
  }

  const { id, itemId }  = parsed.data;

  // 2. delete the item, but ONLY if it is in this collection AND the collection is yours
  const result = await pool.query(`
    DELETE FROM collection_items
      WHERE id = $1
      AND collection_id = $2
      AND collection_id IN (SELECT id FROM collections WHERE user_id = $3)
    `, [itemId, id, userId]
  ); 

  // 3. if nothing was deleted, reply 404
  if (result.rowCount === 0) {
  return res.status(404).json({ error: 'Item not found' });
  }
  // 4. otherwise reply 204
  return res.status(204).send();
});

export default router; 