import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha muito curta'),
});

export type LoginSchema = z.infer<typeof loginSchema>;