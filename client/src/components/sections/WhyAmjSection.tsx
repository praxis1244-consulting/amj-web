import { ShieldCheck, MapPin, Headphones } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Partner Certificado",
    description:
      "Distribuidores oficiales de Bitdefender en Chile con certificaciones y respaldo directo del fabricante.",
  },
  {
    icon: MapPin,
    title: "Soporte Local",
    description:
      "Equipo técnico en Chile con +15 años de experiencia. Soporte en español, en tu zona horaria.",
  },
  {
    icon: Headphones,
    title: "Acompañamiento Continuo",
    description:
      "Implementación, configuración, capacitación y monitoreo continuo de tu plataforma de seguridad.",
  },
];

export default function WhyAmjSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12">
        <h3 className="font-serif text-3xl text-zinc-900 dark:text-zinc-100 mb-8">
          <RevealText text="¿Por Qué AMJ?" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-zinc-900">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-lg text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
