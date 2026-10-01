import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma.js';
import {
  comparePassword,
  signAdminToken,
  ADMIN_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  getAdminCookieOptions,
  getCsrfCookieOptions,
} from '../utils/auth.js';
import { generateCsrfToken } from '../middlewares/csrfProtection.js';
import { loginSchema } from '../validators/admin.validator.js';

/**
 * Controller: handleAdminLogin
 * POST /api/auth/login
 * Validates input, verifies admin credentials, sets HttpOnly token cookie and CSRF cookie.
 */
export async function handleAdminLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Validate payload with Zod
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: 'Dados de autenticação inválidos.',
        details: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = validationResult.data;

    // 2. Fetch admin user from PostgreSQL (strictly by email)
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    // Constant-time failure handling to prevent user enumeration
    if (!adminUser || !adminUser.isActive) {
      res.status(401).json({
        success: false,
        error: 'Credenciais inválidas.',
      });
      return;
    }

    // 3. Compare password with bcrypt hash
    const isPasswordValid = await comparePassword(password, adminUser.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Credenciais inválidas.',
      });
      return;
    }

    // 4. Issue JWT with safe minimal payload
    const token = signAdminToken({
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      tokenVersion: adminUser.tokenVersion,
    });

    // 5. Generate CSRF token
    const csrfToken = generateCsrfToken();

    // 6. Set Cookies
    res.cookie(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());
    res.cookie(CSRF_COOKIE_NAME, csrfToken, getCsrfCookieOptions());

    // 7. Update lastLoginAt in database asynchronously
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLoginAt: new Date() },
    });

    // 8. Return safe admin profile without JWT or passwordHash
    res.status(200).json({
      success: true,
      message: 'Autenticação realizada com sucesso.',
      data: {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('[handleAdminLogin Error]:', error);
    next(error);
  }
}

/**
 * Controller: handleAdminLogout
 * POST /api/auth/logout
 * Clears HttpOnly session cookie and CSRF cookie.
 */
export async function handleAdminLogout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Clear cookies with matching options
    res.clearCookie(ADMIN_COOKIE_NAME, {
      ...getAdminCookieOptions(),
      maxAge: 0,
    });
    res.clearCookie(CSRF_COOKIE_NAME, {
      ...getCsrfCookieOptions(),
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: 'Sessão encerrada com sucesso.',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller: handleAdminMe
 * GET /api/auth/me
 * Protected by requireAdminAuth; returns authenticated user profile.
 */
export async function handleAdminMe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json({
        success: false,
        error: 'Não autenticado.',
      });
      return;
    }

    const adminUser = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!adminUser) {
      res.status(401).json({
        success: false,
        error: 'Usuário administrador não encontrado.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: adminUser,
    });
  } catch (error) {
    next(error);
  }
}
