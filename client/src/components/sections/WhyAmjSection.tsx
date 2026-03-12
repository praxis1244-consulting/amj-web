import { motion } from "framer-motion";
import { Award, ShieldCheck, MapPin, Headphones } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const trustItems = [
  {
    icon: Award,
    title: "Bitdefender Gold Partner",
    description:
      "Certificación oficial que respalda nuestra capacidad para implementar, configurar y dar soporte a soluciones de protección de endpoints a nivel empresarial.",
  },
  {
    icon: ShieldCheck,
    title: "15+ años en el mercado",
    description:
      "Primero entendemos riesgos, alcance y necesidades. Más de 1.761 antivirus desplegados respaldan nuestra recomendación.",
  },
  {
    icon: MapPin,
    title: "Las Condes, Santiago",
    description:
      "Trabajas con especialistas en tu mismo idioma y zona horaria para evaluar, implementar y resolver contingencias con rapidez.",
  },
  {
    icon: Headphones,
    title: "Implementación y acompañamiento",
    description:
      "AMJ acompaña el despliegue, la configuración inicial y la adopción operativa para que la plataforma entregue valor real.",
  },
];

export default function WhyAmjSection() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-left md:text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 max-w-sm md:max-w-none">
          Por qué implementar con <span className="font-serif italic text-[#25327D] dark:text-amber-400">AMJ</span>
        </h3>
      </div>

      {/* Mobile: Editorial list */}
      <div className="md:hidden flex flex-col gap-10 sm:gap-12 px-2">
        {trustItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: idx * 0.05 }}
            className="flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 bg-white dark:bg-zinc-950 mt-1">
              <item.icon className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <div className="flex flex-col pt-1.5">
              <h4 className="font-light tracking-tight text-2xl text-zinc-900 dark:text-white leading-tight mb-3">
                {item.title}
              </h4>
              <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Editorial 2x2 grid with dividers */}
      <div className="hidden md:grid grid-cols-2 relative">
        {/* Horizontal dividers */}
        <div className="absolute left-0 right-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
        {/* Vertical divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

        {trustItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
            className={`flex flex-col relative p-10 lg:p-14 ${
              idx % 2 === 1 ? "pl-10 lg:pl-14" : "pr-10 lg:pr-14"
            }`}
          >
            <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-950 mb-8 transition-transform duration-500 hover:scale-110">
              <item.icon className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <h4 className="font-light tracking-tight text-2xl lg:text-3xl text-zinc-900 dark:text-white leading-tight mb-4">
              {item.title}
            </h4>
            <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
