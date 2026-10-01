import { Router } from 'express';
import {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminMe,
} from '../controllers/auth.controller.js';
import { requireAdminAuth } from '../middlewares/requireAdminAuth.js';
import { authRateLimiter } from '../middlewares/authRateLimiter.js';
import { requireCsrfProtection } from '../middlewares/csrfProtection.js';

const router = Router();

// POST /api/auth/login - Rate limited, authenticates admin and issues HttpOnly + CSRF cookies
router.post('/login', authRateLimiter, handleAdminLogin);

// POST /api/auth/logout - Requires active authentication and CSRF token, clears session
router.post('/logout', requireAdminAuth, requireCsrfProtection, handleAdminLogout);

// GET /api/auth/me - Protected by requireAdminAuth, returns authenticated user profile
router.get('/me', requireAdminAuth, handleAdminMe);

export default router;
