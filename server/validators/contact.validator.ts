import { z } from 'zod';

export const createContactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'O nome deve ter no mínimo 2 caracteres.')
      .max(120, 'O nome deve ter no máximo 120 caracteres.'),
    email: z
      .string()
      .trim()
      .email('Forneça um endereço de e-mail válido.')
      .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
    institution: z
      .string()
      .trim()
      .max(150, 'A instituição deve ter no máximo 150 caracteres.')
      .optional()
      .nullable(),
    phone: z
      .string()
      .trim()
      .max(30, 'O telefone deve ter no máximo 30 caracteres.')
      .optional()
      .nullable(),
    subject: z
      .string()
      .trim()
      .min(3, 'O assunto deve ter no mínimo 3 caracteres.')
      .max(200, 'O assunto deve ter no máximo 200 caracteres.'),
    topic: z
      .string()
      .trim()
      .max(50, 'O tópico deve ter no máximo 50 caracteres.')
      .default('parceria'),
    message: z
      .string()
      .trim()
      .min(10, 'A mensagem deve ter no mínimo 10 caracteres.')
      .max(3000, 'A mensagem deve ter no máximo 3000 caracteres.'),
  })
  .strict();

export type CreateContactDTO = z.infer<typeof createContactSchema>;
