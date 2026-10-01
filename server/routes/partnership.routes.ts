import { Router } from 'express';
import { handleCreatePartnership } from '../controllers/partnership.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { formsRateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { createPartnershipSchema } from '../validators/partnership.validator.js';

const router = Router();

// POST /api/partnerships
router.post(
  '/',
  formsRateLimiter,
  validateBody(createPartnershipSchema),
  handleCreatePartnership
);

export default router;
