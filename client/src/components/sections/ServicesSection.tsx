import { useState } from "react";
import { ShieldCheck, Lock, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceItems = [
  {
    num: "2",
    icon: ShieldCheck,
    title: "Análisis de",
    highlight: "Vulnerabilidades",
    points: [
      "Pentesting interno y externo",
      "Escaneo de aplicaciones web",
      "Reportes con plan de remediación",
    ],
  },
  {
    num: "3",
    icon: Lock,
    title: "Seguridad de",
    highlight: "Redes",
    points: [
      "Firewall y segmentación de red",
      "Detección y prevención de intrusiones",
      "Monitoreo continuo de tráfico",
    ],
  },
  {
    num: "4",
    icon: TrendingUp,
    title: "Evaluación de",
    highlight: "Riesgos",
    points: [
      "Análisis de impacto y probabilidad",
      "Cumplimiento normativo (ISO 27001, NIST)",
      "Plan de mitigación priorizado",
    ],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* Featured Item */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-serif text-2xl text-zinc-300 dark:text-zinc-600">1.</span>
            <h3 className="text-4xl font-serif text-zinc-900 dark:text-zinc-100 leading-tight">
              Consultoría en
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">Ciberseguridad</span>
            </h3>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="h-64 rounded-2xl overflow-hidden relative border-gradient">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
              alt="Consultoría en ciberseguridad"
              className="w-full h-full object-cover relative z-10"
            />
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-4 pl-4">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed mb-8">
            Protocolos avanzados, diseño de entornos seguros, revisión de
            comportamiento de usuarios y protección de datos transaccionales.
          </p>
        </div>
      </div>

      {/* List Items */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
        {serviceItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.num}
              className="border-b border-zinc-100 dark:border-zinc-800"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full py-8 flex items-center justify-between px-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm font-medium text-zinc-300 dark:text-zinc-600 w-8">
                    {item.num}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 text-left">
                    {item.title}{" "}
                    <span className="font-normal">{item.highlight}</span>
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-8 pl-24 md:pl-32 max-w-2xl">
                      <ul className="space-y-2">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-2"
                          >
                            <span className="w-1 h-1 bg-zinc-400 rounded-full flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
