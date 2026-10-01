import { z } from 'zod';

export const createTraineeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'O nome completo deve ter no mínimo 2 caracteres.')
      .max(120, 'O nome completo deve ter no máximo 120 caracteres.'),
    email: z
      .string()
      .trim()
      .email('Forneça um e-mail válido.')
      .max(150, 'O e-mail deve ter no máximo 150 caracteres.'),
    phone: z
      .string()
      .trim()
      .min(8, 'O telefone deve ter no mínimo 8 caracteres.')
      .max(30, 'O telefone deve ter no máximo 30 caracteres.'),
    course: z
      .string()
      .trim()
      .min(2, 'O curso deve ter no mínimo 2 caracteres.')
      .max(100, 'O curso deve ter no máximo 100 caracteres.'),
    period: z
      .string()
      .trim()
      .min(1, 'O período deve ter no mínimo 1 caractere.')
      .max(30, 'O período deve ter no máximo 30 caracteres.'),
    areaOfInterest: z
      .string()
      .trim()
      .min(2, 'A área de interesse deve ter no mínimo 2 caracteres.')
      .max(100, 'A área de interesse deve ter no máximo 100 caracteres.'),
    motivation: z
      .string()
      .trim()
      .min(10, 'A motivação deve ter no mínimo 10 caracteres.')
      .max(3000, 'A motivação deve ter no máximo 3000 caracteres.'),
    type: z
      .string()
      .trim()
      .max(50)
      .default('trainee'),
  })
  .strict();

export type CreateTraineeDTO = z.infer<typeof createTraineeSchema>;
