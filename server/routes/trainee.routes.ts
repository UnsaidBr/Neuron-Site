import { Router } from 'express';
import { handleCreateTrainee } from '../controllers/trainee.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { formsRateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { createTraineeSchema } from '../validators/trainee.validator.js';

const router = Router();

// POST /api/trainees
router.post(
  '/',
  formsRateLimiter,
  validateBody(createTraineeSchema),
  handleCreateTrainee
);

export default router;
