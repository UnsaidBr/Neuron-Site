import rateLimit from 'express-rate-limit';

export const formsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 submissions per windowMs
  standardHeaders: true, // Draft-6 RateLimit headers
  legacyHeaders: false, // X-RateLimit headers
  message: {
    success: false,
    error: 'Muitas requisições enviadas a partir deste endereço IP. Por favor, aguarde alguns minutos antes de tentar novamente.',
  },
});
