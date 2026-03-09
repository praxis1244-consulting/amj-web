import { ShieldCheck, Users, Zap } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const values = [
  {
    icon: ShieldCheck,
    title: "Equipo certificado",
    description:
      "Especialistas con experiencia en evaluacion, implementacion y operacion de soluciones de seguridad para empresas.",
  },
  {
    icon: Users,
    title: "Acompanamiento local",
    description:
      "Trabajamos en tu mismo idioma y zona horaria para acompanarte desde el diagnostico hasta la operacion diaria.",
  },
  {
    icon: Zap,
    title: "Soluciones aplicadas",
    description:
      "No recomendamos tecnologia por moda. Priorizamos herramientas y controles que respondan a riesgos concretos del negocio.",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="text-center mb-16">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100">
          <RevealText text="Por que las empresas trabajan con AMJ" />
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
