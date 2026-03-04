import { ShieldCheck, Users, Zap } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const values = [
  {
    icon: ShieldCheck,
    title: "Confianza",
    description:
      "Protege lo que más te importa. Nuestros clientes confían en nosotros porque entregamos resultados medibles y una seguridad que se siente.",
  },
  {
    icon: Users,
    title: "Cercanía",
    description:
      "A tu lado, siempre que lo necesites. Te acompañamos paso a paso con soporte dedicado y un equipo que entiende tu negocio.",
  },
  {
    icon: Zap,
    title: "Innovación",
    description:
      "Tecnología de punta al servicio de tu tranquilidad. Equipo certificado y en constante actualización para mantenerte un paso adelante.",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="text-center mb-16">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100">
          <RevealText text="Nuestros Valores" />
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value) => (
          <div key={value.title} className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10">
            <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 mb-6">
              <value.icon className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl text-zinc-900 dark:text-zinc-100 mb-4">
              <RevealText text={value.title} />
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
