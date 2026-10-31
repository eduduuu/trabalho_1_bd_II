import { Router } from 'express';
import { queryController } from '../controllers/queryController.js';

const router = Router();

router.get('/metadata', queryController.getMetadata);
router.get('/insights', queryController.getInsights);
router.get('/lookups', queryController.getLookups);
router.get('/complex/:queryId', queryController.runComplex);
router.post('/custom', queryController.runCustom);

export default router;
