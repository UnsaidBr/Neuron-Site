import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma.js';
import {
  ADMIN_COOKIE_NAME,
  verifyAdminToken,
  AdminUserPayload,
} from '../utils/auth.js';

/**
 * Middleware: requireAdminAuth
 * Protects administrative endpoints by verifying:
 * 1. Presence of 'neuron_admin_token' HttpOnly cookie
 * 2. Signature and strict algorithm (HS256) of the JWT
 * 3. Existence of AdminUser in PostgreSQL database
 * 4. isActive flag === true
 * 5. Matching tokenVersion between database and JWT payload (instant revocation)
 *
 * Attaches safe req.admin ({ id, email, role, tokenVersion }) on success.
 * Never exposes passwordHash.
 */
export async function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Read cookie (supports parsed cookies via cookie-parser or direct header parse)
    const token =
      req.cookies?.[ADMIN_COOKIE_NAME] ||
      extractCookieValue(req.headers.cookie, ADMIN_COOKIE_NAME);

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Não autenticado. Sessão administrativa não encontrada.',
      });
      return;
    }

    // 2. Validate JWT signature and structure
    let decoded;
    try {
      decoded = verifyAdminToken(token);
    } catch {
      res.status(401).json({
        success: false,
        error: 'Sessão administrativa inválida ou expirada.',
      });
      return;
    }

    // 3. Verify AdminUser in PostgreSQL via Prisma
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        tokenVersion: true,
      },
    });

    // 4. Ensure admin user exists
    if (!adminUser) {
      res.status(401).json({
        success: false,
        error: 'Usuário administrador não encontrado.',
      });
      return;
    }

    // 5. Ensure account is active
    if (!adminUser.isActive) {
      res.status(401).json({
        success: false,
        error: 'Conta de administrador desativada.',
      });
      return;
    }

    // 6. Ensure tokenVersion matches (immediate session invalidation)
    if (adminUser.tokenVersion !== decoded.tokenVersion) {
      res.status(401).json({
        success: false,
        error: 'Sessão administrativa revogada. Por favor, autentique-se novamente.',
      });
      return;
    }

    // 7. Inject safe sanitized admin info into request
    const adminPayload: AdminUserPayload = {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      tokenVersion: adminUser.tokenVersion,
    };

    req.admin = adminPayload;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Fallback cookie extractor in case cookie-parser is bypassed or used in isolated middlewares
 */
function extractCookieValue(
  cookieHeader: string | undefined,
  cookieName: string
): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [name, ...rest] = part.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}
