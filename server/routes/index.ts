import { Router } from 'express';
import contactRoutes from './contact.routes.js';
import partnershipRoutes from './partnership.routes.js';
import traineeRoutes from './trainee.routes.js';
import projectRoutes from './project.routes.js';
import publicationRoutes from './publication.routes.js';
import partnerRoutes from './partner.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

const apiRouter = Router();

// Health check
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'neuron-api',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Authentication routes (/api/auth/login, /api/auth/logout, /api/auth/me)
apiRouter.use('/auth', authRoutes);

// Protected administrative routes (/api/admin/contacts, /partnerships, /trainees)
apiRouter.use('/admin', adminRoutes);

// Form submission routes (mutations)
apiRouter.use('/contacts', contactRoutes);
apiRouter.use('/partnerships', partnershipRoutes);
apiRouter.use('/trainees', traineeRoutes);

// Data consultation routes (queries)
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/publications', publicationRoutes);
apiRouter.use('/partners', partnerRoutes);

export default apiRouter;
