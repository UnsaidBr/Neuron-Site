import { AdminUserPayload } from '../utils/auth.js';

declare global {
  namespace Express {
    interface Request {
      admin?: AdminUserPayload;
    }
  }
}

export {};
