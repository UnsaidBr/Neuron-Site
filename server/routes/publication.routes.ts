import { Router } from 'express';
import { handleGetPublications } from '../controllers/publication.controller.js';

const router = Router();

// GET /api/publications
router.get('/', handleGetPublications);

export default router;
