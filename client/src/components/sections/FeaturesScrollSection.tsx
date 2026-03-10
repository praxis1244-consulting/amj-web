import { ShieldCheck, Lock, TrendingUp, Layers } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const features = [
  {
    icon: Layers,
    title: "Protección Multi-capa",
    description:
      "Combina deteccion por comportamiento, analisis heuristico y proteccion preventiva para reducir brechas antes de que se transformen en incidentes.",
    tags: ["Machine Learning", "Zero-Day", "Heurístico"],
  },
  {
    icon: ShieldCheck,
    title: "Anti-Ransomware",
    description:
      "Detecta actividad sospechosa, bloquea cifrado malicioso y ayuda a contener el impacto antes de que un ataque detenga la operacion.",
    tags: ["Rollback", "Backup Automático", "Mitigación"],
  },
  {
    icon: Lock,
    title: "Defensa de Red",
    description:
      "Suma controles de red para frenar movimiento lateral, endurecer segmentos criticos y mejorar la visibilidad del trafico riesgoso.",
    tags: ["Firewall", "IDS/IPS", "Control de Tráfico"],
  },
  {
    icon: TrendingUp,
    title: "Gestión de Riesgos",
    description:
      "Prioriza brechas y configuraciones expuestas para que el equipo actue primero sobre lo que realmente compromete continuidad y cumplimiento.",
    tags: ["ISO 27001", "NIST", "Scoring", "Compliance"],
  },
];

export default function FeaturesScrollSection() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-6">
          <RevealText text="Capacidades" />
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Capacidades pensadas para frenar ransomware, ataques fileless y
          amenazas avanzadas, dándole visibilidad operativa al equipo.
        </p>
      </div>

      <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 flex flex-col"
              >
                <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-zinc-900">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-zinc-900 dark:text-zinc-100 mt-6 mb-3">
                  {feature.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed flex-1">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
