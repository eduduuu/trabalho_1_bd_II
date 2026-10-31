import { Router } from 'express';
import { statusController } from '../controllers/statusController.js';

const router = Router();

router.get('/', statusController.getStatus);
router.post('/toggle', statusController.toggleAdapter);

export default router;
