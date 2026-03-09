import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLeadSchema, type CreateLeadInput } from "@shared/schemas";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Send,
} from "lucide-react";

const SITE_ID = "c271ef9e-4751-4481-90fb-be03ab921592";

/**
 * Variant D — "Dark Immersive" + Stepped form (C+D hybrid)
 * Full-width dark section with headline left, multi-step form right.
 */
export default function ContactFormD() {
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
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
      if (error) throw new Error("No se pudo enviar el mensaje. Intenta de nuevo.");
    },
  });

  const onSubmit = (data: CreateLeadInput) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      nextStep();
    } else {
      handleSubmit(onSubmit)(e);
    }
  };

  const steps = [
    { title: "Tu contacto", subtitle: "Empecemos con lo basico" },
    { title: "Sobre tu empresa", subtitle: "Nos ayuda a entender el contexto" },
    { title: "Que necesitas resolver", subtitle: "Cuéntanos tu situacion actual" },
  ];

  const nextStep = async () => {
    if (step === 0) {
      const valid = await trigger(["name", "email"]);
      if (!valid) return;
    }
    mutation.reset();
    setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => {
    mutation.reset();
    setStep((s) => Math.max(s - 1, 0));
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all";

  return (
    <section id="contacto" className="pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto bg-zinc-900 dark:bg-zinc-950 rounded-[2rem] overflow-hidden relative">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 p-6 md:p-16 lg:p-20">
          {/* Left — Headline */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-white/50 to-transparent" />
              <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                Asesoria Gratuita
              </p>
            </div>

            <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] mb-6">
              Conversemos sobre tu
              <br />
              <span className="font-serif text-zinc-300">entorno tecnologico</span>
            </h3>

            <p className="text-zinc-400 text-base leading-relaxed max-w-md mb-10">
              Cuentanos tu caso y coordinamos una primera revision para
              entender riesgos, brechas y oportunidades de mejora.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-zinc-400">Sin costo inicial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-zinc-400">Respuesta inicial en 24h habiles</span>
              </div>
            </div>
          </div>

          {/* Right — Stepped form */}
          <div className="flex flex-col justify-center">
            {mutation.isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-950/30 border border-green-800 rounded-2xl p-10 text-center"
              >
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <p className="text-green-300 font-medium text-lg mb-1">
                  Solicitud recibida
                </p>
                <p className="text-green-400 text-sm">
                  Te contactaremos para coordinar una primera revision.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-8">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full overflow-hidden bg-white/10"
                    >
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: step >= i ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step header */}
                    <div className="mb-6">
                      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                        Paso {step + 1} de 3
                      </p>
                      <h4 className="text-xl font-medium text-white mb-1">
                        {steps[step].title}
                      </h4>
                      <p className="text-zinc-500 text-sm">
                        {steps[step].subtitle}
                      </p>
                    </div>

                    {/* Step fields */}
                    {step === 0 && (
                      <div className="space-y-4">
                        <div>
                          <input
                            {...register("name")}
                            placeholder="Nombre y apellido"
                            className={inputClass}
                          />
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="correo@empresa.com"
                            className={inputClass}
                          />
                          {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-4">
                        <input
                          {...register("company")}
                          placeholder="Empresa"
                          className={inputClass}
                        />
                        <input
                          {...register("phone")}
                          placeholder="Telefono"
                          className={inputClass}
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <textarea
                          {...register("message")}
                          placeholder="Describe brevemente tu necesidad, problema actual o proyecto..."
                          rows={5}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {mutation.isError && (
                  <p className="text-red-400 text-sm text-center mt-4">
                    {mutation.error.message}
                  </p>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-white text-zinc-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="group flex items-center gap-2 bg-white text-zinc-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {mutation.isPending ? (
                        "Enviando..."
                      ) : (
                        <>
                          Solicitar asesoria
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
