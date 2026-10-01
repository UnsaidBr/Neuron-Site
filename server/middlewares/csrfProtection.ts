import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '../utils/auth.js';

/**
 * Generates a random cryptographic CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Middleware: requireCsrfProtection
 * Enforces Double-Submit Cookie CSRF pattern for mutating methods (POST, PATCH, PUT, DELETE)
 * on administrative endpoints.
 * Safe methods (GET, HEAD, OPTIONS) pass through unconditionally.
 */
export function requireCsrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  // Extract CSRF cookie
  const cookieToken =
    req.cookies?.[CSRF_COOKIE_NAME] ||
    extractCookie(req.headers.cookie, CSRF_COOKIE_NAME);

  // Extract CSRF header (Node/Express headers are lowercased by default, check both)
  const headerToken =
    (req.headers[CSRF_HEADER_NAME.toLowerCase()] as string | undefined) ||
    (req.headers['x-csrf-token'] as string | undefined);

  if (!cookieToken || !headerToken) {
    res.status(403).json({
      success: false,
      error: 'Falha de validação CSRF: token ausente.',
    });
    return;
  }

  // Constant-time comparison to prevent timing attacks
  const cookieBuffer = Buffer.from(cookieToken);
  const headerBuffer = Buffer.from(headerToken);

  if (
    cookieBuffer.length !== headerBuffer.length ||
    !crypto.timingSafeEqual(cookieBuffer, headerBuffer)
  ) {
    res.status(403).json({
      success: false,
      error: 'Falha de validação CSRF: token inválido.',
    });
    return;
  }

  next();
}

function extractCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}
