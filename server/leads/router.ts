import { router, publicProcedure } from "../_core/trpc";
import { createLeadSchema } from "@shared/schemas";
import { supabase } from "../db";
import { env } from "../_core/env";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

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

    // Send notification email (don't block the response)
    resend.emails.send({
      from: "AMJ Web <no-reply@send.amjingenieria.cl>",
      to: "ventas@amjingenieria.cl",
      subject: `Nuevo lead: ${input.name}`,
      html: `
        <h2>Nuevo contacto desde amjingenieria.cl</h2>
        <p><strong>Nombre:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        ${input.phone ? `<p><strong>Teléfono:</strong> ${input.phone}</p>` : ""}
        ${input.company ? `<p><strong>Empresa:</strong> ${input.company}</p>` : ""}
        ${input.message ? `<p><strong>Mensaje:</strong> ${input.message}</p>` : ""}
      `,
    }).catch(console.error);

    return { success: true };
  }),
});
