import { z } from 'zod';

export const createPartnershipSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'O nome do responsável deve ter no mínimo 2 caracteres.')
      .max(120, 'O nome deve ter no máximo 120 caracteres.'),
    email: z
      .string()
      .trim()
      .email('Forneça um e-mail válido.')
      .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
    institution: z
      .string()
      .trim()
      .min(2, 'A instituição deve ter no mínimo 2 caracteres.')
      .max(150, 'A instituição deve ter no máximo 150 caracteres.'),
    type: z
      .string()
      .trim()
      .min(2, 'O tipo de parceria deve ter no mínimo 2 caracteres.')
      .max(80, 'O tipo deve ter no máximo 80 caracteres.'),
    scope: z
      .string()
      .trim()
      .min(10, 'O escopo da proposta deve ter no mínimo 10 caracteres.')
      .max(3000, 'O escopo deve ter no máximo 3000 caracteres.'),
  })
  .strict();

export type CreatePartnershipDTO = z.infer<typeof createPartnershipSchema>;
