import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SolutionsGrid() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 py-32">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
          Soluciones para cada <span className="font-serif italic text-[#25327D] dark:text-amber-400">etapa</span>
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Desde el diagnóstico hasta la operación diaria. Trabajamos con
          plataformas de renombre mundial para implementar la protección
          que tu empresa necesita.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1 */}
        <div className="group flex flex-col md:block md:relative md:h-[400px] rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 md:bg-transparent dark:md:bg-transparent border border-zinc-100 dark:border-zinc-800 md:border-none">
          <div className="relative h-[240px] md:h-full overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
              alt="Infraestructura de red"
              className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
            />
            {/* Desktop Overlay */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            
            {/* Desktop Text */}
            <div className="hidden md:block absolute bottom-8 left-8 pr-8 text-white">
              <p className="text-xs uppercase tracking-widest text-zinc-300 mb-2">
                Consultoría
              </p>
              <h4 className="font-light tracking-tight text-2xl">
                Diagnóstico y estrategia de ciberseguridad
              </h4>
            </div>
          </div>
          
          {/* Mobile Text Panel */}
          <div className="md:hidden p-6 sm:p-8 flex flex-col justify-center grow">
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              Consultoría
            </p>
            <h4 className="font-light tracking-tight text-2xl text-zinc-900 dark:text-white leading-snug">
              Diagnóstico y estrategia de ciberseguridad
            </h4>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col md:block md:relative md:h-[400px] rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 md:bg-transparent dark:md:bg-transparent border border-zinc-100 dark:border-zinc-800 md:border-none">
          <div className="relative h-[240px] md:h-full overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80"
              alt="Protección de endpoints"
              className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
            />
            {/* Desktop Overlay */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            
            {/* Desktop Text */}
            <div className="hidden md:block absolute bottom-8 left-8 pr-8 text-white">
              <p className="text-xs uppercase tracking-widest text-zinc-300 mb-2">
                Implementación
              </p>
              <h4 className="font-light tracking-tight text-2xl">Plataformas líderes de protección</h4>
            </div>
          </div>

          {/* Mobile Text Panel */}
          <div className="md:hidden p-6 sm:p-8 flex flex-col justify-center grow">
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              Implementación
            </p>
            <h4 className="font-light tracking-tight text-2xl text-zinc-900 dark:text-white leading-snug">
              Plataformas líderes de protección
            </h4>
          </div>
        </div>

        {/* Card 3 (full-width) */}
        <div className="md:col-span-2 group flex flex-col md:block md:relative md:h-[500px] rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 md:bg-transparent dark:md:bg-transparent border border-zinc-100 dark:border-zinc-800 md:border-none">
          <div className="relative h-[240px] md:h-full overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
              alt="Oficina corporativa"
              className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
            />
            {/* Desktop Overlay */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            
            {/* Desktop Text */}
            <div className="hidden md:block absolute bottom-0 left-0 p-12 w-full md:w-1/2 text-white">
              <h4 className="font-light tracking-tight text-4xl mb-4">
                No te dejamos solo después de la compra
              </h4>
              <p className="text-zinc-300 font-light mb-8">
                Te ayudamos a elegir, desplegar y operar soluciones para
                endpoints, redes, correo, cifrado de disco y continuidad con
                soporte en tu idioma.
              </p>
              <Link href="/productos#planes" className="border-gradient rounded-md inline-block">
                <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-md p-1 pr-2 w-max gap-4 relative z-10">
                  <span className="text-white text-xs pl-4">Ver soluciones</span>
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Text Panel */}
          <div className="md:hidden p-6 sm:p-8 flex flex-col justify-center grow">
            <h4 className="font-light tracking-tight text-2xl sm:text-3xl text-zinc-900 dark:text-white mb-3 leading-snug">
              No te dejamos solo después de la compra
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 font-light mb-6 text-sm leading-relaxed">
              Te ayudamos a elegir, desplegar y operar soluciones para
              endpoints, redes, correo y continuidad sin dejar a tu equipo solo
              después de la compra.
            </p>
            <Link href="/productos#planes" className="inline-flex min-h-[3.5rem] w-full items-center justify-center gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-6 py-3.5 rounded-md text-base font-medium transition-all">
              Ver soluciones
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
