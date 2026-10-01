import rateLimit from 'express-rate-limit';

/**
 * Authentication Rate Limiter
 * Specifically prepared for POST /api/auth/login
 * Enforces max 5 failed attempts per IP window of 15 minutes.
 * Returns HTTP 429 Too Many Requests when exceeded.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return standard RateLimit headers in response
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    error: 'Muitas tentativas de autenticação incorretas. Por segurança, tente novamente em 15 minutos.',
    retryAfterMinutes: 15,
  },
  skip: (req) => {
    // Allows test suite to explicitly test rate limiter in a dedicated test step without polluting previous test steps
    if (process.env.NODE_ENV === 'test' && req.headers['x-test-bypass-ratelimit'] === 'true') {
      return true;
    }
    return false;
  },
  skipSuccessfulRequests: true, // Only count failed login attempts against the 5-attempt limit
});
