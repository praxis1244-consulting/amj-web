import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLeadSchema, type CreateLeadInput } from "@shared/schemas";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SITE_ID = "c271ef9e-4751-4481-90fb-be03ab921592";

/**
 * Conversion-focused contact section.
 * Single-step form with clear value proposition and accessible form semantics.
 */
export default function ContactFormD() {
  const prefersReducedMotion = useReducedMotion();
  const formId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      const { error } = await supabase.from("leads").insert({
        site_id: SITE_ID,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        notes: input.message ?? null,
        source: "website",
        custom_fields: input.company ? { company: input.company } : {},
      });

      if (error) {
        throw new Error("No se pudo enviar tu solicitud. Intenta de nuevo.");
      }
    },
  });

  const onSubmit = (data: CreateLeadInput) => {
    const normalizedData: CreateLeadInput = {
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
      message: data.message?.trim() || undefined,
    };

    mutation.mutate(normalizedData, {
      onSuccess: () => reset(),
    });
  };

  const inputClass =
    "min-h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-zinc-500 transition-[border-color,background-color,box-shadow] duration-200 ease-out focus:border-white/35 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-white/10";

  const shouldAnimate = !prefersReducedMotion;
  const enterTransition = {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  const successTransition = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section id="contacto" className="pb-24 px-4 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-zinc-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl"
        />

        <div className="relative grid gap-12 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-16 lg:px-16 lg:py-16">
          <motion.div
            className="flex min-w-0 flex-col justify-between"
            initial={shouldAnimate ? { opacity: 0, y: 18 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-10% 0px -10% 0px" } : undefined}
            transition={shouldAnimate ? enterTransition : undefined}
          >
            <div className="max-w-2xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Primera asesoría sin costo
              </div>

              <h3 className="max-w-[16ch] text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Protege tu operación antes del próximo incidente.
              </h3>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                El 43% de los ciberataques apunta a empresas medianas que creen
                estar protegidas. Revisamos tu caso, detectamos brechas reales y
                te proponemos un siguiente paso claro — sin compromiso.
              </p>
            </div>

            <div className="mt-8 md:mt-10 flex overflow-x-auto snap-x snap-mandatory scroll-px-6 md:grid md:grid-cols-3 gap-3 text-sm text-zinc-300 pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: "none" }}>
              <div className="snap-start shrink-0 w-[65vw] md:w-auto rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 md:py-4">
                <p className="font-medium text-white text-[13px] md:text-sm">1 día hábil</p>
                <p className="mt-0.5 md:mt-1 text-[12px] md:text-sm text-zinc-400">
                  para la primera respuesta
                </p>
              </div>
              <div className="snap-start shrink-0 w-[65vw] md:w-auto rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 md:py-4">
                <p className="font-medium text-white text-[13px] md:text-sm">Sin spam</p>
                <p className="mt-0.5 md:mt-1 text-[12px] md:text-sm text-zinc-400">
                  usamos tus datos solo para contactarte
                </p>
              </div>
              <div className="snap-start shrink-0 w-[65vw] md:w-auto rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 md:py-4">
                <p className="font-medium text-white text-[13px] md:text-sm">Más contexto, mejor ayuda</p>
                <p className="mt-0.5 md:mt-1 text-[12px] md:text-sm text-zinc-400">
                  empresa y teléfono son opcionales
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-col justify-center"
            initial={shouldAnimate ? { opacity: 0, y: 18 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-10% 0px -10% 0px" } : undefined}
            transition={
              shouldAnimate
                ? { ...enterTransition, delay: 0.08 }
                : undefined
            }
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                    Agenda una conversación
                  </p>
                  <h4 className="mt-2 text-2xl font-medium tracking-tight text-white">
                    Completa una sola vez. Nosotros seguimos.
                  </h4>
                  <p className="mt-2 text-sm text-amber-400/90">
                    Cupos limitados por mes — respondemos en 1 día hábil.
                  </p>
                </div>
                <p className="max-w-[18rem] text-sm leading-relaxed text-zinc-400">
                  Los campos con * son obligatorios.
                </p>
              </div>

              <div aria-live="polite">
                {mutation.isSuccess ? (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={successTransition}
                    role="status"
                    className="rounded-[1.5rem] border border-emerald-400/25 bg-emerald-400/10 p-6"
                  >
                    <CheckCircle className="mb-4 h-10 w-10 text-emerald-300" />
                    <p className="text-lg font-medium text-emerald-50">
                      Recibimos tu solicitud.
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-emerald-100/85">
                      Te contactaremos para coordinar la primera conversación y
                      entender tu contexto con más detalle.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-busy={mutation.isPending}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label
                          htmlFor={`${formId}-name`}
                          className="mb-2 block text-sm font-medium text-zinc-100"
                        >
                          Nombre completo *
                        </label>
                        <input
                          id={`${formId}-name`}
                          {...register("name")}
                          autoComplete="name"
                          placeholder="Ej. Daniela Soto"
                          className={inputClass}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={
                            errors.name ? `${formId}-name-error` : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id={`${formId}-name-error`}
                            role="alert"
                            className="mt-2 text-sm text-rose-300"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <label
                          htmlFor={`${formId}-email`}
                          className="mb-2 block text-sm font-medium text-zinc-100"
                        >
                          Correo de trabajo *
                        </label>
                        <input
                          id={`${formId}-email`}
                          {...register("email")}
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          placeholder="nombre@empresa.com"
                          className={inputClass}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={
                            errors.email ? `${formId}-email-error` : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id={`${formId}-email-error`}
                            role="alert"
                            className="mt-2 text-sm text-rose-300"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label
                          htmlFor={`${formId}-company`}
                          className="mb-2 block text-sm font-medium text-zinc-100"
                        >
                          Empresa
                          <span className="ml-2 text-xs font-normal uppercase tracking-[0.16em] text-zinc-500">
                            Opcional
                          </span>
                        </label>
                        <input
                          id={`${formId}-company`}
                          {...register("company")}
                          autoComplete="organization"
                          placeholder="Ej. AMJ Ingeniería"
                          className={inputClass}
                          aria-invalid={errors.company ? "true" : "false"}
                          aria-describedby={
                            errors.company ? `${formId}-company-error` : undefined
                          }
                        />
                        {errors.company && (
                          <p
                            id={`${formId}-company-error`}
                            role="alert"
                            className="mt-2 text-sm text-rose-300"
                          >
                            {errors.company.message}
                          </p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <label
                          htmlFor={`${formId}-phone`}
                          className="mb-2 block text-sm font-medium text-zinc-100"
                        >
                          Teléfono
                          <span className="ml-2 text-xs font-normal uppercase tracking-[0.16em] text-zinc-500">
                            Opcional
                          </span>
                        </label>
                        <input
                          id={`${formId}-phone`}
                          {...register("phone")}
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+56 9 1234 5678"
                          className={inputClass}
                          aria-invalid={errors.phone ? "true" : "false"}
                          aria-describedby={
                            errors.phone ? `${formId}-phone-error` : undefined
                          }
                        />
                        {errors.phone && (
                          <p
                            id={`${formId}-phone-error`}
                            role="alert"
                            className="mt-2 text-sm text-rose-300"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor={`${formId}-message`}
                        className="mb-2 block text-sm font-medium text-zinc-100"
                      >
                        ¿Qué necesitas resolver?
                      </label>
                      <p
                        id={`${formId}-message-help`}
                        className="mb-3 max-w-2xl text-sm leading-relaxed text-zinc-400"
                      >
                        Cuéntanos el problema, proyecto o evaluación que tienes
                        en mente. Mientras más contexto nos des, mejor preparada
                        llegará la primera conversación.
                      </p>
                      <textarea
                        id={`${formId}-message`}
                        {...register("message")}
                        autoComplete="off"
                        placeholder="Ej. Necesitamos reforzar la seguridad del correo y ordenar el despliegue sin frenar la operación."
                        rows={5}
                        className={`${inputClass} resize-y`}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={
                          errors.message
                            ? `${formId}-message-help ${formId}-message-error`
                            : `${formId}-message-help`
                        }
                      />
                      {errors.message && (
                        <p
                          id={`${formId}-message-error`}
                          role="alert"
                          className="mt-2 text-sm text-rose-300"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {mutation.isError && (
                      <p
                        role="alert"
                        className="rounded-md border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
                      >
                        {mutation.error.message}
                      </p>
                    )}

                    <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-200 ease-out hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {mutation.isPending ? (
                          "Enviando solicitud..."
                        ) : (
                          <>
                            Quiero mi diagnóstico gratis
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3 w-3 text-emerald-400" />
                          Sin compromiso
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3 w-3 text-emerald-400" />
                          Datos protegidos
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3 w-3 text-emerald-400" />
                          Bitdefender Gold Partner
                        </span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
