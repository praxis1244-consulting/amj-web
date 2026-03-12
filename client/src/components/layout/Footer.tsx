import { Link } from "wouter";
import RevealText from "@/components/ui/RevealText";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-zinc-950 text-white rounded-t-[2.25rem] md:rounded-t-[3rem] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 relative z-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 sm:pb-8 mb-12 sm:mb-16 gap-5 sm:gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-iso.png" alt="AMJ Ingeniería" className="h-7 w-auto brightness-100" />
            <span className="text-lg font-medium tracking-tighter font-serif">
              AMJ Ingeniería
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider sm:tracking-widest">
            <span>15+ años</span>
            <span className="text-zinc-700">//</span>
            <span>5.361+ amenazas detectadas</span>
            <span className="text-zinc-700">//</span>
            <span>Equipo local</span>
          </div>
          <Link
            href="/productos"
            className="text-sm font-medium hover:text-zinc-300 transition-colors"
          >
            Productos
          </Link>
        </div>

        {/* Large CTA */}
        <div className="text-left md:text-center mb-16 sm:mb-20 md:mb-24">
          <p className="font-serif text-2xl sm:text-3xl mb-4 text-zinc-300">
            / Protege lo que más importa
          </p>
          <p className="text-zinc-500 text-sm sm:text-base mb-5 sm:mb-6 max-w-xl md:mx-auto">
            Escríbenos y en 1 día hábil coordinamos una primera conversación
            para revisar tu contexto, necesidades y próximos pasos.
          </p>
          <a
            href="mailto:ventas@amjingenieria.cl"
            className="text-[8.5vw] md:text-7xl lg:text-8xl leading-[1.05] font-light tracking-tight hover:text-zinc-300 transition-colors inline-block whitespace-nowrap"
          >
            <RevealText text="ventas@amjingenieria.cl" />
          </a>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-xs text-zinc-500">
          <div>
            <p className="mb-1 text-white">Todos los derechos reservados.</p>
            <p>&copy;2026 AMJ Ingeniería</p>
          </div>
          <div className="md:text-center space-y-1">
            <p>Nueva Tajamar 481, T Norte, Of 303, Las Condes</p>
            <p>+569 4524 1309</p>
          </div>
          <div className="flex flex-wrap md:justify-end gap-4 sm:gap-6">
            <a
              href="mailto:ventas@amjingenieria.cl"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="tel:+56945241309"
              className="hover:text-white transition-colors"
            >
              Teléfono
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
