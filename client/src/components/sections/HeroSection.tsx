import { ArrowRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

export default function HeroSection() {
  return (
    <header className="relative pb-6 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="relative w-full h-[85vh] rounded-[2rem] overflow-hidden group">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
          alt="Centro de datos con iluminación azul"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 text-white">
          {/* Top: Status + Category */}
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium tracking-wide opacity-80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              EMPRESAS E INSTITUCIONES
            </p>
            <div className="flex gap-2">
              <span className="border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium">
                Consultoria e Implementacion TI
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mt-auto mb-12">
            <h1 className="text-[2.75rem] sm:text-6xl md:text-8xl font-light tracking-tight leading-[0.9]">
              <span className="block">
                <RevealText text="Consultoria y ciberseguridad" />
              </span>
              <span className="block font-serif font-normal text-zinc-200 mt-2">
                <RevealText text="para operar con menos riesgo" />
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-200/85 leading-relaxed">
              Evaluamos tu entorno, definimos prioridades e implementamos
              soluciones de seguridad y tecnologia con acompanamiento experto en
              Chile.
            </p>
          </div>

          {/* Bottom Filter Bar */}
          <div className="border-gradient rounded-full">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 bg-black/40 backdrop-blur-xl rounded-full p-2 md:pl-8 items-center relative z-10">
              <div className="border-r border-white/10 px-4 py-2 hidden md:block">
                <p className="text-zinc-400 text-xs mb-1">Experiencia</p>
                <p className="text-sm font-medium">+15 Años</p>
              </div>
              <div className="border-r border-white/10 px-4 py-2 hidden md:block">
                <p className="text-zinc-400 text-xs mb-1">Servicio</p>
                <p className="text-sm font-medium">Consultoria + Implementacion</p>
              </div>
              <div className="border-r border-white/10 px-4 py-2 hidden md:block">
                <p className="text-zinc-400 text-xs mb-1">Soporte</p>
                <p className="text-sm font-medium">Local en Chile</p>
              </div>
              <div className="px-4 py-2 hidden md:block">
                <p className="text-zinc-400 text-xs mb-1">Equipo</p>
                <p className="text-sm font-medium text-green-400">
                  Especialistas certificados
                </p>
              </div>
              <a
                href="#contacto"
                className="bg-white text-black h-12 rounded-full flex items-center justify-between px-6 hover:bg-zinc-200 transition-colors w-full md:w-auto"
              >
                <span className="text-sm font-medium">Solicita una asesoria</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
