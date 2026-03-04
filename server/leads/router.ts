import { router, publicProcedure } from "../_core/trpc";
import { createLeadSchema } from "@shared/schemas";
import { supabase } from "../db";
import { env } from "../_core/env";
import { TRPCError } from "@trpc/server";

export const leadsRouter = router({
  create: publicProcedure.input(createLeadSchema).mutation(async ({ input }) => {
    const { error } = await supabase.from("leads").insert({
      site_id: env.SITE_ID,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      notes: input.message ?? null,
      source: "website",
      custom_fields: input.company ? { company: input.company } : {},
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo enviar el mensaje. Intenta de nuevo.",
      });
    }

    return { success: true };
  }),
});
