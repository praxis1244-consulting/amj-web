import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import RevealText from "@/components/ui/RevealText";

export default function SolutionsGrid() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6 py-32">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h3 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100 mb-6">
          <RevealText text="Soluciones" />
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg">
          Soluciones integrales de ciberseguridad adaptadas a la realidad de tu
          empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="relative group h-[400px] rounded-[2rem] overflow-hidden cursor-default">
          <img
            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
            alt="Infraestructura de red"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-xs uppercase tracking-widest text-zinc-300 mb-2">
              Consultoría
            </p>
            <h4 className="font-serif text-2xl">
              Asesoría en Ciberseguridad
            </h4>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group h-[400px] rounded-[2rem] overflow-hidden cursor-default">
          <img
            src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80"
            alt="Protección de endpoints"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-xs uppercase tracking-widest text-zinc-300 mb-2">
              Software
            </p>
            <h4 className="font-serif text-2xl">
              Software de Seguridad
            </h4>
          </div>
        </div>

        {/* Card 3 (full-width) */}
        <div className="md:col-span-2 relative group h-[500px] rounded-[2rem] overflow-hidden cursor-default">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Oficina corporativa"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 w-full md:w-1/2">
            <h4 className="font-serif text-4xl text-white mb-4">
              Protección Empresarial Integral
            </h4>
            <p className="text-zinc-300 font-light mb-8">
              Tu escudo digital completo. Desde endpoints hasta servidores,
              protegemos cada capa de tu infraestructura.
            </p>
            <Link href="/productos#planes" className="border-gradient rounded-full inline-block">
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full p-1 pr-2 w-max gap-4 relative z-10">
                <span className="text-white text-xs pl-4">Ver Planes</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
