import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    tier: "Esencial",
    name: "Business Security",
    features: [
      "Antimalware y antiphishing",
      "Anti-exploit avanzado",
      "Firewall y protección web",
      "Mitigación de ransomware",
      "Control de dispositivos",
      "Análisis de riesgos",
    ],
    popular: false,
  },
  {
    tier: "Avanzado",
    name: "Business Security Premium",
    features: [
      "Todo lo de Esencial",
      "HyperDetect (machine learning)",
      "Sandbox en la nube",
      "Defensa contra ataques fileless",
      "Protección de Exchange",
    ],
    popular: true,
  },
  {
    tier: "Máximo",
    name: "Business Security Enterprise",
    features: [
      "Todo lo de Premium",
      "EDR automatizado",
      "Correlación entre endpoints",
      "Búsqueda de amenazas",
      "XDR (identidad, red, apps)",
    ],
    popular: false,
  },
];

function PlanCard({ plan, index, className }: { plan: typeof plans[number]; index: number; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.3, ease: EASE } }}
      className={`rounded-xl p-8 flex flex-col transition-shadow duration-300 ${
        plan.popular
          ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 md:scale-105 md:origin-top shadow-2xl shadow-zinc-950/20 dark:shadow-zinc-400/10 z-10"
          : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:shadow-zinc-950/10 dark:hover:shadow-zinc-400/5"
      } ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <p
          className={`text-xs uppercase tracking-widest ${
            plan.popular
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-400"
          }`}
        >
          {plan.tier}
        </p>
        {plan.popular && (
          <span className="text-[11px] uppercase tracking-[0.15em] bg-amber-400 text-black px-2.5 py-1 rounded-md font-medium">
            Recomendado
          </span>
        )}
      </div>

      <h4
        className={`font-light tracking-tight text-2xl mb-6 ${
          plan.popular
            ? "text-white dark:text-zinc-900"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {plan.name}
      </h4>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                plan.popular
                  ? "text-amber-400"
                  : "text-amber-500 dark:text-amber-400"
              }`}
            />
            <span
              className={`text-sm ${
                plan.popular
                  ? "text-zinc-300 dark:text-zinc-600"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm font-medium transition-all duration-200 ${
          plan.popular
            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 hover:brightness-110"
            : "border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-zinc-500"
        }`}
      >
        Solicitar evaluación
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

export default function PlansSection() {
  return (
    <section id="planes" className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
          Planes <span className="font-serif italic text-[#25327D] dark:text-amber-400">GravityZone</span>
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Tres niveles para crecer desde protección base hasta capacidades EDR
          y XDR, con evaluación e implementación guiada por AMJ.
        </p>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-8" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex gap-4 w-max">
          {plans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} index={idx} className="snap-center w-[85vw] max-w-[320px]" />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-3 gap-6 items-start">
        {plans.map((plan, idx) => (
          <PlanCard key={plan.name} plan={plan} index={idx} />
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-zinc-400 text-sm font-light">
          Módulos adicionales disponibles según necesidad: Email Security
          &middot; Patch Management &middot; Full Disk Encryption &middot;
          Security for Mobile. También ofrecemos soluciones Kaspersky y Microsoft 365.
        </p>
      </div>
    </section>
  );
}
