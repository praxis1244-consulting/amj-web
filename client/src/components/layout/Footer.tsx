import { Link } from "wouter";
import { Shield } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-zinc-950 text-white rounded-t-[3rem] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-8 mb-16 gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-white" />
            <span className="text-lg font-medium tracking-tighter font-serif">
              AMJ Ingeniería
            </span>
          </div>
          <div className="flex gap-8 text-xs text-zinc-500 uppercase tracking-widest">
            <span>Confianza</span>
            <span className="text-zinc-700">//</span>
            <span>Seguridad</span>
            <span className="text-zinc-700">//</span>
            <span>Innovación</span>
          </div>
          <Link
            href="/#servicios"
            className="text-sm font-medium hover:text-zinc-300 transition-colors"
          >
            Menú
          </Link>
        </div>

        {/* Large CTA */}
        <div className="text-center mb-24">
          <p className="font-serif text-3xl mb-4 text-zinc-300">
            / Contáctanos
          </p>
          <a
            href="mailto:ventas@amjingenieria.cl"
            className="text-4xl sm:text-5xl md:text-8xl font-light tracking-tighter hover:text-zinc-300 transition-colors inline-block break-all md:break-normal"
          >
            <RevealText text="ventas@amjingenieria.cl" />
          </a>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-zinc-500">
          <div>
            <p className="mb-1 text-white">Todos los derechos reservados.</p>
            <p>&copy;2024 AMJ Ingeniería</p>
          </div>
          <div className="md:text-center">
            <p>Nueva Tajamar 481, T Norte, Of 303, Las Condes</p>
            <p>+569 4524 1309</p>
          </div>
          <div className="flex md:justify-end gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
