import { router, publicProcedure } from "../_core/trpc";
import { createLeadSchema } from "../../shared/schemas";
import { supabase } from "../db";
import { env } from "../_core/env";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { generateEventId, sendLeadEvent } from "../lib/meta-capi";

const resend = new Resend(env.RESEND_API_KEY);

const FALLBACK_URL = "https://amjingenieria.cl/";

function parseOrigin(refererHeader: string | undefined) {
  if (!refererHeader) {
    return { url: FALLBACK_URL, path: "/" };
  }
  try {
    const parsed = new URL(refererHeader);
    return { url: parsed.toString(), path: parsed.pathname || "/" };
  } catch {
    return { url: FALLBACK_URL, path: "/" };
  }
}

export const leadsRouter = router({
  create: publicProcedure.input(createLeadSchema).mutation(async ({ input, ctx }) => {
    const eventId = generateEventId();
    const origin = parseOrigin(ctx.req.headers.referer);

    const customFields: Record<string, string> = {
      origin_url: origin.url,
      origin_path: origin.path,
    };
    if (input.company) customFields.company = input.company;

    const { error } = await supabase.from("leads").insert({
      site_id: env.SITE_ID,
      name: input.name,
      email: input.email,
      source: "website",
      custom_fields: customFields,
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo enviar el mensaje. Intenta de nuevo.",
      });
    }

    // Fire Meta CAPI Lead event (don't block the response)
    sendLeadEvent({
      email: input.email,
      name: input.name,
      eventSourceUrl: origin.url,
      clientIp: (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0] ?? ctx.req.socket.remoteAddress,
      clientUserAgent: ctx.req.headers["user-agent"],
      eventId,
    });

    // Send notification email (don't block the response)
    resend.emails.send({
      from: "AMJ Web <no-reply@send.amjingenieria.cl>",
      to: "ventas@amjingenieria.cl",
      subject: `Nuevo lead [${origin.path}]: ${input.name}`,
      html: `
        <h2>Nuevo contacto desde amjingenieria.cl</h2>
        <p><strong>Nombre:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        ${input.company ? `<p><strong>Empresa:</strong> ${input.company}</p>` : ""}
        <p><strong>Origen:</strong> <a href="${origin.url}">${origin.url}</a></p>
      `,
    }).catch(console.error);

    return { success: true, eventId };
  }),
});
