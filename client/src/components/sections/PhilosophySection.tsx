import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

export default function PhilosophySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-3">
        <h3 className="font-serif text-3xl text-zinc-400 dark:text-zinc-500">
          <RevealText text="Nuestra Filosofía" />
        </h3>
      </div>
      <div className="md:col-span-9">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
          <span className="block">
            <RevealText text="Protegemos la infraestructura digital" />
          </span>
          <span className="block">
            <RevealText text="de tu empresa, desde una auditoría inicial" />
          </span>
          <span className="block">
            <RevealText text="hasta un escudo permanente." />
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed font-light">
            Con compromiso de calidad, más de 15 años de experiencia en
            ciberseguridad, y un enfoque security-first, te ayudamos a desplegar
            y asegurar la infraestructura que mejor se adapta a tu negocio.
          </p>
          <a
            href="#servicios"
            className="group flex items-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-full pl-6 pr-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="text-sm font-medium">Nuestros Servicios</span>
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-zinc-900 group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
