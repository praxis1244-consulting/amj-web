import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_ITEMS = [
  { href: "/", label: "Inicio", isLink: true },
  { href: "/productos", label: "Productos", isLink: true },
  { href: "#contacto", label: "Contacto", isLink: false },
  { href: "/#casos", label: "Casos", isLink: false },
  { href: "/#servicios", label: "Servicios", isLink: false },
];

const barBase =
  "absolute left-0 w-full h-[1.5px] bg-zinc-900 dark:bg-white rounded-sm transition-all duration-300";

export default function Nav() {
  const [location] = useLocation();
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(location);
  const reduced = !!useReducedMotion();

  /* ─── Effects ─── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveHref(location);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/78 border-b border-zinc-100/70 backdrop-blur-md dark:bg-zinc-950/78 dark:border-zinc-800/70"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center min-w-0">
            <img
              src="/logo-iso.png"
              alt="AMJ Ingeniería"
              className="h-7 md:h-8 w-auto brightness-0 dark:brightness-100 dark:drop-shadow-[0_0_1px_rgba(0,0,0,0.3)] transition-all"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {NAV_ITEMS.map((item) => {
              const routeMatch = item.isLink && location === item.href;
              const className = `relative py-1 transition-colors ${routeMatch ? "text-black dark:text-white" : "hover:text-black dark:hover:text-white"} group`;
              const underline = (
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#25327D] dark:bg-white transition-all duration-300 ease-out ${routeMatch ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              );
              return item.isLink ? (
                <Link key={item.label} href={item.href} className={className}>
                  {item.label}{underline}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}{underline}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 text-xs font-medium">
            <button
              onClick={toggle}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#contacto"
              className="bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white px-5 py-2.5 rounded-md hover:brightness-110 transition-all dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 dark:hover:brightness-110"
            >
              Quiero mi diagnóstico gratis
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={toggle}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="w-10 h-10 flex items-center justify-center rounded-md text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200/60 dark:border-white/[0.12] bg-zinc-100/50 dark:bg-white/[0.04] shadow-[inset_0_0_12px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]"
            >
              <div className="relative w-[18px] h-[14px]">
                <span className={`${barBase} top-0 origin-center ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`${barBase} top-[6px] ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"}`} />
                <span className={`${barBase} top-[12px] origin-center ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.35, ease: EASE }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop — blur + tint animate together with content */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
              animate={{ backdropFilter: "blur(20px)", opacity: 1 }}
              exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
              transition={{ duration: reduced ? 0.1 : 0.45, ease: EASE }}
              className="absolute inset-0 bg-white/80 dark:bg-zinc-950/85"
              onClick={() => setMobileOpen(false)}
            />

            {/* Cards — start animating immediately, overlapping with blur */}
            <div className="absolute inset-0 flex flex-col pt-[4.5rem] px-5 pb-8 overflow-y-auto pointer-events-none">

              {/* Nav card */}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32, rotate: 3, scale: 0.97 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, rotate: 1.5, scale: 0.98 }}
                transition={{ duration: reduced ? 0.1 : 0.5, ease: EASE, delay: reduced ? 0 : 0.04 }}
                className="pointer-events-auto mt-4 rounded-xl border border-zinc-200/70 dark:border-white/[0.1] bg-white/90 dark:bg-zinc-900/80 shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-2xl p-6 flex flex-col gap-1"
                style={{ transformOrigin: "top center" }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: reduced ? 0 : 0.06 }}
                  className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-3 font-medium"
                >
                  Navegación
                </motion.p>

                {NAV_ITEMS.map((item, i) => {
                  const isLast = i === NAV_ITEMS.length - 1;
                  const isActive = activeHref === item.href;
                  const linkClass = `flex items-center justify-between py-4 text-[1.65rem] font-semibold tracking-tight transition-colors ${
                    isActive
                      ? "text-[#25327D] dark:text-amber-400"
                      : "text-zinc-900 dark:text-white active:text-zinc-500 dark:active:text-zinc-400"
                  } ${!isLast ? "border-b border-zinc-200/50 dark:border-white/[0.06]" : ""}`;

                  const handleClick = (e: React.MouseEvent) => {
                    setActiveHref(item.href);
                    setMobileOpen(false);

                    // For hash links, manually scroll after menu closes
                    const hash = item.href.includes("#")
                      ? item.href.split("#")[1]
                      : null;

                    if (hash) {
                      e.preventDefault();
                      const basePath = item.href.split("#")[0]; // "" or "/"

                      // If we need to navigate to a different page first
                      if (basePath && basePath !== "/" && location !== basePath) {
                        window.location.href = item.href;
                        return;
                      }

                      // If on a different page but target is home (e.g. /#casos from /productos)
                      if (location !== "/" && (basePath === "/" || basePath === "")) {
                        window.location.href = item.href;
                        return;
                      }

                      // Same page — wait for menu to close, then scroll
                      requestAnimationFrame(() => {
                        setTimeout(() => {
                          const el = document.getElementById(hash);
                          el?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
                      });
                    }
                  };

                  const content = (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-sm bg-[#25327D] dark:bg-amber-400" />
                      )}
                    </>
                  );

                  return (
                    <motion.div
                      key={item.label}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                      transition={{
                        duration: reduced ? 0.1 : 0.4,
                        ease: EASE,
                        delay: reduced ? 0 : 0.06 + i * 0.025,
                      }}
                    >
                      {item.isLink ? (
                        <Link href={item.href} onClick={handleClick} className={linkClass}>
                          {content}
                        </Link>
                      ) : (
                        <a href={item.href} onClick={handleClick} className={linkClass}>
                          {content}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA card */}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32, rotate: -3, scale: 0.97 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, rotate: -1.5, scale: 0.98 }}
                transition={{ duration: reduced ? 0.1 : 0.5, ease: EASE, delay: reduced ? 0 : 0.08 }}
                className="pointer-events-auto mt-4 rounded-xl border border-zinc-200/70 dark:border-white/[0.1] bg-white/90 dark:bg-zinc-900/80 shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-2xl p-6"
                style={{ transformOrigin: "top center" }}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-4 font-medium">
                  Ransomware, brechas, cumplimiento
                </p>
                <a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 text-base font-semibold tracking-tight"
                >
                  Quiero mi diagnóstico gratis
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
