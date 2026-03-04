import { Link, useLocation } from "wouter";
import { Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Nav() {
  const [location] = useLocation();
  const { isDark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/50 border-b border-zinc-100/50 backdrop-blur-[2px] dark:bg-zinc-950/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-zinc-900 dark:text-white" />
          <span className="text-lg font-medium tracking-tighter">
            AMJ Ingeniería
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <a href="/#servicios" className="hover:text-black dark:hover:text-white transition-colors">
            Servicios
          </a>
          <Link
            href="/productos"
            className={`transition-colors ${location === "/productos" ? "text-black dark:text-white" : "hover:text-black dark:hover:text-white"}`}
          >
            Productos
          </Link>
          <a href="/#casos" className="hover:text-black dark:hover:text-white transition-colors">
            Casos
          </a>
          <a href="#contacto" className="hover:text-black dark:hover:text-white transition-colors">
            Contacto
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-zinc-400 hidden sm:block">ES</span>
          <button
            onClick={toggle}
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="#contacto"
            className="bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
Evaluación Gratis
          </a>
        </div>
      </div>
    </nav>
  );
}
