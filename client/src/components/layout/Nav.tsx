import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Nav() {
  const [location] = useLocation();
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/78 border-b border-zinc-100/70 backdrop-blur-md dark:bg-zinc-950/78 dark:border-zinc-800/70"
          : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 dark:text-white shrink-0" />
            <span className="text-[15px] md:text-lg font-medium tracking-tighter truncate">
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

          <div className="hidden md:flex items-center gap-4 text-xs font-medium">
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
              Solicita una asesoria
            </a>
          </div>

          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={toggle}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-600 backdrop-blur-sm transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400 dark:hover:text-white"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-900 backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-white"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-zinc-950/35 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 h-[100dvh] bg-white/95 backdrop-blur-xl dark:bg-zinc-950/95 flex flex-col pt-24 px-6 pb-12 shadow-[0_20px_80px_rgba(15,23,42,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
                    Navegación
                  </p>
                  <p className="mt-1 text-2xl font-serif italic text-zinc-900 dark:text-white">
                    Menú Principal
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4 flex-1">
                <a
                  href="/#servicios"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[3.5rem] items-center justify-between text-3xl font-light tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 border-b border-zinc-100 dark:border-zinc-900 pb-4"
                >
                  Servicios
                </a>
                <Link
                  href="/productos"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[3.5rem] items-center justify-between text-3xl font-light tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 border-b border-zinc-100 dark:border-zinc-900 pb-4"
                >
                  Productos
                </Link>
                <a
                  href="/#casos"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[3.5rem] items-center justify-between text-3xl font-light tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 border-b border-zinc-100 dark:border-zinc-900 pb-4"
                >
                  Casos
                </a>
                <a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[3.5rem] items-center justify-between text-3xl font-light tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400 pb-4"
                >
                  Contacto
                </a>
              </div>

              <div className="mt-auto bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 mb-3">
                  Ransomware, brechas, cumplimiento. Hablemos.
                </p>
                <a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[3.5rem] w-full items-center justify-center gap-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-base font-medium"
                >
                  Solicita una asesoría
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
