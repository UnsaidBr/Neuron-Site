import { Router } from 'express';
import { handleCreateContact } from '../controllers/contact.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { formsRateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { createContactSchema } from '../validators/contact.validator.js';

const router = Router();

// POST /api/contacts
router.post(
  '/',
  formsRateLimiter,
  validateBody(createContactSchema),
  handleCreateContact
);

export default router;
