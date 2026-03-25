import { ShieldCheck, Users, Zap } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Equipo con 15+ años de experiencia",
    description:
      "Profesionales certificados en plataformas líderes e ISO 27001. Más de 35.000 amenazas detectadas y 11.500 antivirus desplegados para clientes en Chile.",
  },
  {
    icon: Users,
    title: "Presencia local en Chile",
    description:
      "Oficina en Nueva Tajamar 481, Las Condes. Trabajamos en tu mismo idioma y zona horaria para resolver contingencias con rapidez.",
  },
  {
    icon: Zap,
    title: "Tecnología sin moda, con criterio",
    description:
      "No vendemos lo que está de moda. Evaluamos riesgos reales — pérdida de datos, ransomware, cumplimiento — y recomendamos controles que los resuelvan.",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="text-left md:text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 max-w-sm md:max-w-none">
          Por qué las empresas trabajan con <img src="/logo-iso.png" alt="AMJ" className="inline-block h-[1.1em] w-auto align-baseline brightness-0 dark:brightness-100 dark:drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]" />
        </h3>
      </div>
      
      {/* Mobile: Editorial List Layout (No Cards) */}
      <div className="md:hidden flex flex-col gap-10 sm:gap-12 relative px-2">
        {values.map((value, idx) => (
          <div key={value.title} className="flex flex-col relative">
            <div className="flex items-start gap-5 mb-3">
              <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 bg-white dark:bg-zinc-950 mt-1">
                <value.icon className="w-5 h-5 text-zinc-900 dark:text-white" />
              </div>
              <div className="flex flex-col pt-1.5">
                <h4 className="font-light tracking-tight text-2xl text-zinc-900 dark:text-white leading-tight mb-3">
                  {value.title}
                </h4>
                <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {value.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Editorial Grid (No Cards) */}
      <div className="hidden md:grid grid-cols-3 gap-12 lg:gap-16 relative">
        {/* Subtle decorative top border for the entire grid */}
        <div className="absolute top-0 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-800" />
        
        {values.map((value, idx) => (
          <div key={value.title} className="flex flex-col relative pt-10">
            {/* Subtle decorative side borders between items */}
            {idx !== 0 && (
              <div className="absolute top-0 bottom-0 left-[-1.5rem] lg:left-[-2rem] w-px bg-zinc-200 dark:bg-zinc-800" />
            )}
            <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-950 mb-8 transition-transform duration-500 hover:scale-110">
              <value.icon className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <h4 className="font-light tracking-tight text-2xl lg:text-3xl text-zinc-900 dark:text-white leading-tight mb-4">
              {value.title}
            </h4>
            <p className="text-base font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
