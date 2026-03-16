import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  SUPABASE_URL: z.string().url().default("https://dekyswplvzsbqzcdsavu.supabase.co"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SITE_ID: z.string().uuid(),
  RESEND_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
