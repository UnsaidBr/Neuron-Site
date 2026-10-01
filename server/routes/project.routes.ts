import { Router } from 'express';
import { handleGetProjects } from '../controllers/project.controller.js';

const router = Router();

// GET /api/projects
router.get('/', handleGetProjects);

export default router;
