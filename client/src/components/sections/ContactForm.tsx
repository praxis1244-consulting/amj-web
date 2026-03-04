import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLeadSchema, type CreateLeadInput } from "@shared/schemas";
import { useTRPC } from "@/lib/trpc";

export default function ContactForm() {
  const trpc = useTRPC();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
  });

  const mutation = useMutation(trpc.leads.create.mutationOptions());

  const onSubmit = (data: CreateLeadInput) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="max-w-xl mx-auto">
        <h3 className="font-serif text-3xl text-zinc-900 dark:text-zinc-100 mb-2 text-center">
          Solicita tu evaluación
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm text-center mb-8">
          Completa el formulario y nos pondremos en contacto contigo.
        </p>

        {mutation.isSuccess ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
            <p className="text-green-800 dark:text-green-300 font-medium mb-1">
              Mensaje enviado correctamente
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm">
              Te contactaremos a la brevedad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                placeholder="Nombre *"
                className="w-full border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email *"
                className="w-full border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("company")}
                placeholder="Empresa"
                className="w-full border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
              />
              <input
                {...register("phone")}
                placeholder="Teléfono"
                className="w-full border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
              />
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder="¿Cómo podemos ayudarte?"
                rows={4}
                className="w-full border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors resize-none"
              />
            </div>
            {mutation.isError && (
              <p className="text-red-500 text-sm text-center">
                {mutation.error.message}
              </p>
            )}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
