import { motion } from "framer-motion";
import { ShieldCheck, Lock, TrendingUp, Layers } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    id: "01",
    icon: Layers,
    title: "Protección Multi-capa",
    description:
      "Combina detección por comportamiento, análisis heurístico y protección preventiva para reducir brechas antes de que se transformen en incidentes.",
    tags: ["Machine Learning", "Zero-Day", "Heurístico"],
  },
  {
    id: "02",
    icon: ShieldCheck,
    title: "Anti-Ransomware",
    description:
      "Detecta actividad sospechosa, bloquea cifrado malicioso y ayuda a contener el impacto antes de que un ataque detenga la operación.",
    tags: ["Rollback", "Backup Automático", "Mitigación"],
  },
  {
    id: "03",
    icon: Lock,
    title: "Defensa de Red",
    description:
      "Suma controles de red para frenar movimiento lateral, endurecer segmentos críticos y mejorar la visibilidad del tráfico riesgoso.",
    tags: ["Firewall", "IDS/IPS", "Control de Tráfico"],
  },
  {
    id: "04",
    icon: TrendingUp,
    title: "Gestión de Riesgos",
    description:
      "Prioriza brechas y configuraciones expuestas para que el equipo actúe primero sobre lo que realmente compromete continuidad y cumplimiento.",
    tags: ["ISO 27001", "NIST", "Scoring", "Compliance"],
  },
];

export default function FeaturesScrollSection() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <div className="mb-16 md:mb-24 max-w-3xl">
        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
          Qué protege <span className="font-serif italic text-[#25327D] dark:text-amber-400">GravityZone</span>
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Pensado para frenar ransomware, ataques fileless y amenazas avanzadas,
          dándole visibilidad operativa al equipo.
        </p>
      </div>

      {/* Mobile: Stacked editorial list */}
      <div className="md:hidden flex flex-col">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: idx * 0.05 }}
            className="flex flex-col gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
                {feature.id}
              </span>
              <feature.icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h4 className="font-light tracking-tight text-2xl text-zinc-900 dark:text-white leading-tight">
              {feature.title}
            </h4>
            <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Editorial grid with dividers */}
      <div className="hidden md:grid grid-cols-2 relative">
        {/* Horizontal divider */}
        <div className="absolute left-0 right-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
        {/* Vertical divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
            className={`flex flex-col gap-5 p-10 lg:p-14 ${
              idx % 2 === 1 ? "pl-10 lg:pl-14" : "pr-10 lg:pr-14"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
                {feature.id}
              </span>
              <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-950 transition-transform duration-500 hover:scale-110">
                <feature.icon className="w-4 h-4 text-zinc-900 dark:text-white" />
              </div>
            </div>
            <h4 className="font-light tracking-tight text-2xl lg:text-3xl text-zinc-900 dark:text-white leading-tight">
              {feature.title}
            </h4>
            <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md">
              {feature.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
