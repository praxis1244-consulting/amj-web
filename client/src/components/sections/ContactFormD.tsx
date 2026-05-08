import { useId, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLeadSchema, type CreateLeadInput } from "@shared/schemas";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { trackFormEvent } from "@/lib/formAnalytics";

export default function ContactFormD() {
  const prefersReducedMotion = useReducedMotion();
  const formId = useId();
  const startTimeRef = useRef<number | null>(null);
  const [, setLocation] = useLocation();

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
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("No se pudo enviar tu solicitud. Intenta de nuevo.");
      return res.json() as Promise<{ success: boolean; eventId: string }>;
    },
  });

  const onSubmit = (data: CreateLeadInput) => {
    const normalizedData: CreateLeadInput = {
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || undefined,
    };

    const elapsedMs =
      startTimeRef.current !== null
        ? Math.round(performance.now() - startTimeRef.current)
        : null;
    trackFormEvent("form_submit_attempt", { time_to_submit_ms: elapsedMs });

    mutation.mutate(normalizedData, {
      onSuccess: (result) => {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", {}, { eventID: result.eventId });
        }
        trackFormEvent("form_submit_success", { time_to_submit_ms: elapsedMs });
        reset();
        startTimeRef.current = null;
        // Defer route change one tick so analytics callbacks queued above
        // get to flush before React unmounts the form.
        setTimeout(() => setLocation("/gracias"), 50);
      },
      onError: (err) => {
        trackFormEvent("form_submit_error", {
          error: err instanceof Error ? err.message : "unknown",
        });
      },
    });
  };

  const handleFieldFocus = (field: string) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
      trackFormEvent("form_start", { first_field: field });
    }
    trackFormEvent("form_field_focus", { field });
  };

  useEffect(() => {
    const fields = ["name", "email", "company"] as const;
    fields.forEach((f) => {
      if (errors[f]?.message) {
        trackFormEvent("form_field_error", {
          field: f,
          error: String(errors[f]?.message),
        });
      }
    });
  }, [errors]);

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
    <section className="pb-24 px-4 md:px-6">
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

              <h3 className="max-w-[18ch] text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Cerremos las brechas que aún están abiertas.
              </h3>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Revisamos tu infraestructura, identificamos los puntos donde un
                atacante entraría primero y te entregamos un plan claro para
                cerrarlos. La primera conversación es sin costo y sin compromiso.
              </p>

              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-zinc-500">
                Respuesta en 1 día hábil · Equipo certificado · Bitdefender Gold Partner
              </p>
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
            <div id="contacto" className="scroll-mt-24 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7">
              <div className="mb-6 border-b border-white/10 pb-5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                  Agenda una conversación
                </p>
                <h4 className="mt-2 text-2xl font-medium tracking-tight text-white">
                  Completa una sola vez. Nosotros seguimos.
                </h4>
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
                      Te escribimos en menos de 1 día hábil para coordinar la
                      primera conversación y entender tu contexto con detalle.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-busy={mutation.isPending}
                    className="space-y-5"
                  >
                    <div className="min-w-0">
                      <label
                        htmlFor={`${formId}-name`}
                        className="mb-2 block text-sm font-medium text-zinc-100"
                      >
                        Nombre completo
                      </label>
                      <input
                        id={`${formId}-name`}
                        {...register("name")}
                        autoComplete="name"
                        placeholder="Ej. Daniela Soto"
                        className={inputClass}
                        onFocus={() => handleFieldFocus("name")}
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
                        Correo de trabajo
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
                        onFocus={() => handleFieldFocus("email")}
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

                    <div className="min-w-0">
                      <label
                        htmlFor={`${formId}-company`}
                        className="mb-2 block text-sm font-medium text-zinc-100"
                      >
                        Empresa
                      </label>
                      <input
                        id={`${formId}-company`}
                        {...register("company")}
                        autoComplete="organization"
                        placeholder="Ej. AMJ Ingeniería"
                        className={inputClass}
                        onFocus={() => handleFieldFocus("company")}
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
