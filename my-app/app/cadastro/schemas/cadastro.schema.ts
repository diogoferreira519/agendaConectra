import { z } from 'zod';

export const cadastroSchema = z.object({
  username: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha muito curta'),
  confirmPassword: z.string().min(6, 'Senha muito curta'),
});

export type CadastroSchema = z.infer<typeof cadastroSchema>;