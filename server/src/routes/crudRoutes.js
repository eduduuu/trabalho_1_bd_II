import { Router } from 'express';
import { crudController } from '../controllers/crudController.js';

const router = Router();

router.get('/:entity', crudController.list);
router.get('/:entity/:id', crudController.getOne);
router.post('/:entity', crudController.create);
router.put('/:entity/:id', crudController.update);
router.delete('/:entity/:id', crudController.delete);

export default router;
