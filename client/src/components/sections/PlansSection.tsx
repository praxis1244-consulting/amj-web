import { ArrowRight, Check } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

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

export default function PlansSection() {
  return (
    <section id="planes" className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-6">
          <RevealText text="Planes GravityZone" />
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Tres niveles para crecer desde proteccion base hasta capacidades EDR
          y XDR, con evaluacion e implementacion guiada por AMJ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[2rem] p-8 flex flex-col ${
              plan.popular
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                : "bg-zinc-50 dark:bg-zinc-900"
            }`}
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
                <span className="text-xs bg-green-400 text-black px-2 py-0.5 rounded-full font-medium">
                  Popular
                </span>
              )}
            </div>

            <h4
              className={`font-serif text-2xl mb-6 ${
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
                        ? "text-green-400"
                        : "text-green-600 dark:text-green-400"
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
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-colors ${
                plan.popular
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
              }`}
            >
              Solicitar evaluacion
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-zinc-400 text-sm font-light">
          Modulos adicionales disponibles segun necesidad: Email Security
          &middot; Patch Management &middot; Full Disk Encryption &middot;
          Security for Mobile
        </p>
      </div>
    </section>
  );
}
