import bcrypt from 'bcryptjs';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { CookieOptions } from 'express';

/**
 * Password Hashing configuration
 * Bcrypt cost factor 12 (standard for high security)
 */
const BCRYPT_SALT_ROUNDS = 12;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    throw new Error('A senha informada para hashing é inválida.');
  }
  return bcrypt.hash(plainTextPassword, BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  if (!plainTextPassword || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

/**
 * JWT Configuration & Types
 */
export const JWT_ALGORITHM = 'HS256' as const;
export const JWT_EXPIRES_IN = '8h';

export interface AdminJwtPayload {
  sub: string;
  email: string;
  role: string;
  tokenVersion: number;
}

export interface AdminUserPayload {
  id: string;
  email: string;
  role: string;
  tokenVersion: number;
}

/**
 * Retrieves the mandatory JWT_SECRET from environment.
 * Throws immediately if absent or empty to prevent insecure execution.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      'Configuração crítica ausente: JWT_SECRET não está definido no ambiente do servidor.'
    );
  }
  return secret.trim();
}

/**
 * Signs a JWT strictly with HS256 algorithm and 8-hour expiration.
 */
export function signAdminToken(payload: AdminJwtPayload): string {
  const secret = getJwtSecret();
  const signOptions: SignOptions = {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(
    {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      tokenVersion: payload.tokenVersion,
    },
    secret,
    signOptions
  );
}

/**
 * Verifies a JWT strictly requiring the HS256 algorithm.
 * Rejects unexpected algorithms (none, RS256, etc.) and expired/malformed tokens.
 */
export function verifyAdminToken(token: string): AdminJwtPayload {
  if (!token || typeof token !== 'string') {
    throw new Error('Token ausente ou inválido.');
  }

  const secret = getJwtSecret();
  const verifyOptions: VerifyOptions = {
    algorithms: [JWT_ALGORITHM],
  };

  const decoded = jwt.verify(token, secret, verifyOptions) as jwt.JwtPayload;

  if (
    !decoded.sub ||
    typeof decoded.sub !== 'string' ||
    !decoded.email ||
    typeof decoded.email !== 'string' ||
    !decoded.role ||
    typeof decoded.role !== 'string' ||
    typeof decoded.tokenVersion !== 'number'
  ) {
    throw new Error('Estrutura de payload JWT inválida.');
  }

  return {
    sub: decoded.sub,
    email: decoded.email,
    role: decoded.role,
    tokenVersion: decoded.tokenVersion,
  };
}

/**
 * Centralized Cookie Settings for Admin Session
 * neuron_admin_token is strictly inaccessible to frontend JavaScript
 */
export const ADMIN_COOKIE_NAME = 'neuron_admin_token';
export const ADMIN_COOKIE_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export function getAdminCookieOptions(): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE_MS,
  };
}

/**
 * CSRF Protection Utilities for Cookie-based Admin Operations
 * Double-Submit Cookie Pattern (OWASP recommendation for SPAs):
 * - A random cryptographically secure token is generated.
 * - Set in a readable cookie 'neuron_csrf_token' (SameSite=Lax).
 * - Client reads this cookie and includes it in header 'X-CSRF-Token'.
 * - Backend verifies header matches cookie for state-changing requests (POST, PATCH, PUT, DELETE).
 */
export const CSRF_COOKIE_NAME = 'neuron_csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

export function getCsrfCookieOptions(): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: false, // Must be readable by client JS to include in X-CSRF-Token header
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE_MS,
  };
}
