import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Forneça um endereço de e-mail válido.')
      .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
    password: z
      .string()
      .min(1, 'A senha é obrigatória.')
      .max(200, 'A senha deve ter no máximo 200 caracteres.'),
  })
  .strict();

export const paginationQuerySchema = z
  .object({
    page: z
      .string()
      .optional()
      .transform((val) => {
        const parsed = parseInt(val || '1', 10);
        return isNaN(parsed) || parsed < 1 ? 1 : parsed;
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => {
        const parsed = parseInt(val || '20', 10);
        if (isNaN(parsed) || parsed < 1) return 20;
        // Cap maximum limit to 100 to prevent denial of service
        return Math.min(parsed, 100);
      }),
    status: z.string().trim().max(50).optional(),
  });

export const updateContactStatusSchema = z
  .object({
    status: z
      .enum(['unread', 'read', 'archived', 'in_progress', 'replied'], {
        errorMap: () => ({
          message:
            'Status inválido. Valores aceitos: unread, read, archived, in_progress, replied.',
        }),
      }),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>;
