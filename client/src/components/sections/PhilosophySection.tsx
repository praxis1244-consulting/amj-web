import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

export default function PhilosophySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-3">
        <h3 className="font-serif text-3xl text-zinc-400 dark:text-zinc-500">
          <RevealText text="Como Trabajamos" />
        </h3>
      </div>
      <div className="md:col-span-9">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          <span className="block">
            <RevealText text="Partimos con un diagnostico claro," />
          </span>
          <span className="block">
            <RevealText text="seguimos con una implementacion ordenada" />
          </span>
          <span className="block">
            <RevealText text="y te acompanamos en la operacion." />
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed font-light">
            AMJ combina consultoria, seleccion de tecnologia e implementacion
            para que cada decision responda a riesgos reales, continuidad
            operacional y presupuesto.
          </p>
          <a
            href="#servicios"
            className="group flex items-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-full pl-6 pr-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="text-sm font-medium">Conoce nuestros servicios</span>
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-zinc-900 group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
