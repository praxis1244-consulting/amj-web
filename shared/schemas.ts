import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1, "Nombre es requerido").max(100),
  email: z.string().email("Email inválido"),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().max(1000).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
