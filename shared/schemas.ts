import { z } from "zod";

const utmField = z.string().trim().min(1).max(255);
const clickIdField = z.string().trim().min(1).max(500);
const urlField = z.string().trim().min(1).max(2048);

export const attributionSchema = z
  .object({
    utm_source: utmField.optional(),
    utm_medium: utmField.optional(),
    utm_campaign: utmField.optional(),
    utm_term: utmField.optional(),
    utm_content: utmField.optional(),
    gclid: clickIdField.optional(),
    gad_source: clickIdField.optional(),
    wbraid: clickIdField.optional(),
    gbraid: clickIdField.optional(),
    fbclid: clickIdField.optional(),
    li_fat_id: clickIdField.optional(),
    first_touch_url: urlField.optional(),
    last_touch_url: urlField.optional(),
    referrer: urlField.optional(),
  })
  .strict();

export type Attribution = z.infer<typeof attributionSchema>;

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gad_source",
  "wbraid",
  "gbraid",
  "fbclid",
  "li_fat_id",
  "first_touch_url",
  "last_touch_url",
  "referrer",
] as const satisfies readonly (keyof Attribution)[];

export const createLeadSchema = z.object({
  name: z.string().min(1, "Nombre es requerido").max(100),
  email: z.string().email("Email inválido"),
  company: z.string().max(100).optional(),
  attribution: attributionSchema.optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
