import { Router } from 'express';
import { handleGetPartners } from '../controllers/partner.controller.js';

const router = Router();

// GET /api/partners
router.get('/', handleGetPartners);

export default router;
