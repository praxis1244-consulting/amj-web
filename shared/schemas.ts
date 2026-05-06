import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1, "Nombre es requerido").max(100),
  email: z.string().email("Email inválido"),
  company: z.string().max(100).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
