import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import RevealText from "@/components/ui/RevealText";

const EASE = [0.16, 1, 0.3, 1] as const;

function GravityField() {
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/lottie-shield.json")
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => {});
  }, []);

  if (!lottieData) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow — breathes behind the Lottie */}
      <motion.div
        className="absolute inset-[15%] rounded-full blur-3xl bg-indigo-400/[0.07] dark:bg-indigo-400/[0.05]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1],
          scale: [0.8, 1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 1.5, delay: 0.5, ease: EASE },
          scale: { duration: 6, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        }}
      />

      {/* Lottie with float */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5, ease: EASE },
          scale: { duration: 1.2, delay: 0.5, ease: EASE },
          y: { duration: 5, delay: 1.7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Lottie animationData={lottieData} loop className="w-full h-full" />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <header className="relative bg-white dark:bg-zinc-950 -mt-24 overflow-hidden">
      {/* Depth gradient — light */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #f4f4f5 0%, #ffffff 70%)",
        }}
      />
      {/* Depth gradient — dark */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #1c1c1f 0%, #09090b 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100svh] lg:min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Gravity field - Desktop */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[540px] h-[540px] hidden lg:block pointer-events-none text-zinc-900 dark:text-white">
          <GravityField />
        </div>

        <motion.div 
          className="relative z-10 w-full lg:max-w-[55%]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-[11px] sm:text-xs font-medium tracking-[0.22em] text-zinc-400 dark:text-zinc-500 uppercase mb-6 sm:mb-8"
          >
            15+ años protegiendo empresas en Chile
          </motion.p>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem] tracking-tight sm:leading-[0.94] max-w-2xl text-balance"
          >
            <span className="block text-zinc-900 dark:text-white font-light">
              Tu operación tiene brechas.
            </span>
            <span className="block font-serif italic text-[#25327D] dark:text-amber-400 mt-2">
              Nosotros las cerramos.
            </span>
          </motion.h1>

          {/* Lottie animation — mobile only */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 w-56 h-56 mx-auto sm:w-64 sm:h-64 lg:hidden"
          >
            <GravityField />
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 sm:mt-10 max-w-[33rem] text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light"
          >
            Consultoría, implementación y operación de ciberseguridad para
            empresas. Plataformas líderes, equipo certificado y acompañamiento
            local en cada etapa.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-10 sm:mt-12 flex flex-col items-start gap-4"
          >
            <a
              href="#contacto"
              className="inline-flex min-h-[3.5rem] w-full sm:w-auto items-center justify-center sm:justify-start gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-base sm:text-sm font-medium hover:brightness-110 transition-all"
            >
              Agenda un diagnóstico
              <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4" />
            </a>

            {/* Hidden on mobile to avoid competing with CTA, visible on desktop */}
            <div className="hidden sm:flex flex-wrap gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              <span className="rounded-md border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                5.361+ amenazas detectadas
              </span>
              <span className="rounded-md border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                1.761+ endpoints protegidos
              </span>
              <span className="rounded-md border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                Equipo con 25+ años de experiencia
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-zinc-300 dark:from-zinc-600 to-transparent" />
      </motion.div>
    </header>
  );
}
