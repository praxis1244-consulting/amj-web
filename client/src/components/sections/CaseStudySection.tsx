import RevealText from "@/components/ui/RevealText";

export default function CaseStudySection() {
  return (
    <section id="casos" className="max-w-7xl mx-auto px-6 pb-32">
      <div className="flex justify-center mb-12">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100">
          <RevealText text="Escenario de Implementacion" />
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-8 text-sm font-medium">
          <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2 rounded-full">
            Resumen
          </button>
          <button className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Alcance
          </button>
          <button className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Operacion
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-4 md:p-6 relative overflow-hidden">
        <div className="relative h-[600px] rounded-3xl overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
            alt="Centro de operaciones de seguridad"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6">
            <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/10">
              Referencia: Operacion corporativa
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 pb-4">
          <div className="hidden md:flex md:col-span-3">
            <div className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 rounded-xl h-40 w-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <line x1="6" y1="10" x2="6" y2="14" />
                <line x1="10" y1="10" x2="10" y2="14" />
              </svg>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <h4 className="font-medium text-lg mb-2">
              <RevealText text="Despliegue de seguridad endpoint con acompanamiento local" />
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Ejemplo de implementacion para una empresa con operacion
              distribuida: evaluacion inicial, despliegue por etapas, definicion
              de politicas y acompanamiento para operacion continua.
            </p>
          </div>
          <div className="md:col-span-5 flex items-center justify-between md:border-l border-zinc-200 dark:border-zinc-700 pt-4 md:pt-0 md:pl-8 border-t md:border-t-0">
            <div>
              <h5 className="font-serif text-base sm:text-xl md:text-3xl text-zinc-900 dark:text-zinc-100">
                <RevealText text="Bitdefender" />
              </h5>
              <p className="text-xs text-zinc-400 mt-1">Plataforma</p>
            </div>
            <div>
              <h5 className="font-serif text-base sm:text-xl md:text-3xl text-zinc-900 dark:text-zinc-100">
                <RevealText text="500+" />
              </h5>
              <p className="text-xs text-zinc-400 mt-1">Endpoints</p>
            </div>
            <div>
              <h5 className="font-serif text-base sm:text-xl md:text-3xl text-zinc-900 dark:text-zinc-100">
                <RevealText text="24/7" />
              </h5>
              <p className="text-xs text-zinc-400 mt-1">Operacion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
