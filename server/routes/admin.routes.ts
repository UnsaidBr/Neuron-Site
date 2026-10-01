import { Router } from 'express';
import {
  handleGetAdminContacts,
  handleGetAdminPartnerships,
  handleGetAdminTrainees,
  handleUpdateContactStatus,
} from '../controllers/admin.controller.js';
import { requireAdminAuth } from '../middlewares/requireAdminAuth.js';
import { requireCsrfProtection } from '../middlewares/csrfProtection.js';

const router = Router();

// Protect ALL admin routes with requireAdminAuth
router.use(requireAdminAuth);

// GET /api/admin/contacts - Protected contact messages listing with pagination
router.get('/contacts', handleGetAdminContacts);

// GET /api/admin/partnerships - Protected partnerships listing with pagination
router.get('/partnerships', handleGetAdminPartnerships);

// GET /api/admin/trainees - Protected trainee applications listing with pagination
router.get('/trainees', handleGetAdminTrainees);

// PATCH /api/admin/contacts/:id - Protected contact status update, requires CSRF token
router.patch('/contacts/:id', requireCsrfProtection, handleUpdateContactStatus);

export default router;
